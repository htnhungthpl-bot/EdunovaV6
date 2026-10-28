import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  PenTool, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BookMarked, 
  ArrowRight, 
  Calendar, 
  Award,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { UserProfile, DbAssignment, StudentSubmission, DbDiamondNote } from '../types';
import { api } from '../utils/api';

interface StudentDashboardViewProps {
  currentUser: UserProfile;
  onNavigateToWriting: (assignmentOrLesson?: any) => void;
  onNavigateToNotebook: () => void;
  onNavigateToWorkshop: () => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  currentUser,
  onNavigateToWriting,
  onNavigateToNotebook,
  onNavigateToWorkshop,
}) => {
  const [assignments, setAssignments] = useState<DbAssignment[]>([]);
  const [mySubmissions, setMySubmissions] = useState<StudentSubmission[]>([]);
  const [diamondNotes, setDiamondNotes] = useState<DbDiamondNote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [assigns, subs, notes] = await Promise.all([
        api.getAssignments().catch(() => []),
        api.getSubmissions().catch(() => []),
        api.getDiamondNotes().catch(() => []),
      ]);
      setAssignments(assigns);
      setMySubmissions(subs);
      setDiamondNotes(notes);
    } catch (err) {
      console.error('Error loading student dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser.id]);

  // Count real completed assignments
  const gradedCount = mySubmissions.filter(s => s.status === 'graded').length;
  const pendingCount = mySubmissions.filter(s => s.status === 'pending').length;
  const needsEditCount = mySubmissions.filter(s => s.status === 'needs_edit').length;

  return (
    <div className="space-y-8 pb-16">
      {/* Student Welcome Banner with Brand Colors */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold">
              <span>🎒</span>
              <span>Không gian học tập • {currentUser.className || 'Khối 4 Tiểu học'}</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
              Chào mừng {currentUser.name}!
            </h2>
            <p className="text-amber-100 text-sm font-medium max-w-xl">
              "Bền bỉ hôm nay – Tỏa sáng ngày mai!" Hãy cùng Trợ lý EDUNOVA rèn luyện từng câu văn chân thực và giàu cảm xúc nhé.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToWriting()}
              className="px-5 py-3 rounded-2xl bg-slate-900 text-amber-300 font-bold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-102"
            >
              <PenTool className="w-4 h-4 text-amber-400" />
              <span>Vào Bàn viết bài ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative student illustration cue */}
        <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
      </div>

      {/* Real Statistics Grid (No Fake Mock Numbers) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Bài đã nộp</span>
            <FolderOpen className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-heading text-2xl font-bold text-slate-800">{mySubmissions.length}</div>
          <div className="text-[11px] text-slate-500">lần nộp lưu trên máy chủ</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cô đã chấm</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-heading text-2xl font-bold text-emerald-700">{gradedCount}</div>
          <div className="text-[11px] text-emerald-600 font-medium">bài có nhận xét chính thức</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sổ kim cương</span>
            <BookMarked className="w-4 h-4 text-purple-500" />
          </div>
          <div className="font-heading text-2xl font-bold text-purple-700">{diamondNotes.length}</div>
          <div className="text-[11px] text-slate-500">chi tiết & ý hay tích lũy</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-orange-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cần sửa lại</span>
            <AlertCircle className="w-4 h-4 text-orange-500" />
          </div>
          <div className="font-heading text-2xl font-bold text-orange-700">{needsEditCount}</div>
          <div className="text-[11px] text-orange-600 font-medium">
            {needsEditCount > 0 ? 'cô gửi góp ý hoàn thiện' : 'đã hoàn thành tốt'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Assigned Tasks (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  <span>Nhiệm vụ viết văn cô giáo giao ({assignments.length})</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Bài tập được giao cho {currentUser.className ? (currentUser.className.toLowerCase().startsWith('lớp') ? currentUser.className : `Lớp ${currentUser.className}`) : 'lớp của em'}
                </p>
              </div>
              <button
                onClick={loadData}
                disabled={loading}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="Cập nhật lại"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {assignments.length === 0 ? (
              <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-xs text-slate-500">
                Hiện tại chưa có bài tập mới nào. Em có thể vào mục <strong>Kho bài học SGK</strong> hoặc <strong>Xưởng luyện viết</strong> để tự rèn luyện nhé!
              </div>
            ) : (
              <div className="space-y-3">
                {assignments.map((assign) => {
                  const submission = mySubmissions.find(s => s.assignmentId === assign.id || s.lessonTitle === assign.title);
                  const isSubmitted = !!submission;
                  const isGraded = submission?.status === 'graded';
                  const needsEdit = submission?.status === 'needs_edit';

                  return (
                    <div
                      key={assign.id}
                      className="p-5 rounded-2xl border border-amber-200/70 bg-gradient-to-br from-white to-amber-50/30 hover:border-amber-300 transition-all space-y-3 shadow-2xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                            {assign.genre}
                          </span>
                          <span className="text-xs text-slate-500">
                            Độ dài: {assign.targetWordCount.min} - {assign.targetWordCount.max} từ
                          </span>
                        </div>

                        {/* Status badge */}
                        <div>
                          {isGraded ? (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Đã chấm: {submission?.score} điểm</span>
                            </span>
                          ) : needsEdit ? (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 text-orange-600" />
                              <span>Cần sửa lại theo góp ý</span>
                            </span>
                          ) : isSubmitted ? (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-blue-600" />
                              <span>Đã nộp • Chờ cô chấm</span>
                            </span>
                          ) : (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                              Chưa nộp bài
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-heading font-bold text-slate-800 text-base">
                          {assign.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          "{assign.prompt}"
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
                        <span className="text-slate-400">
                          Người giao: <strong>{assign.teacherName}</strong>
                        </span>

                        <button
                          onClick={() => onNavigateToWriting(assign)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                        >
                          <PenTool className="w-3.5 h-3.5" />
                          <span>{isSubmitted ? 'Xem lại bài đã viết' : 'Bắt đầu viết bài'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Published Teacher Feedbacks Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading text-lg font-bold text-slate-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" />
              <span>Lời nhận xét chính thức từ Cô giáo chủ nhiệm</span>
            </h3>

            {mySubmissions.filter(s => s.status === 'graded' && s.teacherComment).length === 0 ? (
              <div className="text-center py-6 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                Chưa có nhận xét mới nào. Khi cô giáo chấm và phát hành nhận xét, lời khen và điểm số của cô sẽ xuất hiện tại đây.
              </div>
            ) : (
              <div className="space-y-4">
                {mySubmissions
                  .filter(s => s.status === 'graded' && s.teacherComment)
                  .map((sub) => (
                    <div
                      key={sub.id}
                      className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-800">{sub.lessonTitle}</span>
                          <span className="text-[11px] text-slate-400 block">{sub.submittedAt}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-heading font-extrabold text-2xl text-emerald-700">
                            {sub.score}
                          </span>
                          <span className="text-xs text-slate-400">/10</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-emerald-100 text-xs text-slate-700 leading-relaxed font-medium">
                        "{sub.teacherComment}"
                      </div>

                      {sub.stickersEarned && sub.stickersEarned.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-500">Huy hiệu cô tặng:</span>
                          {sub.stickersEarned.map((stk, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200"
                            >
                              🌸 {stk}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Diamond Notebook & Quick Practice */}
        <div className="space-y-6">
          {/* Sổ tay kim cương Widget */}
          <div className="bg-white p-6 rounded-3xl border border-purple-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-slate-800 flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-purple-600" />
                <span>Sổ tay kim cương ({diamondNotes.length})</span>
              </h3>
              <button
                onClick={onNavigateToNotebook}
                className="text-xs text-purple-700 font-bold hover:underline cursor-pointer"
              >
                Mở sổ tay
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Nơi lưu trữ những quan sát thật, chi tiết đắt giá và câu văn tự viết hay nhất của em.
            </p>

            {diamondNotes.length === 0 ? (
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 text-center text-xs text-slate-500 space-y-2">
                <div>Chưa có thẻ ghi chép nào.</div>
                <button
                  onClick={onNavigateToNotebook}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-2xs hover:bg-purple-700 cursor-pointer"
                >
                  + Thêm chi tiết kim cương đầu tiên
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {diamondNotes.slice(0, 3).map((note) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-xl border border-purple-100 bg-purple-50/30 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-800 truncate">{note.title}</strong>
                      <span className="text-[10px] text-purple-700 font-semibold bg-white px-1.5 py-0.2 rounded border border-purple-200">
                        {note.category === 'quan_sat_that' ? 'Quan sát thật' : note.category === 'tuong_tuong' ? 'Tưởng tượng' : 'Học liệu'}
                      </span>
                    </div>
                    <p className="text-slate-600 line-clamp-2 italic">"{note.content}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Workshop Link */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-lg shadow-sm">
              ⚡
            </div>
            <h4 className="font-heading font-bold text-slate-800 text-base">
              Xưởng luyện viết câu & đoạn
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              7 bài tập tương tác nhanh: sửa câu lủng củng, xếp ý mạch lạc, chọn từ đúng ngữ cảnh.
            </p>
            <button
              onClick={onNavigateToWorkshop}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Vào Xưởng luyện viết ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
