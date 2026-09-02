import React from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Flag, 
  Award, 
  Users, 
  HeartHandshake, 
  Bike, 
  BookOpen, 
  Sparkles, 
  Target, 
  Trophy,
  AlertTriangle
} from 'lucide-react';
import { StudentProfile, ValidationErrors } from '../types';

interface StudentPersonalSectionProps {
  profile: StudentProfile;
  onChange: (field: keyof StudentProfile, value: any) => void;
  errors: ValidationErrors;
}

const COMMON_CIRCUMSTANCES = [
  'Bình thường',
  'Hộ nghèo',
  'Hộ cận nghèo',
  'Con Thương binh',
  'Con Liệt sĩ',
  'Mồ côi cha',
  'Mồ côi mẹ',
  'Mồ côi cả cha lẫn mẹ',
  'Cha mẹ ly hôn/ly thân',
  'Khuyết tật',
  'Gia đình khó khăn'
];

const COMMON_SUBJECTS = [
  'Toán',
  'Ngữ Văn',
  'Tiếng Anh',
  'Vật Lý',
  'Hóa Học',
  'Sinh Học',
  'Lịch Sử',
  'Địa Lý',
  'Tin Học',
  'GDKT & PL'
];

export const StudentPersonalSection: React.FC<StudentPersonalSectionProps> = ({
  profile,
  onChange,
  errors
}) => {
  const toggleCircumstanceTag = (tag: string) => {
    let currentTags = profile.familyCircumstanceTags || [];
    let updatedTags: string[];
    
    if (tag === 'Bình thường') {
      updatedTags = ['Bình thường'];
    } else {
      currentTags = currentTags.filter(t => t !== 'Bình thường');
      if (currentTags.includes(tag)) {
        updatedTags = currentTags.filter(t => t !== tag);
      } else {
        updatedTags = [...currentTags, tag];
      }
    }

    onChange('familyCircumstanceTags', updatedTags);
    
    // Auto-update text if empty or only tag
    if (updatedTags.length > 0 && !profile.familyCircumstance) {
      onChange('familyCircumstance', updatedTags.join(', '));
    }
  };

  const addWeakSubject = (subj: string) => {
    const current = profile.weakSubjects ? profile.weakSubjects.split(',').map(s => s.trim()) : [];
    if (!current.includes(subj)) {
      const updated = [...current, subj].filter(Boolean).join(', ');
      onChange('weakSubjects', updated);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      
      {/* Section Header */}
      <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-6 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
          I. Thông tin cá nhân học sinh (Mục 1 - 12)
        </span>
        <span className="text-[11px] font-medium text-slate-400 normal-case hidden sm:inline">
          Vui lòng điền chính xác theo CCCD/Giấy khai sinh
        </span>
      </h2>

      <div className="space-y-6">

        {/* 1. Họ và tên, Giới tính, SĐT (Zalo), Gmail */}
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
            1. Định danh & Liên lạc
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Họ và tên */}
            <div className="md:col-span-8 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Họ và tên học sinh <span className="text-rose-500">*</span>
              </label>
              <input
                id="input-full-name"
                type="text"
                value={profile.fullName}
                onChange={(e) => onChange('fullName', e.target.value)}
                placeholder="NGUYỄN VĂN A"
                className={`px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                  errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-rose-600">{errors.fullName}</p>
              )}
            </div>

            {/* Giới tính */}
            <div className="md:col-span-4 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Giới tính <span className="text-rose-500">*</span>
              </label>
              <select
                id="select-gender"
                value={profile.gender}
                onChange={(e) => onChange('gender', e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            {/* SĐT Zalo */}
            <div className="md:col-span-6 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                Số điện thoại (Zalo) <span className="text-rose-500">*</span>
              </label>
              <input
                id="input-phone-zalo"
                type="tel"
                value={profile.phoneZalo}
                onChange={(e) => onChange('phoneZalo', e.target.value)}
                placeholder="0912345678"
                className={`px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                  errors.phoneZalo ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {errors.phoneZalo && (
                <p className="text-[11px] text-rose-600">{errors.phoneZalo}</p>
              )}
            </div>

            {/* Gmail */}
            <div className="md:col-span-6 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                Gmail / Email
              </label>
              <input
                id="input-gmail"
                type="email"
                value={profile.gmail}
                onChange={(e) => onChange('gmail', e.target.value)}
                placeholder="hocsinh@gmail.com"
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

          </div>
        </div>

        {/* 2 & 3. Ngày sinh, Nơi sinh, Dân tộc, Đoàn viên */}
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
            2 & 3. Ngày sinh, Nơi sinh & Đoàn viên
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Ngày sinh */}
            <div className="md:col-span-4 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Ngày sinh <span className="text-rose-500">*</span>
              </label>
              <input
                id="input-birth-date"
                type="date"
                value={profile.birthDate}
                onChange={(e) => onChange('birthDate', e.target.value)}
                className={`px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                  errors.birthDate ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {errors.birthDate && (
                <p className="text-[11px] text-rose-600">{errors.birthDate}</p>
              )}
            </div>

            {/* Nơi sinh */}
            <div className="md:col-span-8 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                Nơi sinh (Tỉnh / Thành phố) <span className="text-rose-500">*</span>
              </label>
              <input
                id="input-birth-place"
                type="text"
                value={profile.birthPlace}
                onChange={(e) => onChange('birthPlace', e.target.value)}
                placeholder="VD: Đồng Tháp / Hà Nội"
                className={`px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                  errors.birthPlace ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {errors.birthPlace && (
                <p className="text-[11px] text-rose-600">{errors.birthPlace}</p>
              )}
            </div>

            {/* Dân tộc */}
            <div className="md:col-span-6 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Flag className="w-3 h-3 text-slate-400" />
                3. Dân tộc
              </label>
              <input
                id="input-ethnicity"
                type="text"
                value={profile.ethnicity}
                onChange={(e) => onChange('ethnicity', e.target.value)}
                placeholder="Kinh"
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Đoàn viên */}
            <div className="md:col-span-6 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3 h-3 text-slate-400" />
                Đoàn viên TNCS HCM
              </label>
              <select
                id="select-youth-union"
                value={profile.isYouthUnionMember === true ? 'true' : profile.isYouthUnionMember === false ? 'false' : 'false'}
                onChange={(e) => onChange('isYouthUnionMember', e.target.value === 'true')}
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
              >
                <option value="true">Có (Đã kết nạp Đoàn)</option>
                <option value="false">Không (Chưa kết nạp Đoàn)</option>
              </select>
            </div>

          </div>
        </div>

        {/* 4 & 5. Nơi ở & Thứ tự trong gia đình */}
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
            4 & 5. Nơi ở & Gia đình
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Địa chỉ */}
            <div className="md:col-span-8 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                4. Địa chỉ thường trú / tạm trú <span className="text-rose-500">*</span>
              </label>
              <input
                id="input-address"
                type="text"
                value={profile.address}
                onChange={(e) => onChange('address', e.target.value)}
                placeholder="Số nhà, đường/ấp, xã/phường, quận/huyện, tỉnh/TP"
                className={`px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                  errors.address ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {errors.address && (
                <p className="text-[11px] text-rose-600">{errors.address}</p>
              )}
            </div>

            {/* Điện thoại nhà / phụ */}
            <div className="md:col-span-4 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Điện thoại nhà / phụ
              </label>
              <input
                id="input-home-phone"
                type="tel"
                value={profile.homePhone}
                onChange={(e) => onChange('homePhone', e.target.value)}
                placeholder="SĐT cố định/phụ"
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Số anh chị em */}
            <div className="md:col-span-6 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" />
                5. Số anh, chị, em
              </label>
              <input
                id="input-sibling-count"
                type="number"
                min="0"
                value={profile.siblingCount}
                onChange={(e) => onChange('siblingCount', e.target.value)}
                placeholder="VD: 2"
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Là con thứ mấy */}
            <div className="md:col-span-6 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Là con thứ mấy
              </label>
              <input
                id="input-child-order"
                type="number"
                min="1"
                value={profile.childOrder}
                onChange={(e) => onChange('childOrder', e.target.value)}
                placeholder="VD: 1 (con đầu)"
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

          </div>
        </div>

        {/* 6. Hoàn cảnh gia đình */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <HeartHandshake className="w-3 h-3 text-indigo-600" />
            6. Hoàn cảnh gia đình (nêu cụ thể: hộ nghèo, mồ côi, khó khăn...)
          </label>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {COMMON_CIRCUMSTANCES.map((tag) => {
              const isSelected = profile.familyCircumstanceTags?.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleCircumstanceTag(tag)}
                  className={`text-xs px-2.5 py-1 rounded border transition-all ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}
                  {tag}
                </button>
              );
            })}
          </div>

          <textarea
            id="input-family-circumstance"
            rows={2}
            value={profile.familyCircumstance}
            onChange={(e) => onChange('familyCircumstance', e.target.value)}
            placeholder="Nêu thật cụ thể hoàn cảnh gia đình..."
            className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
          />
        </div>

        {/* 7. Phương tiện di chuyển */}
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
            7. Phương tiện đến trường
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Bike className="w-3 h-3 text-slate-400" />
                Phương tiện <span className="text-rose-500">*</span>
              </label>
              <select
                id="select-transportation"
                value={profile.transportation}
                onChange={(e) => onChange('transportation', e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
              >
                <option value="Xe đạp">Xe đạp</option>
                <option value="Xe đạp điện">Xe đạp điện</option>
                <option value="Xe máy dưới 50cc">Xe máy dưới 50cc</option>
                <option value="Xe máy/mô tô trên 50cc">Xe máy / Mô tô (trên 50cc)</option>
                <option value="Đi bộ">Đi bộ</option>
                <option value="Phụ huynh đưa đón">Phụ huynh đưa đón</option>
                <option value="Xe buýt">Xe buýt / Xe tuyến</option>
                <option value="Khác">Khác</option>
              </select>

              <div className="mt-1 flex items-start gap-1 text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Bắt buộc phải đảm bảo quy định pháp luật về an toàn giao thông</span>
              </div>
            </div>

            <div className="md:col-span-6 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Biển số xe (nếu đi xe máy / xe điện)
              </label>
              <input
                id="input-license-plate"
                type="text"
                value={profile.licensePlate}
                onChange={(e) => onChange('licensePlate', e.target.value)}
                placeholder="VD: 66-M1 123.45"
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <span className="text-[11px] text-slate-400">
                Phục vụ công tác quản lý bãi đỗ xe của nhà trường
              </span>
            </div>
          </div>
        </div>

        {/* 8. Xếp loại 2 mặt năm trước */}
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-slate-400" />
            8. Kết quả xếp loại năm học trước
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Rèn luyện (Hạnh kiểm) */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Rèn luyện (Hạnh kiểm)
              </label>
              <select
                id="select-conduct"
                value={profile.conductLastYear}
                onChange={(e) => onChange('conductLastYear', e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
              >
                <option value="Tốt">Tốt</option>
                <option value="Khá">Khá</option>
                <option value="Đạt">Đạt (Trung bình)</option>
                <option value="Chưa đạt">Chưa đạt (Yếu)</option>
              </select>
            </div>

            {/* Học lực */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Học lực
              </label>
              <select
                id="select-academic"
                value={profile.academicLastYear}
                onChange={(e) => onChange('academicLastYear', e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
              >
                <option value="Xuất sắc">Xuất sắc</option>
                <option value="Giỏi">Giỏi</option>
                <option value="Khá">Khá</option>
                <option value="Đạt">Đạt (Trung bình)</option>
                <option value="Chưa đạt">Chưa đạt (Yếu)</option>
              </select>
            </div>

            {/* Điểm TBM */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Điểm TBM cả năm
              </label>
              <input
                id="input-gpa"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={profile.gpaLastYear}
                onChange={(e) => onChange('gpaLastYear', e.target.value)}
                placeholder="VD: 8.5"
                className="px-3 py-2 border border-slate-200 rounded text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Điểm xét tuyển vào lớp 10 */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Điểm tuyển sinh lớp 10
              </label>
              <input
                id="input-admission-score"
                type="number"
                step="0.1"
                min="0"
                value={profile.grade10AdmissionScore}
                onChange={(e) => onChange('grade10AdmissionScore', e.target.value)}
                placeholder="VD: 42.5"
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

          </div>
        </div>

        {/* 9 & 10. Môn hạn chế, Năng khiếu sở trường */}
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
            9 & 10. Môn học còn hạn chế & Năng khiếu
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 9. Môn còn hạn chế */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                9. Môn học còn hạn chế (cần phụ đạo)
              </label>
              <input
                id="input-weak-subjects"
                type="text"
                value={profile.weakSubjects}
                onChange={(e) => onChange('weakSubjects', e.target.value)}
                placeholder="VD: Ngữ Văn, Tiếng Anh..."
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="text-[10px] text-slate-400 mr-1 self-center">Chọn nhanh:</span>
                {COMMON_SUBJECTS.slice(0, 6).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => addWeakSubject(s)}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 10. Năng khiếu sở trường */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-slate-400" />
                10. Năng khiếu, sở trường
              </label>
              <input
                id="input-talents"
                type="text"
                value={profile.talents}
                onChange={(e) => onChange('talents', e.target.value)}
                placeholder="VD: Hội họa, bóng đá, cầu lông, cờ vua, thuyết trình..."
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

          </div>
        </div>

        {/* 11 & 12. Mong muốn mục tiêu & Thành tích */}
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
            11 & 12. Mục tiêu & Thành tích
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 11. Mong muốn mục tiêu */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Target className="w-3 h-3 text-slate-400" />
                11. Mong muốn, mục tiêu trong năm học
              </label>
              <textarea
                id="input-goals"
                rows={3}
                value={profile.goals}
                onChange={(e) => onChange('goals', e.target.value)}
                placeholder="VD: Đạt danh hiệu Học sinh Giỏi, thi đậu chứng chỉ Tin học/Tiếng Anh..."
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
              />
            </div>

            {/* 12. Nhiệm vụ tham gia, thành tích */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Trophy className="w-3 h-3 text-slate-400" />
                12. Nhiệm vụ, thành tích các năm trước
              </label>
              <textarea
                id="input-achievements"
                rows={3}
                value={profile.achievements}
                onChange={(e) => onChange('achievements', e.target.value)}
                placeholder="VD: Lớp phó học tập 4 năm THCS, giải Ba thể thao cấp Huyện..."
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
