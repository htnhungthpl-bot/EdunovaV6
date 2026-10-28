import {
  SentenceBuilderRound,
  SpellingCase,
  VividWordChallenge,
  SentenceSmithLevel,
} from '../types/challenges';
import {
  SENTENCE_BUILDER_ROUNDS,
  SPELLING_CASES,
  VIVID_WORD_CHALLENGES,
  SENTENCE_SMITH_LEVELS,
} from '../data/challengeData';

/**
 * Fisher-Yates array shuffle (immutable)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Select `count` unique items randomly from `pool`.
 * If excludeIds are given, prefer unselected items first.
 */
function samplePool<T extends { id: string }>(
  pool: T[],
  count: number,
  excludeIds: string[] = []
): T[] {
  if (pool.length <= count) {
    return shuffleArray(pool);
  }

  const uncompleted = pool.filter(item => !excludeIds.includes(item.id));
  const completed = pool.filter(item => excludeIds.includes(item.id));

  const shuffledUncompleted = shuffleArray(uncompleted);
  const shuffledCompleted = shuffleArray(completed);

  // Combine preferring uncompleted first
  const combined = [...shuffledUncompleted, ...shuffledCompleted];
  return combined.slice(0, count);
}

/**
 * 1. Random session for Sentence Builder (Xây câu thần tốc)
 * Randomly picks `count` rounds (default 6) and shuffles the pieces.
 */
export function getRandomSentenceBuilderSession(
  count: number = 6,
  completedIds: string[] = []
): SentenceBuilderRound[] {
  const selected = samplePool(SENTENCE_BUILDER_ROUNDS, count, completedIds);
  return selected.map((round, idx) => ({
    ...round,
    roundNumber: idx + 1,
    // Shuffle pieces so placement order is always a fresh puzzle
    pieces: shuffleArray(round.pieces),
  }));
}

/**
 * 2. Random session for Spelling Detective (Thám tử chính tả)
 * Randomly picks `count` cases (default 6) and shuffles multiple choice options.
 */
export function getRandomSpellingCasesSession(
  count: number = 6,
  completedIds: string[] = []
): SpellingCase[] {
  const selected = samplePool(SPELLING_CASES, count, completedIds);
  return selected.map((c, idx) => ({
    ...c,
    caseNumber: idx + 1,
    // Shuffle option order so "A" or "B" is not fixed
    options: shuffleArray(c.options),
  }));
}

/**
 * 3. Random session for Vivid Words (Vua từ láy & từ gợi cảm)
 * Randomly picks `count` challenges (default 6) and shuffles options.
 */
export function getRandomVividWordsSession(
  count: number = 6,
  completedIds: string[] = []
): VividWordChallenge[] {
  const selected = samplePool(VIVID_WORD_CHALLENGES, count, completedIds);
  return selected.map((item, idx) => ({
    ...item,
    challengeNumber: idx + 1,
    options: shuffleArray(item.options),
  }));
}

/**
 * 4. Random session for Sentence Smith (Thợ rèn câu văn)
 * Randomly picks `count` levels (default 4).
 */
export function getRandomSentenceSmithSession(
  count: number = 4,
  completedIds: string[] = []
): SentenceSmithLevel[] {
  const selected = samplePool(SENTENCE_SMITH_LEVELS, count, completedIds);
  return selected.map((lvl, idx) => ({
    ...lvl,
    levelNumber: idx + 1,
  }));
}

/**
 * Get a replacement question from pool not in current active set
 */
export function getReplacementQuestion<T extends { id: string }>(
  pool: T[],
  currentActiveIds: string[]
): T | null {
  const available = pool.filter(item => !currentActiveIds.includes(item.id));
  if (available.length === 0) return null;
  const picked = available[Math.floor(Math.random() * available.length)];
  return { ...picked };
}
