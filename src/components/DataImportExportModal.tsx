import React, { useState, useRef } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  RotateCcw, 
  FileJson, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle,
  Copy,
  Info
} from 'lucide-react';
import { Grade4LessonItem } from '../types';
import { RAW_CURRICULUM_DATA } from '../data/grade4CurriculumData';

interface DataImportExportModalProps {
  lessons: Grade4LessonItem[];
  onClose: () => void;
  onUpdateLessons: (lessons: Grade4LessonItem[]) => void;
  onResetToDefault: () => void;
}

export const DataImportExportModal: React.FC<DataImportExportModalProps> = ({
  lessons,
  onClose,
  onUpdateLessons,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'overview'>('overview');
  const [importJsonText, setImportJsonText] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const verifiedCount = lessons.filter(l => l.verificationStatus === 'verified').length;
  const needsVerificationCount = lessons.filter(l => l.verificationStatus === 'needs_verification').length;

  // Export JSON
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(lessons, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `edunova_tiengviet4_kntt_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage({ type: 'success', text: 'Đã xuất file JSON thành công!' });
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Học kì',
      'Tập SGK',
      'Tuần',
      'Bài SGK',
      'Tên bài viết theo SGK',
      'Trang SGK',
      'Kiểu bài',
      'Dạng bài / Chặng',
      'Chủ điểm',
      'Yêu cầu viết / Đề bài',
      'Nhiệm vụ học tập',
      'Trạng thái xác minh',
      'Ghi chú đối chiếu'
    ];

    const escapeCsv = (str: string | number | undefined) => {
      if (str === undefined || str === null) return '""';
      const s = String(str).replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = lessons.map(l => [
      escapeCsv(l.id),
      escapeCsv(l.semester),
      escapeCsv(l.bookVolume),
      escapeCsv(l.week),
      escapeCsv(l.lessonNumber),
      escapeCsv(l.lessonTitle),
      escapeCsv(l.page),
      escapeCsv(l.genre),
      escapeCsv(l.stage),
      escapeCsv(l.theme),
      escapeCsv(l.writingPrompt),
      escapeCsv(l.learningObjective),
      escapeCsv(l.verificationStatus === 'verified' ? 'Đã đối chiếu khớp SGK' : 'Cần giáo viên xác minh'),
      escapeCsv(l.verificationNotes || '')
    ].join(','));

    // UTF-8 BOM for Excel Vietnamese display
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `edunova_tiengviet4_kntt_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage({ type: 'success', text: 'Đã xuất file CSV (Excel) thành công!' });
  };

  // Copy JSON
  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(lessons, null, 2));
    setStatusMessage({ type: 'success', text: 'Đã sao chép toàn bộ dữ liệu JSON vào Clipboard!' });
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].lessonTitle) {
          onUpdateLessons(parsed);
          setStatusMessage({ type: 'success', text: `Đã nhập thành công ${parsed.length} bài học từ file ${file.name}!` });
        } else {
          setStatusMessage({ type: 'error', text: 'Cấu trúc file không đúng định dạng bài học EDUNOVA!' });
        }
      } catch (err) {
        setStatusMessage({ type: 'error', text: 'Lỗi đọc file JSON. Vui lòng kiểm tra lại cấu trúc cú pháp.' });
      }
    };
    reader.readAsText(file);
  };

  // Handle paste JSON import
  const handleApplyPasteImport = () => {
    if (!importJsonText.trim()) {
      setStatusMessage({ type: 'error', text: 'Vui lòng dán dữ liệu JSON vào ô bên dưới.' });
      return;
    }
    try {
      const parsed = JSON.parse(importJsonText);
      if (Array.isArray(parsed) && parsed.length > 0) {
        onUpdateLessons(parsed);
        setStatusMessage({ type: 'success', text: `Đã nạp thành công ${parsed.length} bài học từ dữ liệu JSON!` });
        setImportJsonText('');
      } else {
        setStatusMessage({ type: 'error', text: 'Dữ liệu không phải là một mảng bài học hợp lệ.' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Cú pháp JSON không hợp lệ! Vui lòng kiểm tra dấu ngoặc.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-amber-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-between">
          <div>
            <div className="text-xs bg-white/20 text-white font-bold px-2.5 py-0.5 rounded-full inline-block mb-1">
              Hệ thống quản lí dữ liệu
            </div>
            <h3 className="font-heading text-xl font-bold">
              Nhập, Sửa & Xuất dữ liệu bài học Tiếng Việt 4
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status notification toast */}
        {statusMessage && (
          <div className={`p-3 text-xs font-semibold flex items-center justify-between gap-2 ${
            statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200' : 'bg-rose-50 text-rose-800 border-b border-rose-200'
          }`}>
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
              <span>{statusMessage.text}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 px-6 pt-3 gap-3 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'border-amber-500 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Tổng quan dữ liệu ({lessons.length})
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'export' ? 'border-amber-500 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Xuất dữ liệu (Export)
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'import' ? 'border-amber-500 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Nhập dữ liệu (Import)
          </button>
        </div>

        {/* Tab contents */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Stat counters */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <div className="font-heading text-2xl font-extrabold text-amber-800">{lessons.length}</div>
                  <div className="text-xs text-slate-600 mt-0.5">Tổng số bài học</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="font-heading text-2xl font-extrabold text-emerald-700">{verifiedCount}</div>
                  <div className="text-xs text-slate-600 mt-0.5">Đã khớp SGK</div>
                </div>

                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-center">
                  <div className="font-heading text-2xl font-extrabold text-orange-700">{needsVerificationCount}</div>
                  <div className="text-xs text-slate-600 mt-0.5">Cần giáo viên xác minh</div>
                </div>
              </div>

              {/* Notice regarding Requirement 7 */}
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Nguyên tắc quản lí dữ liệu:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  <li>
                    <strong>Nguồn đối chiếu:</strong> SGK Tiếng Việt 4 Kết nối tri thức (Tập một & Tập hai) cùng tài liệu sư phạm của giáo viên.
                  </li>
                  <li>
                    <strong>Tính lưu trữ:</strong> Dữ liệu chỉnh sửa hoặc nhập mới được đồng bộ vào hệ thống dữ liệu học tập.
                  </li>
                  <li>
                    <strong>Đồng bộ:</strong> Bạn có thể xuất bản sao lưu dự phòng (JSON) bất cứ lúc nào để lưu trữ an toàn.
                  </li>
                </ul>
              </div>

              {/* Reset to Default */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-xs text-rose-900">Khôi phục dữ liệu gốc chuẩn SGK</div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Đặt lại toàn bộ dữ liệu về trạng thái ban đầu được đối chiếu theo SGK.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Bạn có chắc muốn khôi phục về danh mục dữ liệu gốc?')) {
                      onResetToDefault();
                      setStatusMessage({ type: 'success', text: 'Đã khôi phục dữ liệu gốc thành công!' });
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white border border-rose-300 text-rose-700 hover:bg-rose-100 text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Khôi phục gốc
                </button>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Tải xuống bản sao lưu dữ liệu bài học Tiếng Việt lớp 4 để phục vụ công tác đối chiếu hoặc tái sử dụng trên các nền tảng khác.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  onClick={handleExportJSON}
                  className="p-4 rounded-2xl bg-amber-50 border border-amber-300 hover:bg-amber-100 transition-all text-left group cursor-pointer space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <FileJson className="w-7 h-7 text-amber-600 group-hover:scale-110 transition-transform" />
                    <Download className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="font-bold text-sm text-slate-800">Xuất file JSON chuẩn</div>
                  <p className="text-[11px] text-slate-500">
                    Đầy đủ cấu trúc 5 bước, mục tiêu, tiêu chí đánh giá rubric và tài nguyên.
                  </p>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-all text-left group cursor-pointer space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <FileSpreadsheet className="w-7 h-7 text-emerald-600 group-hover:scale-110 transition-transform" />
                    <Download className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="font-bold text-sm text-slate-800">Xuất file CSV / Excel</div>
                  <p className="text-[11px] text-slate-500">
                    Định dạng bảng tính với tiếng Việt UTF-8 chuẩn mở trực tiếp trên Excel.
                  </p>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCopyJSON}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sao chép chuỗi JSON vào Clipboard</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Nhập dữ liệu bài học mới từ file JSON hoặc dán trực tiếp chuỗi JSON vào khung bên dưới.
              </p>

              {/* Upload button */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/50 text-center space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Chọn file JSON từ máy tính
                </button>
                <div className="text-[11px] text-slate-500">Chấp nhận file định dạng .json</div>
              </div>

              {/* Paste textarea */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Hoặc dán trực tiếp mã JSON vào đây:
                </label>
                <textarea
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  rows={4}
                  placeholder='[ { "id": "...", "lessonTitle": "...", ... } ]'
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-800"
                />
                <button
                  onClick={handleApplyPasteImport}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
                >
                  Áp dụng dữ liệu JSON
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
