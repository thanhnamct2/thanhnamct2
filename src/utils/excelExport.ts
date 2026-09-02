import * as XLSX from 'xlsx';
import { StudentProfile } from '../types';

export function formatStudentProfileForExcel(profile: StudentProfile) {
  return {
    'Trường': profile.schoolName || '',
    'Năm học': profile.academicYear || '',
    'Lớp': profile.className || '',
    'Họ và tên': profile.fullName || '',
    'Giới tính': profile.gender || '',
    'Số điện thoại (Zalo)': profile.phoneZalo || '',
    'Gmail': profile.gmail || '',
    'Ngày sinh': profile.birthDate || '',
    'Nơi sinh': profile.birthPlace || '',
    'Dân tộc': profile.ethnicity || 'Kinh',
    'Đoàn viên': profile.isYouthUnionMember === true ? 'Có' : profile.isYouthUnionMember === false ? 'Không' : '',
    'Địa chỉ': profile.address || '',
    'Điện thoại bàn': profile.homePhone || '',
    'Số anh chị em': profile.siblingCount || '',
    'Là con thứ': profile.childOrder || '',
    'Hoàn cảnh gia đình': profile.familyCircumstance || '',
    'Phương tiện đi lại': profile.transportation || '',
    'Biển số xe': profile.licensePlate || '',
    'Rèn luyện năm trước': profile.conductLastYear || '',
    'Học lực năm trước': profile.academicLastYear || '',
    'Điểm TBM năm trước': profile.gpaLastYear || '',
    'Điểm tuyển sinh 10': profile.grade10AdmissionScore || '',
    'Môn còn hạn chế': profile.weakSubjects || '',
    'Năng khiếu, sở trường': profile.talents || '',
    'Mục tiêu năm học': profile.goals || '',
    'Thành tích / Nhiệm vụ': profile.achievements || '',
    'Họ tên cha': profile.fatherName || '',
    'Năm sinh cha': profile.fatherBirthYear || '',
    'Nghề nghiệp cha': profile.fatherJob || '',
    'SĐT cha': profile.fatherPhone || '',
    'Địa chỉ cha': profile.fatherAddress || '',
    'Họ tên mẹ': profile.motherName || '',
    'Năm sinh mẹ': profile.motherBirthYear || '',
    'Nghề nghiệp mẹ': profile.motherJob || '',
    'SĐT mẹ': profile.motherPhone || '',
    'Địa chỉ mẹ': profile.motherAddress || '',
    'Hiện sống với ai': profile.livingWith || '',
    'Họ tên người giám hộ': profile.guardianName || '',
    'Nghề nghiệp giám hộ': profile.guardianJob || '',
    'SĐT giám hộ': profile.guardianPhone || '',
    'Địa chỉ giám hộ': profile.guardianAddress || '',
    'Ngày ký': profile.signDate || ''
  };
}

export function exportSingleProfileToExcel(profile: StudentProfile) {
  const row = formatStudentProfileForExcel(profile);
  const worksheet = XLSX.utils.json_to_sheet([row]);
  
  // Set auto column width
  const keys = Object.keys(row);
  worksheet['!cols'] = keys.map(k => ({ wch: Math.max(k.length + 4, 18) }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'SoYeuLyLich');

  const fileName = `SoYeuLyLich_${(profile.fullName || 'HocSinh').replace(/\s+/g, '_')}_${profile.className || 'Lop'}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

export function exportMultipleProfilesToExcel(profiles: StudentProfile[]) {
  if (!profiles || profiles.length === 0) return;
  
  const data = profiles.map((p, index) => ({
    'STT': index + 1,
    ...formatStudentProfileForExcel(p)
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const keys = Object.keys(data[0]);
  worksheet['!cols'] = keys.map(k => ({ wch: Math.max(k.length + 4, 16) }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'DanhSachHocSinh');

  const dateStr = new Date().toISOString().split('T')[0];
  const fileName = `DanhSach_SoYeuLyLich_${dateStr}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}
