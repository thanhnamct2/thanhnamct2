import React, { useState, useMemo } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  QrCode, 
  ExternalLink, 
  Sparkles,
  MessageSquare,
  School,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Info
} from 'lucide-react';
import { getPublicShareUrl } from '../utils/urlHelper';

interface ShareLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentClass: string;
  schoolName: string;
  academicYear: string;
}

export const ShareLinkModal: React.FC<ShareLinkModalProps> = ({
  isOpen,
  onClose,
  currentClass,
  schoolName,
  academicYear
}) => {
  const [selectedClass, setSelectedClass] = useState(currentClass || '10A1');
  const [isCopied, setIsCopied] = useState(false);
  const [isMsgCopied, setIsMsgCopied] = useState(false);

  // Compute public shareable URL without auth requirement
  const shareableUrl = useMemo(() => {
    return getPublicShareUrl(selectedClass, schoolName);
  }, [selectedClass, schoolName]);

  // Pre-composed message for Zalo / SMS / Group chat
  const templateMessage = useMemo(() => {
    return `[THÔNG BÁO TỪ ${schoolName.toUpperCase() || 'NHÀ TRƯỜNG'}]
Kính gửi Quý phụ huynh và các em học sinh lớp ${selectedClass || '...'},
Năm học: ${academicYear || '2025 - 2026'}

Nhà trường mở cổng tiếp nhận Sơ yếu lý lịch học sinh trực tuyến.
👉 Link điền hồ sơ: ${shareableUrl}

📌 Lưu ý: 
- Mở link là vào điền được ngay (KHÔNG CẦN ĐĂNG NHẬP EMAIL hay tài khoản).
- Điền trên điện thoại hoặc máy tính đều được.
- Sau khi nhấn "Lưu thông tin", hệ thống sẽ tự động lưu và cho phép tải bản in PDF A4. Trân trọng cảm ơn!`;
  }, [schoolName, selectedClass, academicYear, shareableUrl]);

  if (!isOpen) return null;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Fallback
      const input = document.getElementById('share-url-input') as HTMLInputElement;
      input?.select();
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(templateMessage);
      setIsMsgCopied(true);
      setTimeout(() => setIsMsgCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Simple QR code using public reliable QR API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareableUrl)}&margin=8`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto">
        
        {/* Header */}
        <div className="px-6 py-4 bg-linear-to-r from-indigo-700 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold">Link Điền Hồ Sơ Cho Học Sinh</h2>
                <span className="bg-emerald-500/30 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/40">
                  Không cần đăng nhập
                </span>
              </div>
              <p className="text-xs text-indigo-200">Học sinh chỉ cần bấm link là vào điền và nộp ngay</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          
          {/* Important Highlight Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-emerald-800">Đã cấu hình truy cập công khai 100%</div>
              <div className="text-emerald-700 mt-0.5 text-[11.5px]">
                Đường dẫn bên dưới là <strong>Link công khai trực tiếp</strong>. Học sinh và phụ huynh mở trên bất kỳ thiết bị nào (điện thoại Zalo, máy tính) <strong>đều không bị hỏi mật khẩu hay yêu cầu đăng nhập Gmail/Google</strong>.
              </div>
            </div>
          </div>

          {/* Class selection for tailored link */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              1. Chọn lớp học để tạo link riêng (Tùy chọn):
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {['10A1', '10A2', '10A3', '10A4', '11A1', '11A2', '12A1', 'Tất cả'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedClass(c === 'Tất cả' ? '' : c)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    (selectedClass === c || (!selectedClass && c === 'Tất cả'))
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {c === 'Tất cả' ? 'Mặc định chung' : `Lớp ${c}`}
                </button>
              ))}
              <input
                type="text"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                placeholder="Nhập tên lớp khác..."
                className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white w-32 focus:outline-hidden focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Shareable Link Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              2. Đường dẫn công khai cho học sinh & phụ huynh:
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  id="share-url-input"
                  type="text"
                  readOnly
                  value={shareableUrl}
                  className="w-full pl-3 pr-24 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-800 select-all focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
                <a
                  href={shareableUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 p-1 flex items-center gap-1 text-[11px] font-semibold"
                  title="Mở thử link trong tab mới"
                >
                  <span>Thử</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyUrl}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl transition-all shadow-xs shrink-0 ${
                  isCopied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Đã chép Link!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sao chép Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Code & Zalo Message Side-by-Side */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            
            {/* QR Code */}
            <div className="sm:col-span-1 bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col items-center justify-center text-center">
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs mb-2">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code Sơ yếu lý lịch" 
                  className="w-32 h-32 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                <QrCode className="w-3 h-3 text-indigo-600" />
                <span>Quét mã QR bằng ĐT</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Mở Zalo hoặc Camera để quét</div>
            </div>

            {/* Ready-to-copy Chat Message */}
            <div className="sm:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Mẫu tin nhắn gởi Zalo / Nhóm lớp</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                  >
                    {isMsgCopied ? (
                      <span className="text-emerald-600 flex items-center gap-0.5 font-bold">
                        <Check className="w-3 h-3" /> Đã chép tin!
                      </span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Chép mẫu tin
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={5}
                  value={templateMessage}
                  className="w-full text-[11px] bg-white border border-slate-200 rounded-lg p-2 text-slate-600 font-mono resize-none focus:outline-hidden"
                />
              </div>
              <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Dữ liệu học sinh nhập sẽ lập tức lưu lên hệ thống theo thời gian thực.</span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Trạng thái lưu trữ: <strong className="text-emerald-700">Firestore Cloud (Tự động)</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
