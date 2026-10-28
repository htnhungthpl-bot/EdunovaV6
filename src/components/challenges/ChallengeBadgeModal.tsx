import React from 'react';
import { X, Award, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { CHALLENGE_BADGES } from '../../data/challengeData';
import { ChallengeUserProgress } from '../../types/challenges';

interface ChallengeBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: ChallengeUserProgress;
}

export const ChallengeBadgeModal: React.FC<ChallengeBadgeModalProps> = ({
  isOpen,
  onClose,
  progress,
}) => {
  if (!isOpen) return null;

  const earnedSet = new Set(progress.earnedBadgeIds);

  const getRoundCount = (gameId: string) => {
    return progress.games[gameId as keyof typeof progress.games]?.completedRoundIds.length || 0;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 border border-amber-200 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl shadow-xs">
              🏆
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-xl text-slate-800">
                Bảng Huy Hiệu Vinh Danh
              </h3>
              <p className="text-xs text-slate-500">
                Hoàn thành các thử thách để thắp sáng trọn bộ 4 huy hiệu danh giá!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Total Points Callout */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-600 font-medium block">Tổng điểm tích lũy thử thách:</span>
            <span className="text-2xl font-black text-amber-600">
              {progress.totalPoints} <span className="text-sm font-bold text-slate-600">điểm thưởng</span>
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-600 font-medium block">Huy hiệu đã mở khóa:</span>
            <span className="text-base font-extrabold text-emerald-600">
              {progress.earnedBadgeIds.length} / 4 huy hiệu
            </span>
          </div>
        </div>

        {/* 4 Badges Grid */}
        <div className="space-y-3.5">
          {CHALLENGE_BADGES.map(badge => {
            const isUnlocked = earnedSet.has(badge.id);
            const count = getRoundCount(badge.gameId);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? 'bg-amber-50/50 border-amber-300 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-80'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner ${
                  isUnlocked ? 'bg-amber-100 ring-2 ring-amber-400' : 'bg-slate-200 grayscale'
                }`}>
                  {badge.icon}
                </div>

                <div className="grow min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-heading font-bold text-base text-slate-800 flex items-center gap-2">
                      <span>{badge.name}</span>
                      {isUnlocked ? (
                        <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Đã đạt
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Chưa mở
                        </span>
                      )}
                    </h4>

                    <span className="text-xs font-bold text-slate-500 shrink-0">
                      Tiến độ: {count}/{badge.requiredCount}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pedagogical disclaimer note */}
        <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 text-xs leading-relaxed space-y-1">
          <p className="font-bold">🌱 Tinh thần của EDUNOVA:</p>
          <p>
            "Học mà chơi – Chơi mà học – Viết hay hơn mỗi ngày." Điểm số và huy hiệu là những ngôi sao khích lệ niềm vui tìm tòi ngôn ngữ của em, không dùng để xếp hạng hay tạo áp lực.
          </p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer transition-colors shadow-sm"
          >
            Đóng bảng vinh danh
          </button>
        </div>
      </div>
    </div>
  );
};
