import React from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Edit3, 
  PenTool, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  Award,
  BookMarked,
  Tag
} from 'lucide-react';
import { Grade4LessonItem } from '../types';

interface LessonDetailModalProps {
  lesson: Grade4LessonItem | null;
  onClose: () => void;
  onEdit: (lesson: Grade4LessonItem) => void;
  onSelectForWriting?: (lesson: Grade4LessonItem) => void;
  canEdit?: boolean;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  onClose,
  onEdit,
  onSelectForWriting,
  canEdit = false,
}) => {
  if (!lesson) return null;

  const isVerified = lesson.verificationStatus === 'verified';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-amber-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-start justify-between gap-4">
          <div className="space-y-2">
            {/* Top badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {lesson.semester} • Tuần {lesson.week}
              </span>
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {lesson.genre}
              </span>
              <span className="bg-white/25 text-white text-xs font-medium px-2 py-0.5 rounded-md">
                Trang {lesson.page} SGK {lesson.bookVolume}
              </span>
              {/* Verification status pill */}
              {isVerified ? (
                <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đã đối chiếu khớp SGK
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-amber-200 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-800" />
                  Cần giáo viên xác minh
                </span>
              )}
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold leading-tight">
              {lesson.lessonTitle}
            </h3>

            <div className="flex items-center gap-3 text-xs text-amber-100 font-medium">
              <span>Chủ điểm: <strong>{lesson.theme}</strong></span>
              <span>•</span>
              <span>Bài đọc: <strong>{lesson.readingLesson}</strong></span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Verification Warning Notice if needed */}
          {!isVerified && lesson.verificationNotes && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Ghi chú đối chiếu nguồn:</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {lesson.verificationNotes}
              </p>
            </div>
          )}

          {/* Prompt / Đề bài SGK */}
          <div className="p-5 rounded-2xl bg-[#fffdf7] border-2 border-amber-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Yêu cầu viết / Đề bài theo SGK:</span>
            </div>
            <p className="text-slate-800 font-semibold text-sm sm:text-base leading-relaxed">
              {lesson.writingPrompt}
            </p>
          </div>

          {/* Learning Objectives */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm space-y-1.5">
            <div className="font-bold text-blue-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-700" />
              <span>Nhiệm vụ học tập (Mục tiêu thiết kế cho app):</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {lesson.learningObjective}
            </p>
          </div>

          {/* 5 Steps of Writing Practice (Các bước luyện viết) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-sm sm:text-base text-slate-800 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Quy trình 5 bước luyện viết theo bài học:</span>
              </h4>
              <span className="text-xs text-slate-400 font-medium">Chặng: {lesson.stage}</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </div>
                <div>
                  <div className="font-bold text-slate-800">Tìm hiểu / Khám phá:</div>
                  <p className="text-slate-600 mt-0.5">{lesson.practiceSteps.step1Explore}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-orange-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </div>
                <div>
                  <div className="font-bold text-slate-800">Tìm ý / Thu thập thông tin:</div>
                  <p className="text-slate-600 mt-0.5">{lesson.practiceSteps.step2GatherIdeas}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </div>
                <div>
                  <div className="font-bold text-slate-800">Lập dàn ý / Sắp xếp ý:</div>
                  <p className="text-slate-600 mt-0.5">{lesson.practiceSteps.step3Outline}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  4
                </div>
                <div>
                  <div className="font-bold text-slate-800">Viết / Thực hành:</div>
                  <p className="text-slate-600 mt-0.5">{lesson.practiceSteps.step4Draft}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  5
                </div>
                <div>
                  <div className="font-bold text-slate-800">Tự sửa / Hoàn thiện:</div>
                  <p className="text-slate-600 mt-0.5">{lesson.practiceSteps.step5Revise}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Evaluation Rubric */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
            <div className="font-bold text-emerald-900 text-xs sm:text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Tiêu chí đánh giá gợi ý (Rubric):</span>
            </div>
            <ul className="space-y-1.5">
              {lesson.evaluationRubric.map((rubric, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{rubric}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lesson Resources (Ghi nhớ & Từ ngữ gợi ý) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.resources.guideNotes && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm space-y-1.5">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-amber-700" />
                  <span>Ghi nhớ trọng tâm trong SGK:</span>
                </div>
                <p className="text-slate-700 italic leading-relaxed">
                  "{lesson.resources.guideNotes}"
                </p>
              </div>
            )}

            {lesson.resources.vocabAndPatterns && lesson.resources.vocabAndPatterns.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span>Từ ngữ & Mẫu câu gợi ý:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {lesson.resources.vocabAndPatterns.map((item, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {canEdit && (
              <button
                onClick={() => onEdit(lesson)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-slate-500" />
                <span>Sửa dữ liệu bài này</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 text-xs sm:text-sm font-medium hover:bg-slate-200/70 transition-colors cursor-pointer"
            >
              Đóng
            </button>

            {onSelectForWriting && (
              <button
                onClick={() => {
                  onSelectForWriting(lesson);
                  onClose();
                }}
                className="px-4.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <PenTool className="w-4 h-4" />
                <span>Vào phòng viết bài này</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
