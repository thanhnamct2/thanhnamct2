import React from 'react';
import { School, GraduationCap, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { StudentProfile } from '../types';

interface SchoolHeaderConfigProps {
  profile: StudentProfile;
  onChange: (field: keyof StudentProfile, value: any) => void;
  completionRate: number;
  missingRequiredCount: number;
}

export const SchoolHeaderConfig: React.FC<SchoolHeaderConfigProps> = ({
  profile,
  onChange,
  completionRate,
  missingRequiredCount,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      
      {/* Top row: School and Document Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50/80 px-3 py-1 rounded-full border border-indigo-100 mb-2.5">
          <School className="w-3 h-3 text-indigo-600" />
          Hồ sơ lưu trữ nhà trường
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 uppercase">
          SƠ YẾU LÝ LỊCH HỌC SINH
        </h2>
        <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">
          Năm học {profile.academicYear || '2025 - 2026'} • {profile.schoolName || 'Trường THPT Châu Thành 2'}
        </p>
      </div>

      {/* Input controls for School, Class, Academic Year */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 pb-5 border-t border-b border-slate-100">
        
        {/* School Name */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <School className="w-3 h-3 text-slate-400" />
            Tên Trường
          </label>
          <input
            id="input-school-name"
            type="text"
            value={profile.schoolName}
            onChange={(e) => onChange('schoolName', e.target.value)}
            placeholder="VD: Trường THPT Châu Thành 2"
            className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        {/* Class Name */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <GraduationCap className="w-3 h-3 text-indigo-600" />
            Lớp học <span className="text-rose-500">*</span>
          </label>
          <input
            id="input-class-name"
            type="text"
            value={profile.className}
            onChange={(e) => onChange('className', e.target.value)}
            placeholder="VD: 10A1"
            className="px-3 py-2 border border-slate-200 rounded text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        {/* Academic Year */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            Năm học
          </label>
          <input
            id="input-academic-year"
            type="text"
            value={profile.academicYear}
            onChange={(e) => onChange('academicYear', e.target.value)}
            placeholder="VD: 2025-2026"
            className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Progress Bar & Status */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {missingRequiredCount === 0 ? (
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Đã điền đủ các mục bắt buộc
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              Còn {missingRequiredCount} mục thông tin cần hoàn tất
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Tiến độ:</span>
          <div className="w-32 bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 rounded-full ${
                completionRate >= 100 ? 'bg-emerald-500' : 'bg-indigo-600'
              }`}
              style={{ width: `${Math.min(100, completionRate)}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-800 min-w-[32px] text-right">
            {completionRate}%
          </span>
        </div>
      </div>

    </div>
  );
};
