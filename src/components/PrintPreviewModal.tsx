import React, { useState } from 'react';
import { FileDown, FileSpreadsheet, X, FileText, Printer, Loader2, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '../types';
import { exportElementToPdf } from '../utils/pdfExport';

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onExportExcel: () => void;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  profile,
  onExportExcel
}) => {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    try {
      setIsExportingPdf(true);
      setExportSuccess(false);
      await exportElementToPdf('authentic-print-page', profile);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Không thể tạo tệp PDF lúc này. Bạn có thể sử dụng nút "In trực tiếp" để lưu dạng PDF.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '..................................';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      
      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Toolbar (hidden in print) */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 gap-3 no-print">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Bản Xem Trước & Xuất File PDF (A4)
              </h3>
              <p className="text-xs text-slate-500">
                Tương thích chuẩn Adobe Acrobat • Chuẩn font tiếng Việt • Trình bày khoa học
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2 justify-end w-full sm:w-auto">
            <button
              onClick={onExportExcel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
              title="Xuất bảng tính Excel (.xlsx)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Xuất Excel</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              title="In trực tiếp hoặc Lưu dạng PDF qua trình duyệt"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>In trực tiếp</span>
            </button>

            {/* Primary PDF Download Action */}
            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-lg shadow-xs transition-colors"
              title="Tải tệp PDF về máy mở trong Adobe Acrobat"
            >
              {isExportingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang tạo PDF...</span>
                </>
              ) : exportSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Đã tải PDF!</span>
                </>
              ) : (
                <>
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Tải File PDF (.pdf)</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors ml-1"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 print:bg-white print:p-0">
          
          {/* Authentic A4 Paper Canvas */}
          <div 
            id="authentic-print-page"
            className="max-w-[840px] mx-auto bg-white p-6 sm:p-10 shadow-lg print:shadow-none print:p-4 print:max-w-full font-viet-serif font-serif text-[13px] leading-[1.65] text-black border border-slate-200 print:border-none"
          >
            
            {/* Header: School & Title */}
            <div className="mb-4">
              <div className="font-bold text-[14px]">
                {profile.schoolName || 'Trường THPT Châu Thành 2'}
              </div>
              <div className="text-center mt-2 mb-4">
                <h1 className="font-bold text-[16px] tracking-wide uppercase inline-block">
                  SƠ YẾU LÝ LỊCH HỌC SINH LỚP{' '}
                  <span className="border-b border-dotted border-black px-4 font-bold">
                    {profile.className || '.............'}
                  </span>
                  {' '}
                  ({profile.academicYear || '2025-2026'})
                </h1>
              </div>
            </div>

            {/* 2-Column Content Layout (Matching original document layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              
              {/* === LEFT COLUMN: I. Phần bản thân (Mục 1 - 10) === */}
              <div>
                <div className="font-bold text-[13.5px] mb-2">
                  I. Phần bản thân:
                </div>

                {/* 1. Họ và tên, Nam/nữ, SĐT, Gmail */}
                <div className="mb-1">
                  <span>1. Họ và tên: </span>
                  <span className="font-bold border-b border-dotted border-black inline-block min-w-[140px] text-blue-900">
                    {profile.fullName || '.............................................'}
                  </span>
                  <span className="ml-2">Nam/nữ: </span>
                  <span className="font-semibold border-b border-dotted border-black inline-block min-w-[50px] text-center">
                    {profile.gender || '.........'}
                  </span>
                </div>

                <div className="mb-1">
                  <span>Số điện thoại (Zalo): </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[100px]">
                    {profile.phoneZalo || '................................'}
                  </span>
                  <span className="ml-1">Gmail: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[100px]">
                    {profile.gmail || '................................'}
                  </span>
                </div>

                {/* 2. Ngày sinh, Nơi sinh */}
                <div className="mb-1">
                  <span>2. Ngày, tháng, năm sinh: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[90px]">
                    {formatDate(profile.birthDate)}
                  </span>
                  <span className="ml-2">Nơi sinh: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[90px]">
                    {profile.birthPlace || '........................'}
                  </span>
                </div>

                {/* 3. Dân tộc, Đoàn viên */}
                <div className="mb-1">
                  <span>3. Dân tộc: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[70px]">
                    {profile.ethnicity || 'Kinh'}
                  </span>
                  <span className="ml-2">Là Đoàn viên TNCS HCM: </span>
                  <span>Có [ {profile.isYouthUnionMember === true ? 'X' : ' '} ], </span>
                  <span>không [ {profile.isYouthUnionMember === false ? 'X' : ' '} ]</span>
                </div>

                {/* 4. Địa chỉ, Điện thoại */}
                <div className="mb-1">
                  <span>4. Địa chỉ: </span>
                  <span className="border-b border-dotted border-black inline-block w-[calc(100%-70px)]">
                    {profile.address || '....................................................................................................'}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="border-b border-dotted border-black inline-block min-w-[150px]">
                    &nbsp;
                  </span>
                  <span className="ml-1">Điện thoại: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[110px]">
                    {profile.homePhone || '........................'}
                  </span>
                </div>

                {/* 5. Số anh chị em, con thứ mấy */}
                <div className="mb-1">
                  <span>5. Số anh, chị, em: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[60px] text-center">
                    {profile.siblingCount || '............'}
                  </span>
                  <span className="ml-2">Là con thứ mấy: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[60px] text-center">
                    {profile.childOrder || '............'}
                  </span>
                </div>

                {/* 6. Hoàn cảnh gia đình */}
                <div className="mb-1">
                  <span>6. Hoàn cảnh gia đình (Thương binh, Liệt sĩ, hộ nghèo, cận nghèo, mồ côi, cha mẹ ly thân, khuyết tật, khó khăn – Nêu thật cụ thể):</span>
                  <div className="border-b border-dotted border-black min-h-[22px] mt-0.5">
                    {profile.familyCircumstance || '...................................................................................................................................'}
                  </div>
                  <div className="border-b border-dotted border-black min-h-[22px]">
                    &nbsp;
                  </div>
                </div>

                {/* 7. Phương tiện đến lớp & Biển số xe */}
                <div className="mb-1">
                  <span>7. Phương tiện đến lớp: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[150px] font-medium">
                    {profile.transportation || '............................................'}
                  </span>
                </div>
                <div className="text-[12px] text-red-600 print:text-black italic mb-1 font-semibold">
                  (Bắt buộc phải đảm bảo quy định pháp luật về an toàn giao thông)
                </div>
                <div className="mb-1">
                  <span>Biển số xe (nếu là xe máy/mô tô): </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[130px]">
                    {profile.licensePlate || '........................................'}
                  </span>
                </div>

                {/* 8. Xếp loại 2 mặt năm học trước */}
                <div className="mb-1">
                  <span>8. Xếp loại 2 mặt ở năm học trước:</span>
                  <div className="pl-3 mt-0.5">
                    <span>Rèn luyện: </span>
                    <span className="border-b border-dotted border-black inline-block min-w-[50px] text-center">
                      {profile.conductLastYear || '.........'}
                    </span>
                    <span className="ml-2">Học lực: </span>
                    <span className="border-b border-dotted border-black inline-block min-w-[50px] text-center">
                      {profile.academicLastYear || '.........'}
                    </span>
                    <span className="ml-1">, điểm TBM: </span>
                    <span className="border-b border-dotted border-black inline-block min-w-[40px] text-center font-bold">
                      {profile.gpaLastYear || '.........'}
                    </span>
                  </div>
                  <div className="pl-3 mt-0.5">
                    <span>Điểm xét tuyển vào lớp 10 (đ/v HS lớp 10): </span>
                    <span className="border-b border-dotted border-black inline-block min-w-[60px] text-center font-bold">
                      {profile.grade10AdmissionScore || '..................'}
                    </span>
                  </div>
                </div>

                {/* 9. Môn còn hạn chế */}
                <div className="mb-1">
                  <span>9. Các môn học còn hạn chế (nếu có): </span>
                  <span className="border-b border-dotted border-black inline-block w-[calc(100%-215px)]">
                    {profile.weakSubjects || '................................................'}
                  </span>
                </div>

                {/* 10. Năng khiếu, sở trường */}
                <div className="mb-1">
                  <span>10. Năng khiếu, sở trường: </span>
                  <span className="border-b border-dotted border-black inline-block w-[calc(100%-150px)]">
                    {profile.talents || '........................................................'}
                  </span>
                </div>

              </div>

              {/* === RIGHT COLUMN: I (tiếp: 11, 12) & II. Phần gia đình === */}
              <div>
                {/* 11. Mong muốn mục tiêu */}
                <div className="mb-1">
                  <span>11. Mong muốn, mục tiêu đặt ra trong năm học: </span>
                  <div className="border-b border-dotted border-black min-h-[22px]">
                    {profile.goals || '....................................................................................................................'}
                  </div>
                  <div className="border-b border-dotted border-black min-h-[22px]">
                    &nbsp;
                  </div>
                </div>

                {/* 12. Nhiệm vụ tham gia, thành tích */}
                <div className="mb-2">
                  <span>12. Các nhiệm vụ đã tham gia, thành tích các năm học trước: </span>
                  <div className="border-b border-dotted border-black min-h-[22px]">
                    {profile.achievements || '....................................................................................................................'}
                  </div>
                  <div className="border-b border-dotted border-black min-h-[22px]">
                    &nbsp;
                  </div>
                </div>

                {/* II. Phần gia đình */}
                <div className="font-bold text-[13.5px] mt-2 mb-1.5">
                  II. Phần gia đình
                </div>

                {/* 1. Họ tên cha */}
                <div className="mb-1">
                  <span>1. Họ, tên cha: </span>
                  <span className="font-semibold border-b border-dotted border-black inline-block min-w-[150px]">
                    {profile.fatherName || '................................................'}
                  </span>
                  <span className="ml-1">Năm sinh: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[45px] text-center">
                    {profile.fatherBirthYear || '............'}
                  </span>
                </div>
                <div className="mb-1 pl-3">
                  <span>Nghề nghiệp: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[110px]">
                    {profile.fatherJob || '................................'}
                  </span>
                  <span className="ml-1">Số ĐT: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[90px]">
                    {profile.fatherPhone || '........................'}
                  </span>
                </div>
                <div className="mb-1 pl-3">
                  <span>Địa chỉ: </span>
                  <span className="border-b border-dotted border-black inline-block w-[calc(100%-60px)]">
                    {profile.fatherAddress || '............................................................................................'}
                  </span>
                </div>

                {/* 2. Họ tên mẹ */}
                <div className="mb-1 mt-1.5">
                  <span>2. Họ, tên mẹ: </span>
                  <span className="font-semibold border-b border-dotted border-black inline-block min-w-[150px]">
                    {profile.motherName || '................................................'}
                  </span>
                  <span className="ml-1">Năm sinh: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[45px] text-center">
                    {profile.motherBirthYear || '............'}
                  </span>
                </div>
                <div className="mb-1 pl-3">
                  <span>Nghề nghiệp: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[110px]">
                    {profile.motherJob || '................................'}
                  </span>
                  <span className="ml-1">Số ĐT: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[90px]">
                    {profile.motherPhone || '........................'}
                  </span>
                </div>
                <div className="mb-1 pl-3">
                  <span>Địa chỉ: </span>
                  <span className="border-b border-dotted border-black inline-block w-[calc(100%-60px)]">
                    {profile.motherAddress || '............................................................................................'}
                  </span>
                </div>

                {/* 3. Hiện đang sống với ai */}
                <div className="mb-1 mt-1.5">
                  <span>3. Hiện đang sống với ai? </span>
                  <span className="font-semibold border-b border-dotted border-black inline-block min-w-[160px]">
                    {profile.livingWith || '....................................................'}
                  </span>
                </div>

                <div className="italic text-[12px] text-slate-700 print:text-black mb-1">
                  Nếu không sống với ba mẹ thì điền các thông tin sau đây:
                </div>
                <div className="mb-1 pl-3">
                  <span>Họ, tên người nuôi dưỡng: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[140px]">
                    {profile.guardianName || '................................................'}
                  </span>
                </div>
                <div className="mb-1 pl-3">
                  <span>Nghề nghiệp: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[100px]">
                    {profile.guardianJob || '................................'}
                  </span>
                  <span className="ml-1">Số ĐT: </span>
                  <span className="border-b border-dotted border-black inline-block min-w-[90px]">
                    {profile.guardianPhone || '........................'}
                  </span>
                </div>
                <div className="mb-2 pl-3">
                  <span>Địa chỉ: </span>
                  <span className="border-b border-dotted border-black inline-block w-[calc(100%-60px)]">
                    {profile.guardianAddress || '............................................................................................'}
                  </span>
                </div>

              </div>

            </div>

            {/* Footer Signature Layout matching bottom of image.png */}
            <div className="mt-8 pt-4 grid grid-cols-2 gap-8 text-center break-inside-avoid">
              
              {/* Left Side: Mẹ & Cha */}
              <div className="flex flex-col justify-between min-h-[140px]">
                <div>
                  <div className="font-bold text-[13px]">
                    Chữ ký, họ tên của Mẹ
                  </div>
                  <div className="text-[12px] italic">
                    (hoặc Người nuôi dưỡng)
                  </div>
                </div>

                {profile.motherSignature && (
                  <div className="flex justify-center my-1">
                    <img
                      src={profile.motherSignature}
                      alt="Chữ ký"
                      className="h-10 object-contain"
                    />
                  </div>
                )}

                <div className="font-bold text-[13px] mt-6">
                  {profile.motherSignerName || profile.motherName || profile.guardianName || '................................................'}
                </div>

                <div className="mt-8">
                  <div className="font-bold text-[13px]">
                    Chữ ký, họ tên của Cha
                  </div>
                  
                  {profile.fatherSignature && (
                    <div className="flex justify-center my-1">
                      <img
                        src={profile.fatherSignature}
                        alt="Chữ ký cha"
                        className="h-10 object-contain"
                      />
                    </div>
                  )}

                  <div className="font-bold text-[13px] mt-6">
                    {profile.fatherSignerName || profile.fatherName || '................................................'}
                  </div>
                </div>
              </div>

              {/* Right Side: Học sinh */}
              <div className="flex flex-col justify-between min-h-[140px]">
                <div>
                  <div className="text-[12px] italic mb-1">
                    Ngày {new Date(profile.signDate || Date.now()).getDate()} tháng {new Date(profile.signDate || Date.now()).getMonth() + 1} năm {new Date(profile.signDate || Date.now()).getFullYear()}
                  </div>
                  <div className="font-bold text-[13px]">
                    Chữ ký, họ tên của HS
                  </div>
                </div>

                {profile.studentSignature && (
                  <div className="flex justify-center my-2">
                    <img
                      src={profile.studentSignature}
                      alt="Chữ ký HS"
                      className="h-12 object-contain"
                    />
                  </div>
                )}

                <div className="font-bold text-[13px] mt-8 text-blue-950">
                  {profile.studentSignerName || profile.fullName || '................................................'}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 no-print">
          <span>* Tệp PDF tải về có thể mở xem và in ấn trực tiếp trên Adobe Acrobat Reader, Foxit Reader hoặc trình duyệt web.</span>
          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Tải ngay tệp PDF (.pdf) →</span>
          </button>
        </div>

      </div>
    </div>
  );
};
