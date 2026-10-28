import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Trophy, 
  Award, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Flame, 
  BookOpen, 
  Layers,
  Info,
  Clock
} from 'lucide-react';
import { UserProfile } from '../../types';
import { GameId } from '../../types/challenges';
import { api } from '../../utils/api';
import { getLocalChallengeProgress, saveLocalChallengeProgress } from '../../utils/challengeStorage';
import { SentenceBuilderGame } from './SentenceBuilderGame';
import { SpellingDetectiveGame } from './SpellingDetectiveGame';
import { VividWordsGame } from './VividWordsGame';
import { SentenceSmithGame } from './SentenceSmithGame';
import { ChallengeBadgeModal } from './ChallengeBadgeModal';
import { CHALLENGE_BADGES } from '../../data/challengeData';

interface ChallengesViewProps {
  currentUser: UserProfile;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({ currentUser }) => {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  const [showBadgeModal, setShowBadgeModal] = useState<boolean>(false);
  const [progress, setProgress] = useState(() => getLocalChallengeProgress(currentUser.id));

  const refreshProgress = () => {
    setProgress(getLocalChallengeProgress(currentUser.id));
  };

  useEffect(() => {
    let isMounted = true;
    api.getChallengeProgress(currentUser.id).then(res => {
      if (isMounted && res && res.progress) {
        const local = getLocalChallengeProgress(currentUser.id);
        const merged = {
          ...local,
          ...res.progress,
          games: {
            ...local.games,
            ...res.progress.games,
          },
          totalPoints: Math.max(local.totalPoints || 0, res.progress.totalPoints || 0),
          earnedBadgeIds: Array.from(new Set([...(local.earnedBadgeIds || []), ...(res.progress.earnedBadgeIds || [])]))
        };
        saveLocalChallengeProgress(merged);
        setProgress(merged);
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, [currentUser.id]);

  const handleStartGame = (gameId: GameId) => {
    setActiveGame(gameId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHub = () => {
    setActiveGame(null);
    refreshProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a game is active, render that specific real interactive game
  if (activeGame === 'sentence-builder') {
    return (
      <SentenceBuilderGame
        currentUser={currentUser}
        onBack={handleBackToHub}
        onScoreUpdated={refreshProgress}
      />
    );
  }

  if (activeGame === 'spelling-detective') {
    return (
      <SpellingDetectiveGame
        currentUser={currentUser}
        onBack={handleBackToHub}
        onScoreUpdated={refreshProgress}
      />
    );
  }

  if (activeGame === 'vivid-words') {
    return (
      <VividWordsGame
        currentUser={currentUser}
        onBack={handleBackToHub}
        onScoreUpdated={refreshProgress}
      />
    );
  }

  if (activeGame === 'sentence-smith') {
    return (
      <SentenceSmithGame
        currentUser={currentUser}
        onBack={handleBackToHub}
        onScoreUpdated={refreshProgress}
      />
    );
  }

  // Four games stats
  const sbProgress = progress.games['sentence-builder'];
  const sdProgress = progress.games['spelling-detective'];
  const vwProgress = progress.games['vivid-words'];
  const ssProgress = progress.games['sentence-smith'];

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      {/* Top Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-orange-500/15">
        {/* Decorative background glow circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-yellow-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-100 text-xs font-bold border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Học mà chơi – Chơi mà học – Viết hay hơn mỗi ngày</span>
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white drop-shadow-xs">
              THỬ THÁCH – HỌC VUI, VIẾT HAY
            </h1>

            <p className="text-amber-100 text-xs sm:text-sm leading-relaxed max-w-xl">
              Cùng EDUNOVA tham gia 4 đấu trường ngôn ngữ diệu kỳ: sắp xếp câu chuẩn ngữ pháp, truy tìm lỗi chính tả, săn từ gợi cảm và rèn giũa câu văn tỏa sáng!
            </p>

            {/* Offline/Device disclaimer badge required by prompt */}
            <div className="pt-1 flex items-center gap-2 text-[11px] text-amber-200">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>📌 Dữ liệu trải nghiệm trên thiết bị này (Tự động lưu và đồng bộ với hồ sơ cá nhân)</span>
            </div>
          </div>

          {/* Points & Honors Badge Action */}
          <div className="shrink-0 bg-white/15 backdrop-blur-md border border-white/30 p-4 sm:p-5 rounded-3xl text-center space-y-3 min-w-[200px]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-amber-100 font-bold block">
                Điểm thưởng tích lũy
              </span>
              <div className="text-3xl sm:text-4xl font-black text-yellow-300 tracking-tight flex items-center justify-center gap-1.5 mt-1">
                <span>⭐</span>
                <span>{progress.totalPoints}</span>
              </div>
              <span className="text-[11px] text-amber-100 font-medium">
                {progress.earnedBadgeIds.length} / 4 huy hiệu vinh danh
              </span>
            </div>

            <button
              onClick={() => setShowBadgeModal(true)}
              className="w-full px-4 py-2.5 rounded-2xl bg-white text-slate-900 font-bold text-xs hover:bg-amber-100 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Bảng huy hiệu danh dự</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Cards Grid - 2 Columns on Desktop, 1 Column on Mobile */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800 flex items-center gap-2">
              <span>Bốn Trò Chơi Ngôn Ngữ Diệu Kỳ</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                Lớp 4 GDPT 2018
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Mỗi câu đúng lượt đầu nhận ngay 10 điểm. Đúng sau khi xem gợi ý nhận 5 điểm. Chơi lại để rèn luyện kỹ năng!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* CARD 1: XÂY CÂU THẦN TỐC (XANH LÁ - GREEN) */}
          <div className="group relative overflow-hidden rounded-3xl bg-white border-2 border-emerald-200/90 hover:border-emerald-500 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between space-y-5">
            {/* Ambient top highlight */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between gap-3">
                {/* 3D vibrant icon badge */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  🌉
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 block">
                    6 vòng chơi
                  </span>
                  <span className="text-xs font-extrabold text-slate-600 mt-1 block">
                    Tích lũy: <strong className="text-emerald-600 text-sm">{sbProgress.totalPoints}</strong>/60đ
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-black text-xl text-slate-800 group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                  <span>Xây Câu Thần Tốc</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5">
                  Sắp xếp các mảnh từ, cụm từ bị đảo lộn thành câu văn hoàn chỉnh, đúng trật tự ngữ pháp và giàu nhịp điệu sinh động.
                </p>
              </div>

              {/* Progress mini bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span>Tiến độ xây câu:</span>
                  <span className="text-emerald-700">
                    {sbProgress.completedRoundIds.length}/6 vòng
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                    style={{ width: `${(sbProgress.completedRoundIds.length / 6) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2 relative z-10">
              <button
                onClick={() => handleStartGame('sentence-builder')}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:from-emerald-800 active:to-teal-800 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2 group/btn"
              >
                <span>{sbProgress.completedRoundIds.length === 6 ? 'Chơi lại & Rèn luyện' : sbProgress.completedRoundIds.length > 0 ? 'Tiếp tục xây câu' : 'Vào chơi ngay'}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* CARD 2: THÁM TỬ CHÍNH TẢ (XANH DƯƠNG - BLUE) */}
          <div className="group relative overflow-hidden rounded-3xl bg-white border-2 border-sky-200/90 hover:border-sky-500 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between space-y-5">
            {/* Ambient top highlight */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100/60 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between gap-3">
                {/* 3D vibrant icon badge */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-sky-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  🔍
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2.5 py-1 rounded-full border border-sky-300 block">
                    8 vụ án
                  </span>
                  <span className="text-xs font-extrabold text-slate-600 mt-1 block">
                    Tích lũy: <strong className="text-sky-600 text-sm">{sdProgress.totalPoints}</strong>/80đ
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-black text-xl text-slate-800 group-hover:text-sky-700 transition-colors flex items-center gap-2">
                  <span>Thám Tử Chính Tả</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5">
                  Lần tìm các từ viết sai chính tả l/n, s/x, tr/ch, d/gi/r và dấu hỏi ngã trong đoạn văn, phân tích ngữ nghĩa và phục hồi từ ngữ chuẩn.
                </p>
              </div>

              {/* Progress mini bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span>Tiến độ phá án:</span>
                  <span className="text-sky-700">
                    {sdProgress.completedRoundIds.length}/8 vụ án
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-500 transition-all duration-300"
                    style={{ width: `${(sdProgress.completedRoundIds.length / 8) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2 relative z-10">
              <button
                onClick={() => handleStartGame('spelling-detective')}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 active:from-sky-800 active:to-blue-800 text-white font-bold text-sm shadow-md shadow-sky-600/20 hover:shadow-lg hover:shadow-sky-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2 group/btn"
              >
                <span>{sdProgress.completedRoundIds.length === 8 ? 'Chơi lại & Rèn luyện' : sdProgress.completedRoundIds.length > 0 ? 'Tiếp tục phá án' : 'Vào phá án'}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* CARD 3: VUA TỪ LÁY & TỪ GỢI CẢM (CAM VÀNG - AMBER/ORANGE) */}
          <div className="group relative overflow-hidden rounded-3xl bg-white border-2 border-amber-200/90 hover:border-amber-500 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between space-y-5">
            {/* Ambient top highlight */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/60 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between gap-3">
                {/* 3D vibrant icon badge */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-amber-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  👑
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300 block">
                    6 thách đấu
                  </span>
                  <span className="text-xs font-extrabold text-slate-600 mt-1 block">
                    Tích lũy: <strong className="text-amber-600 text-sm">{vwProgress.totalPoints}</strong>/60đ
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-black text-xl text-slate-800 group-hover:text-amber-700 transition-colors flex items-center gap-2">
                  <span>Vua Từ Láy & Từ Gợi Cảm</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5">
                  Thử tài phân biệt các tầng sắc thái biểu cảm, chọn từ ngữ đắt giá nhất miêu tả âm thanh, màu sắc, ánh sáng, dáng vẻ và tâm trạng.
                </p>
              </div>

              {/* Progress mini bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span>Tiến độ thách đấu:</span>
                  <span className="text-amber-800">
                    {vwProgress.completedRoundIds.length}/6 thách đấu
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${(vwProgress.completedRoundIds.length / 6) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2 relative z-10">
              <button
                onClick={() => handleStartGame('vivid-words')}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:from-amber-700 active:to-orange-700 text-white font-bold text-sm shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2 group/btn"
              >
                <span>{vwProgress.completedRoundIds.length === 6 ? 'Chơi lại & Rèn luyện' : vwProgress.completedRoundIds.length > 0 ? 'Tiếp tục thách đấu' : 'Vào thách đấu'}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* CARD 4: THỢ RÈN CÂU VĂN (HỒNG ĐỎ - ROSE/PINK) */}
          <div className="group relative overflow-hidden rounded-3xl bg-white border-2 border-rose-200/90 hover:border-rose-500 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300 flex flex-col justify-between space-y-5">
            {/* Ambient top highlight */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/60 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between gap-3">
                {/* 3D vibrant icon badge */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-rose-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  ⚒️
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full border border-rose-300 block">
                    4 cấp độ
                  </span>
                  <span className="text-xs font-extrabold text-slate-600 mt-1 block">
                    Tích lũy: <strong className="text-rose-600 text-sm">{ssProgress.totalPoints}</strong>/40đ
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-black text-xl text-slate-800 group-hover:text-rose-700 transition-colors flex items-center gap-2">
                  <span>Thợ Rèn Câu Văn</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5">
                  Tôi luyện câu văn đơn giản qua 4 cấp độ: đủ nòng cốt, thêm chi tiết cụ thể, dùng từ ngữ gợi cảm và sáng tạo so sánh, nhân hóa.
                </p>
              </div>

              {/* Progress mini bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span>Tiến độ tôi luyện:</span>
                  <span className="text-rose-700">
                    {ssProgress.completedRoundIds.length}/4 cấp độ
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-500 to-red-500 transition-all duration-300"
                    style={{ width: `${(ssProgress.completedRoundIds.length / 4) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2 relative z-10">
              <button
                onClick={() => handleStartGame('sentence-smith')}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 active:from-rose-800 active:to-red-800 text-white font-bold text-sm shadow-md shadow-rose-600/20 hover:shadow-lg hover:shadow-rose-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2 group/btn"
              >
                <span>{ssProgress.completedRoundIds.length === 4 ? 'Chơi lại & Rèn luyện' : ssProgress.completedRoundIds.length > 0 ? 'Tiếp tục rèn câu' : 'Vào lò rèn'}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Badges Preview Shelf */}
      <section className="bg-white rounded-3xl border border-amber-200/90 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-slate-800 flex items-center gap-2">
              <span>Huy Hiệu Danh Dự Của Em</span>
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                {progress.earnedBadgeIds.length} / 4 mở khóa
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Mỗi trò chơi chinh phục thành công sẽ mang về cho em một huy hiệu sáng giá!
            </p>
          </div>

          <button
            onClick={() => setShowBadgeModal(true)}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 underline decoration-amber-400 cursor-pointer"
          >
            Xem chi tiết điều kiện &raquo;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
          {CHALLENGE_BADGES.map(badge => {
            const isUnlocked = progress.earnedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                onClick={() => setShowBadgeModal(true)}
                className={`p-4 rounded-2xl border text-center space-y-2 cursor-pointer transition-all hover:scale-105 ${
                  isUnlocked
                    ? 'bg-amber-50/60 border-amber-300 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-2xl shadow-inner ${
                  isUnlocked ? 'bg-amber-100 ring-2 ring-amber-400' : 'bg-slate-200 grayscale'
                }`}>
                  {badge.icon}
                </div>
                <div className="font-bold text-xs text-slate-800 truncate">
                  {badge.name}
                </div>
                <div className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-block ${
                  isUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isUnlocked ? 'Đã đạt ✓' : 'Đang rèn'}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Badge Modal */}
      <ChallengeBadgeModal
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        progress={progress}
      />
    </div>
  );
};
