import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  Trophy,
  FileText,
  ShieldCheck,
  RotateCcw,
  Shuffle
} from 'lucide-react';
import { SPELLING_CASES } from '../../data/challengeData';
import { 
  getRandomSpellingCasesSession, 
  getReplacementQuestion,
  shuffleArray 
} from '../../utils/challengeRandomizer';
import { 
  getLocalChallengeProgress, 
  recordRoundOutcome 
} from '../../utils/challengeStorage';
import { UserProfile } from '../../types';
import { SpellingCase } from '../../types/challenges';
import confetti from 'canvas-confetti';

interface SpellingDetectiveGameProps {
  currentUser: UserProfile;
  onBack: () => void;
  onScoreUpdated: () => void;
}

export const SpellingDetectiveGame: React.FC<SpellingDetectiveGameProps> = ({
  currentUser,
  onBack,
  onScoreUpdated,
}) => {
  const [progress, setProgress] = useState(() => getLocalChallengeProgress(currentUser.id));

  // Dynamic session cases (6 cases randomly picked from 24 cases)
  const [sessionCases, setSessionCases] = useState<SpellingCase[]>(() =>
    getRandomSpellingCasesSession(6, progress.games['spelling-detective']?.completedRoundIds || [])
  );
  const [currentCaseIdx, setCurrentCaseIdx] = useState<number>(0);
  const [sessionCount, setSessionCount] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentCase = sessionCases[currentCaseIdx] || sessionCases[0];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<typeof currentCase.options>([]);
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [verdictResult, setVerdictResult] = useState<{
    status: 'idle' | 'solved' | 'incorrect';
    pointsEarned?: number;
    isDuplicate?: boolean;
    explanation?: string;
  }>({ status: 'idle' });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    if (currentCase) {
      setSelectedOptionId(null);
      setShuffledOptions(shuffleArray(currentCase.options));
      setUsedHint(false);
      setShowHintModal(false);
      setVerdictResult({ status: 'idle' });
    }
  }, [currentCaseIdx, currentCase]);

  // Start a fresh session with a new batch of detective cases
  const handleStartNewSession = () => {
    const nextCompleted = progress.games['spelling-detective']?.completedRoundIds || [];
    const newSession = getRandomSpellingCasesSession(6, nextCompleted);
    setSessionCases(newSession);
    setCurrentCaseIdx(0);
    setSessionCount(prev => prev + 1);
    showToast('✨ Đã mở tập hồ sơ vụ án chính tả mới hoàn toàn!');
  };

  // Swap current case if student wants a different one
  const handleSwapCurrentCase = () => {
    const activeIds = sessionCases.map(c => c.id);
    const replacement = getReplacementQuestion(SPELLING_CASES, activeIds);
    if (!replacement) {
      showToast('Em đang trải nghiệm kho vụ án đầy đủ nhất!');
      return;
    }
    const updated = [...sessionCases];
    updated[currentCaseIdx] = {
      ...replacement,
      caseNumber: currentCaseIdx + 1,
      options: shuffleArray(replacement.options),
    };
    setSessionCases(updated);
    showToast(`Đã đổi sang vụ án mới: "${replacement.title}"!`);
  };

  const handleSelectOption = (optId: string) => {
    if (verdictResult.status === 'solved') return;
    setSelectedOptionId(optId);
    if (verdictResult.status === 'incorrect') {
      setVerdictResult({ status: 'idle' });
    }
  };

  const handleInspectVerdict = () => {
    if (!selectedOptionId) return;

    const chosen = shuffledOptions.find(o => o.id === selectedOptionId);
    if (!chosen) return;

    if (chosen.isCorrect) {
      const res = recordRoundOutcome({
        userId: currentUser.id,
        gameId: 'spelling-detective',
        roundId: currentCase.id,
        isCorrect: true,
        usedHint
      });

      setProgress(res.progress);
      onScoreUpdated();

      setVerdictResult({
        status: 'solved',
        pointsEarned: res.pointsAwarded,
        isDuplicate: res.isDuplicate,
        explanation: currentCase.explanation
      });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      setVerdictResult({
        status: 'incorrect',
        explanation: `Chưa chính xác! Từ "${chosen.word}" chưa đúng ngữ cảnh. Em hãy bấm "Manh mối thám tử" hoặc chọn lại phương án khác nhé!`
      });
    }
  };

  const handleNextCase = () => {
    if (currentCaseIdx < sessionCases.length - 1) {
      setCurrentCaseIdx(prev => prev + 1);
    }
  };

  // Render passage with highlighted target word placeholder
  const renderPassageWithGap = () => {
    const parts = currentCase.passage.split(currentCase.wrongWord);
    if (parts.length < 2) {
      return (
        <p className="text-slate-800 text-base leading-relaxed font-serif">
          {currentCase.passage}
        </p>
      );
    }

    const chosen = shuffledOptions.find(o => o.id === selectedOptionId);

    return (
      <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-serif">
        {parts[0]}
        <span className={`inline-block px-3 py-1 mx-1 rounded-xl font-bold transition-all ${
          verdictResult.status === 'solved'
            ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400 font-sans'
            : selectedOptionId
            ? 'bg-sky-100 text-sky-900 border-2 border-sky-400 font-sans'
            : 'bg-amber-100/80 text-amber-900 border-2 border-dashed border-amber-400 font-sans italic'
        }`}>
          {chosen ? chosen.word : '[... ? ...]'}
        </span>
        {parts.slice(1).join(currentCase.wrongWord)}
      </p>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 bg-sky-600 text-white rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-sky-200 shadow-xs">
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
              <span className="text-xl">🔍</span>
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-slate-800">
                Thám Tử Chính Tả
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                Lượt #{sessionCount}
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Phát hiện và đính chính các lỗi chính tả tinh vi trong đoạn văn
            </p>
          </div>
        </div>

        {/* Action buttons & Case Counter */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSwapCurrentCase}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-sky-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            title="Đổi sang vụ án khác trong ngân hàng hồ sơ"
          >
            <Shuffle className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">Đổi vụ án</span>
          </button>

          <button
            onClick={handleStartNewSession}
            className="px-3 py-1.5 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            title="Tạo lượt phá án mới với bộ hồ sơ ngẫu nhiên"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-600" />
            <span>Lượt mới</span>
          </button>

          <div className="px-3.5 py-1.5 rounded-2xl bg-sky-50 border border-sky-200 flex items-center gap-1.5">
            <span className="text-xs font-bold text-sky-800">
              Vụ án {currentCaseIdx + 1}/{sessionCases.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Pills */}
      <div className="grid grid-cols-6 gap-2">
        {sessionCases.map((c, idx) => {
          const isDone = progress.games['spelling-detective']?.completedRoundIds.includes(c.id);
          const isCurrent = idx === currentCaseIdx;
          return (
            <div
              key={c.id}
              className={`h-2 rounded-full transition-all duration-300 ${
                isCurrent 
                  ? 'bg-sky-500 ring-2 ring-sky-300 ring-offset-1' 
                  : isDone 
                  ? 'bg-sky-400' 
                  : 'bg-slate-200'
              }`}
            />
          );
        })}
      </div>

      {/* Main Investigation Board Card */}
      <div className="bg-white rounded-3xl border border-sky-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Case Info Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                Chuyên đề: {currentCase.topic}
              </span>
              <span className="text-xs text-slate-400">• Hồ sơ #{currentCase.id}</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-800">
              {currentCase.title}
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
              <span>Manh mối thám tử</span>
            </button>
          </div>
        </div>

        {/* Case Document / Crime Scene Passage */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-sky-600" />
            <span>Đoạn văn bản cần giám định chính tả:</span>
          </label>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner">
            {renderPassageWithGap()}
          </div>
        </div>

        {/* Option Choices */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Chọn từ ngữ viết đúng chính tả để điền vào chỗ trống:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {shuffledOptions.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isSolvedAndCorrect = verdictResult.status === 'solved' && opt.isCorrect;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 rounded-2xl border-2 font-bold text-base transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs active:scale-98 ${
                    isSolvedAndCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300'
                      : isSelected
                      ? 'bg-sky-50 border-sky-500 text-sky-900 ring-2 ring-sky-300'
                      : 'bg-white border-slate-200 hover:border-sky-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{opt.word}</span>
                  {isSolvedAndCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isSelected ? (
                    <div className="w-3 h-3 rounded-full bg-sky-600" />
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-slate-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Solved Verdict Feedback Banner */}
        {verdictResult.status === 'solved' && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <div className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                  <span>Phá án xuất sắc! Từ đúng là: "{currentCase.correctWord}"</span>
                  {verdictResult.pointsEarned ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-xs font-extrabold">
                      +{verdictResult.pointsEarned} điểm
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentCase.explanation}
                </p>
                <div className="text-[11px] text-emerald-800 bg-emerald-100/70 p-2.5 rounded-xl font-medium mt-2">
                  📘 <strong>Quy tắc ghi nhớ:</strong> {currentCase.spellingRule}
                </div>
              </div>
            </div>
          </div>
        )}

        {verdictResult.status === 'incorrect' && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 animate-in shake duration-200">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs text-red-700 space-y-1">
              <p className="font-bold">{verdictResult.explanation}</p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-3">
          <div className="text-xs text-slate-500">
            {usedHint ? (
              <span className="text-amber-600 font-semibold">Đã dùng manh mối (tối đa 5 điểm)</span>
            ) : (
              <span>Phá án đúng ngay: <strong>+10 điểm</strong></span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {verdictResult.status !== 'solved' ? (
              <button
                onClick={handleInspectVerdict}
                disabled={!selectedOptionId}
                className="px-6 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Kết luận vụ án</span>
              </button>
            ) : (
              currentCaseIdx < sessionCases.length - 1 ? (
                <button
                  onClick={handleNextCase}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Sang Vụ án {currentCaseIdx + 2}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleStartNewSession}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Phá lượt vụ án mới khác</span>
                  </button>
                  <button
                    onClick={onBack}
                    className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md cursor-pointer flex items-center gap-2"
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

      {/* Clue/Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-sky-200 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-sky-700">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center text-xl">
                🔎
              </div>
              <h3 className="font-heading font-extrabold text-base text-slate-800">
                Manh mối từ Hồ sơ Thám tử
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 text-xs text-slate-700 leading-relaxed space-y-2">
              <p className="font-bold text-sky-900">Quy tắc gợi mở:</p>
              <p>{currentCase.spellingRule}</p>
              <p className="text-sky-800 italic pt-1 border-t border-sky-200">
                Lưu ý: Khi sử dụng manh mối, điểm tối đa cho vụ án này là 5 điểm.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Đã hiểu manh mối, em chọn lại!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
