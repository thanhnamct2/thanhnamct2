import React from 'react';
import { 
  FileText, 
  FileDown, 
  FileSpreadsheet, 
  Plus, 
  Users,
  Code2,
  Share2,
  Cloud
} from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onPrintPreview: () => void;
  onExportExcel: () => void;
  onOpenSavedDrawer: () => void;
  onOpenStandaloneHtml: () => void;
  onOpenShareModal: () => void;
  savedCount: number;
  onlineCount: number;
  isOnlineConnected: boolean;
  isFormValid: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onPrintPreview,
  onExportExcel,
  onOpenSavedDrawer,
  onOpenStandaloneHtml,
  onOpenShareModal,
  savedCount,
  onlineCount,
  isOnlineConnected
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-700 to-indigo-500 text-white flex items-center justify-center shadow-xs font-bold shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                SƠ YẾU LÝ LỊCH HỌC SINH
              </h1>
              {isOnlineConnected && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Đã kết nối Cloud
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Học sinh tự điền qua link • Tự động lưu trữ Firestore • Xuất PDF & Excel
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
          
          {/* Share Link for Students (Prominent) */}
          <button
            id="btn-share-student-link"
            type="button"
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-lg shadow-xs transition-all hover:shadow-md"
            title="Tạo mã QR và sao chép link gởi cho học sinh / phụ huynh"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Gởi link cho HS</span>
          </button>

          {/* Online Submissions List */}
          <button
            id="btn-saved-profiles"
            type="button"
            onClick={onOpenSavedDrawer}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors relative shadow-2xs"
            title="Danh sách hồ sơ học sinh đã nộp"
          >
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Hồ sơ đã nộp</span>
            <span className="sm:hidden">Đã nộp</span>
            {(onlineCount > 0 || savedCount > 0) && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold text-white bg-indigo-600 rounded-full">
                {onlineCount || savedCount}
              </span>
            )}
          </button>

          {/* New / Reset */}
          <button
            id="btn-reset-form"
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Xóa thông tin cũ để nhập hồ sơ mới"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline font-semibold">Nhập mới</span>
          </button>

          {/* Standalone 1-File HTML */}
          <button
            id="btn-standalone-html"
            type="button"
            onClick={onOpenStandaloneHtml}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
            title="Mã nguồn 1 File HTML/CSS/JS độc lập để dùng ngay"
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden lg:inline">Mã nguồn 1 File</span>
          </button>

          {/* Export Excel */}
          <button
            id="btn-export-excel"
            type="button"
            onClick={onExportExcel}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
            title="Tải về file bảng tính Excel (.xlsx)"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold hidden sm:inline">Xuất Excel</span>
          </button>

          {/* Export PDF / Preview */}
          <button
            id="btn-print-preview"
            type="button"
            onClick={onPrintPreview}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
            title="Xem trước & Xuất file PDF (khổ A4 chuẩn)"
          >
            <FileDown className="w-3.5 h-3.5 text-indigo-300" />
            <span>Xuất PDF</span>
          </button>

        </div>

      </div>
    </header>
  );
};
