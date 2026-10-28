import React, { useState } from 'react';
import { X, Save, AlertTriangle, CheckCircle2, BookOpen } from 'lucide-react';
import { Grade4LessonItem, Semester, BookVolume, VerificationStatus } from '../types';

interface LessonEditModalProps {
  lesson: Grade4LessonItem | null;
  onClose: () => void;
  onSave: (updatedLesson: Grade4LessonItem) => void;
}

export const LessonEditModal: React.FC<LessonEditModalProps> = ({
  lesson,
  onClose,
  onSave,
}) => {
  if (!lesson) return null;

  const [formData, setFormData] = useState<Grade4LessonItem>({
    ...lesson,
    practiceSteps: { ...lesson.practiceSteps },
    resources: { ...lesson.resources },
    evaluationRubric: [...lesson.evaluationRubric],
  });

  const handleChange = (field: keyof Grade4LessonItem, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePracticeStepChange = (stepKey: keyof Grade4LessonItem['practiceSteps'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      practiceSteps: {
        ...prev.practiceSteps,
        [stepKey]: value,
      },
    }));
  };

  const handleRubricChange = (index: number, value: string) => {
    const updated = [...formData.evaluationRubric];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, evaluationRubric: updated }));
  };

  const handleAddRubric = () => {
    setFormData((prev) => ({
      ...prev,
      evaluationRubric: [...prev.evaluationRubric, 'Tiêu chí đánh giá mới...'],
    }));
  };

  const handleRemoveRubric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      evaluationRubric: prev.evaluationRubric.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-amber-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-500 text-white font-bold px-2.5 py-0.5 rounded-full">
                Chỉnh sửa dữ liệu bài học
              </span>
              <span className="text-xs text-slate-400">
                Tuần {formData.week} • Bài {formData.lessonNumber}
              </span>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold">
              {formData.lessonTitle}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Status Switcher */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Trạng thái đối chiếu & xác minh:
              </label>
              <select
                value={formData.verificationStatus}
                onChange={(e) => handleChange('verificationStatus', e.target.value as VerificationStatus)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-amber-300 text-slate-800 focus:ring-2 focus:ring-amber-500"
              >
                <option value="verified">✅ Đã đối chiếu khớp SGK</option>
                <option value="needs_verification">⚠️ Cần giáo viên xác minh</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Ghi chú đối chiếu nguồn (sự khác biệt giữa Excel và SGK):
              </label>
              <textarea
                value={formData.verificationNotes || ''}
                onChange={(e) => handleChange('verificationNotes', e.target.value)}
                rows={2}
                placeholder="Nhập ghi chú đối chiếu nguồn hoặc lí do cần xác minh..."
                className="w-full p-2.5 rounded-xl border border-amber-200 bg-white text-xs text-slate-800 focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Basic metadata grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Học kì</label>
              <select
                value={formData.semester}
                onChange={(e) => handleChange('semester', e.target.value as Semester)}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium"
              >
                <option value="Học kì I">Học kì I</option>
                <option value="Học kì II">Học kì II</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tuần</label>
              <input
                type="number"
                min={1}
                max={35}
                value={formData.week}
                onChange={(e) => handleChange('week', Number(e.target.value))}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Trang SGK</label>
              <input
                type="number"
                value={formData.page}
                onChange={(e) => handleChange('page', Number(e.target.value))}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tên bài viết theo SGK</label>
              <input
                type="text"
                value={formData.lessonTitle}
                onChange={(e) => handleChange('lessonTitle', e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kiểu bài</label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chủ điểm</label>
              <input
                type="text"
                value={formData.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bài đọc tương ứng</label>
              <input
                type="text"
                value={formData.readingLesson}
                onChange={(e) => handleChange('readingLesson', e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Prompt */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Yêu cầu viết / Đề bài SGK</label>
            <textarea
              value={formData.writingPrompt}
              onChange={(e) => handleChange('writingPrompt', e.target.value)}
              rows={2}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
              required
            />
          </div>

          {/* Learning Objective */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nhiệm vụ học tập (thiết kế cho app)</label>
            <textarea
              value={formData.learningObjective}
              onChange={(e) => handleChange('learningObjective', e.target.value)}
              rows={2}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
              required
            />
          </div>

          {/* 5 Steps */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Nội dung 5 bước luyện viết:
            </label>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-slate-600">Bước 1: Tìm hiểu / Khám phá:</span>
                <input
                  type="text"
                  value={formData.practiceSteps.step1Explore}
                  onChange={(e) => handlePracticeStepChange('step1Explore', e.target.value)}
                  className="w-full p-2 mt-0.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <span className="font-semibold text-slate-600">Bước 2: Tìm ý / Thu thập thông tin:</span>
                <input
                  type="text"
                  value={formData.practiceSteps.step2GatherIdeas}
                  onChange={(e) => handlePracticeStepChange('step2GatherIdeas', e.target.value)}
                  className="w-full p-2 mt-0.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <span className="font-semibold text-slate-600">Bước 3: Lập dàn ý / Sắp xếp:</span>
                <input
                  type="text"
                  value={formData.practiceSteps.step3Outline}
                  onChange={(e) => handlePracticeStepChange('step3Outline', e.target.value)}
                  className="w-full p-2 mt-0.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <span className="font-semibold text-slate-600">Bước 4: Viết / Thực hành:</span>
                <input
                  type="text"
                  value={formData.practiceSteps.step4Draft}
                  onChange={(e) => handlePracticeStepChange('step4Draft', e.target.value)}
                  className="w-full p-2 mt-0.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <span className="font-semibold text-slate-600">Bước 5: Tự sửa / Hoàn thiện:</span>
                <input
                  type="text"
                  value={formData.practiceSteps.step5Revise}
                  onChange={(e) => handlePracticeStepChange('step5Revise', e.target.value)}
                  className="w-full p-2 mt-0.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Rubrics */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Tiêu chí đánh giá gợi ý (Rubric):
              </label>
              <button
                type="button"
                onClick={handleAddRubric}
                className="text-[11px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-lg cursor-pointer"
              >
                + Thêm tiêu chí
              </button>
            </div>
            <div className="space-y-1.5">
              {formData.evaluationRubric.map((r, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={r}
                    onChange={(e) => handleRubricChange(i, e.target.value)}
                    className="grow p-2 rounded-xl border border-slate-200 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveRubric(i)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Save */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 italic">
              Lưu vào bộ nhớ làm việc của phiên bản EDUNOVA.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                Lưu thay đổi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
