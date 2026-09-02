import React from 'react';
import { 
  Users, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Home, 
  ShieldCheck, 
  Copy, 
  UserCheck
} from 'lucide-react';
import { StudentProfile } from '../types';

interface FamilySectionProps {
  profile: StudentProfile;
  onChange: (field: keyof StudentProfile, value: any) => void;
}

export const FamilySection: React.FC<FamilySectionProps> = ({
  profile,
  onChange
}) => {
  const isNotLivingWithParents = profile.livingWith !== 'Ba mẹ';

  const copyStudentAddressToFather = () => {
    if (profile.address) {
      onChange('fatherAddress', profile.address);
    }
  };

  const copyFatherAddressToMother = () => {
    if (profile.fatherAddress) {
      onChange('motherAddress', profile.fatherAddress);
    }
  };

  const copyStudentAddressToGuardian = () => {
    if (profile.address) {
      onChange('guardianAddress', profile.address);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      
      {/* Section Header */}
      <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-6 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
          II. Phần thông tin gia đình (Mục 1 - 3)
        </span>
        <span className="text-[11px] font-medium text-slate-400 normal-case hidden sm:inline">
          Thông tin cha mẹ, người giám hộ và nơi ở hiện tại
        </span>
      </h2>

      <div className="space-y-6">

        {/* 1. THÔNG TIN CHA */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              1. Thông tin Cha
            </p>
            {profile.address && (
              <button
                type="button"
                onClick={copyStudentAddressToFather}
                className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                title="Lấy địa chỉ của học sinh điền vào"
              >
                <Copy className="w-3 h-3" />
                Lấy địa chỉ từ HS
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Họ tên cha */}
            <div className="md:col-span-8 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Họ, tên cha
              </label>
              <input
                id="input-father-name"
                type="text"
                value={profile.fatherName}
                onChange={(e) => {
                  onChange('fatherName', e.target.value);
                  if (!profile.fatherSignerName) {
                    onChange('fatherSignerName', e.target.value);
                  }
                }}
                placeholder="NGUYỄN VĂN B"
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Năm sinh cha */}
            <div className="md:col-span-4 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Năm sinh
              </label>
              <input
                id="input-father-birth-year"
                type="number"
                min="1930"
                max="2015"
                value={profile.fatherBirthYear}
                onChange={(e) => onChange('fatherBirthYear', e.target.value)}
                placeholder="VD: 1980"
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Nghề nghiệp cha */}
            <div className="md:col-span-6 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-slate-400" />
                Nghề nghiệp
              </label>
              <input
                id="input-father-job"
                type="text"
                value={profile.fatherJob}
                onChange={(e) => onChange('fatherJob', e.target.value)}
                placeholder="VD: Làm nông, kinh doanh, công chức..."
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Số ĐT cha */}
            <div className="md:col-span-6 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                Số ĐT liên lạc
              </label>
              <input
                id="input-father-phone"
                type="tel"
                value={profile.fatherPhone}
                onChange={(e) => onChange('fatherPhone', e.target.value)}
                placeholder="VD: 0903112233"
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Địa chỉ cha */}
            <div className="md:col-span-12 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                Địa chỉ của cha
              </label>
              <input
                id="input-father-address"
                type="text"
                value={profile.fatherAddress}
                onChange={(e) => onChange('fatherAddress', e.target.value)}
                placeholder="Số nhà, ấp/đường, xã/phường, quận/huyện..."
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

          </div>
        </div>

        {/* 2. THÔNG TIN MẸ */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              2. Thông tin Mẹ
            </p>
            <div className="flex items-center gap-2">
              {profile.fatherAddress && (
                <button
                  type="button"
                  onClick={copyFatherAddressToMother}
                  className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                  title="Sao chép địa chỉ giống Cha"
                >
                  <Copy className="w-3 h-3" />
                  Giống địa chỉ Cha
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Họ tên mẹ */}
            <div className="md:col-span-8 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Họ, tên mẹ
              </label>
              <input
                id="input-mother-name"
                type="text"
                value={profile.motherName}
                onChange={(e) => {
                  onChange('motherName', e.target.value);
                  if (!profile.motherSignerName) {
                    onChange('motherSignerName', e.target.value);
                  }
                }}
                placeholder="TRẦN THỊ C"
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Năm sinh mẹ */}
            <div className="md:col-span-4 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Năm sinh
              </label>
              <input
                id="input-mother-birth-year"
                type="number"
                min="1930"
                max="2015"
                value={profile.motherBirthYear}
                onChange={(e) => onChange('motherBirthYear', e.target.value)}
                placeholder="VD: 1983"
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Nghề nghiệp mẹ */}
            <div className="md:col-span-6 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-slate-400" />
                Nghề nghiệp
              </label>
              <input
                id="input-mother-job"
                type="text"
                value={profile.motherJob}
                onChange={(e) => onChange('motherJob', e.target.value)}
                placeholder="VD: Giáo viên, nội trợ, kinh doanh..."
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Số ĐT mẹ */}
            <div className="md:col-span-6 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                Số ĐT liên lạc
              </label>
              <input
                id="input-mother-phone"
                type="tel"
                value={profile.motherPhone}
                onChange={(e) => onChange('motherPhone', e.target.value)}
                placeholder="VD: 0908778899"
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Địa chỉ mẹ */}
            <div className="md:col-span-12 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                Địa chỉ của mẹ
              </label>
              <input
                id="input-mother-address"
                type="text"
                value={profile.motherAddress}
                onChange={(e) => onChange('motherAddress', e.target.value)}
                placeholder="Số nhà, ấp/đường, xã/phường, quận/huyện..."
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

          </div>
        </div>

        {/* 3. HIỆN ĐANG SỐNG VỚI AI & THÔNG TIN NGƯỜI NUÔI DƯỠNG */}
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-indigo-600" />
            3. Hiện đang sống với ai?
          </p>

          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Đối tượng đang cùng sinh sống <span className="text-rose-500">*</span>
              </label>
              <select
                id="select-living-with"
                value={profile.livingWith}
                onChange={(e) => onChange('livingWith', e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
              >
                <option value="Ba mẹ">Ba mẹ (Cả cha và mẹ)</option>
                <option value="Chỉ sống với Ba">Chỉ sống với Ba</option>
                <option value="Chỉ sống với Mẹ">Chỉ sống với Mẹ</option>
                <option value="Ông bà">Ông bà (Nội/Ngoại)</option>
                <option value="Người thân/Người nuôi dưỡng">Người thân / Người nuôi dưỡng</option>
                <option value="Ở trọ / Ký túc xá">Ở trọ / Ký túc xá</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            {/* Conditional Guardian Box */}
            <div className={`p-4 rounded-lg border transition-all ${
              isNotLivingWithParents 
                ? 'bg-slate-50 border-slate-200' 
                : 'bg-slate-50/50 border-slate-100 opacity-60'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>
                    * Nếu không sống với ba mẹ thì điền các thông tin sau đây:
                  </span>
                </div>
                {profile.address && isNotLivingWithParents && (
                  <button
                    type="button"
                    onClick={copyStudentAddressToGuardian}
                    className="text-[11px] font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded transition-colors"
                  >
                    Lấy địa chỉ từ HS
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                
                {/* Họ tên người nuôi dưỡng */}
                <div className="md:col-span-5 flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Họ, tên người nuôi dưỡng
                  </label>
                  <input
                    id="input-guardian-name"
                    type="text"
                    value={profile.guardianName}
                    onChange={(e) => {
                      onChange('guardianName', e.target.value);
                      if (!profile.motherSignerName && isNotLivingWithParents) {
                        onChange('motherSignerName', e.target.value);
                      }
                    }}
                    placeholder="Họ và tên người giám hộ"
                    className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                  />
                </div>

                {/* Nghề nghiệp người nuôi dưỡng */}
                <div className="md:col-span-3 flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Nghề nghiệp
                  </label>
                  <input
                    id="input-guardian-job"
                    type="text"
                    value={profile.guardianJob}
                    onChange={(e) => onChange('guardianJob', e.target.value)}
                    placeholder="Nghề nghiệp"
                    className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                  />
                </div>

                {/* Số ĐT người nuôi dưỡng */}
                <div className="md:col-span-4 flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Số ĐT
                  </label>
                  <input
                    id="input-guardian-phone"
                    type="tel"
                    value={profile.guardianPhone}
                    onChange={(e) => onChange('guardianPhone', e.target.value)}
                    placeholder="VD: 09xxxxxxx"
                    className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                  />
                </div>

                {/* Địa chỉ người nuôi dưỡng */}
                <div className="md:col-span-12 flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Địa chỉ người nuôi dưỡng
                  </label>
                  <input
                    id="input-guardian-address"
                    type="text"
                    value={profile.guardianAddress}
                    onChange={(e) => onChange('guardianAddress', e.target.value)}
                    placeholder="Địa chỉ cư trú của người nuôi dưỡng"
                    className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
