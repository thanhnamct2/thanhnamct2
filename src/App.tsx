import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Save, 
  Plus, 
  FileDown, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  FileSpreadsheet,
  Share2,
  Cloud,
  CheckCircle2,
  Users,
  Sparkles,
  Loader2
} from 'lucide-react';
import { StudentProfile, ValidationErrors } from './types';
import { emptyProfile, sampleProfile1 } from './data/sampleData';
import { Header } from './components/Header';
import { SchoolHeaderConfig } from './components/SchoolHeaderConfig';
import { StudentPersonalSection } from './components/StudentPersonalSection';
import { FamilySection } from './components/FamilySection';
import { SignatureSection } from './components/SignatureSection';
import { PrintPreviewModal } from './components/PrintPreviewModal';
import { SavedProfilesDrawer } from './components/SavedProfilesDrawer';
import { StandaloneHtmlModal } from './components/StandaloneHtmlModal';
import { ShareLinkModal } from './components/ShareLinkModal';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { exportSingleProfileToExcel, exportMultipleProfilesToExcel } from './utils/excelExport';
import { exportElementToPdf } from './utils/pdfExport';
import { 
  saveProfileToFirestore, 
  subscribeToOnlineProfiles, 
  deleteProfileFromFirestore 
} from './lib/firebase';

const STORAGE_KEY_CURRENT = 'student_profile_current_v2';
const STORAGE_KEY_PROFILES = 'student_profiles_list_v2';

export default function App() {
  // Check URL parameters for customized link e.g. ?class=10A1&school=...
  const urlParams = useMemo(() => {
    try {
      const search = window.location.search;
      return new URLSearchParams(search);
    } catch {
      return new URLSearchParams();
    }
  }, []);

  const paramClass = urlParams.get('class') || urlParams.get('lop') || '';
  const paramSchool = urlParams.get('school') || urlParams.get('truong') || '';
  const isStudentSharedMode = Boolean(paramClass || paramSchool);

  // Current Profile state
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (paramClass) parsed.className = paramClass;
        if (paramSchool) parsed.schoolName = paramSchool;
        return parsed;
      }
    } catch (e) {
      console.error('Error loading current profile from storage:', e);
    }
    return { 
      ...sampleProfile1, 
      id: 'profile-' + Date.now(),
      className: paramClass || sampleProfile1.className,
      schoolName: paramSchool || sampleProfile1.schoolName
    };
  });

  // Local Saved Profiles List (Backup)
  const [savedProfiles, setSavedProfiles] = useState<StudentProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading profiles list:', e);
    }
    return [{ ...sampleProfile1, id: 'sample-1' }];
  });

  // Cloud Firestore Online Profiles List (Real-Time)
  const [onlineProfiles, setOnlineProfiles] = useState<StudentProfile[]>([]);
  const [isOnlineConnected, setIsOnlineConnected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modals state
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isStandaloneModalOpen, setIsStandaloneModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  // Notification Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Real-time Firebase Firestore synchronization
  useEffect(() => {
    const unsubscribe = subscribeToOnlineProfiles(
      (list) => {
        setOnlineProfiles(list);
        setIsOnlineConnected(true);
      },
      (err) => {
        console.warn('Firebase sync warning:', err);
        setIsOnlineConnected(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Save current profile to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving current profile:', e);
    }
  }, [profile]);

  // Save profiles list to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(savedProfiles));
    } catch (e) {
      console.error('Error saving profiles list:', e);
    }
  }, [savedProfiles]);

  // Handle single field change
  const handleFieldChange = (field: keyof StudentProfile, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString()
    }));
  };

  // Validation
  const errors: ValidationErrors = useMemo(() => {
    const errs: ValidationErrors = {};
    if (!profile.fullName?.trim()) errs.fullName = 'Họ và tên học sinh là bắt buộc';
    if (!profile.birthDate) errs.birthDate = 'Vui lòng chọn ngày sinh';
    if (!profile.birthPlace?.trim()) errs.birthPlace = 'Vui lòng nhập nơi sinh';
    if (!profile.address?.trim()) errs.address = 'Vui lòng nhập địa chỉ';
    if (!profile.phoneZalo?.trim()) errs.phoneZalo = 'Vui lòng nhập số điện thoại (Zalo)';
    return errs;
  }, [profile.fullName, profile.birthDate, profile.birthPlace, profile.address, profile.phoneZalo]);

  // Completion calculation
  const { completionRate, missingRequiredCount } = useMemo(() => {
    const requiredKeys: (keyof StudentProfile)[] = [
      'fullName', 
      'gender', 
      'birthDate', 
      'birthPlace', 
      'phoneZalo', 
      'address',
      'className',
      'transportation',
      'livingWith'
    ];
    let filled = 0;
    let missing = 0;
    requiredKeys.forEach(k => {
      if (profile[k] && String(profile[k]).trim().length > 0) {
        filled++;
      } else {
        missing++;
      }
    });

    const percent = Math.round((filled / requiredKeys.length) * 100);
    return { completionRate: percent, missingRequiredCount: missing };
  }, [profile]);

  const isFormValid = missingRequiredCount === 0;

  // Actions
  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ thông tin đang có để nhập hồ sơ mới?')) {
      const resetP = {
        ...emptyProfile,
        id: 'hs-' + Date.now(),
        className: paramClass || '10A1',
        schoolName: paramSchool || 'Trường THPT Châu Thành 2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProfile(resetP);
      showToast('Đã xóa dữ liệu cũ, sẵn sàng nhập hồ sơ mới!', 'info');
    }
  };

  // Main Submit Action: Saves to Firebase Firestore and local backup
  const handleSaveProfile = async () => {
    if (!profile.fullName?.trim()) {
      showToast('Vui lòng nhập Họ và tên học sinh trước khi lưu/nộp!', 'error');
      const el = document.getElementById('input-full-name');
      el?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const currentId = profile.id || `hs-${Date.now()}`;
      const updatedProfile: StudentProfile = {
        ...profile,
        id: currentId,
        studentSignerName: profile.studentSignerName || profile.fullName,
        fatherSignerName: profile.fatherSignerName || profile.fatherName,
        motherSignerName: profile.motherSignerName || profile.motherName,
        updatedAt: new Date().toISOString(),
        createdAt: profile.createdAt || new Date().toISOString()
      };

      setProfile(updatedProfile);

      // 1. Save to Cloud Firestore
      try {
        await saveProfileToFirestore(updatedProfile);
        setIsOnlineConnected(true);
      } catch (firestoreErr) {
        console.warn('Firestore cloud save failed or offline:', firestoreErr);
      }

      // 2. Save to Local storage backup list
      setSavedProfiles(prev => {
        const idx = prev.findIndex(p => p.id === currentId);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = updatedProfile;
          return next;
        } else {
          return [updatedProfile, ...prev];
        }
      });

      // Show success modal and toast
      setIsSuccessModalOpen(true);
      showToast(`🎉 Đã nộp và lưu hồ sơ học sinh "${profile.fullName}" thành công lên hệ thống!`, 'success');

    } catch (err) {
      console.error('Error saving profile:', err);
      showToast('Có lỗi xảy ra khi lưu hồ sơ. Dữ liệu vẫn được lưu tạm trên máy.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportExcel = () => {
    try {
      exportSingleProfileToExcel(profile);
      showToast('Đã xuất file Excel (.xlsx) thành công!', 'success');
    } catch (err) {
      console.error('Error exporting excel:', err);
      showToast('Có lỗi xảy ra khi xuất file Excel!', 'error');
    }
  };

  const handleSelectSavedProfile = (p: StudentProfile) => {
    setProfile(p);
    showToast(`Đã nạp hồ sơ của "${p.fullName || 'Học sinh'}"`, 'info');
  };

  const handleDeleteProfile = async (id: string, isOnline: boolean) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hồ sơ này?')) {
      if (isOnline) {
        try {
          await deleteProfileFromFirestore(id);
          showToast('Đã xóa hồ sơ khỏi hệ thống trực tuyến Cloud.', 'info');
        } catch (e) {
          console.error('Error deleting from Firestore:', e);
          showToast('Lỗi khi xóa từ Cloud!', 'error');
        }
      } else {
        setSavedProfiles(prev => prev.filter(p => p.id !== id));
        showToast('Đã xóa hồ sơ khỏi bộ nhớ máy.', 'info');
      }
    }
  };

  const handleNewProfile = () => {
    const newP: StudentProfile = {
      ...emptyProfile,
      id: 'hs-' + Date.now(),
      className: paramClass || '10A1',
      schoolName: paramSchool || 'Trường THPT Châu Thành 2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProfile(newP);
    showToast('Đã tạo một biểu mẫu hồ sơ mới.', 'info');
  };

  const handleExportAll = (profilesToExport: StudentProfile[]) => {
    try {
      const list = profilesToExport && profilesToExport.length > 0 
        ? profilesToExport 
        : (onlineProfiles.length > 0 ? onlineProfiles : savedProfiles);

      if (list.length === 0) {
        showToast('Chưa có hồ sơ nào để xuất!', 'error');
        return;
      }
      exportMultipleProfilesToExcel(list);
      showToast(`Đã xuất toàn bộ ${list.length} hồ sơ ra file Excel (.xlsx)!`, 'success');
    } catch (err) {
      console.error('Error exporting all profiles to excel:', err);
      showToast('Có lỗi khi xuất danh sách ra Excel!', 'error');
    }
  };

  // Direct print preview for any profile from drawer
  const handlePrintProfileDirect = (targetProfile: StudentProfile) => {
    setProfile(targetProfile);
    setIsPrintModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Header Bar */}
      <Header
        onReset={handleReset}
        onPrintPreview={() => setIsPrintModalOpen(true)}
        onExportExcel={handleExportExcel}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenStandaloneHtml={() => setIsStandaloneModalOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        savedCount={savedProfiles.length}
        onlineCount={onlineProfiles.length}
        isOnlineConnected={isOnlineConnected}
        isFormValid={isFormValid}
      />

      {/* Student Link Notice Banner */}
      {isStudentSharedMode && (
        <div className="bg-indigo-700 text-white px-4 py-2.5 shadow-sm text-center text-xs font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-300 shrink-0" />
          <span>
            Chào mừng học sinh lớp <strong className="underline decoration-indigo-300">{paramClass || profile.className}</strong>. Vui lòng điền đầy đủ các mục bên dưới và nhấn <strong>"Lưu thông tin"</strong> khi hoàn tất.
          </span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 pb-28">
        
        {/* Toast Notification */}
        {toast && (
          <div 
            id="toast-notification"
            className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-medium border animate-in fade-in slide-in-from-bottom-3 duration-150 ${
              toast.type === 'success' 
                ? 'bg-slate-900 text-white border-slate-800' 
                : toast.type === 'error'
                ? 'bg-rose-900 text-white border-rose-800'
                : 'bg-slate-900 text-white border-slate-800'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <FileText className="w-4 h-4 text-indigo-400 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        )}

        {/* Quick Online Statistics Bar for Teachers */}
        <div className="mb-4 bg-white rounded-xl border border-slate-200 p-3 sm:px-5 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <Cloud className="w-4 h-4 text-indigo-600" />
              <span>Hệ thống tiếp nhận Cloud:</span>
            </div>
            <div className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-800 px-2.5 py-0.5 rounded-full font-bold">
              <Users className="w-3 h-3" />
              <span>{onlineProfiles.length} học sinh đã nộp</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Gởi link cho học sinh lớp khác</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSavedDrawerOpen(true)}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded hover:bg-slate-100 transition-colors"
            >
              <span>Xem danh sách nộp →</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
          
          {/* School & Class Config */}
          <SchoolHeaderConfig
            profile={profile}
            onChange={handleFieldChange}
            completionRate={completionRate}
            missingRequiredCount={missingRequiredCount}
          />

          {/* Section I: Phần bản thân */}
          <StudentPersonalSection
            profile={profile}
            onChange={handleFieldChange}
            errors={errors}
          />

          {/* Section II: Phần gia đình */}
          <FamilySection
            profile={profile}
            onChange={handleFieldChange}
          />

          {/* Signature Section */}
          <SignatureSection
            profile={profile}
            onChange={handleFieldChange}
          />

          {/* Bottom Submit Toolbar */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-20">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              <span className="font-semibold text-slate-700">Tự động lưu:</span> Thông tin sẽ được lưu trực tiếp vào cơ sở dữ liệu và cho phép tải file PDF bất kỳ lúc nào.
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center flex-wrap">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title="Xóa trắng thông tin để nhập hồ sơ mới"
              >
                <Plus className="w-3.5 h-3.5 text-indigo-600" />
                <span>Nhập mới</span>
              </button>

              <button
                type="button"
                onClick={handleExportExcel}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                title="Xuất hồ sơ hiện tại ra Excel"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Xuất Excel</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPrintModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
                title="Xem trước và xuất bản in PDF chuẩn A4"
              >
                <FileDown className="w-3.5 h-3.5 text-indigo-600" />
                <span>Xuất PDF A4</span>
              </button>
              
              {/* PRIMARY SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang lưu lên hệ thống...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>LƯU THÔNG TIN</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </main>

      {/* Floating Action Bar on Mobile */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 sm:hidden z-40 flex items-center justify-around gap-2 shadow-lg">
        <button
          type="button"
          onClick={() => setIsShareModalOpen(true)}
          className="flex flex-col items-center text-[10px] font-semibold text-indigo-600 px-2"
          title="Gởi link cho học sinh"
        >
          <Share2 className="w-4 h-4" />
          <span>Gởi link</span>
        </button>

        <button
          type="button"
          onClick={() => setIsPrintModalOpen(true)}
          className="flex flex-col items-center text-[10px] font-medium text-slate-600 px-2"
          title="Xuất PDF A4"
        >
          <FileDown className="w-4 h-4 text-indigo-600" />
          <span>Xuất PDF</span>
        </button>

        <button
          type="button"
          onClick={handleSaveProfile}
          disabled={isSubmitting}
          className="flex-1 py-2.5 px-3 text-xs font-bold text-white bg-indigo-600 rounded-lg flex items-center justify-center gap-1.5 shadow-md"
        >
          {isSubmitting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>Lưu thông tin</span>
        </button>
      </div>

      {/* Print Preview Modal */}
      <PrintPreviewModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        profile={profile}
        onExportExcel={handleExportExcel}
      />

      {/* Saved & Online Profiles Drawer */}
      <SavedProfilesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedProfiles={savedProfiles}
        onlineProfiles={onlineProfiles}
        currentProfileId={profile.id}
        onSelectProfile={handleSelectSavedProfile}
        onDeleteProfile={handleDeleteProfile}
        onNewProfile={handleNewProfile}
        onExportAll={handleExportAll}
        onOpenShareModal={() => {
          setIsSavedDrawerOpen(false);
          setIsShareModalOpen(true);
        }}
        onPrintProfileDirect={handlePrintProfileDirect}
        isOnlineConnected={isOnlineConnected}
      />

      {/* Share Link & QR Code Modal */}
      <ShareLinkModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        currentClass={profile.className || '10A1'}
        schoolName={profile.schoolName || 'Trường THPT Châu Thành 2'}
        academicYear={profile.academicYear || '2025 - 2026'}
      />

      {/* Submission Success Confirmation Modal */}
      <SubmissionSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        profile={profile}
        onExportPdf={() => setIsPrintModalOpen(true)}
        onPrintPreview={() => setIsPrintModalOpen(true)}
        onNewProfile={handleNewProfile}
      />

      {/* Standalone 1-File HTML Code Modal */}
      <StandaloneHtmlModal
        isOpen={isStandaloneModalOpen}
        onClose={() => setIsStandaloneModalOpen(false)}
        profile={profile}
      />

    </div>
  );
}
