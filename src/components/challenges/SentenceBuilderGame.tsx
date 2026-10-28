import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  Trophy,
  Layers,
  Shuffle
} from 'lucide-react';
import { SENTENCE_BUILDER_ROUNDS } from '../../data/challengeData';
import { 
  getRandomSentenceBuilderSession, 
  getReplacementQuestion,
  shuffleArray 
} from '../../utils/challengeRandomizer';
import { 
  getLocalChallengeProgress, 
  recordRoundOutcome 
} from '../../utils/challengeStorage';
import { UserProfile } from '../../types';
import { SentenceBuilderRound } from '../../types/challenges';
import confetti from 'canvas-confetti';

interface SentenceBuilderGameProps {
  currentUser: UserProfile;
  onBack: () => void;
  onScoreUpdated: () => void;
}

export const SentenceBuilderGame: React.FC<SentenceBuilderGameProps> = ({
  currentUser,
  onBack,
  onScoreUpdated,
}) => {
  // Load progress
  const [progress, setProgress] = useState(() => getLocalChallengeProgress(currentUser.id));

  // Dynamic session rounds (6 randomly sampled rounds per session from 24-round pool)
  const [sessionRounds, setSessionRounds] = useState<SentenceBuilderRound[]>(() => 
    getRandomSentenceBuilderSession(6, progress.games['sentence-builder']?.completedRoundIds || [])
  );
  const [currentRoundIdx, setCurrentRoundIdx] = useState<number>(0);
  const [sessionCount, setSessionCount] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const round = sessionRounds[currentRoundIdx] || sessionRounds[0];

  // Selected pieces in order placed by student
  const [placedPieces, setPlacedPieces] = useState<string[]>([]);
  // Remaining pool pieces
  const [availablePieces, setAvailablePieces] = useState<string[]>([]);

  // States
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    status: 'idle' | 'success' | 'incorrect';
    message?: string;
    pointsEarned?: number;
    isDuplicate?: boolean;
  }>({ status: 'idle' });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Initialize round pieces
  useEffect(() => {
    if (round) {
      // Shuffle pieces for fair play
      const shuffled = shuffleArray(round.pieces);
      setAvailablePieces(shuffled);
      setPlacedPieces([]);
      setUsedHint(false);
      setShowHintModal(false);
      setEvaluationResult({ status: 'idle' });
    }
  }, [currentRoundIdx, round]);

  const handlePlacePiece = (piece: string, indexInAvailable: number) => {
    if (evaluationResult.status === 'success') return;
    const newAvailable = [...availablePieces];
    newAvailable.splice(indexInAvailable, 1);
    setAvailablePieces(newAvailable);
    setPlacedPieces([...placedPieces, piece]);
    if (evaluationResult.status === 'incorrect') {
      setEvaluationResult({ status: 'idle' });
    }
  };

  const handleReturnPiece = (piece: string, indexInPlaced: number) => {
    if (evaluationResult.status === 'success') return;
    const newPlaced = [...placedPieces];
    newPlaced.splice(indexInPlaced, 1);
    setPlacedPieces(newPlaced);
    setAvailablePieces([...availablePieces, piece]);
    if (evaluationResult.status === 'incorrect') {
      setEvaluationResult({ status: 'idle' });
    }
  };

  const handleResetPieces = () => {
    if (round) {
      const shuffled = shuffleArray(round.pieces);
      setAvailablePieces(shuffled);
      setPlacedPieces([]);
      setEvaluationResult({ status: 'idle' });
    }
  };

  // Start a fresh new session with different questions
  const handleStartNewSession = () => {
    const nextCompleted = progress.games['sentence-builder']?.completedRoundIds || [];
    const newSession = getRandomSentenceBuilderSession(6, nextCompleted);
    setSessionRounds(newSession);
    setCurrentRoundIdx(0);
    setSessionCount(prev => prev + 1);
    showToast('✨ Đã tạo lượt chơi mới với bộ câu hỏi hoàn toàn khác!');
  };

  // Swap current question if student wants a different one right now
  const handleSwapCurrentQuestion = () => {
    const currentActiveIds = sessionRounds.map(r => r.id);
    const replacement = getReplacementQuestion(SENTENCE_BUILDER_ROUNDS, currentActiveIds);
    if (!replacement) {
      showToast('Em đang trải nghiệm kho câu hỏi phong phú nhất!');
      return;
    }
    const updated = [...sessionRounds];
    updated[currentRoundIdx] = {
      ...replacement,
      roundNumber: currentRoundIdx + 1,
      pieces: shuffleArray(replacement.pieces),
    };
    setSessionRounds(updated);
    showToast(`Đã đổi sang câu hỏi mới: "${replacement.title}"!`);
  };

  const handleCheckSentence = () => {
    if (placedPieces.length === 0) return;

    // Join pieces with a single space
    const studentSentence = placedPieces.join(' ').replace(/\s+/g, ' ').trim();

    // Check against valid variations
    const isCorrect = round.validSentences.some(valid => {
      const cleanValid = valid.replace(/\s+/g, ' ').trim().toLowerCase();
      const cleanStudent = studentSentence.replace(/\s+/g, ' ').trim().toLowerCase();
      // Allow with or without trailing dot
      return cleanStudent === cleanValid || cleanStudent + '.' === cleanValid || cleanStudent === cleanValid + '.';
    });

    if (isCorrect) {
      // Record outcome
      const res = recordRoundOutcome({
        userId: currentUser.id,
        gameId: 'sentence-builder',
        roundId: round.id,
        isCorrect: true,
        usedHint
      });

      setProgress(res.progress);
      onScoreUpdated();

      setEvaluationResult({
        status: 'success',
        message: 'Hoàn hảo! Em đã sắp xếp các vế câu rất chuẩn mực và giàu cảm xúc.',
        pointsEarned: res.pointsAwarded,
        isDuplicate: res.isDuplicate
      });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      setEvaluationResult({
        status: 'incorrect',
        message: 'Thứ tự các vế câu chưa thật hợp lý. Em hãy thử suy nghĩ lại hoặc bấm "Xem gợi ý" nhé!'
      });
    }
  };

  const handleNextRound = () => {
    if (currentRoundIdx < sessionRounds.length - 1) {
      setCurrentRoundIdx(prev => prev + 1);
    }
  };

  const currentConstructed = placedPieces.join(' ').normalize('NFC');
  const isFinished = evaluationResult.status === 'success' && currentRoundIdx === sessionRounds.length - 1;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 bg-emerald-600 text-white rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-emerald-200 shadow-xs">
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
              <span className="text-xl">🌉</span>
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-slate-800">
                Xây Câu Thần Tốc
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Lượt #{sessionCount}
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Sắp xếp các mảnh ghép thành câu văn chuẩn ngữ pháp, giàu hình ảnh
            </p>
          </div>
        </div>

        {/* Action buttons & Round Progress */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSwapCurrentQuestion}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-emerald-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            title="Đổi sang câu hỏi khác trong ngân hàng"
          >
            <Shuffle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Đổi câu khác</span>
          </button>

          <button
            onClick={handleStartNewSession}
            className="px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            title="Tạo lượt chơi mới với bộ câu hỏi ngẫu nhiên"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>Lượt mới</span>
          </button>

          <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-1.5">
            <span className="text-xs font-bold text-emerald-800">
              Vòng {currentRoundIdx + 1}/{sessionRounds.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Pills */}
      <div className="grid grid-cols-6 gap-2">
        {sessionRounds.map((r, idx) => {
          const isDone = progress.games['sentence-builder']?.completedRoundIds.includes(r.id);
          const isCurrent = idx === currentRoundIdx;
          return (
            <div
              key={r.id}
              className={`h-2 rounded-full transition-all duration-300 ${
                isCurrent 
                  ? 'bg-emerald-500 ring-2 ring-emerald-300 ring-offset-1' 
                  : isDone 
                  ? 'bg-emerald-400' 
                  : 'bg-slate-200'
              }`}
            />
          );
        })}
      </div>

      {/* Main Game Card */}
      <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Round Header & Theme */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {round.theme}
              </span>
              <span className="text-xs text-slate-400">• Câu hỏi #{round.id}</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-800">
              {round.title}
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
              <span>Gợi ý cô giáo</span>
            </button>
            <button
              onClick={handleResetPieces}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              title="Xếp lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sentence Construction Zone (Drop/Placed Area) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Khu vực ghép câu hoàn chỉnh của em:</span>
          </label>

          <div className={`min-h-[120px] p-5 rounded-2xl border-2 transition-all flex flex-wrap items-center gap-2.5 ${
            evaluationResult.status === 'success'
              ? 'bg-emerald-50/70 border-emerald-400'
              : evaluationResult.status === 'incorrect'
              ? 'bg-red-50/50 border-red-300'
              : 'bg-slate-50 border-dashed border-slate-300'
          }`}>
            {placedPieces.length === 0 ? (
              <div className="w-full text-center py-4 text-slate-400 text-xs italic">
                👆 Hãy chạm vào các mảnh ghép bên dưới theo thứ tự đúng để tạo thành câu hoàn chỉnh...
              </div>
            ) : (
              placedPieces.map((piece, idx) => (
                <button
                  key={`${piece}-${idx}`}
                  onClick={() => handleReturnPiece(piece, idx)}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer shadow-xs active:scale-95 animate-in zoom-in-95 duration-100 ${
                    evaluationResult.status === 'success'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-emerald-700 text-white hover:bg-emerald-800'
                  }`}
                  title="Chạm để gỡ mảnh ghép này"
                >
                  <span>{piece}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Live Preview Sentence String */}
        {placedPieces.length > 0 && (
          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs text-slate-700 font-medium leading-relaxed">
            <span className="font-bold text-amber-900">Xem trước câu: </span>
            <span className="font-serif italic text-slate-900 font-semibold tracking-normal text-sm sm:text-base">"{currentConstructed.normalize('NFC')}"</span>
          </div>
        )}

        {/* Available Pieces Pool */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Các mảnh ghép từ ngữ (chạm để chọn):
          </label>

          <div className="p-5 rounded-2xl bg-slate-100/70 border border-slate-200 flex flex-wrap gap-2.5 min-h-[90px]">
            {availablePieces.length === 0 ? (
              <div className="w-full text-center py-2 text-slate-400 text-xs font-medium">
                ✨ Em đã xếp hết các mảnh ghép! Bấm "Kiểm tra câu" bên dưới nhé.
              </div>
            ) : (
              availablePieces.map((piece, idx) => (
                <button
                  key={`${piece}-${idx}`}
                  onClick={() => handlePlacePiece(piece, idx)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 active:bg-emerald-100 text-slate-800 font-semibold text-sm border-2 border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-sm transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                >
                  {piece}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Evaluation Feedback Banner */}
        {evaluationResult.status === 'success' && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                  <span>{evaluationResult.message}</span>
                  {evaluationResult.pointsEarned ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-xs font-extrabold">
                      +{evaluationResult.pointsEarned} điểm
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {round.explanation}
                </p>
                <div className="text-[11px] text-emerald-800 bg-emerald-100/70 p-2.5 rounded-xl font-medium mt-2">
                  💡 <strong>Góc ngữ pháp lớp 4:</strong> {round.grammaticalTip}
                </div>
              </div>
            </div>
          </div>
        )}

        {evaluationResult.status === 'incorrect' && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 animate-in shake duration-200">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs text-red-700 space-y-1">
              <p className="font-bold">{evaluationResult.message}</p>
              <p className="text-red-600">
                Mẹo: Em có thể chạm vào mảnh ghép ở ô trên để gỡ ra hoặc bấm vào biểu tượng bóng đèn để xem gợi ý.
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-3">
          <div className="text-xs text-slate-500">
            {usedHint ? (
              <span className="text-amber-600 font-semibold">Đã dùng gợi ý (tối đa 5 điểm)</span>
            ) : (
              <span>Ghép đúng ngay: <strong>+10 điểm</strong></span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {evaluationResult.status !== 'success' ? (
              <button
                onClick={handleCheckSentence}
                disabled={placedPieces.length === 0}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kiểm tra câu</span>
              </button>
            ) : (
              currentRoundIdx < sessionRounds.length - 1 ? (
                <button
                  onClick={handleNextRound}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Qua Vòng {currentRoundIdx + 2}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleStartNewSession}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Chơi lượt mới với bộ câu hỏi khác</span>
                  </button>
                  <button
                    onClick={onBack}
                    className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md cursor-pointer flex items-center gap-2"
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
                Gợi ý của Cô giáo
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700 leading-relaxed space-y-2">
              <p className="font-bold text-amber-900">Mẹo sắp xếp:</p>
              <p>{round.hint}</p>
              <p className="text-amber-800 italic pt-1 border-t border-amber-200">
                Lưu ý: Khi sử dụng gợi ý, điểm tối đa cho vòng chơi này là 5 điểm.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Đã hiểu, em thử lại!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
