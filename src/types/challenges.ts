export type GameId = 'sentence-builder' | 'spelling-detective' | 'vivid-words' | 'sentence-smith';

export interface SentenceBuilderRound {
  id: string;
  roundNumber: number;
  title: string;
  theme: string;
  pieces: string[];
  validSentences: string[];
  hint: string;
  explanation: string;
  grammaticalTip: string;
}

export interface SpellingCase {
  id: string;
  caseNumber: number;
  title: string;
  topic: 'l/n' | 's/x' | 'tr/ch' | 'd/gi/r' | 'dấu hỏi/dấu ngã' | 'c/k' | 'v/d' | 'âm cuối' | string;
  passage: string;
  wrongWord: string;
  correctWord: string;
  options: {
    id: string;
    word: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  spellingRule: string;
}

export interface VividWordChallenge {
  id: string;
  challengeNumber: number;
  title: string;
  category: 'Âm thanh' | 'Màu sắc' | 'Dáng vẻ' | 'Ánh sáng' | 'Cảm xúc' | 'Thời tiết & Thiên nhiên' | string;
  prompt: string;
  sentenceContext: string;
  options: {
    id: string;
    word: string;
    isBest: boolean;
    nuance: string;
  }[];
  explanation: string;
  openObservationTip?: string;
}

export interface SentenceSmithLevel {
  id: string;
  levelNumber: number;
  title: string;
  levelName: string;
  originalSentence: string;
  guidingQuestion: string;
  targetFocus: string;
  suggestedVocab: string[];
  modelResponses: string[];
  rubricCriteria: {
    label: string;
    description: string;
  }[];
}

export interface GameProgressRecord {
  completedRoundIds: string[];
  scoresByRound: Record<string, number>;
  hintsUsedByRound: Record<string, boolean>;
  totalPoints: number;
}

export interface ChallengeUserProgress {
  userId: string;
  games: Record<GameId, GameProgressRecord>;
  totalPoints: number;
  earnedBadgeIds: string[];
  lastUpdated: string;
}

export interface ChallengeBadge {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gameId: GameId;
  requiredCount: number;
}
