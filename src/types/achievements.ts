export type BadgeCategory = 'writing' | 'challenge' | 'effort' | 'creativity';

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'diamond';

export interface StudentBadge {
  id: string;
  title: string;
  category: BadgeCategory;
  categoryName: string;
  description: string;
  requirementDescription: string;
  icon: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  rewardStars: number;
  rarity: 'Phổ biến' | 'Hiếm' | 'Sử thi' | 'Huyền thoại';
  pedagogicalTip: string;
}

export interface StudentAchievement {
  id: string;
  title: string;
  category: BadgeCategory;
  description: string;
  icon: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  tier: AchievementTier;
  rewardStars: number;
  isCompleted: boolean;
  isClaimed: boolean;
  claimedAt?: string;
  relatedGameId?: string;
}

export interface StudentLevelInfo {
  level: number;
  title: string;
  badgeIcon: string;
  minStars: number;
  maxStars: number;
  nextLevelTitle?: string;
  description: string;
}
