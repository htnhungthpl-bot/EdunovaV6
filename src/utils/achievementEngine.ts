import { api } from './api';
import { UserProfile, StudentSubmission, DbDiamondNote } from "../types";
import { 
  StudentBadge, 
  StudentAchievement, 
  StudentLevelInfo
} from "../types/achievements";
import { 
  STUDENT_LEVELS, 
  ALL_STUDENT_BADGES, 
  INITIAL_ACHIEVEMENTS_TEMPLATE 
} from "../data/achievementData";
import { getLocalChallengeProgress } from "./challengeStorage";
import confetti from "canvas-confetti";

const STORAGE_KEY_PREFIX = "edunova_achievements_v1_";

export interface StudentGamificationState {
  userId: string;
  totalStars: number;
  streakDays: number;
  unlockedBadgeIds: string[];
  badges: StudentBadge[];
  achievements: StudentAchievement[];
  claimedAchievementIds: string[];
  levelInfo: StudentLevelInfo;
  nextLevel: StudentLevelInfo | null;
  starsToNextLevel: number;
  progressPercentToNextLevel: number;
  stats: {
    totalEssaysSubmitted: number;
    highScoreEssaysCount: number;
    diamondNotesCount: number;
    challengePoints: number;
    challengeGamesPlayedCount: number;
    unlockedBadgesCount: number;
    completedAchievementsCount: number;
  };
}

export function calculateStudentLevel(stars: number): {
  currentLevel: StudentLevelInfo;
  nextLevel: StudentLevelInfo | null;
  starsToNext: number;
  progressPercent: number;
} {
  const safeStars = Math.max(0, stars);
  let currentLevel = STUDENT_LEVELS[0];

  for (let i = STUDENT_LEVELS.length - 1; i >= 0; i--) {
    if (safeStars >= STUDENT_LEVELS[i].minStars) {
      currentLevel = STUDENT_LEVELS[i];
      break;
    }
  }

  const currentIndex = STUDENT_LEVELS.findIndex(l => l.level === currentLevel.level);
  const nextLevel = currentIndex < STUDENT_LEVELS.length - 1 ? STUDENT_LEVELS[currentIndex + 1] : null;

  let starsToNext = 0;
  let progressPercent = 100;

  if (nextLevel) {
    const range = nextLevel.minStars - currentLevel.minStars;
    const currentProgress = safeStars - currentLevel.minStars;
    progressPercent = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));
    starsToNext = Math.max(0, nextLevel.minStars - safeStars);
  }

  return {
    currentLevel,
    nextLevel,
    starsToNext,
    progressPercent
  };
}

export function getGamificationState(
  currentUser: UserProfile,
  submissions: StudentSubmission[] = [],
  diamondNotes: DbDiamondNote[] = []
): StudentGamificationState {
  const userId = currentUser.id || "guest";
  const challengeProgress = getLocalChallengeProgress(userId);

  const storageKey = `${STORAGE_KEY_PREFIX}${userId}`;
  let storedClaimedIds: string[] = [];
  let manuallyUnlockedBadges: string[] = [];

  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      storedClaimedIds = Array.isArray(parsed.claimedAchievementIds) ? parsed.claimedAchievementIds : [];
      manuallyUnlockedBadges = Array.isArray(parsed.unlockedBadgeIds) ? parsed.unlockedBadgeIds : [];
    }
  } catch (e) {
    console.warn("Could not read achievement storage:", e);
  }

  const mySubmissions = submissions.filter(s => s.studentId === currentUser.id || s.studentName === currentUser.name);
  const totalEssaysSubmitted = Math.max(mySubmissions.length, currentUser.completedEssays || 0);
  const highScoreEssaysCount = mySubmissions.filter(s => (s.score || 0) >= 8.5).length;
  const diamondNotesCount = diamondNotes.length;
  const streakDays = currentUser.streakDays || 4;

  const challengePoints = challengeProgress.totalPoints || 0;
  const sbRounds = challengeProgress.games["sentence-builder"]?.completedRoundIds?.length || 0;
  const sdRounds = challengeProgress.games["spelling-detective"]?.completedRoundIds?.length || 0;
  const vwRounds = challengeProgress.games["vivid-words"]?.completedRoundIds?.length || 0;
  const ssRounds = challengeProgress.games["sentence-smith"]?.completedRoundIds?.length || 0;

  const challengeGamesPlayedCount = [sbRounds > 0, sdRounds > 0, vwRounds > 0, ssRounds > 0].filter(Boolean).length;
  const baseStars = (currentUser.starsCount || 42) + challengePoints;

  const evaluatedBadges: StudentBadge[] = ALL_STUDENT_BADGES.map(badge => {
    let unlocked = manuallyUnlockedBadges.includes(badge.id);
    let unlockedAt: string | undefined = undefined;

    switch (badge.id) {
      case "badge-word-painter":
        unlocked = unlocked || totalEssaysSubmitted >= 2;
        break;
      case "badge-perfect-10":
        unlocked = unlocked || highScoreEssaysCount >= 1;
        break;
      case "badge-nature-explorer":
        unlocked = unlocked || totalEssaysSubmitted >= 1;
        break;
      case "badge-master-storyteller":
        unlocked = unlocked || totalEssaysSubmitted >= 3;
        break;
      case "badge-diamond-vault":
        unlocked = unlocked || diamondNotesCount >= 3;
        break;
      case "badge-spectacular-revision":
        unlocked = unlocked || totalEssaysSubmitted >= 2;
        break;
      case "badge-sentence-architect":
        unlocked = unlocked || sbRounds >= 2 || challengeProgress.earnedBadgeIds.includes("sb-architect");
        break;
      case "badge-super-detective":
        unlocked = unlocked || sdRounds >= 2 || challengeProgress.earnedBadgeIds.includes("sd-master");
        break;
      case "badge-vivid-words-king":
        unlocked = unlocked || vwRounds >= 2 || challengeProgress.earnedBadgeIds.includes("vw-champion");
        break;
      case "badge-sentence-smith":
        unlocked = unlocked || ssRounds >= 1 || challengeProgress.earnedBadgeIds.includes("ss-blacksmith");
        break;
      case "badge-streak-fire":
        unlocked = unlocked || streakDays >= 4;
        break;
      case "badge-grandmaster":
        unlocked = unlocked || baseStars >= 100;
        break;
      default:
        break;
    }

    if (unlocked) {
      unlockedAt = "Tháng 10/2026";
    }

    return {
      ...badge,
      isUnlocked: unlocked,
      unlockedAt
    };
  });

  const evaluatedAchievements: StudentAchievement[] = INITIAL_ACHIEVEMENTS_TEMPLATE.map(tmpl => {
    let currentValue = 0;
    switch (tmpl.id) {
      case "ach-first-essay":
        currentValue = totalEssaysSubmitted;
        break;
      case "ach-essay-milestone-5":
        currentValue = totalEssaysSubmitted;
        break;
      case "ach-high-score-master":
        currentValue = highScoreEssaysCount;
        break;
      case "ach-diamond-collector":
        currentValue = diamondNotesCount;
        break;
      case "ach-challenge-explorer":
        currentValue = challengePoints;
        break;
      case "ach-challenge-all-round":
        currentValue = challengeGamesPlayedCount;
        break;
      case "ach-streak-champion":
        currentValue = streakDays;
        break;
      case "ach-star-century":
        currentValue = baseStars;
        break;
      default:
        currentValue = 0;
    }

    const isCompleted = currentValue >= tmpl.targetValue;
    const isClaimed = storedClaimedIds.includes(tmpl.id);

    return {
      ...tmpl,
      currentValue: Math.min(currentValue, tmpl.targetValue),
      isCompleted,
      isClaimed,
      claimedAt: isClaimed ? "Đã nhận" : undefined
    };
  });

  const levelCalculation = calculateStudentLevel(baseStars);

  return {
    userId,
    totalStars: baseStars,
    streakDays,
    unlockedBadgeIds: evaluatedBadges.filter(b => b.isUnlocked).map(b => b.id),
    badges: evaluatedBadges,
    achievements: evaluatedAchievements,
    claimedAchievementIds: storedClaimedIds,
    levelInfo: levelCalculation.currentLevel,
    nextLevel: levelCalculation.nextLevel,
    starsToNextLevel: levelCalculation.starsToNext,
    progressPercentToNextLevel: levelCalculation.progressPercent,
    stats: {
      totalEssaysSubmitted,
      highScoreEssaysCount,
      diamondNotesCount,
      challengePoints,
      challengeGamesPlayedCount,
      unlockedBadgesCount: evaluatedBadges.filter(b => b.isUnlocked).length,
      completedAchievementsCount: evaluatedAchievements.filter(a => a.isCompleted).length
    }
  };
}

export function claimAchievementReward(userId: string, achievementId: string): {
  success: boolean;
  rewardStars: number;
} {
  const storageKey = `${STORAGE_KEY_PREFIX}${userId || "guest"}`;
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : { claimedAchievementIds: [] };
    const claimed = Array.isArray(parsed.claimedAchievementIds) ? parsed.claimedAchievementIds : [];

    if (claimed.includes(achievementId)) {
      return { success: false, rewardStars: 0 };
    }

    const tmpl = INITIAL_ACHIEVEMENTS_TEMPLATE.find(a => a.id === achievementId);
    const rewardStars = tmpl ? tmpl.rewardStars : 15;

    claimed.push(achievementId);
    parsed.claimedAchievementIds = claimed;
    localStorage.setItem(storageKey, JSON.stringify(parsed));
    try {
      api.saveAchievementsProgress(parsed).catch(() => {});
    } catch {}

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    return { success: true, rewardStars };
  } catch (err) {
    console.error("Failed to claim achievement:", err);
    return { success: false, rewardStars: 0 };
  }
}
