import React, { useState, useEffect } from 'react';
import { 
  BookMarked, 
  Plus, 
  Search, 
  Filter, 
  Copy, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  Calendar,
  PenTool
} from 'lucide-react';
import { DbDiamondNote, UserProfile } from '../types';
import { api } from '../utils/api';

interface DiamondNotebookViewProps {
  currentUser: UserProfile;
  onNavigateToWriting?: () => void;
}

export const DiamondNotebookView: React.FC<DiamondNotebookViewProps> = ({
  currentUser,
  onNavigateToWriting,
}) => {
  const [notes, setNotes] = useState<DbDiamondNote[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'quan_sat_that' | 'tuong_tuong' | 'hoc_lieu' | 'goi_y_ai'>('quan_sat_that');
  const [newTags, setNewTags] = useState<string>('cây cối, mùa hè');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await api.getDiamondNotes();
      setNotes(data);
    } catch (err) {
      console.error('Error loading diamond notes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      const tagList = newTags.split(',').map(t => t.trim()).filter(Boolean);
      await api.createDiamondNote({
        title: newTitle.trim(),
        content: newContent.trim(),
        category: newCategory,
        tags: tagList,
      });
      showToast('Đã thêm thẻ chi tiết kim cương vào sổ tay!');
      setShowAddModal(false);
      setNewTitle('');
      setNewContent('');
      loadNotes();
    } catch (err: any) {
      alert(err.message || 'Lỗi lưu thẻ');
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm('Em có chắc chắn muốn xóa thẻ ghi chép này không?')) return;
    try {
      await api.deleteDiamondNote(id);
      showToast('Đã xóa thẻ ghi chép.');
      loadNotes();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi xóa');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Đã sao chép chi tiết! Em có thể dán vào dàn ý hoặc bài viết.');
  };

  const filteredNotes = notes.filter((n) => {
    const matchCat = selectedCategory === 'all' || n.category === selectedCategory;
    const matchSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        n.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchSearch;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'quan_sat_that':
        return { label: '🌿 Quan sát thật', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'tuong_tuong':
        return { label: '🚀 Tưởng tượng', color: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'hoc_lieu':
        return { label: '📚 Học liệu SGK', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'goi_y_ai':
        return { label: '💡 Gợi ý AI', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      default:
        return { label: 'Ghi chép', color: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Sổ tay kim cương • Kho báu ngôn từ của em</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
            Sổ tay gom nhặt chi tiết & ý hay
          </h2>
          <p className="text-purple-100 text-xs sm:text-sm max-w-xl">
            Lưu giữ những câu văn tự viết ưng ý, quan sát chân thực quanh em và các gợi ý đắt giá để đưa vào bài tập làm văn.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Thêm chi tiết mới</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'Tất cả thẻ' },
            { id: 'quan_sat_that', label: '🌿 Quan sát thật' },
            { id: 'tuong_tuong', label: '🚀 Tưởng tượng' },
            { id: 'hoc_lieu', label: '📚 Học liệu SGK' },
            { id: 'goi_y_ai', label: '💡 Gợi ý AI' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-white hover:bg-purple-50 text-slate-600 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm theo từ khóa, chi tiết..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:border-purple-500 outline-hidden w-full sm:w-64"
          />
        </div>
      </div>

      {/* Grid of Diamond Notes */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-300 bg-white space-y-4">
          <BookMarked className="w-12 h-12 text-purple-300 mx-auto" />
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-slate-700 text-base">
              Sổ tay chưa có thẻ ghi chép nào
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Khi đọc sách hoặc quan sát thiên nhiên quanh trường Kim Liên A, em hãy bấm "Thêm chi tiết mới" để cất vào sổ tay nhé!
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm chi tiết kim cương đầu tiên</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => {
            const badge = getCategoryBadge(note.category);
            return (
              <div
                key={note.id}
                className="p-5 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}>
                      {badge.label}
                    </span>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-slate-300 hover:text-red-500 p-1 transition-colors cursor-pointer"
                      title="Xóa thẻ này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-heading font-bold text-slate-800 text-sm">
                    {note.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{note.content}"
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 flex-wrap">
                    {note.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCopy(note.content)}
                    className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                    title="Sao chép câu này"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Sao chép</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-slate-800 text-base">
                Thêm chi tiết kim cương vào sổ tay
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Loại thẻ chi tiết:</label>
                <select
                  value={newCategory}
                  onChange={(e: any) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                >
                  <option value="quan_sat_that">🌿 Quan sát thật (nhìn thấy, chạm vào thực tế)</option>
                  <option value="tuong_tuong">🚀 Tưởng tượng (so sánh, liên tưởng ngộ nghĩnh)</option>
                  <option value="hoc_lieu">📚 Học liệu SGK (câu văn mẫu, ngữ liệu hay)</option>
                  <option value="goi_y_ai">💡 Gợi ý AI (từ khóa do trợ lý gợi mở)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tiêu đề ngắn:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Rễ cây bàng hình con trăn"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nội dung câu / chi tiết:</label>
                <textarea
                  rows={4}
                  placeholder="Ghi lại câu văn hoặc chi tiết đắt giá của em..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 font-medium leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Thẻ phân loại (ngăn cách bằng dấu phẩy):</label>
                <input
                  type="text"
                  placeholder="cây bàng, sân trường, mùa hè"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 font-bold text-slate-700 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 font-bold text-white cursor-pointer shadow-xs"
                >
                  Lưu vào sổ tay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
