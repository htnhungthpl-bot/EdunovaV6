import React, { useState, useEffect, useMemo } from "react";
import { 
  Award, 
  Star, 
  Flame, 
  BookCheck, 
  CheckCircle2, 
  ArrowRight, 
  Trophy, 
  Sparkles, 
  Lock, 
  Filter, 
  Gift, 
  TrendingUp,
  Target,
  PenTool,
  Gamepad2,
  X,
  Heart
} from "lucide-react";
import { UserProfile, StudentSubmission, DbDiamondNote } from "../types";
import { StudentBadge, StudentAchievement, BadgeCategory } from "../types/achievements";
import { 
  getGamificationState, 
  claimAchievementReward, 
  StudentGamificationState 
} from "../utils/achievementEngine";
import { api } from "../utils/api";

// Inlined BadgeDetailModal to ensure 100% bulletproof deployment builds
interface BadgeDetailModalProps {
  badge: StudentBadge | null;
  achievement: StudentAchievement | null;
  onClose: () => void;
  onClaim?: (achievementId: string) => void;
}

const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  badge,
  achievement,
  onClose,
  onClaim
}) => {
  if (!badge && !achievement) return null;

  const title = badge ? badge.title : achievement?.title;
  const icon = badge ? badge.icon : achievement?.icon;
  const description = badge ? badge.description : achievement?.description;
  const isUnlocked = badge ? badge.isUnlocked : achievement?.isCompleted;
  const rewardStars = badge ? badge.rewardStars : achievement?.rewardStars || 20;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-amber-200 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 sm:p-7 bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 text-slate-900 text-center overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/30 hover:bg-white/50 text-slate-900 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative mx-auto w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center text-5xl border-4 border-amber-200/80 mb-3">
            {icon}
            {isUnlocked && (
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
          </div>

          <h3 className="font-heading font-black text-2xl text-slate-900 drop-shadow-xs">
            {title}
          </h3>

          <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
            {badge && (
              <>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/40 text-amber-950 border border-white/40">
                  {badge.categoryName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-900/15 text-amber-950">
                  {badge.rarity}
                </span>
              </>
            )}
            {achievement && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/40 text-amber-950 border border-white/40">
                Thành tựu cột mốc
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-yellow-100 text-amber-900 border border-yellow-300">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              +{rewardStars} sao
            </span>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-bold ${
            isUnlocked 
              ? "bg-emerald-50 border-emerald-300 text-emerald-900" 
              : "bg-amber-50 border-amber-200 text-amber-900"
          }`}>
            <div className="flex items-center gap-2">
              {isUnlocked ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Em đã mở khóa huy hiệu này!</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Đang rèn luyện để mở khóa</span>
                </>
              )}
            </div>
            {badge?.unlockedAt && (
              <span className="text-[11px] text-emerald-700 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-200">
                {badge.unlockedAt}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Ý nghĩa danh hiệu
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {description}
            </p>
          </div>

          {badge?.requirementDescription && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Điều kiện chinh phục:</span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {badge.requirementDescription}
              </p>
            </div>
          )}

          {achievement && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Tiến độ hiện tại:</span>
                <span className="text-amber-800">
                  {achievement.currentValue} / {achievement.targetValue} {achievement.unit}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((achievement.currentValue / achievement.targetValue) * 100))}%` }}
                />
              </div>
            </div>
          )}

          {badge?.pedagogicalTip && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1 text-rose-950">
              <div className="text-xs font-bold flex items-center gap-1.5 text-rose-800">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Lời khuyên từ cô giáo EDUNOVA:</span>
              </div>
              <p className="text-xs leading-relaxed italic">
                "{badge.pedagogicalTip}"
              </p>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            {achievement && achievement.isCompleted && !achievement.isClaimed && onClaim ? (
              <button
                onClick={() => {
                  onClaim(achievement.id);
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Nhận ngay +{achievement.rewardStars} sao thưởng!</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
              >
                Đã hiểu, em sẽ cố gắng!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProgressViewProps {
  currentUser: UserProfile;
  onNavigateToWriting: () => void;
  onNavigateToChallenges?: () => void;
}

type MainTab = "badges" | "achievements";
type BadgeFilter = "all" | "unlocked" | "locked" | "writing" | "challenge" | "effort";

export const ProgressView: React.FC<ProgressViewProps> = ({ 
  currentUser, 
  onNavigateToWriting,
  onNavigateToChallenges
}) => {
  const [activeTab, setActiveTab] = useState<MainTab>("badges");
  const [badgeFilter, setBadgeFilter] = useState<BadgeFilter>("all");
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [diamondNotes, setDiamondNotes] = useState<DbDiamondNote[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<StudentBadge | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<StudentAchievement | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const subs = await api.getSubmissions();
        if (isMounted && Array.isArray(subs)) {
          setSubmissions(subs);
        }
      } catch {
        // graceful offline fallback
      }

      try {
        const notes = await api.getDiamondNotes();
        if (isMounted && Array.isArray(notes)) {
          setDiamondNotes(notes);
        }
      } catch {
        // graceful offline fallback
      }
      try {
        const achRes = await api.getAchievementsProgress(currentUser.id);
        if (isMounted && achRes && achRes.progress) {
          const key = `edunova_achievements_v1_${currentUser.id}`;
          const current = localStorage.getItem(key);
          const parsed = current ? JSON.parse(current) : {};
          const merged = {
            ...parsed,
            claimedAchievementIds: Array.from(new Set([...(parsed.claimedAchievementIds || []), ...(achRes.progress.claimedAchievementIds || [])])),
            unlockedBadgeIds: Array.from(new Set([...(parsed.unlockedBadgeIds || []), ...(achRes.progress.unlockedBadgeIds || [])])),
          };
          localStorage.setItem(key, JSON.stringify(merged));
          setRefreshTrigger(prev => prev + 1);
        }
      } catch {}
    }

    loadData();
    return () => { isMounted = false; };
  }, [refreshTrigger, currentUser.id]);

  const gameState: StudentGamificationState = useMemo(() => {
    return getGamificationState(currentUser, submissions, diamondNotes);
  }, [currentUser, submissions, diamondNotes, refreshTrigger]);

  const handleClaim = (achievementId: string) => {
    const res = claimAchievementReward(currentUser.id, achievementId);
    if (res.success) {
      setRefreshTrigger(prev => prev + 1);
    }
  };

  const filteredBadges = useMemo(() => {
    return gameState.badges.filter(badge => {
      if (badgeFilter === "unlocked") return badge.isUnlocked;
      if (badgeFilter === "locked") return !badge.isUnlocked;
      if (badgeFilter === "writing") return badge.category === "writing";
      if (badgeFilter === "challenge") return badge.category === "challenge";
      if (badgeFilter === "effort") return badge.category === "effort";
      return true;
    });
  }, [gameState.badges, badgeFilter]);

  const completedAchievements = gameState.achievements.filter(a => a.isCompleted);
  const unclaimedAchievements = gameState.achievements.filter(a => a.isCompleted && !a.isClaimed);

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      {/* 1. HERO PROFILE & LEVEL PROGRESSION CARD */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 text-slate-900 shadow-xl shadow-orange-500/15 p-6 sm:p-8 border border-amber-300">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-white/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-10 w-48 h-48 bg-yellow-300/30 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-3xl bg-white/95 shadow-md flex items-center justify-center text-4xl sm:text-5xl border-2 border-white shrink-0 transform hover:scale-105 transition-transform">
                {currentUser.avatar}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-900 text-white flex items-center justify-center text-xs font-black border-2 border-white shadow-sm" title={`Cấp độ ${gameState.levelInfo.level}`}>
                  {gameState.levelInfo.level}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {currentUser.name}
                  </h2>
                  <span className="bg-amber-900/15 text-amber-950 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-900/20">
                    {currentUser.className}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-amber-950 font-medium opacity-90">
                  {currentUser.school}
                </p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 backdrop-blur-xs text-amber-950 font-bold text-xs border border-white/60 shadow-xs">
                  <span className="text-base">{gameState.levelInfo.badgeIcon}</span>
                  <span>Cấp {gameState.levelInfo.level}: <strong className="text-amber-900">{gameState.levelInfo.title}</strong></span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 bg-white/40 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/50 text-center shadow-xs">
              <div className="px-2">
                <div className="font-heading text-xl sm:text-2xl font-black text-amber-950 flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  <span>{gameState.totalStars}</span>
                </div>
                <div className="text-[11px] font-bold text-amber-950/80 mt-0.5">
                  Sao tích lũy
                </div>
              </div>

              <div className="border-l border-amber-900/15 px-2">
                <div className="font-heading text-xl sm:text-2xl font-black text-amber-950 flex items-center justify-center gap-1">
                  <Flame className="w-5 h-5 fill-orange-600 text-orange-600" />
                  <span>{gameState.streakDays}</span>
                </div>
                <div className="text-[11px] font-bold text-amber-950/80 mt-0.5">
                  Ngày liên tiếp
                </div>
              </div>

              <div className="border-l border-amber-900/15 px-2">
                <div className="font-heading text-xl sm:text-2xl font-black text-amber-950 flex items-center justify-center gap-1">
                  <Trophy className="w-5 h-5 text-amber-800" />
                  <span>{gameState.stats.unlockedBadgesCount}/12</span>
                </div>
                <div className="text-[11px] font-bold text-amber-950/80 mt-0.5">
                  Huy hiệu đạt
                </div>
              </div>

              <div className="border-l border-amber-900/15 px-2">
                <div className="font-heading text-xl sm:text-2xl font-black text-amber-950 flex items-center justify-center gap-1">
                  <BookCheck className="w-5 h-5 text-emerald-800" />
                  <span>{gameState.stats.totalEssaysSubmitted}</span>
                </div>
                <div className="text-[11px] font-bold text-amber-950/80 mt-0.5">
                  Bài hoàn thành
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-md rounded-2xl p-4 border border-white/60 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-extrabold text-amber-950">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-900" />
                <span>Tiến trình thăng cấp danh hiệu:</span>
              </span>
              <span>
                {gameState.nextLevel ? (
                  <>Còn <strong>{gameState.starsToNextLevel} sao</strong> để lên Cấp {gameState.nextLevel.level} ({gameState.nextLevel.title})</>
                ) : (
                  <>Đã đạt cấp độ cao nhất! 👑</>
                )}
              </span>
            </div>

            <div className="w-full h-3.5 bg-amber-900/15 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${gameState.progressPercentToNextLevel}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
              <span>{gameState.levelInfo.title} ({gameState.levelInfo.minStars} sao)</span>
              <span>{gameState.progressPercentToNextLevel}%</span>
              <span>{gameState.nextLevel ? `${gameState.nextLevel.title} (${gameState.nextLevel.minStars} sao)` : "Cực phẩm"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN TABS & UNCLAIMED NOTIFICATION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => setActiveTab("badges")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "badges"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>Huy hiệu vinh danh ({gameState.stats.unlockedBadgesCount}/12)</span>
          </button>

          <button
            onClick={() => setActiveTab("achievements")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 relative ${
              activeTab === "achievements"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Target className="w-4 h-4 text-rose-600" />
            <span>Thành tựu & Cột mốc ({completedAchievements.length}/8)</span>
            {unclaimedAchievements.length > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping absolute -top-1 -right-1" />
            )}
          </button>
        </div>

        {unclaimedAchievements.length > 0 && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300 animate-pulse">
            <Gift className="w-4 h-4 text-rose-600" />
            <span>Em có {unclaimedAchievements.length} phần thưởng sao chưa nhận!</span>
          </div>
        )}
      </div>

      {/* 3. TAB CONTENT: BADGES */}
      {activeTab === "badges" && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Lọc:</span>
            </span>

            {[
              { id: "all", label: "Tất cả (12)" },
              { id: "unlocked", label: `Đã mở khóa (${gameState.stats.unlockedBadgesCount})` },
              { id: "locked", label: `Đang rèn (${12 - gameState.stats.unlockedBadgesCount})` },
              { id: "writing", label: "Tập làm văn (4)" },
              { id: "challenge", label: "Thử thách vui (4)" },
              { id: "effort", label: "Chăm chỉ & Sáng tạo (4)" }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setBadgeFilter(f.id as BadgeFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  badgeFilter === f.id
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredBadges.map(badge => {
              return (
                <div
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className={`group relative p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-1 ${
                    badge.isUnlocked
                      ? "bg-white border-amber-200/90 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-400"
                      : "bg-slate-50/80 border-slate-200 opacity-60 hover:opacity-90"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-110 ${
                      badge.isUnlocked
                        ? "bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-300 ring-2 ring-amber-300/50"
                        : "bg-slate-200 text-slate-400 border border-slate-300 grayscale"
                    }`}>
                      {badge.icon}
                    </div>

                    <div className="text-right space-y-1">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-block ${
                        badge.isUnlocked
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-slate-200 text-slate-600"
                      }`}>
                        {badge.isUnlocked ? "Đã đạt ✓" : "Đang rèn"}
                      </span>

                      <div className="text-[10px] font-bold text-slate-500 block">
                        {badge.rarity}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-heading font-black text-base text-slate-800 group-hover:text-amber-800 transition-colors">
                      {badge.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {badge.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-500 truncate max-w-[130px]">
                      {badge.categoryName}
                    </span>
                    <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1 shrink-0">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      +{badge.rewardStars} sao
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. TAB CONTENT: ACHIEVEMENTS & MILESTONES */}
      {activeTab === "achievements" && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-700" />
                <span>Thành Tựu Cột Mốc – Vươn Tới Đỉnh Cao</span>
              </h3>
              <p className="text-xs text-slate-600">
                Mỗi khi em hoàn thành một cột mốc trong quá trình học tập, hãy nhấn "Nhận thưởng" để bổ sung ngay số sao vào hồ sơ cá nhân!
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-amber-900 bg-white px-3 py-1 rounded-full border border-amber-300 shadow-xs">
                {completedAchievements.length} / {gameState.achievements.length} đã hoàn thành
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {gameState.achievements.map(ach => {
              const percent = Math.min(100, Math.round((ach.currentValue / ach.targetValue) * 100));
              const canClaim = ach.isCompleted && !ach.isClaimed;

              return (
                <div
                  key={ach.id}
                  onClick={() => setSelectedAchievement(ach)}
                  className={`p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-0.5 ${
                    ach.isCompleted
                      ? "bg-white border-amber-300 shadow-sm hover:shadow-md"
                      : "bg-white/80 border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-13 h-13 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-3xl shadow-xs shrink-0">
                        {ach.icon}
                      </div>
                      <div>
                        <h4 className="font-heading font-black text-base text-slate-800">
                          {ach.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {ach.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-yellow-100 text-amber-900 border border-yellow-300">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        +{ach.rewardStars}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Tiến độ:</span>
                      <span className={ach.isCompleted ? "text-emerald-700 font-black" : "text-amber-800"}>
                        {ach.currentValue} / {ach.targetValue} {ach.unit} ({percent}%)
                      </span>
                    </div>

                    <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          ach.isCompleted
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                            : "bg-gradient-to-r from-amber-500 to-orange-500"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500 font-medium">
                      Bấm vào để xem lời khuyên &raquo;
                    </div>

                    {canClaim ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClaim(ach.id);
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs shadow-md shadow-orange-500/20 animate-bounce cursor-pointer flex items-center gap-1.5"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Nhận +{ach.rewardStars} sao</span>
                      </button>
                    ) : ach.isClaimed ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Đã nhận thưởng</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-xl">
                        Đang rèn luyện
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. QUICK SHORTCUT CTAS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/5 border-2 border-amber-300 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md shadow-amber-500/20">
              <PenTool className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-black text-lg text-slate-900">
              Phòng Luyện Viết SGK Lớp 4
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thực hành 5 bước viết văn chuẩn mực với sự đồng hành của Trợ lý EDUNOVA, hoàn thành bài tập và thu hoạch thêm nhiều ngôi sao danh dự!
            </p>
          </div>

          <button
            onClick={onNavigateToWriting}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Vào phòng luyện viết ngay</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-500/10 via-blue-500/10 to-sky-500/5 border-2 border-sky-300 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-2xl shadow-md shadow-sky-500/20">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-black text-lg text-slate-900">
              Đấu Trường Thử Thách Vui Học
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Xây câu thần tốc, Thám tử chính tả, Vua từ láy và Lò rèn câu văn. Đổi mới câu hỏi liên tục mỗi lượt để rèn luyện phản xạ ngôn ngữ sắc bén.
            </p>
          </div>

          <button
            onClick={onNavigateToChallenges || onNavigateToWriting}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Vào đấu trường thử thách</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 6. MODAL DETAIL POPUP */}
      <BadgeDetailModal
        badge={selectedBadge}
        achievement={selectedAchievement}
        onClose={() => {
          setSelectedBadge(null);
          setSelectedAchievement(null);
        }}
        onClaim={handleClaim}
      />
    </div>
  );
};
