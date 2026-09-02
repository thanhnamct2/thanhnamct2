import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Trash2, 
  FileSpreadsheet, 
  Search, 
  X, 
  Clock, 
  Plus, 
  FolderOpen, 
  CheckCircle2,
  Cloud,
  HardDrive,
  Share2,
  FileDown,
  Filter,
  RefreshCw,
  Printer
} from 'lucide-react';
import { StudentProfile } from '../types';

interface SavedProfilesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProfiles: StudentProfile[]; // Local or unified
  onlineProfiles: StudentProfile[]; // Firestore online list
  currentProfileId: string;
  onSelectProfile: (profile: StudentProfile) => void;
  onDeleteProfile: (id: string, isOnline: boolean) => void;
  onNewProfile: () => void;
  onExportAll: (profilesToExport: StudentProfile[]) => void;
  onOpenShareModal: () => void;
  onPrintProfileDirect: (profile: StudentProfile) => void;
  isOnlineConnected: boolean;
}

export const SavedProfilesDrawer: React.FC<SavedProfilesDrawerProps> = ({
  isOpen,
  onClose,
  savedProfiles,
  onlineProfiles,
  currentProfileId,
  onSelectProfile,
  onDeleteProfile,
  onNewProfile,
  onExportAll,
  onOpenShareModal,
  onPrintProfileDirect,
  isOnlineConnected
}) => {
  const [activeTab, setActiveTab] = useState<'online' | 'local'>('online');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');

  if (!isOpen) return null;

  const currentList = activeTab === 'online' ? onlineProfiles : savedProfiles;

  // Extract all unique classes for filtering
  const availableClasses = useMemo(() => {
    const set = new Set<string>();
    currentList.forEach(p => {
      if (p.className && p.className.trim()) {
        set.add(p.className.trim());
      }
    });
    return Array.from(set).sort();
  }, [currentList]);

  // Filtered profiles
  const filtered = currentList.filter(p => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = (
      (p.fullName && p.fullName.toLowerCase().includes(term)) ||
      (p.className && p.className.toLowerCase().includes(term)) ||
      (p.phoneZalo && p.phoneZalo.includes(term)) ||
      (p.address && p.address.toLowerCase().includes(term)) ||
      (p.schoolName && p.schoolName.toLowerCase().includes(term))
    );

    const matchesClass = selectedClassFilter === 'all' || p.className === selectedClassFilter;

    return matchesSearch && matchesClass;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      
      {/* Slide-over panel */}
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold border border-indigo-400/30">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  Quản Lý Hồ Sơ Học Sinh
                </h3>
                {isOnlineConnected && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-300">
                {onlineProfiles.length} hồ sơ nộp trực tuyến • {savedProfiles.length} lưu trên máy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenShareModal}
              className="px-2.5 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors flex items-center gap-1 shadow-xs"
              title="Gởi link tiếp nhận cho học sinh"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gởi link</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switch: Cloud vs Local */}
        <div className="flex border-b border-slate-200 bg-slate-100 p-1 gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('online')}
            className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'online'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Cloud className="w-3.5 h-3.5 text-indigo-600" />
            <span>Hồ sơ trực tuyến Cloud</span>
            <span className="ml-1 px-1.5 py-0.2 bg-indigo-100 text-indigo-800 rounded-full text-[10px]">
              {onlineProfiles.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('local')}
            className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'local'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5 text-slate-500" />
            <span>Lưu trên máy này</span>
            <span className="ml-1 px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-full text-[10px]">
              {savedProfiles.length}
            </span>
          </button>
        </div>

        {/* Toolbar: Search & Class Filter */}
        <div className="p-3.5 border-b border-slate-200 space-y-2.5 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm tên học sinh, lớp, SĐT..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all"
              />
            </div>

            {/* Class filter dropdown */}
            <select
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="py-1.5 px-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">Tất cả lớp ({currentList.length})</option>
              {availableClasses.map((cls) => (
                <option key={cls} value={cls}>
                  Lớp {cls}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onNewProfile();
                onClose();
              }}
              className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tạo biểu mẫu mới</span>
            </button>
            
            {filtered.length > 0 && (
              <button
                type="button"
                onClick={() => onExportAll(filtered)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-colors"
                title={`Xuất ${filtered.length} hồ sơ đang lọc ra file Excel (.xlsx)`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                <span>Xuất Excel ({filtered.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Profiles List */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FolderOpen className="w-12 h-12 mx-auto mb-2 opacity-40 text-slate-400" />
              <p className="text-xs font-semibold text-slate-700">Chưa có hồ sơ nào</p>
              <p className="text-[11px] mt-1 text-slate-500 max-w-xs mx-auto">
                {activeTab === 'online' 
                  ? 'Gởi đường link cho học sinh để các em tự điền và nộp trực tiếp lên hệ thống.'
                  : 'Hồ sơ lưu trữ tạm thời trên trình duyệt hiện tại.'}
              </p>
              {activeTab === 'online' && (
                <button
                  type="button"
                  onClick={onOpenShareModal}
                  className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 rounded-lg shadow-xs hover:bg-indigo-700"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Gởi link cho học sinh ngay</span>
                </button>
              )}
            </div>
          ) : (
            filtered.map((item) => {
              const isCurrent = item.id === currentProfileId;
              const isOnlineItem = activeTab === 'online';

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-indigo-50/70 border-indigo-300 ring-1 ring-indigo-200'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-xs text-slate-900 uppercase truncate">
                          {item.fullName || '(Chưa điền tên)'}
                        </span>
                        {item.gender && (
                          <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-medium text-slate-600">
                            {item.gender}
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                          {item.className || 'Chưa rõ lớp'}
                        </span>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Đang mở
                          </span>
                        )}
                      </div>
                      
                      <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span>SĐT: <strong>{item.phoneZalo || '—'}</strong></span>
                        {item.birthDate && <span>• Ngày sinh: {item.birthDate}</span>}
                        {item.transportation && <span>• Xe: {item.transportation}</span>}
                      </div>

                      <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Cập nhật: {new Date(item.updatedAt || item.createdAt || Date.now()).toLocaleString('vi-VN')}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          onPrintProfileDirect(item);
                        }}
                        className="p-1.5 text-slate-600 hover:text-indigo-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Xem & Xuất PDF A4 hồ sơ này"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectProfile(item);
                          onClose();
                        }}
                        className="px-2.5 py-1 text-xs font-bold text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-md border border-indigo-200 transition-colors"
                        title="Nạp hồ sơ này lên biểu mẫu chính để xem/sửa"
                      >
                        Mở
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteProfile(item.id, isOnlineItem)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Xóa hồ sơ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1">
            <Cloud className="w-3.5 h-3.5 text-indigo-600" />
            <span>Hệ thống cơ sở dữ liệu thời gian thực (Real-time Firestore)</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-white border border-slate-300 rounded font-semibold text-slate-700 hover:bg-slate-100"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
