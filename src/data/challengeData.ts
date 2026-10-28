import { 
  ChallengeBadge 
} from '../types/challenges';

// Re-export expanded pools (24 rounds, 24 cases, 24 challenges, 16 levels)
export { SENTENCE_BUILDER_ROUNDS } from './challenges/sentenceBuilderPool';
export { SPELLING_CASES } from './challenges/spellingCasesPool';
export { VIVID_WORD_CHALLENGES } from './challenges/vividWordsPool';
export { SENTENCE_SMITH_LEVELS } from './challenges/sentenceSmithPool';

// ==================== HUY HIỆU VINH DANH ====================
export const CHALLENGE_BADGES: ChallengeBadge[] = [
  {
    id: 'badge-builder',
    name: 'Nhà Xây Câu',
    title: 'Huy hiệu: Nhà Xây Câu Tài Ba 🌉',
    description: 'Chinh phục trọn vẹn 6 vòng chơi của "Xây Câu Thần Tốc", sắp xếp câu văn chuẩn mực ngữ pháp.',
    icon: '🌉',
    color: 'emerald',
    gameId: 'sentence-builder',
    requiredCount: 6
  },
  {
    id: 'badge-detective',
    name: 'Thám Tử Chính Tả',
    title: 'Huy hiệu: Thám Tử Chính Tả Nhí 🔍',
    description: 'Phá án thành công các vụ án chính tả khó nhằn: l/n, s/x, tr/ch, d/gi/r và dấu hỏi ngã.',
    icon: '🔍',
    color: 'sky',
    gameId: 'spelling-detective',
    requiredCount: 6
  },
  {
    id: 'badge-vivid',
    name: 'Vua Từ Ngữ',
    title: 'Huy hiệu: Vua Từ Láy & Từ Gợi Cảm 👑',
    description: 'Vượt qua 6 thách đấu chọn từ ngữ đỉnh cao, am hiểu sâu sắc các tầng ý nghĩa của Tiếng Việt.',
    icon: '👑',
    color: 'amber',
    gameId: 'vivid-words',
    requiredCount: 6
  },
  {
    id: 'badge-smith',
    name: 'Nghệ Nhân Câu Văn',
    title: 'Huy hiệu: Nghệ Nhân Rèn Giũa Câu Văn ⚒️',
    description: 'Hoàn thành xuất sắc 4 cấp độ tôi luyện câu văn đơn giản thành tuyệt phẩm giàu hình ảnh nghệ thuật.',
    icon: '⚒️',
    color: 'rose',
    gameId: 'sentence-smith',
    requiredCount: 4
  }
];

// Helper to get initial state
export function getInitialChallengeProgress(userId: string) {
  return {
    userId,
    games: {
      'sentence-builder': {
        completedRoundIds: [],
        scoresByRound: {},
        hintsUsedByRound: {},
        totalPoints: 0
      },
      'spelling-detective': {
        completedRoundIds: [],
        scoresByRound: {},
        hintsUsedByRound: {},
        totalPoints: 0
      },
      'vivid-words': {
        completedRoundIds: [],
        scoresByRound: {},
        hintsUsedByRound: {},
        totalPoints: 0
      },
      'sentence-smith': {
        completedRoundIds: [],
        scoresByRound: {},
        hintsUsedByRound: {},
        totalPoints: 0
      }
    },
    totalPoints: 0,
    earnedBadgeIds: [],
    lastUpdated: new Date().toISOString()
  };
}
