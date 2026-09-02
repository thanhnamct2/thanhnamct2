export interface StudentProfile {
  id: string;
  createdAt: string;
  updatedAt: string;

  // Header info
  schoolName: string;
  className: string;
  academicYear: string;

  // I. Phần bản thân
  fullName: string;
  gender: 'Nam' | 'Nữ' | '';
  phoneZalo: string;
  gmail: string;
  birthDate: string;
  birthPlace: string;
  ethnicity: string;
  isYouthUnionMember: boolean | null; // Đoàn viên TNCS HCM: Có / Không
  address: string;
  homePhone: string;
  siblingCount: string; // Số anh, chị, em
  childOrder: string; // Là con thứ mấy
  familyCircumstance: string; // Hoàn cảnh gia đình (Thương binh, Liệt sĩ, hộ nghèo, cận nghèo...)
  familyCircumstanceTags: string[];

  transportation: string; // Phương tiện đến lớp
  licensePlate: string; // Biển số xe (nếu là xe máy/mô tô)

  // Xếp loại 2 mặt năm trước
  conductLastYear: string; // Rèn luyện (Hạnh kiểm): Tốt / Khá / Đạt / Chưa đạt
  academicLastYear: string; // Học lực: Xuất sắc / Giỏi / Khá / Đạt / Chưa đạt
  gpaLastYear: string; // Điểm TBM
  grade10AdmissionScore: string; // Điểm xét tuyển vào lớp 10

  weakSubjects: string; // Các môn học còn hạn chế (nếu có)
  talents: string; // Năng khiếu, sở trường
  goals: string; // Mong muốn, mục tiêu đặt ra trong năm học
  achievements: string; // Các nhiệm vụ đã tham gia, thành tích các năm học trước

  // II. Phần gia đình
  fatherName: string;
  fatherBirthYear: string;
  fatherJob: string;
  fatherPhone: string;
  fatherAddress: string;

  motherName: string;
  motherBirthYear: string;
  motherJob: string;
  motherPhone: string;
  motherAddress: string;

  livingWith: string; // Hiện đang sống với ai

  // Nếu không sống với ba mẹ
  guardianName: string;
  guardianBirthYear?: string;
  guardianJob: string;
  guardianPhone: string;
  guardianAddress: string;

  // Chữ ký
  studentSignature: string;
  studentSignerName: string;
  fatherSignature: string;
  fatherSignerName: string;
  motherSignature: string;
  motherSignerName: string;
  signDate: string;
}

export type ValidationErrors = Partial<Record<keyof StudentProfile, string>>;
