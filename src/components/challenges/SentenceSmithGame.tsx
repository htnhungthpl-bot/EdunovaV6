import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Hammer, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  Trophy,
  Flame,
  BookOpen,
  Send,
  Lightbulb,
  RotateCcw,
  Shuffle
} from 'lucide-react';
import { SENTENCE_SMITH_LEVELS } from '../../data/challengeData';
import { 
  getRandomSentenceSmithSession, 
  getReplacementQuestion 
} from '../../utils/challengeRandomizer';
import { 
  getLocalChallengeProgress, 
  recordRoundOutcome,
  evaluateSentenceSmith,
  SentenceSmithEvaluation
} from '../../utils/challengeStorage';
import { UserProfile } from '../../types';
import { SentenceSmithLevel } from '../../types/challenges';
import confetti from 'canvas-confetti';

interface SentenceSmithGameProps {
  currentUser: UserProfile;
  onBack: () => void;
  onScoreUpdated: () => void;
}

export const SentenceSmithGame: React.FC<SentenceSmithGameProps> = ({
  currentUser,
  onBack,
  onScoreUpdated,
}) => {
  const [progress, setProgress] = useState(() => getLocalChallengeProgress(currentUser.id));

  // Dynamic session levels (4 levels randomly picked from 16)
  const [sessionLevels, setSessionLevels] = useState<SentenceSmithLevel[]>(() =>
    getRandomSentenceSmithSession(4, progress.games['sentence-smith']?.completedRoundIds || [])
  );
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
  const [sessionCount, setSessionCount] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const level = sessionLevels[currentLevelIdx] || sessionLevels[0];

  const [inputSentence, setInputSentence] = useState<string>('');
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [evalResult, setEvalResult] = useState<SentenceSmithEvaluation | null>(null);
  const [pointsAwarded, setPointsAwarded] = useState<number>(0);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    if (level) {
      setInputSentence('');
      setUsedHint(false);
      setShowHintModal(false);
      setEvalResult(null);
      setPointsAwarded(0);
      setIsDuplicate(false);
    }
  }, [currentLevelIdx, level]);

  // Start fresh session with a new set of sentence levels
  const handleStartNewSession = () => {
    const nextCompleted = progress.games['sentence-smith']?.completedRoundIds || [];
    const newSession = getRandomSentenceSmithSession(4, nextCompleted);
    setSessionLevels(newSession);
    setCurrentLevelIdx(0);
    setSessionCount(prev => prev + 1);
    showToast('✨ Đã mở lò rèn câu với các thử thách mới lạ!');
  };

  // Swap current level if student wants another one
  const handleSwapCurrentLevel = () => {
    const activeIds = sessionLevels.map(l => l.id);
    const replacement = getReplacementQuestion(SENTENCE_SMITH_LEVELS, activeIds);
    if (!replacement) {
      showToast('Em đang rèn giũa trọn vẹn bộ câu hỏi lò rèn!');
      return;
    }
    const updated = [...sessionLevels];
    updated[currentLevelIdx] = {
      ...replacement,
      levelNumber: currentLevelIdx + 1,
    };
    setSessionLevels(updated);
    showToast(`Đã đổi sang đề rèn câu mới: "${replacement.title}"!`);
  };

  const handleInsertWord = (word: string) => {
    setInputSentence(prev => {
      const clean = prev.trim();
      if (!clean) return word + ' ';
      return `${clean} ${word} `;
    });
  };

  const handleForgeSentence = () => {
    if (!inputSentence.trim()) return;

    const evaluation = evaluateSentenceSmith(inputSentence, level);
    setEvalResult(evaluation);

    if (evaluation.isSuccess) {
      const res = recordRoundOutcome({
        userId: currentUser.id,
        gameId: 'sentence-smith',
        roundId: level.id,
        isCorrect: true,
        usedHint
      });

      setProgress(res.progress);
      setPointsAwarded(res.pointsAwarded);
      setIsDuplicate(res.isDuplicate);
      onScoreUpdated();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIdx < sessionLevels.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 bg-rose-600 text-white rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-rose-200 shadow-xs">
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
              <span className="text-xl">⚒️</span>
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-slate-800">
                Thợ Rèn Câu Văn
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                Lượt #{sessionCount}
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Tôi luyện những câu trơ trụi thành tuyệt phẩm văn học giàu hình ảnh
            </p>
          </div>
        </div>

        {/* Action buttons & Level Counter */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSwapCurrentLevel}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            title="Đổi sang đề rèn câu khác"
          >
            <Shuffle className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Đổi đề</span>
          </button>

          <button
            onClick={handleStartNewSession}
            className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            title="Tạo lượt rèn câu mới với bộ đề ngẫu nhiên"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
            <span>Lượt mới</span>
          </button>

          <div className="px-3.5 py-1.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-1.5">
            <span className="text-xs font-bold text-rose-800">
              Cấp độ {currentLevelIdx + 1}/{sessionLevels.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Pills */}
      <div className="grid grid-cols-4 gap-2">
        {sessionLevels.map((lvl, idx) => {
          const isDone = progress.games['sentence-smith']?.completedRoundIds.includes(lvl.id);
          const isCurrent = idx === currentLevelIdx;
          return (
            <div
              key={lvl.id}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                isCurrent 
                  ? 'bg-rose-500 ring-2 ring-rose-300 ring-offset-1' 
                  : isDone 
                  ? 'bg-rose-400' 
                  : 'bg-slate-200'
              }`}
            />
          );
        })}
      </div>

      {/* Main Forging Workshop Card */}
      <div className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Level Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3 text-rose-600" />
                <span>{level.levelName}</span>
              </span>
              <span className="text-xs text-slate-400">• Đề #{level.id}</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-800">
              {level.title}
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
              <span>Gợi ý mẫu</span>
            </button>
          </div>
        </div>

        {/* The Rough Stone: Original Bare Sentence */}
        <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span>🪨</span>
            <span>Câu gốc trơ trụi cần tôi luyện:</span>
          </span>
          <div className="font-serif italic text-lg sm:text-xl text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200">
            "{level.originalSentence}"
          </div>
        </div>

        {/* Guiding Mission Box */}
        <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-1.5 text-xs sm:text-sm text-slate-700">
          <div className="font-bold text-rose-900 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-rose-600" />
            <span>Nhiệm vụ rèn câu:</span>
          </div>
          <p className="leading-relaxed">{level.guidingQuestion}</p>
          <div className="text-[11px] font-semibold text-rose-800 pt-1">
            🎯 <strong>Mục tiêu chính:</strong> {level.targetFocus}
          </div>
        </div>

        {/* Quick Word Spark suggestions */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Tia lửa từ vựng gợi ý (chạm để chèn vào câu):
          </label>
          <div className="flex flex-wrap gap-2">
            {level.suggestedVocab.map((w, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleInsertWord(w)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 active:bg-rose-100 text-slate-700 hover:text-rose-700 border border-slate-200 text-xs font-semibold cursor-pointer transition-colors"
                title="Chạm để thêm từ này vào bài"
              >
                + {w}
              </button>
            ))}
          </div>
        </div>

        {/* Student Forging Input Textarea */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-rose-800 font-extrabold">
              <Hammer className="w-4 h-4 text-rose-600" />
              <span>Búa đe luyện câu của em:</span>
            </span>
            <span className="text-xs text-slate-400 font-normal">
              {inputSentence.trim() ? inputSentence.trim().split(/\s+/).length : 0} từ
            </span>
          </label>

          <textarea
            value={inputSentence}
            onChange={(e) => setInputSentence(e.target.value)}
            rows={4}
            placeholder="Hãy viết câu văn hoàn chỉnh sau khi đã trau chuốt, thêm hình ảnh so sánh, nhân hóa hoặc từ láy đắt giá..."
            className="w-full p-4 text-sm sm:text-base leading-relaxed rounded-2xl border-2 border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden font-medium resize-none shadow-inner"
          />
        </div>

        {/* Evaluation Output Banner */}
        {evalResult && (
          <div className={`p-5 rounded-2xl border space-y-3 animate-in zoom-in-95 duration-200 ${
            evalResult.isSuccess ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
          }`}>
            <div className="flex items-start gap-3">
              {evalResult.isSuccess ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-2 w-full">
                <div className="font-bold text-sm flex items-center justify-between flex-wrap gap-2">
                  <span className={evalResult.isSuccess ? 'text-emerald-900' : 'text-amber-900'}>
                    {evalResult.feedback}
                  </span>
                  {pointsAwarded > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-xs font-extrabold">
                      +{pointsAwarded} điểm
                    </span>
                  )}
                </div>

                {/* Criteria Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                  <div className={`p-2.5 rounded-xl border ${
                    evalResult.criteriaPassed.hasExpansion 
                      ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900 font-semibold' 
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}>
                    {evalResult.criteriaPassed.hasExpansion ? '✓' : '○'} Đã mở rộng câu (trên 8 từ)
                  </div>
                  <div className={`p-2.5 rounded-xl border ${
                    evalResult.criteriaPassed.hasVividWord 
                      ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900 font-semibold' 
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}>
                    {evalResult.criteriaPassed.hasVividWord ? '✓' : '○'} Có từ gợi tả / từ láy
                  </div>
                  <div className={`p-2.5 rounded-xl border ${
                    evalResult.criteriaPassed.hasFigurative 
                      ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900 font-semibold' 
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}>
                    {evalResult.criteriaPassed.hasFigurative ? '✓' : '○'} So sánh / Nhân hóa
                  </div>
                </div>

                {evalResult.isSuccess && (
                  <div className="text-[11px] text-emerald-800 bg-white/80 p-2.5 rounded-xl border border-emerald-200 font-medium">
                    ✨ <strong>Câu văn tuyệt đẹp của em:</strong> "{inputSentence.trim()}"
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-3">
          <div className="text-xs text-slate-500">
            {usedHint ? (
              <span className="text-amber-600 font-semibold">Đã xem mẫu (tối đa 5 điểm)</span>
            ) : (
              <span>Rèn giũa xuất sắc: <strong>+10 điểm</strong></span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!evalResult?.isSuccess ? (
              <button
                onClick={handleForgeSentence}
                disabled={!inputSentence.trim()}
                className="px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Hammer className="w-4 h-4" />
                <span>Tôi luyện câu văn</span>
              </button>
            ) : (
              currentLevelIdx < sessionLevels.length - 1 ? (
                <button
                  onClick={handleNextLevel}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Lên Cấp độ {currentLevelIdx + 2}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleStartNewSession}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Rèn lượt mới với bộ đề khác</span>
                  </button>
                  <button
                    onClick={onBack}
                    className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md cursor-pointer flex items-center gap-2"
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

      {/* Model Responses Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-rose-200 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-700">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-xl">
                📖
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base text-slate-800">
                  Câu văn mẫu tham khảo
                </h3>
                <p className="text-xs text-slate-500">Học cách mở rộng câu từ nhà văn nhí</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {level.modelResponses.map((model, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-slate-800 font-serif leading-relaxed">
                  <span className="font-bold text-rose-900 font-sans">Mẫu {idx + 1}: </span>
                  "{model}"
                </div>
              ))}
            </div>

            <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              Lưu ý: Em hãy tự sáng tạo câu văn mang phong cách riêng của mình, không chép y nguyên mẫu nhé!
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Đã hiểu, em tự rèn câu!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
