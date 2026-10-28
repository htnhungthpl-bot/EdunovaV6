import React from "react";
import { X, Star, Sparkles, CheckCircle2, Lock, Heart } from "lucide-react";
import { StudentBadge, StudentAchievement } from "../../types/achievements";

interface BadgeDetailModalProps {
  badge: StudentBadge | null;
  achievement: StudentAchievement | null;
  onClose: () => void;
  onClaim?: (achievementId: string) => void;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
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
