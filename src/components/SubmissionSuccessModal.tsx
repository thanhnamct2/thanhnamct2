import React from 'react';
import { 
  CheckCircle2, 
  FileDown, 
  Printer, 
  Plus, 
  Share2, 
  Sparkles, 
  ExternalLink,
  X,
  FileCheck
} from 'lucide-react';
import { StudentProfile } from '../types';

interface SubmissionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onExportPdf: () => void;
  onPrintPreview: () => void;
  onNewProfile: () => void;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  isOpen,
  onClose,
  profile,
  onExportPdf,
  onPrintPreview,
  onNewProfile
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto text-center">
        
        {/* Top Celebration Banner */}
        <div className="p-6 bg-linear-to-b from-emerald-500 to-emerald-700 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto shadow-lg mb-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-xl font-bold">ĐÃ NỘP HỒ SƠ THÀNH CÔNG!</h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-xs mx-auto">
            Thông tin Sơ yếu lý lịch đã được lưu trực tiếp lên hệ thống quản lý của {profile.schoolName || 'Nhà trường'}.
          </p>
        </div>

        {/* Student Receipt Card */}
        <div className="p-6 space-y-4 text-left">
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs text-slate-500">Họ và tên học sinh:</span>
              <span className="text-sm font-bold text-slate-800 uppercase">{profile.fullName || '—'}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs text-slate-500">Lớp:</span>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                {profile.className || '—'}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs text-slate-500">Số điện thoại (Zalo):</span>
              <span className="text-xs font-semibold text-slate-700">{profile.phoneZalo || '—'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Thời gian lưu:</span>
              <span className="text-xs text-slate-600 font-mono">
                {new Date().toLocaleTimeString('vi-VN')} - {new Date().toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            {/* Download PDF button */}
            <button
              type="button"
              onClick={() => {
                onExportPdf();
              }}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <FileDown className="w-4 h-4" />
              <span>TẢI FILE PDF BẢN IN CỦA EM (CHUẨN A4)</span>
            </button>

            {/* Print preview button */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onPrintPreview();
              }}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Xem trước bản in A4 / In ra máy in</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              onNewProfile();
            }}
            className="text-xs font-medium text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nhập hồ sơ học sinh khác</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors"
          >
            Hoàn tất & Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
