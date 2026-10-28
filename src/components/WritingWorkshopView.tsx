import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  ArrowRight, 
  Check, 
  HelpCircle,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Exercise {
  id: string;
  category: string;
  title: string;
  instruction: string;
  passage?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const WORKSHOP_EXERCISES: Exercise[] = [
  {
    id: 'ex-1',
    category: 'Sửa câu lủng củng',
    title: 'Biến câu lủng củng thành câu văn rõ nghĩa',
    instruction: 'Đọc câu văn sau của một bạn học sinh: "Con mèo mướp nhà em nó rất thích bắt chuột ở trong góc bếp tối om suốt cả buổi tối ngày hôm qua." Em hãy chọn cách sửa gọn gàng, rõ nghĩa và hay nhất:',
    options: [
      {
        id: 'opt-1a',
        text: 'Tối qua, trong góc bếp tối om, chú mèo mướp nhà em chăm chú rình bắt chuột.',
        isCorrect: true,
        explanation: 'Chính xác! Câu đã được sắp xếp mạch lạc: có trạng ngữ thời gian ("Tối qua"), nơi chốn ("trong góc bếp tối om") và vị ngữ diễn tả hành động chăm chú rình chuột rất sinh động.'
      },
      {
        id: 'opt-1b',
        text: 'Con mèo mướp nhà em thích bắt chuột và bắt chuột suốt cả buổi tối hôm qua trong góc bếp.',
        isCorrect: false,
        explanation: 'Chưa hay vì câu vẫn bị lặp từ "bắt chuột" 2 lần và diễn đạt còn rườm rà.'
      },
      {
        id: 'opt-1c',
        text: 'Nó rất thích bắt chuột ở trong góc bếp tối ngày hôm qua con mèo.',
        isCorrect: false,
        explanation: 'Chưa đúng ngữ pháp, từ ngữ bị đảo lộn lộn xộn khiến người đọc khó hiểu.'
      }
    ]
  },
  {
    id: 'ex-2',
    category: 'Tìm câu lạc ý',
    title: 'Phát hiện câu không thuộc chủ đề trong đoạn văn',
    instruction: 'Đọc đoạn văn miêu tả cây phượng vĩ sau đây. Hãy bấm chọn câu văn bị "lạc ý" (không cùng miêu tả vẻ đẹp của cây phượng):',
    passage: `(1) Cây phượng vĩ đứng sừng sững giữa sân trường như một chiếc ô hoa đỏ rực rỡ. (2) Từng chùm hoa năm cánh đỏ thắm xòe rộng đón lấy những vạt nắng hè chói chang. (3) Hôm qua em bị điểm kém môn Toán nên tâm trạng rất buồn bã. (4) Tiếng ve sầu râm ran trên tán lá xanh biếc càng làm cho cây phượng thêm phần rộn rã.`,
    options: [
      {
        id: 'opt-2a',
        text: 'Câu (1): Cây phượng vĩ đứng sừng sững giữa sân trường...',
        isCorrect: false,
        explanation: 'Câu này là câu mở đầu tả bao quát cây phượng rất đúng chủ đề.'
      },
      {
        id: 'opt-2b',
        text: 'Câu (2): Từng chùm hoa năm cánh đỏ thắm xòe rộng...',
        isCorrect: false,
        explanation: 'Câu này tả chi tiết hoa phượng rất đẹp và đúng chủ đề miêu tả.'
      },
      {
        id: 'opt-2c',
        text: 'Câu (3): Hôm qua em bị điểm kém môn Toán nên tâm trạng rất buồn bã.',
        isCorrect: true,
        explanation: 'Rất xuất sắc! Câu (3) nói về việc bị điểm kém môn Toán hoàn toàn lạc đề so với đoạn văn đang tả cảnh sắc cây phượng vĩ mùa hè.'
      },
      {
        id: 'opt-2d',
        text: 'Câu (4): Tiếng ve sầu râm ran trên tán lá xanh biếc...',
        isCorrect: false,
        explanation: 'Câu này tả âm thanh tiếng ve trên tán cây, bổ sung thêm nét sinh động cho cây phượng.'
      }
    ]
  },
  {
    id: 'ex-3',
    category: 'Xếp ý mạch lạc',
    title: 'Sắp xếp các câu thành đoạn mở bài gián tiếp',
    instruction: 'Em hãy chọn trình tự đúng để ghép 3 ý sau thành một đoạn Mở bài gián tiếp cuốn hút:',
    passage: `[A] Trong số những kỷ niệm thân thương ấy, nơi em yêu quý nhất chính là gốc cây bàng già ở góc sân.\n[B] Tuổi thơ học trò của em gắn liền với mái trường Tiểu học Kim Liên A rộn rã tiếng cười.\n[C] Nơi đây lưu giữ biết bao trò chơi vui nhộn cùng thầy cô và bạn bè thân thiết.`,
    options: [
      {
        id: 'opt-3a',
        text: 'Trình tự: [B] -> [C] -> [A]',
        isCorrect: true,
        explanation: 'Rất chuẩn! Đi từ mái trường thân thương [B], đến những kỷ niệm trò chơi [C], rồi dẫn dắt tự nhiên vào đối tượng chính là gốc cây bàng [A]. Đây là mở bài gián tiếp xuất sắc!'
      },
      {
        id: 'opt-3b',
        text: 'Trình tự: [A] -> [B] -> [C]',
        isCorrect: false,
        explanation: 'Nếu đưa [A] lên đầu thì câu văn bị cụt, vì chưa nhắc tới trường học mà đã nhắc "những kỷ niệm thân thương ấy".'
      },
      {
        id: 'opt-3c',
        text: 'Trình tự: [C] -> [A] -> [B]',
        isCorrect: false,
        explanation: 'Trình tự này bị lộn xộn, người đọc chưa biết "Nơi đây" là nơi nào.'
      }
    ]
  },
  {
    id: 'ex-4',
    category: 'Chọn từ đúng ngữ cảnh',
    title: 'Lựa chọn từ ngữ gợi tả sống động',
    instruction: 'Chọn cụm từ thích hợp nhất để điền vào chỗ trống: "Vào mùa xuân, những búp bàng non nhú lên trông như ...."',
    options: [
      {
        id: 'opt-4a',
        text: 'những ngọn lửa xanh nhỏ xinh đang thắp sáng cành cây.',
        isCorrect: true,
        explanation: 'Tuyệt vời! Hình ảnh so sánh "những ngọn lửa xanh nhỏ xinh" vừa giàu trí tưởng tượng vừa gợi tả sức sống tràn trề của mầm non.'
      },
      {
        id: 'opt-4b',
        text: 'những cây gậy bóng chày khổng lồ màu xám.',
        isCorrect: false,
        explanation: 'Búp bàng non rất nhỏ và có màu xanh nõn nà, so sánh với "gậy bóng chày khổng lồ" không phù hợp với thực tế.'
      },
      {
        id: 'opt-4c',
        text: 'những chiếc bàn ghế trong lớp học.',
        isCorrect: false,
        explanation: 'So sánh khập khiễng, thiếu tính thẩm mỹ văn học.'
      }
    ]
  },
  {
    id: 'ex-5',
    category: 'Chọn chi tiết gợi hình',
    title: 'Phân biệt chi tiết mờ nhạt và chi tiết đắt giá',
    instruction: 'Khi miêu tả chú cún con đang mừng chủ đi học về, câu văn nào gợi hình ảnh và cảm xúc sinh động nhất?',
    options: [
      {
        id: 'opt-5a',
        text: 'Vừa thấy bóng em ở cổng, chú cún đã lao vút ra, cái đuôi tròn xoe ngoáy tít mù và hai chân trước chồm lên chân em nũng nịu.',
        isCorrect: true,
        explanation: 'Rất giỏi! Câu văn sử dụng từ ngữ gợi hành động ("lao vút ra", "ngoáy tít mù", "chồm lên nũng nịu") vẽ nên một bức tranh vô cùng chân thực và đáng yêu.'
      },
      {
        id: 'opt-5b',
        text: 'Chú cún của em rất ngoan và nó đứng nhìn em đi vào nhà.',
        isCorrect: false,
        explanation: 'Câu văn quá khô khan, không thể hiện được cử chỉ quấn quýt mừng rỡ của chú cún.'
      },
      {
        id: 'opt-5c',
        text: 'Con cún kêu một tiếng rồi chạy đi chỗ khác chơi.',
        isCorrect: false,
        explanation: 'Chi tiết này không làm nổi bật tình cảm thân thiết giữa bạn nhỏ và vật nuôi.'
      }
    ]
  },
  {
    id: 'ex-6',
    category: 'Nối cảm xúc với nguyên nhân',
    title: 'Bộc lộ tình cảm gắn liền với sự việc cụ thể',
    instruction: 'Cách diễn đạt cảm xúc nào sau đây giúp bài văn chân thực và sâu sắc nhất?',
    options: [
      {
        id: 'opt-6a',
        text: 'Em yêu quý cây bàng vì mỗi trưa hè oi ả, tán lá xanh mát rượi của cây lại che chở cho chúng em vui chơi mà không lo bị say nắng.',
        isCorrect: true,
        explanation: 'Chính xác! Tình cảm yêu quý được gắn liền với sự che chở của tán lá và những giờ ra chơi mát rượi, tạo nên lý do rất thuyết phục.'
      },
      {
        id: 'opt-6b',
        text: 'Em rất yêu cây bàng. Cây bàng là một cây rất tốt. Em thích nó vô cùng.',
        isCorrect: false,
        explanation: 'Câu văn chỉ nhắc đi nhắc lại "rất yêu", "thích vô cùng" mà không có nguyên nhân nào cụ thể.'
      },
      {
        id: 'opt-6c',
        text: 'Cây bàng rất đẹp nên ai cũng phải yêu nó.',
        isCorrect: false,
        explanation: 'Khẳng định chủ quan, thiếu cảm xúc cá nhân của người viết.'
      }
    ]
  },
  {
    id: 'ex-7',
    category: 'Nhận diện cấu trúc bài',
    title: 'Xác định nhiệm vụ của phần Kết bài mở rộng',
    instruction: 'Đoạn văn nào dưới đây là một Kết bài mở rộng đạt chuẩn cho bài văn tả cây bàng sân trường?',
    options: [
      {
        id: 'opt-7a',
        text: 'Mai này dù có lớn khôn và phải rời xa mái trường Kim Liên A, hình ảnh cây bàng già với tán lá xanh mướt và những quả bàng chín vàng thơm lừng vẫn sẽ mãi in sâu trong ký ức tuổi thơ em.',
        isCorrect: true,
        explanation: 'Xuất sắc! Kết bài mở rộng không chỉ nêu tình cảm hiện tại mà còn liên tưởng tới tương lai và khẳng định kỷ niệm đẹp đẽ gắn bó suốt đời.'
      },
      {
        id: 'opt-7b',
        text: 'Em rất thích cây bàng. Hết bài.',
        isCorrect: false,
        explanation: 'Câu kết cụt ngủn, sơ sài và thiếu cảm xúc.'
      },
      {
        id: 'opt-7c',
        text: 'Thân cây bàng rất to và lá bàng rơi nhiều vào mùa đông.',
        isCorrect: false,
        explanation: 'Đây là câu miêu tả thân và lá, thuộc phần Thân bài chứ không phải phần Kết bài.'
      }
    ]
  }
];

export const WritingWorkshopView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [scoreCount, setScoreCount] = useState<number>(0);

  const currentExercise = WORKSHOP_EXERCISES[currentIndex];
  const selectedOption = currentExercise.options.find(o => o.id === selectedOptionId);

  const handleSelectOption = (id: string) => {
    if (checked) return;
    setSelectedOptionId(id);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId) return;
    setChecked(true);
    if (selectedOption?.isCorrect) {
      setScoreCount(prev => prev + 1);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleNextExercise = () => {
    setSelectedOptionId(null);
    setChecked(false);
    if (currentIndex < WORKSHOP_EXERCISES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRetry = () => {
    setSelectedOptionId(null);
    setChecked(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Xưởng luyện viết • Thực hành tương tác</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
            Thử thách rèn câu, sửa đoạn
          </h2>
          <p className="text-indigo-100 text-xs sm:text-sm max-w-xl">
            Tập nhận diện câu lạc ý, sửa câu lủng củng, xếp ý mạch lạc và chọn lọc từ ngữ gợi cảm.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/20 text-center">
            <span className="text-[11px] block text-indigo-200">Đã trả lời đúng:</span>
            <span className="font-heading font-extrabold text-xl text-amber-300">
              {scoreCount} / {WORKSHOP_EXERCISES.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress pill stepper */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {WORKSHOP_EXERCISES.map((ex, idx) => (
          <button
            key={ex.id}
            onClick={() => {
              setCurrentIndex(idx);
              setSelectedOptionId(null);
              setChecked(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              idx === currentIndex
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            Bài {idx + 1}: {ex.category}
          </button>
        ))}
      </div>

      {/* Exercise Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              {currentExercise.category} • Bài {currentIndex + 1}/{WORKSHOP_EXERCISES.length}
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-800">
              {currentExercise.title}
            </h3>
          </div>
        </div>

        {/* Instruction */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {currentExercise.instruction}
        </p>

        {/* Passage if exists */}
        {currentExercise.passage && (
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-line">
            {currentExercise.passage}
          </div>
        )}

        {/* Options list */}
        <div className="space-y-3">
          {currentExercise.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let cardStyle = 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30';

            if (checked) {
              if (opt.isCorrect) {
                cardStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300';
              } else if (isSelected && !opt.isCorrect) {
                cardStyle = 'border-red-400 bg-red-50 text-red-900';
              } else {
                cardStyle = 'border-slate-200 opacity-60';
              }
            } else if (isSelected) {
              cardStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-200 shadow-xs';
            }

            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 text-xs sm:text-sm ${cardStyle}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 border ${
                  isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 text-slate-500'
                }`}>
                  {checked && opt.isCorrect ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : ''}
                </div>

                <div className="grow space-y-1">
                  <div className="font-medium leading-relaxed">{opt.text}</div>

                  {checked && isSelected && (
                    <div className={`mt-2 p-3 rounded-xl text-xs flex items-start gap-2 ${
                      opt.isCorrect ? 'bg-emerald-100/70 text-emerald-900' : 'bg-red-100/70 text-red-900'
                    }`}>
                      {opt.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      )}
                      <span>{opt.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Toolbar */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-slate-500">
            {checked ? (
              selectedOption?.isCorrect ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Tuyệt vời! Em đã chọn đúng.
                </span>
              ) : (
                <span className="text-red-700 font-bold flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> Chưa chính xác. Em hãy bấm "Làm lại" để chọn phương án khác nhé.
                </span>
              )
            ) : (
              <span>Bấm chọn 1 phương án rồi nhấn "Kiểm tra đáp án".</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {checked && !selectedOption?.isCorrect && (
              <button
                onClick={handleRetry}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Thử chọn lại</span>
              </button>
            )}

            {!checked ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedOptionId}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span>Kiểm tra đáp án</span>
                <Check className="w-4 h-4" />
              </button>
            ) : (
              currentIndex < WORKSHOP_EXERCISES.length - 1 && (
                <button
                  onClick={handleNextExercise}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <span>Sang bài tiếp theo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
