import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Edit3, 
  Plus, 
  FileSpreadsheet, 
  Layers, 
  Tag, 
  RotateCcw,
  BookMarked,
  FileText,
  Calendar,
  PenTool
} from 'lucide-react';
import { Grade4LessonItem, Semester, VerificationStatus, UserProfile } from '../types';
import { LessonDetailModal } from './LessonDetailModal';
import { LessonEditModal } from './LessonEditModal';
import { DataImportExportModal } from './DataImportExportModal';

interface LessonsViewProps {
  curriculumData: Grade4LessonItem[];
  onUpdateLessons: (updatedLessons: Grade4LessonItem[]) => void;
  onResetToDefault: () => void;
  onSelectLessonForWriting?: (lesson: any) => void;
  currentUser?: UserProfile;
}

export const LessonsView: React.FC<LessonsViewProps> = ({
  curriculumData,
  onUpdateLessons,
  onResetToDefault,
  onSelectLessonForWriting,
  currentUser,
}) => {
  // Filter States
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedWeek, setSelectedWeek] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedVerification, setSelectedVerification] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [activeDetailLesson, setActiveDetailLesson] = useState<Grade4LessonItem | null>(null);
  const [activeEditLesson, setActiveEditLesson] = useState<Grade4LessonItem | null>(null);
  const [showImportExportModal, setShowImportExportModal] = useState<boolean>(false);

  // Derive unique lists for filters
  const allGenres = Array.from(new Set(curriculumData.map((item) => item.genre))).sort();
  const allWeeks = Array.from(new Set(curriculumData.map((item) => item.week))).sort((a, b) => a - b);

  // Filter logic
  const filteredLessons = curriculumData.filter((item) => {
    const matchesSemester = selectedSemester === 'all' || item.semester === selectedSemester;
    const matchesWeek = selectedWeek === 'all' || item.week.toString() === selectedWeek;
    const matchesGenre = selectedGenre === 'all' || item.genre === selectedGenre;
    const matchesVerification = selectedVerification === 'all' || item.verificationStatus === selectedVerification;
    
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = 
      !query ||
      item.lessonTitle.toLowerCase().includes(query) ||
      item.writingPrompt.toLowerCase().includes(query) ||
      item.learningObjective.toLowerCase().includes(query) ||
      item.theme.toLowerCase().includes(query) ||
      item.readingLesson.toLowerCase().includes(query) ||
      `tuần ${item.week}`.includes(query) ||
      `trang ${item.page}`.includes(query);

    return matchesSemester && matchesWeek && matchesGenre && matchesVerification && matchesSearch;
  });

  const verifiedCount = curriculumData.filter((l) => l.verificationStatus === 'verified').length;
  const needsVerificationCount = curriculumData.filter((l) => l.verificationStatus === 'needs_verification').length;

  // Handle single lesson edit
  const handleSaveEditedLesson = (updated: Grade4LessonItem) => {
    const exists = curriculumData.some((l) => l.id === updated.id);
    let nextList: Grade4LessonItem[];
    if (exists) {
      nextList = curriculumData.map((l) => (l.id === updated.id ? updated : l));
    } else {
      nextList = [updated, ...curriculumData];
    }
    onUpdateLessons(nextList);
  };

  // Add new lesson modal handler
  const handleAddNewLesson = () => {
    const newLesson: Grade4LessonItem = {
      id: `lesson-custom-${Date.now()}`,
      semester: 'Học kì I',
      bookVolume: 'Tập một',
      week: 1,
      lessonNumber: 1,
      lessonTitle: 'Bài tập làm văn mới...',
      page: 10,
      theme: 'Mỗi người một vẻ',
      readingLesson: 'Bài đọc minh hoạ',
      genre: 'Đoạn văn nêu ý kiến',
      stage: 'Viết bài',
      writingPrompt: 'Nhập đề bài hoặc yêu cầu cần đạt...',
      learningObjective: 'Nhập nhiệm vụ học tập thiết kế cho học sinh...',
      practiceSteps: {
        step1Explore: 'Tìm hiểu đề và đọc bài mẫu...',
        step2GatherIdeas: 'Thu thập ý tưởng và chi tiết...',
        step3Outline: 'Sắp xếp dàn ý 3 phần...',
        step4Draft: 'Viết bài hoàn chỉnh...',
        step5Revise: 'Tự soát lỗi và sửa chữa...',
      },
      evaluationRubric: ['Đúng kiểu bài', 'Bố cục rõ ràng', 'Không mắc lỗi chính tả'],
      resources: {
        guideNotes: 'Ghi nhớ của bài học...',
        suggestedQuestions: ['Câu hỏi khai thác 1?'],
        vocabAndPatterns: ['từ ngữ hay 1', 'từ ngữ hay 2'],
      },
      verificationStatus: 'needs_verification',
      verificationNotes: 'Bài học mới tạo do giáo viên bổ sung, cần xác minh đối chiếu với phân phối chương trình.',
      sourceLabel: 'Giáo viên bổ sung',
      isSampleData: true,
    };
    setActiveEditLesson(newLesson);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Required Notice Banner regarding Sample Data & Persistence */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-500/10 border-2 border-dashed border-amber-400 text-amber-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-xs">
            📚
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading font-extrabold text-sm sm:text-base text-amber-900 tracking-wide">
                HỆ THỐNG DỮ LIỆU BÀI HỌC TIẾNG VIỆT LỚP 4
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[11px] font-bold">
                Bộ Kết nối tri thức với cuộc sống
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Căn cứ nguồn: <strong>SGK Tiếng Việt 4 Tập một & Tập hai (NXB Giáo dục Việt Nam)</strong> đối chiếu trực tiếp với tài liệu giáo viên.
            </p>
          </div>
        </div>

        {/* Action button to open Import/Export (Only for Teachers and Admins) */}
        {currentUser?.role !== 'student' && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowImportExportModal(true)}
              className="px-4 py-2.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-50 text-slate-800 text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Quản lí / Xuất file</span>
            </button>

            <button
              onClick={handleAddNewLesson}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm bài học</span>
            </button>
          </div>
        )}
      </div>

      {/* Persistence Note Banner Requirement 7 */}
      <div className="px-4 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>
            <strong>Trạng thái lưu trữ:</strong> Dữ liệu kho bài học được đồng bộ và lưu trữ tự động trên hệ thống.
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {verifiedCount} bài đã khớp SGK
          </span>
          <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
            {needsVerificationCount} bài cần xác minh
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-5 rounded-3xl border border-amber-200/90 shadow-xs space-y-4">
        {/* Top search & semester pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Semester pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Học kì:
            </span>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'all', label: 'Tất cả năm học' },
                { id: 'Học kì I', label: 'Học kì I (Tập 1)' },
                { id: 'Học kì II', label: 'Học kì II (Tập 2)' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSemester(s.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSemester === s.id
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm tên bài, đề bài, trang SGK, tuần..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-400 text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        {/* Secondary Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
          {/* Week Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              Lọc theo tuần học:
            </label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 font-medium focus:ring-2 focus:ring-amber-400"
            >
              <option value="all">Tất cả các tuần (Tuần 1 - 35)</option>
              {allWeeks.map((w) => (
                <option key={w} value={w.toString()}>
                  Tuần {w}
                </option>
              ))}
            </select>
          </div>

          {/* Genre / Kiểu bài Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              Lọc theo kiểu bài:
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 font-medium focus:ring-2 focus:ring-amber-400"
            >
              <option value="all">Tất cả kiểu bài ({allGenres.length})</option>
              {allGenres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Verification Status Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              Trạng thái đối chiếu SGK:
            </label>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 font-medium focus:ring-2 focus:ring-amber-400"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="verified">✅ Đã đối chiếu khớp SGK</option>
              <option value="needs_verification">⚠️ Cần giáo viên xác minh</option>
            </select>
          </div>
        </div>

        {/* Reset filters shortcut if active */}
        {(selectedSemester !== 'all' || selectedWeek !== 'all' || selectedGenre !== 'all' || selectedVerification !== 'all' || searchQuery) && (
          <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
            <span>
              Đang hiển thị <strong>{filteredLessons.length}</strong> / {curriculumData.length} bài học phù hợp bộ lọc.
            </span>
            <button
              onClick={() => {
                setSelectedSemester('all');
                setSelectedWeek('all');
                setSelectedGenre('all');
                setSelectedVerification('all');
                setSearchQuery('');
              }}
              className="text-amber-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* Lesson List / Cards */}
      {filteredLessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLessons.map((item) => {
            const isVerified = item.verificationStatus === 'verified';
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-amber-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5 space-y-3.5">
                  {/* Card top badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                        Tuần {item.week}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-semibold">
                        {item.semester === 'Học kì I' ? 'HK1' : 'HK2'} • Tr. {item.page}
                      </span>
                    </div>

                    {/* Verification pill */}
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Khớp SGK
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Cần xác minh
                      </span>
                    )}
                  </div>

                  {/* Title & Stage */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-600">
                      {item.genre} • {item.stage}
                    </span>
                    <h3 
                      onClick={() => setActiveDetailLesson(item)}
                      className="font-heading text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors cursor-pointer mt-0.5 line-clamp-2"
                      title={item.lessonTitle}
                    >
                      {item.lessonTitle}
                    </h3>
                  </div>

                  {/* Context: Theme & Reading */}
                  <div className="text-xs text-slate-500 flex items-center gap-2 flex-wrap font-medium">
                    <span className="truncate max-w-[140px]">Chủ điểm: {item.theme}</span>
                    <span>•</span>
                    <span className="truncate max-w-[140px]">Đọc: {item.readingLesson}</span>
                  </div>

                  {/* Writing Prompt Snippet */}
                  <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-amber-900 text-[11px] flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                      <span>Yêu cầu viết / Đề bài:</span>
                    </div>
                    <p className="line-clamp-2 leading-relaxed italic text-slate-600">
                      "{item.writingPrompt}"
                    </p>
                  </div>

                  {/* Verification note preview if needs verification */}
                  {!isVerified && item.verificationNotes && (
                    <div className="p-2 rounded-lg bg-orange-50 border border-orange-200 text-[11px] text-orange-900 line-clamp-2">
                      ⚠️ <strong>Đối chiếu:</strong> {item.verificationNotes}
                    </div>
                  )}

                  {/* 5-step preview dots */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    <span>5 bước luyện viết:</span>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400" title="1. Khám phá" />
                      <span className="w-2 h-2 rounded-full bg-orange-400" title="2. Tìm ý" />
                      <span className="w-2 h-2 rounded-full bg-blue-400" title="3. Lập dàn ý" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400" title="4. Viết bài" />
                      <span className="w-2 h-2 rounded-full bg-purple-400" title="5. Tự sửa" />
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveDetailLesson(item)}
                    className="grow py-1.5 px-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Xem chi tiết</span>
                  </button>

                  {currentUser?.role === 'student' && onSelectLessonForWriting && (
                    <button
                      onClick={() => onSelectLessonForWriting(item)}
                      className="py-1.5 px-3 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                      title="Vào phòng luyện viết bài này"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Viết bài</span>
                    </button>
                  )}

                  {currentUser?.role !== 'student' && (
                    <button
                      onClick={() => setActiveEditLesson(item)}
                      className="p-1.5 rounded-xl text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                      title="Chỉnh sửa bài học này (Dành cho Giáo viên & Quản trị)"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800">Không tìm thấy bài học nào phù hợp</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Không có bài học nào khớp với các tiêu chí lọc hiện tại. Hãy thử chọn tuần khác, kiểu bài khác hoặc xóa từ khóa tìm kiếm.
          </p>
          <button
            onClick={() => {
              setSelectedSemester('all');
              setSelectedWeek('all');
              setSelectedGenre('all');
              setSelectedVerification('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-amber-100 text-amber-800 text-xs font-bold hover:bg-amber-200 transition-colors cursor-pointer"
          >
            Đặt lại toàn bộ bộ lọc
          </button>
        </div>
      )}

      {/* Modal 1: Detail Modal */}
      <LessonDetailModal
        lesson={activeDetailLesson}
        onClose={() => setActiveDetailLesson(null)}
        canEdit={currentUser?.role !== 'student'}
        onEdit={(item) => {
          setActiveDetailLesson(null);
          setActiveEditLesson(item);
        }}
        onSelectForWriting={(item) => {
          if (onSelectLessonForWriting) {
            onSelectLessonForWriting(item);
          }
        }}
      />

      {/* Modal 2: Edit Modal */}
      <LessonEditModal
        lesson={activeEditLesson}
        onClose={() => setActiveEditLesson(null)}
        onSave={handleSaveEditedLesson}
      />

      {/* Modal 3: Import / Export Modal */}
      {showImportExportModal && (
        <DataImportExportModal
          lessons={curriculumData}
          onClose={() => setShowImportExportModal(false)}
          onUpdateLessons={onUpdateLessons}
          onResetToDefault={onResetToDefault}
        />
      )}
    </div>
  );
};
