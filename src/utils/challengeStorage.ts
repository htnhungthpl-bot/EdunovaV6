import { 
  ChallengeUserProgress, 
  GameId, 
  ChallengeBadge 
} from '../types/challenges';
import { 
  CHALLENGE_BADGES, 
  getInitialChallengeProgress,
  SENTENCE_BUILDER_ROUNDS,
  SPELLING_CASES,
  VIVID_WORD_CHALLENGES,
  SENTENCE_SMITH_LEVELS
} from '../data/challengeData';
import confetti from 'canvas-confetti';
import { api, getStoredToken } from './api';

const STORAGE_PREFIX = 'edunova_challenges_v1_';

export function getLocalChallengeProgress(userId: string): ChallengeUserProgress {
  const key = `${STORAGE_PREFIX}${userId || 'guest'}`;
  const raw = localStorage.getItem(key);
  if (!raw) {
    const fresh = getInitialChallengeProgress(userId || 'guest');
    saveLocalChallengeProgress(fresh);
    return fresh;
  }
  try {
    const parsed = JSON.parse(raw);
    // ensure all games structures exist
    const initial = getInitialChallengeProgress(userId || 'guest');
    return {
      userId: parsed.userId || userId || 'guest',
      games: {
        'sentence-builder': { ...initial.games['sentence-builder'], ...parsed.games?.['sentence-builder'] },
        'spelling-detective': { ...initial.games['spelling-detective'], ...parsed.games?.['spelling-detective'] },
        'vivid-words': { ...initial.games['vivid-words'], ...parsed.games?.['vivid-words'] },
        'sentence-smith': { ...initial.games['sentence-smith'], ...parsed.games?.['sentence-smith'] }
      },
      totalPoints: typeof parsed.totalPoints === 'number' ? parsed.totalPoints : 0,
      earnedBadgeIds: Array.isArray(parsed.earnedBadgeIds) ? parsed.earnedBadgeIds : [],
      lastUpdated: parsed.lastUpdated || new Date().toISOString()
    };
  } catch {
    const fresh = getInitialChallengeProgress(userId || 'guest');
    saveLocalChallengeProgress(fresh);
    return fresh;
  }
}

export function saveLocalChallengeProgress(progress: ChallengeUserProgress) {
  const key = `${STORAGE_PREFIX}${progress.userId || 'guest'}`;
  try {
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (err) {
    console.warn('Failed to save challenge progress locally:', err);
  }
  try {
    api.syncChallengeProgress(progress).catch(() => {});
  } catch {}
}

// Check newly earned badges
export function checkBadgesEarned(progress: ChallengeUserProgress): {
  newBadges: ChallengeBadge[];
  updatedBadgeIds: string[];
} {
  const currentEarned = new Set(progress.earnedBadgeIds);
  const newlyUnlocked: ChallengeBadge[] = [];

  const roundCounts: Record<GameId, number> = {
    'sentence-builder': progress.games['sentence-builder'].completedRoundIds.length,
    'spelling-detective': progress.games['spelling-detective'].completedRoundIds.length,
    'vivid-words': progress.games['vivid-words'].completedRoundIds.length,
    'sentence-smith': progress.games['sentence-smith'].completedRoundIds.length
  };

  CHALLENGE_BADGES.forEach(badge => {
    if (!currentEarned.has(badge.id)) {
      if (roundCounts[badge.gameId] >= badge.requiredCount) {
        newlyUnlocked.push(badge);
        currentEarned.add(badge.id);
      }
    }
  });

  return {
    newBadges: newlyUnlocked,
    updatedBadgeIds: Array.from(currentEarned)
  };
}

export interface SubmitRoundParams {
  userId: string;
  gameId: GameId;
  roundId: string;
  isCorrect: boolean;
  usedHint: boolean;
}

export interface SubmitRoundResult {
  pointsAwarded: number;
  newTotalPoints: number;
  isNewCompletion: boolean;
  isDuplicate: boolean;
  newBadges: ChallengeBadge[];
  progress: ChallengeUserProgress;
}

export function recordRoundOutcome(params: SubmitRoundParams): SubmitRoundResult {
  const { userId, gameId, roundId, isCorrect, usedHint } = params;
  const current = getLocalChallengeProgress(userId);
  const game = current.games[gameId];

  if (!isCorrect) {
    return {
      pointsAwarded: 0,
      newTotalPoints: current.totalPoints,
      isNewCompletion: false,
      isDuplicate: false,
      newBadges: [],
      progress: current
    };
  }

  // Calculate potential score for this attempt
  const potentialScore = usedHint ? 5 : 10;
  const previousScore = game.scoresByRound[roundId] || 0;
  let pointsAwarded = 0;
  let isDuplicate = false;

  if (previousScore >= potentialScore) {
    // Already achieved equal or higher score on this round (Anti-farming protection)
    pointsAwarded = 0;
    isDuplicate = true;
  } else {
    // First time or improved score (e.g. from 5 up to 10 on clean retry)
    pointsAwarded = potentialScore - previousScore;
    game.scoresByRound[roundId] = potentialScore;
  }

  const isNewCompletion = !game.completedRoundIds.includes(roundId);
  if (isNewCompletion) {
    game.completedRoundIds.push(roundId);
  }

  if (usedHint) {
    game.hintsUsedByRound[roundId] = true;
  }

  // Recalculate game & total points strictly
  game.totalPoints = Object.values(game.scoresByRound).reduce((sum, v) => sum + v, 0);

  const newTotal = (
    current.games['sentence-builder'].totalPoints +
    current.games['spelling-detective'].totalPoints +
    current.games['vivid-words'].totalPoints +
    current.games['sentence-smith'].totalPoints
  );
  current.totalPoints = newTotal;
  current.lastUpdated = new Date().toISOString();

  // Check badges
  const { newBadges, updatedBadgeIds } = checkBadgesEarned(current);
  current.earnedBadgeIds = updatedBadgeIds;

  // Persist locally
  saveLocalChallengeProgress(current);

  // Trigger celebration confetti
  if (pointsAwarded > 0 || newBadges.length > 0) {
    try {
      confetti({
        particleCount: newBadges.length > 0 ? 90 : 50,
        spread: 70,
        origin: { y: 0.65 }
      });
    } catch {
      // safe fallback
    }
  }

  // Sync with backend if available
  syncWithBackend(current).catch(() => {
    // offline graceful
  });

  return {
    pointsAwarded,
    newTotalPoints: current.totalPoints,
    isNewCompletion,
    isDuplicate,
    newBadges,
    progress: current
  };
}

async function syncWithBackend(progress: ChallengeUserProgress) {
  try {
    const token = getStoredToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    await fetch('/api/challenges/sync', {
      method: 'POST',
      headers,
      body: JSON.stringify(progress)
    });
  } catch {
    // Backend sync is optional / offline-friendly
  }
}

// Sentence Smith Rule-Based Evaluation Engine (Anti-AI slop, transparent pedagogical criteria)
export interface SentenceSmithEvaluation {
  passed: boolean;
  isSuccess: boolean;
  score: number; // 0, 5, or 10
  feedback: string;
  feedbackPraise: string;
  feedbackImprovements: string[];
  criteriaPassed: {
    hasExpansion: boolean;
    hasVividWord: boolean;
    hasFigurative: boolean;
  };
  detectedFeatures: {
    hasFullGrammar: boolean;
    hasSensoryDetail: boolean;
    hasVividWord: boolean;
    hasFigurativeDevice: boolean;
  };
  sampleTip: string;
}

export function evaluateSentenceSmith(
  levelOrInput: number | string | any,
  inputOrLevel?: string | number | any
): SentenceSmithEvaluation {
  let levelNumber = 1;
  let text = "";

  if (typeof levelOrInput === "string") {
    text = levelOrInput.trim();
    if (typeof inputOrLevel === "number") {
      levelNumber = inputOrLevel;
    } else if (inputOrLevel && typeof inputOrLevel === "object" && typeof inputOrLevel.levelNumber === "number") {
      levelNumber = inputOrLevel.levelNumber;
    }
  } else if (typeof levelOrInput === "number") {
    levelNumber = levelOrInput;
    text = (typeof inputOrLevel === "string" ? inputOrLevel : "").trim();
  } else if (levelOrInput && typeof levelOrInput === "object" && typeof levelOrInput.levelNumber === "number") {
    levelNumber = levelOrInput.levelNumber;
    text = (typeof inputOrLevel === "string" ? inputOrLevel : "").trim();
  }
  const lower = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);

  const improvements: string[] = [];
  let score = 0;

  // Check 1: Minimum length & end punctuation
  const hasPunctuation = /[.!?…]$/.test(text);
  if (!hasPunctuation) {
    improvements.push('Em hãy nhớ kết thúc câu bằng dấu chấm (.) hoặc dấu chấm than (!) nhé.');
  }

  if (words.length < 5) {
    return {
      passed: false,
      isSuccess: false,
      score: 0,
      feedback: 'Câu của em còn hơi ngắn. Em hãy mở rộng thêm từ ngữ để câu văn rõ ràng, sinh động hơn nhé!',
      feedbackPraise: 'Em đã bắt đầu viết thử!',
      feedbackImprovements: [
        'Câu của em còn hơi ngắn. Em hãy mở rộng thêm từ ngữ để câu văn rõ ràng, sinh động hơn nhé!',
        ...improvements
      ],
      criteriaPassed: {
        hasExpansion: false,
        hasVividWord: false,
        hasFigurative: false
      },
      detectedFeatures: {
        hasFullGrammar: false,
        hasSensoryDetail: false,
        hasVividWord: false,
        hasFigurativeDevice: false
      },
      sampleTip: 'Hãy thử tham khảo gợi ý từ vựng bên dưới để mở rộng câu nhé!'
    };
  }

  // Feature detection
  const vividWordsKeywords = [
    'uốn lượn', 'lấp lánh', 'lung linh', 'hiền hòa', 'lững lờ', 'mềm mại', 
    'rực rỡ', 'sừng sững', 'xanh mướt', 'mát rượi', 'rộn rã', 'bập bùng',
    'thoăn thoắt', 'róng riết', 'róc rách', 'tí tách', 'lăn tăn', 'thì thầm',
    'rạng ngời', 'ấm áp', 'trong vắt', 'trong veo', 'óng ả', 'mênh mông', 'bát ngát'
  ];
  const hasVividWord = vividWordsKeywords.some(w => lower.includes(w));

  const sensoryKeywords = [
    'màu', 'xanh', 'đỏ', 'vàng', 'ánh', 'bóng râm', 'bóng mát', 'mát rượi',
    'sân trường', 'dòng sông', 'bên hiên', 'nắng', 'sớm', 'buổi sáng', 'hoa', 'cành'
  ];
  const hasSensoryDetail = sensoryKeywords.some(w => lower.includes(w)) || words.length >= 7;

  const figurativeMarkers = [
    'như', 'tựa như', 'giống như', 'ngỡ như', 'tựa hồ', 
    'bác bàng', 'chị phượng', 'bác phượng', 'chị gió', 'khoác lên', 'thắp sáng', 'vẫy chào', 'thì thầm'
  ];
  const hasFigurativeDevice = figurativeMarkers.some(m => lower.includes(m));

  // Level-specific requirements
  let passed = false;
  let praise = '';

  if (levelNumber === 1) {
    // Level 1: Full core grammar (Chủ ngữ - Vị ngữ)
    const hasCoreVerb = /(là|rất|đang|bừng|rộn|khoác|ngập|sạch|đẹp|vui|học)/i.test(text);
    if (hasCoreVerb && words.length >= 6) {
      passed = true;
      score = 10;
      praise = 'Tuyệt vời! Em đã rèn được một câu văn có đầy đủ Chủ ngữ và Vị ngữ, diễn đạt rõ ràng, mạch lạc!';
    } else {
      passed = false;
      score = 0;
      improvements.push('Em hãy bổ sung rõ hành động hoặc đặc điểm (Vị ngữ) của trường học vào buổi sáng nhé.');
    }
  } else if (levelNumber === 2) {
    // Level 2: Specific details (color, size, shade, space)
    if (hasSensoryDetail && words.length >= 8) {
      passed = true;
      score = 10;
      praise = 'Xuất sắc! Câu văn của em đã có nhiều chi tiết cụ thể về tán lá, bóng mát và không gian trường học!';
    } else {
      passed = true; // allow pass with 5 pts for encouraging iteration
      score = 5;
      praise = 'Câu văn của em khá tốt nhưng có thể giàu chi tiết hơn!';
      improvements.push('Em hãy thêm từ ngữ miêu tả tán lá xòe rộng, màu xanh mát hay cảm giác mát rượi nhé.');
    }
  } else if (levelNumber === 3) {
    // Level 3: Vivid, sensory words
    if (hasVividWord && words.length >= 8) {
      passed = true;
      score = 10;
      praise = 'Đáng khen ngợi! Em đã khéo léo sử dụng từ láy và từ gợi cảm giúp dòng sông hiện lên thật sinh động!';
    } else {
      passed = true;
      score = 5;
      praise = 'Em đã viết được một câu văn êm ái về dòng sông quê hương!';
      improvements.push('Nếu em thêm một từ láy như "uốn lượn", "lững lờ", "lấp lánh" thì câu văn sẽ đậm chất thơ hơn đấy!');
    }
  } else {
    // Level 4: Creative imagery & figurative language (So sánh hoặc Nhân hóa)
    if (hasFigurativeDevice && words.length >= 9) {
      passed = true;
      score = 10;
      praise = 'Một tác phẩm tuyệt đẹp! Em đã vận dụng nghệ thuật so sánh/nhân hóa rất tự nhiên, hình ảnh cây phượng rực rỡ và giàu cảm xúc!';
    } else if (words.length >= 8) {
      passed = true;
      score = 5;
      praise = 'Câu văn của em giàu hình ảnh và miêu tả được sắc đỏ rực của hoa phượng!';
      improvements.push('Thử thách thêm: Em hãy dùng từ so sánh "như" (như những đốm lửa bập bùng, như chiếc ô hoa đỏ) hoặc nhân hóa gọi là "bác phượng già" xem sao nhé!');
    } else {
      passed = false;
      score = 0;
      improvements.push('Em hãy thử ví những chùm hoa phượng đỏ với đốm lửa ấm hay chiếc ô rực rỡ xem nhé!');
    }
  }

  const criteriaPassed = {
    hasExpansion: words.length >= 8,
    hasVividWord,
    hasFigurative: hasFigurativeDevice
  };
  const feedback = passed ? praise : (improvements[0] || "Em hãy bổ sung thêm từ ngữ sinh động nhé!");

  return {
    passed,
    isSuccess: passed,
    score,
    feedback,
    feedbackPraise: praise,
    feedbackImprovements: improvements,
    criteriaPassed,
    detectedFeatures: {
      hasFullGrammar: words.length >= 6,
      hasSensoryDetail,
      hasVividWord,
      hasFigurativeDevice
    },
    sampleTip: 'Viết văn là sự khám phá không ngừng. Mỗi câu chữ em rèn giũa đều giúp bài văn thêm tỏa sáng!'
  };
}
