import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Eye, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Lock, 
  Globe, 
  Users, 
  School, 
  FileEdit, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  Calendar, 
  User, 
  Trash2, 
  Plus, 
  AlertCircle
} from 'lucide-react';
import { UserProfile, DbPost, DbPostHistory } from '../types';
import { dataService } from '../services/dataService';

interface StudentPostsLibraryViewProps {
  currentUser: UserProfile;
  onNavigateToWriting?: () => void;
}

export const StudentPostsLibraryView: React.FC<StudentPostsLibraryViewProps> = ({
  currentUser,
  onNavigateToWriting,
}) => {
  const [posts, setPosts] = useState<DbPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Detail Modal
  const [selectedPost, setSelectedPost] = useState<DbPost | null>(null);
  const [postHistory, setPostHistory] = useState<DbPostHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);

  // Teacher Review in Modal
  const [reviewAction, setReviewAction] = useState<'approve' | 'request_edit' | 'reject'>('approve');
  const [teacherComment, setTeacherComment] = useState<string>('');
  const [reviewVisibility, setReviewVisibility] = useState<'CLASS' | 'SCHOOL' | 'PUBLIC'>('CLASS');
  const [isReviewing, setIsReviewing] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadPosts = async () => {
    setLoading(true);
    try {
      const fetched = await dataService.getPosts({
        className: selectedClass !== 'all' ? selectedClass : undefined,
        status: selectedStatus !== 'all' ? (selectedStatus as any) : undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: searchQuery || undefined,
      });
      setPosts(fetched);
    } catch (err: any) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [selectedClass, selectedStatus, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadPosts();
  };

  const openPostDetail = async (post: DbPost) => {
    setSelectedPost(post);
    setTeacherComment(post.teacherFeedback || '');
    setHistoryLoading(true);
    try {
      const details = await dataService.getPostById(post.id);
      setPostHistory(details.history || []);
    } catch {
      setPostHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleReviewPost = async () => {
    if (!selectedPost) return;
    setIsReviewing(true);
    try {
      const updated = await dataService.reviewPost(
        selectedPost.id,
        reviewAction,
        teacherComment,
        reviewVisibility
      );
      setSelectedPost(updated);
      setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
      showToast(
        reviewAction === 'approve'
          ? '🎉 Đã duyệt bài viết và phát hành thành công!'
          : '📝 Đã gửi yêu cầu chỉnh sửa cho học sinh!'
      );
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi duyệt bài viết.');
    } finally {
      setIsReviewing(false);
    }
  };

  // Distinct categories from posts
  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean)));

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-2 border border-slate-700 animate-fade-in text-sm font-medium">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center">
          <BookOpen className="w-64 h-64 -mr-12" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-100 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thư viện bài viết học sinh Lớp 4 – EDUNOVA Database</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
            Kho Tàng Bài Viết Học Sinh
          </h1>
          <p className="mt-2 text-sm sm:text-base text-amber-100 leading-relaxed font-sans">
            Nơi lưu giữ, trưng bày và lan tỏa những bài văn miêu tả giàu cảm xúc của các em học sinh trên hệ thống EDUNOVA.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {currentUser.role === 'student' && onNavigateToWriting && (
              <button
                onClick={onNavigateToWriting}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white text-amber-800 font-bold text-sm shadow hover:bg-amber-50 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Viết bài mới</span>
              </button>
            )}

            <button
              onClick={loadPosts}
              disabled={loading}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs shadow backdrop-blur-md transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Làm mới danh sách</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative grow">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài viết theo tiêu đề, tác giả hoặc nội dung..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-hidden text-xs sm:text-sm bg-slate-50/50"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition cursor-pointer"
          >
            Tìm kiếm
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-semibold flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Bộ lọc:</span>
          </span>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="APPROVED">Đã duyệt (Xuất bản)</option>
            <option value="SUBMITTED">Chờ giáo viên duyệt</option>
            {currentUser.role !== 'student' && <option value="DRAFT">Bản nháp</option>}
            <option value="REJECTED">Cần chỉnh sửa</option>
          </select>

          {/* Class Filter */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="all">Tất cả các lớp</option>
            <option value="Lớp 4A8">Lớp 4A8</option>
            <option value="Lớp 4A1">Lớp 4A1</option>
            <option value="Lớp 4A2">Lớp 4A2</option>
            <option value="Lớp 4A3">Lớp 4A3</option>
          </select>

          {/* Category Filter */}
          {categories.length > 0 && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="all">Tất cả chủ đề</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          )}

          <span className="ml-auto text-slate-400 font-medium">
            Hiển thị {posts.length} bài viết
          </span>
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
          <p className="text-slate-500 text-xs font-medium">Đang tải danh sách bài viết từ hệ thống...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-heading font-bold text-slate-700 text-base">Không tìm thấy bài viết nào</h3>
          <p className="text-slate-500 text-xs max-w-md mx-auto">
            Chưa có bài viết nào phù hợp với bộ lọc tìm kiếm. Hãy thử chọn bộ lọc khác hoặc bắt đầu viết bài mới!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => {
            const isAuthor = currentUser.id === post.studentId;
            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group cursor-pointer"
                onClick={() => openPostDetail(post)}
              >
                {/* Post Top Card Bar */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-semibold text-[11px] border border-amber-200/60">
                        {post.category || 'Văn miêu tả'}
                      </span>
                      {post.className && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold text-[11px]">
                          {post.className}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-slate-800 text-base group-hover:text-amber-600 transition line-clamp-1">
                      {post.title}
                    </h3>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0">
                    {post.status === 'APPROVED' && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Đã duyệt</span>
                      </span>
                    )}
                    {post.status === 'SUBMITTED' && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px] border border-amber-200">
                        <Clock className="w-3 h-3" />
                        <span>Chờ duyệt</span>
                      </span>
                    )}
                    {post.status === 'DRAFT' && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] border border-slate-200">
                        <FileEdit className="w-3 h-3" />
                        <span>Bản nháp</span>
                      </span>
                    )}
                    {post.status === 'REJECTED' && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200">
                        <XCircle className="w-3 h-3" />
                        <span>Cần sửa</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Excerpt Body */}
                <div className="p-4 sm:p-5 grow space-y-3">
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-4 leading-relaxed font-serif">
                    {post.content}
                  </p>

                  {/* Teacher Feedback snippet if any */}
                  {post.teacherFeedback && (
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] text-amber-900 space-y-1">
                      <div className="font-bold flex items-center space-x-1 text-amber-800">
                        <MessageSquare className="w-3 h-3" />
                        <span>Lời cô giáo:</span>
                      </div>
                      <p className="line-clamp-2 italic">{post.teacherFeedback}</p>
                    </div>
                  )}
                </div>

                {/* Bottom Card Footer */}
                <div className="px-4 sm:px-5 py-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-700">
                      {post.authorName}
                      {isAuthor && <span className="text-amber-600 ml-1">(Bài của em)</span>}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {post.visibility === 'PRIVATE' && <span title="Riêng tư"><Lock className="w-3 h-3 text-slate-400" /></span>}
                    {post.visibility === 'CLASS' && <span title="Lớp học"><Users className="w-3 h-3 text-blue-500" /></span>}
                    {post.visibility === 'SCHOOL' && <span title="Toàn trường"><School className="w-3 h-3 text-emerald-500" /></span>}
                    {post.visibility === 'PUBLIC' && <span title="Công khai"><Globe className="w-3 h-3 text-purple-500" /></span>}

                    <span>
                      {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-scale-up">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between bg-amber-50/40">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                    {selectedPost.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold text-xs">
                    {selectedPost.className || 'Lớp 4A8'}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                    selectedPost.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                    selectedPost.status === 'SUBMITTED' ? 'bg-amber-100 text-amber-800' :
                    selectedPost.status === 'DRAFT' ? 'bg-slate-100 text-slate-700' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {selectedPost.status === 'APPROVED' ? 'Đã duyệt xuất bản' :
                     selectedPost.status === 'SUBMITTED' ? 'Đang chờ duyệt' :
                     selectedPost.status === 'DRAFT' ? 'Bản nháp' : 'Cần sửa đổi'}
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-slate-800 text-xl sm:text-2xl mt-1">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center space-x-3 text-xs text-slate-500 pt-0.5">
                  <span>Tác giả: <strong className="text-slate-700">{selectedPost.authorName}</strong></span>
                  <span>•</span>
                  <span>Ngày gửi: {new Date(selectedPost.createdAt).toLocaleDateString('vi-VN')}</span>
                  {selectedPost.teacherScore !== undefined && (
                    <>
                      <span>•</span>
                      <span className="text-amber-700 font-bold">Điểm số: {selectedPost.teacherScore}/10</span>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* Essay Content */}
              <div className="bg-amber-50/20 p-5 rounded-2xl border border-amber-200/50">
                <div className="font-serif text-slate-800 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                  {selectedPost.content}
                </div>
              </div>

              {/* Teacher Feedback Section */}
              {selectedPost.teacherFeedback && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 space-y-2">
                  <div className="font-bold flex items-center space-x-1.5 text-amber-800">
                    <MessageSquare className="w-4 h-4" />
                    <span>Nhận xét sư phạm của Giáo viên:</span>
                  </div>
                  <p className="leading-relaxed italic pl-1 border-l-2 border-amber-400">
                    {selectedPost.teacherFeedback}
                  </p>
                </div>
              )}

              {/* Teacher Review Action Box (visible to teachers & admin) */}
              {(currentUser.role === 'teacher' || currentUser.role === 'admin') && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h4 className="font-heading font-bold text-slate-800 text-sm flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Duyệt & Đánh giá bài viết (Lưu trực tiếp vào Google Sheets)</span>
                  </h4>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setReviewAction('approve')}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                          reviewAction === 'approve'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        ✓ Duyệt xuất bản
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewAction('request_edit')}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                          reviewAction === 'request_edit'
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        ✍️ Yêu cầu chỉnh sửa
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewAction('reject')}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                          reviewAction === 'reject'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        ✕ Từ chối bài
                      </button>
                    </div>

                    {reviewAction === 'approve' && (
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="font-semibold text-slate-600">Phạm vi hiển thị:</span>
                        <select
                          value={reviewVisibility}
                          onChange={(e: any) => setReviewVisibility(e.target.value)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs"
                        >
                          <option value="CLASS">Lớp học ({selectedPost.className || 'Lớp 4A8'})</option>
                          <option value="SCHOOL">Toàn trường</option>
                          <option value="PUBLIC">Công khai toàn hệ thống</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Lời nhận xét / Góp ý cho học sinh:
                      </label>
                      <textarea
                        value={teacherComment}
                        onChange={(e) => setTeacherComment(e.target.value)}
                        placeholder="Nhập lời khen, điểm sáng tạo và gợi ý hoàn thiện câu chữ cho em học sinh..."
                        rows={3}
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-amber-500 bg-white"
                      />
                    </div>

                    <button
                      onClick={handleReviewPost}
                      disabled={isReviewing}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow transition cursor-pointer flex items-center space-x-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isReviewing ? 'Đang lưu vào Google Sheets...' : 'Lưu kết quả duyệt bài'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* POST_HISTORY Log Section */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h4 className="font-heading font-bold text-slate-700 text-xs flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Lịch sử thao tác (Sheet POST_HISTORY)</span>
                </h4>

                {historyLoading ? (
                  <p className="text-xs text-slate-400">Đang tải lịch sử...</p>
                ) : postHistory.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Chưa có bản ghi lịch sử bổ sung.</p>
                ) : (
                  <div className="space-y-2">
                    {postHistory.map((hist, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-700">{hist.actorName || hist.actorId}</span>
                          <span className="text-slate-500 mx-1.5">•</span>
                          <span className="px-1.5 py-0.5 rounded-sm bg-slate-200/80 text-slate-700 font-semibold text-[10px]">
                            {hist.action}
                          </span>
                          <p className="text-slate-600 text-[11px] mt-0.5">{hist.note}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {new Date(hist.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}, {new Date(hist.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
