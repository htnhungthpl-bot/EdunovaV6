import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Crown, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  Trophy,
  Clock,
  RotateCcw,
  Shuffle,
  Volume2
} from 'lucide-react';
import { VIVID_WORD_CHALLENGES } from '../../data/challengeData';
import { 
  getRandomVividWordsSession, 
  getReplacementQuestion,
  shuffleArray 
} from '../../utils/challengeRandomizer';
import { 
  getLocalChallengeProgress, 
  recordRoundOutcome 
} from '../../utils/challengeStorage';
import { UserProfile } from '../../types';
import { VividWordChallenge } from '../../types/challenges';
import confetti from 'canvas-confetti';

interface VividWordsGameProps {
  currentUser: UserProfile;
  onBack: () => void;
  onScoreUpdated: () => void;
}

export const VividWordsGame: React.FC<VividWordsGameProps> = ({
  currentUser,
  onBack,
  onScoreUpdated,
}) => {
  const [progress, setProgress] = useState(() => getLocalChallengeProgress(currentUser.id));

  // Dynamic session challenges (6 challenges randomly picked from 24)
  const [sessionChallenges, setSessionChallenges] = useState<VividWordChallenge[]>(() =>
    getRandomVividWordsSession(6, progress.games['vivid-words']?.completedRoundIds || [])
  );
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [sessionCount, setSessionCount] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const challenge = sessionChallenges[currentIdx] || sessionChallenges[0];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<typeof challenge.options>([]);
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);

  // Optional Timer feature
  const [timerEnabled, setTimerEnabled] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  const [evaluationResult, setEvaluationResult] = useState<{
    status: 'idle' | 'success' | 'incorrect';
    pointsEarned?: number;
    isDuplicate?: boolean;
  }>({ status: 'idle' });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    if (challenge) {
      setSelectedOptionId(null);
      setShuffledOptions(shuffleArray(challenge.options));
      setUsedHint(false);
      setShowHintModal(false);
      setEvaluationResult({ status: 'idle' });
      setTimeLeft(30);
    }
  }, [currentIdx, challenge]);

  // Optional countdown timer
  useEffect(() => {
    if (!timerEnabled || evaluationResult.status !== 'idle') return;

    if (timeLeft <= 0) {
      setEvaluationResult({
        status: 'incorrect'
      });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerEnabled, timeLeft, evaluationResult.status]);

  // Start fresh session with new batch of vivid word challenges
  const handleStartNewSession = () => {
    const nextCompleted = progress.games['vivid-words']?.completedRoundIds || [];
    const newSession = getRandomVividWordsSession(6, nextCompleted);
    setSessionChallenges(newSession);
    setCurrentIdx(0);
    setSessionCount(prev => prev + 1);
    showToast('✨ Đã tạo lượt thách đấu mới với bộ câu hỏi từ ngữ phong phú!');
  };

  // Swap current challenge if student wants another one
  const handleSwapCurrentChallenge = () => {
    const activeIds = sessionChallenges.map(c => c.id);
    const replacement = getReplacementQuestion(VIVID_WORD_CHALLENGES, activeIds);
    if (!replacement) {
      showToast('Em đang trải nghiệm trọn bộ ngân hàng từ ngữ!');
      return;
    }
    const updated = [...sessionChallenges];
    updated[currentIdx] = {
      ...replacement,
      challengeNumber: currentIdx + 1,
      options: shuffleArray(replacement.options),
    };
    setSessionChallenges(updated);
    showToast(`Đã đổi sang câu hỏi mới: "${replacement.title}"!`);
  };

  const handleSelectOption = (optId: string) => {
    if (evaluationResult.status === 'success') return;
    setSelectedOptionId(optId);
    if (evaluationResult.status === 'incorrect') {
      setEvaluationResult({ status: 'idle' });
    }
  };

  const handleEvaluateChoice = () => {
    if (!selectedOptionId) return;

    const chosen = shuffledOptions.find(o => o.id === selectedOptionId);
    if (!chosen) return;

    if (chosen.isBest) {
      const res = recordRoundOutcome({
        userId: currentUser.id,
        gameId: 'vivid-words',
        roundId: challenge.id,
        isCorrect: true,
        usedHint
      });

      setProgress(res.progress);
      onScoreUpdated();

      setEvaluationResult({
        status: 'success',
        pointsEarned: res.pointsAwarded,
        isDuplicate: res.isDuplicate
      });

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setEvaluationResult({
        status: 'incorrect'
      });
    }
  };

  const handleNextChallenge = () => {
    if (currentIdx < sessionChallenges.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  // Render context with highlighted word
  const renderContextSentence = () => {
    const parts = challenge.sentenceContext.split('[...]');
    const chosen = shuffledOptions.find(o => o.id === selectedOptionId);

    return (
      <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-serif">
        {parts[0]}
        <span className={`inline-block px-3.5 py-1 mx-1 rounded-xl font-bold transition-all ${
          evaluationResult.status === 'success'
            ? 'bg-amber-100 text-amber-900 border-2 border-amber-500 font-sans'
            : selectedOptionId
            ? 'bg-orange-100 text-orange-900 border-2 border-orange-400 font-sans'
            : 'bg-amber-100/70 text-amber-800 border-2 border-dashed border-amber-300 font-sans italic'
        }`}>
          {chosen ? chosen.word : '[... từ ngữ đắt giá ...]'}
        </span>
        {parts[1] || ''}
      </p>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 bg-amber-600 text-white rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-5 h-5 text-amber-200 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-amber-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Quay lại danh sách thử thách"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">👑</span>
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-slate-800">
                Vua Từ Láy & Từ Gợi Cảm
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Lượt #{sessionCount}
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Lựa chọn từ ngữ gợi tả gợi cảm tinh tế nhất để nâng tầm câu văn
            </p>
          </div>
        </div>

        {/* Action buttons & Counter */}
        <div className="flex items-center gap-2">
          {/* Optional Timer Toggle */}
          <button
            onClick={() => setTimerEnabled(!timerEnabled)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              timerEnabled 
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Bật/Tắt đồng hồ thử thách 30 giây (không bắt buộc)"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{timerEnabled ? `${timeLeft}s` : 'Đồng hồ'}</span>
          </button>

          <button
            onClick={handleSwapCurrentChallenge}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-amber-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            title="Đổi sang câu hỏi từ láy khác"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Đổi câu khác</span>
          </button>

          <button
            onClick={handleStartNewSession}
            className="px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            title="Tạo lượt thách đấu mới với bộ câu hỏi ngẫu nhiên"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span>Lượt mới</span>
          </button>

          <div className="px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-1.5">
            <span className="text-xs font-bold text-amber-800">
              Câu {currentIdx + 1}/{sessionChallenges.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Pills */}
      <div className="grid grid-cols-6 gap-2">
        {sessionChallenges.map((c, idx) => {
          const isDone = progress.games['vivid-words']?.completedRoundIds.includes(c.id);
          const isCurrent = idx === currentIdx;
          return (
            <div
              key={c.id}
              className={`h-2 rounded-full transition-all duration-300 ${
                isCurrent 
                  ? 'bg-amber-500 ring-2 ring-amber-300 ring-offset-1' 
                  : isDone 
                  ? 'bg-amber-400' 
                  : 'bg-slate-200'
              }`}
            />
          );
        })}
      </div>

      {/* Main Challenge Card */}
      <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Category Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Sắc thái: {challenge.category}
              </span>
              <span className="text-xs text-slate-400">• Câu #{challenge.id}</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-800">
              {challenge.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowHintModal(true);
                setUsedHint(true);
              }}
              className="px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Gợi mở từ ngữ</span>
            </button>
          </div>
        </div>

        {/* Prompt Question */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-slate-700 font-medium">
          {challenge.prompt}
        </div>

        {/* Sentence In Context */}
        <div className="p-6 rounded-2xl bg-[#fffdf9] border-2 border-amber-200/90 shadow-xs">
          {renderContextSentence()}
        </div>

        {/* Option Selection with Detailed Nuances */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Chạm để chọn từ ngữ phù hợp nhất:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {shuffledOptions.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isSuccessBest = evaluationResult.status === 'success' && opt.isBest;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 shadow-xs active:scale-98 ${
                    isSuccessBest
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                      : isSelected
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300'
                      : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-extrabold text-base text-slate-900">
                      {opt.word}
                    </span>
                    {isSuccessBest ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isSelected ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-600" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    {opt.nuance}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Evaluation Banner */}
        {evaluationResult.status === 'success' && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3">
              <Crown className="w-6 h-6 text-amber-500 shrink-0 mt-0.5 fill-amber-500" />
              <div className="space-y-1.5">
                <div className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                  <span>Tuyệt phẩm dùng từ! Em có con mắt quan sát rất tinh tế.</span>
                  {evaluationResult.pointsEarned ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-xs font-extrabold">
                      +{evaluationResult.pointsEarned} điểm
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {challenge.explanation}
                </p>
                {challenge.openObservationTip && (
                  <div className="text-[11px] text-amber-900 bg-amber-100/80 p-2.5 rounded-xl font-medium mt-2">
                    💡 <strong>Bí quyết người viết văn:</strong> {challenge.openObservationTip}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {evaluationResult.status === 'incorrect' && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 animate-in shake duration-200">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs text-red-700 space-y-1">
              <p className="font-bold">Từ này chưa thật đắt giá trong ngữ cảnh bài văn!</p>
              <p className="text-red-600">
                Hãy đọc kỹ phần diễn giải ý nghĩa bên dưới mỗi từ để tìm ra từ ngữ gợi cảm nhất nhé.
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-3">
          <div className="text-xs text-slate-500">
            {usedHint ? (
              <span className="text-amber-600 font-semibold">Đã dùng gợi mở (tối đa 5 điểm)</span>
            ) : (
              <span>Chọn chuẩn xác: <strong>+10 điểm</strong></span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {evaluationResult.status !== 'success' ? (
              <button
                onClick={handleEvaluateChoice}
                disabled={!selectedOptionId}
                className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Crown className="w-4 h-4" />
                <span>Chọn từ ngữ này</span>
              </button>
            ) : (
              currentIdx < sessionChallenges.length - 1 ? (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Sang Thách đấu {currentIdx + 2}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleStartNewSession}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Thách đấu lượt mới với câu hỏi khác</span>
                  </button>
                  <button
                    onClick={onBack}
                    className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Hoàn thành xuất sắc!</span>
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-amber-200 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-700">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl">
                💡
              </div>
              <h3 className="font-heading font-extrabold text-base text-slate-800">
                Gợi mở sắc thái từ ngữ
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700 leading-relaxed space-y-2">
              <p className="font-bold text-amber-900">Mẹo chọn từ:</p>
              <p>{challenge.openObservationTip || challenge.explanation}</p>
              <p className="text-amber-800 italic pt-1 border-t border-amber-200">
                Lưu ý: Khi sử dụng gợi ý, điểm tối đa cho câu này là 5 điểm.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Đã hiểu, em chọn lại!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
