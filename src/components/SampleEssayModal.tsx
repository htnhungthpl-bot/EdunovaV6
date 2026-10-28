import React from 'react';
import { X, BookOpen, PenTool, Sparkles, CheckCircle2, Lightbulb } from 'lucide-react';
import { Lesson } from '../types';

interface SampleEssayModalProps {
  lesson: Lesson | null;
  onClose: () => void;
  onSelectForWriting: (lesson: Lesson) => void;
}

export const SampleEssayModal: React.FC<SampleEssayModalProps> = ({
  lesson,
  onClose,
  onSelectForWriting,
}) => {
  if (!lesson) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-amber-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-start justify-between">
          <div className="space-y-1 pr-6">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Bài văn mẫu tham khảo
              </span>
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {lesson.categoryName}
              </span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold">
              {lesson.sampleEssay.title}
            </h3>
            <p className="text-xs text-amber-100 font-medium">
              Minh họa cho đề bài: {lesson.title}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Notice banner */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Dành cho học sinh:</strong> Đọc bài mẫu để học cách mở bài, quan sát chi tiết và sử dụng hình ảnh so sánh. Không nên sao chép y nguyên nhé!
            </span>
          </div>

          {/* Essay content formatted like student notebook */}
          <div className="p-6 rounded-2xl bg-[#fffdfa] border border-amber-200 shadow-inner">
            <div className="font-heading text-center text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-amber-200/60">
              {lesson.sampleEssay.title}
            </div>
            <div className="text-slate-800 text-sm sm:text-base leading-loose whitespace-pre-line font-medium">
              {lesson.sampleEssay.content}
            </div>
          </div>

          {/* Highlights & Techniques */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Những điểm sáng ngôn từ đáng học tập trong bài này:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lesson.sampleEssay.highlights.map((hl, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/80 text-xs space-y-1"
                >
                  <div className="font-bold text-orange-900 italic">
                    "{hl.phrase}"
                  </div>
                  <div className="text-slate-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{hl.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested vocabulary */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Từ vựng hay có thể mang vào phòng luyện viết:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {lesson.suggestedVocab.words.map((w, idx) => (
                <span 
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Đóng lại
          </button>

          <button
            onClick={() => {
              onSelectForWriting(lesson);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <PenTool className="w-4 h-4" />
            <span>Vào phòng viết theo đề này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
