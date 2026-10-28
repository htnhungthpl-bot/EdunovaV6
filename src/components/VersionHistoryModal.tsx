import React, { useState } from 'react';
import { X, History, Clock, FileText, RotateCcw, Copy, Check, Info } from 'lucide-react';
import { WritingVersion } from '../types';

interface VersionHistoryModalProps {
  versions: WritingVersion[];
  onClose: () => void;
  onRestoreVersion: (content: string) => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  versions,
  onClose,
  onRestoreVersion,
}) => {
  const [selectedVersionId, setSelectedVersionId] = useState<string>(
    versions.length > 0 ? versions[versions.length - 1].id : ''
  );
  const [copied, setCopied] = useState(false);

  const selectedVersion = versions.find((v) => v.id === selectedVersionId) || versions[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-amber-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg">
                Lịch sử các phiên bản bài viết
              </h3>
              <p className="text-xs text-slate-400">
                Xem lại tiến trình bài viết qua từng bước luyện viết
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persistence Notice */}
        <div className="p-3 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-center gap-2 px-6">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Ghi chú lưu trữ:</strong> Các phiên bản bài viết được lưu trữ trong bộ nhớ tạm của trình duyệt (Local Storage). Chưa lưu vĩnh viễn trên cơ sở dữ liệu máy chủ.
          </span>
        </div>

        {/* Content Body */}
        <div className="flex flex-col md:flex-row grow overflow-hidden">
          {/* Version List Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 p-4 space-y-2 overflow-y-auto bg-slate-50/50">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Danh sách phiên bản ({versions.length})
            </span>
            {versions.length === 0 ? (
              <div className="text-xs text-slate-400 italic py-4 text-center">
                Chưa có bản lưu nào được tạo.
              </div>
            ) : (
              versions.map((ver, idx) => (
                <button
                  key={ver.id}
                  onClick={() => setSelectedVersionId(ver.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                    ver.id === selectedVersion?.id
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{ver.versionName}</span>
                    <span className={ver.id === selectedVersion?.id ? 'text-amber-100' : 'text-slate-400'}>
                      #{idx + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] mt-1 opacity-85">
                    <Clock className="w-3 h-3" />
                    <span>{ver.timestamp}</span>
                  </div>
                  <div className="text-[11px] mt-0.5 opacity-90">
                    Dung lượng: <strong>{ver.wordCount} từ</strong>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Version Detail View */}
          <div className="grow p-6 overflow-y-auto space-y-4 flex flex-col justify-between">
            {selectedVersion ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {selectedVersion.versionName}
                    </h4>
                    <span className="text-xs text-slate-400">
                      Thời điểm lưu: {selectedVersion.timestamp} • {selectedVersion.wordCount} từ
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(selectedVersion.content)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Khôi phục nội dung phiên bản này vào bài viết hiện tại?')) {
                          onRestoreVersion(selectedVersion.content);
                          onClose();
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Khôi phục bản này</span>
                    </button>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 rounded-2xl bg-[#fffdf9] border border-amber-200 text-slate-800 text-sm leading-loose whitespace-pre-line font-medium min-h-[220px]">
                  {selectedVersion.content}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400 text-sm">
                Hãy lưu bài viết để tạo các phiên bản lịch sử.
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 text-right">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
