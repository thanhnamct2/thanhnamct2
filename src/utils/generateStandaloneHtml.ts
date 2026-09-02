import { StudentProfile } from '../types';

export function generateStandaloneHtml(initialData?: StudentProfile): string {
  const data = initialData || {
    schoolName: 'Trường THPT Châu Thành 2',
    academicYear: '2025 - 2026',
    className: '10A1',
    fullName: 'Nguyễn Văn An',
    gender: 'Nam',
    phoneZalo: '0912345678',
    gmail: 'nguyenvanan.ct2@gmail.com',
    birthDate: '2010-05-15',
    birthPlace: 'Huyện Châu Thành, Tỉnh Đồng Tháp',
    ethnicity: 'Kinh',
    isYouthUnionMember: true,
    address: 'Số 125, Ấp Tân Bình, Xã An Nhơn, Huyện Châu Thành',
    homePhone: '02773852145',
    siblingCount: '2',
    childOrder: '1',
    familyCircumstance: 'Gia đình thuần nông, kinh tế ổn định.',
    transportation: 'Xe đạp điện',
    licensePlate: '66-M1 123.45',
    conductLastYear: 'Tốt',
    academicLastYear: 'Giỏi',
    gpaLastYear: '8.8',
    grade10AdmissionScore: '42.5',
    weakSubjects: 'Ngữ Văn',
    talents: 'Chơi cờ vua, thuyết trình, bóng đá',
    goals: 'Đạt danh hiệu Học sinh Giỏi toàn diện, tham gia đội tuyển HSG',
    achievements: 'Lớp phó học tập THCS, Giải Ba Cờ vua cấp Huyện',
    fatherName: 'Nguyễn Văn Bình',
    fatherBirthYear: '1980',
    fatherJob: 'Làm vườn / Nông nghiệp',
    fatherPhone: '0903112233',
    fatherAddress: 'Số 125, Ấp Tân Bình, Xã An Nhơn, Huyện Châu Thành',
    motherName: 'Trần Thị Mai',
    motherBirthYear: '1983',
    motherJob: 'Giáo viên tiểu học',
    motherPhone: '0908778899',
    motherAddress: 'Số 125, Ấp Tân Bình, Xã An Nhơn, Huyện Châu Thành',
    livingWith: 'Ba mẹ',
    guardianName: '',
    guardianJob: '',
    guardianPhone: '',
    guardianAddress: '',
    studentSignerName: 'Nguyễn Văn An',
    fatherSignerName: 'Nguyễn Văn Bình',
    motherSignerName: 'Trần Thị Mai',
    signDate: new Date().toISOString().split('T')[0],
  };

  const jsonString = JSON.stringify(data, null, 2);

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sơ Yếu Lý Lịch Học Sinh - Trường THPT Châu Thành 2</title>
  
  <!-- Google Fonts: Hỗ trợ tiếng Việt sắc nét chuẩn hành chính -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Thư viện html2pdf.js CDN để xuất PDF chuẩn A4 không lỗi font -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

  <style>
    :root {
      --primary: #4338ca;
      --primary-hover: #3730a3;
      --primary-light: #eef2ff;
      --emerald: #059669;
      --emerald-hover: #047857;
      --text: #1e293b;
      --text-muted: #64748b;
      --border: #cbd5e1;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --danger: #dc2626;
      --radius: 10px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 24px 16px;
    }

    .app-container {
      max-width: 920px;
      margin: 0 auto;
      background: var(--card-bg);
      padding: 36px 40px;
      border-radius: var(--radius);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
      border: 1px solid #e2e8f0;
    }

    /* Tiêu đề Quốc hiệu & Trường học */
    .official-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
      text-align: center;
      font-family: "Times New Roman", Times, "Lora", serif;
    }

    .school-side {
      text-align: center;
    }
    .dept-title {
      font-size: 13px;
      text-transform: uppercase;
      font-weight: 600;
      color: #334155;
    }
    .school-name {
      font-size: 14px;
      text-transform: uppercase;
      font-weight: bold;
      color: #0f172a;
      margin-top: 2px;
    }
    .school-divider {
      width: 80px;
      height: 1px;
      background: #0f172a;
      margin: 4px auto 0;
    }

    .country-side {
      text-align: center;
    }
    .country-name {
      font-size: 13px;
      text-transform: uppercase;
      font-weight: bold;
      color: #0f172a;
    }
    .country-motto {
      font-size: 13px;
      font-weight: bold;
      color: #0f172a;
      margin-top: 2px;
    }
    .country-divider {
      width: 120px;
      height: 1px;
      background: #0f172a;
      margin: 4px auto 0;
    }

    .form-main-title {
      text-align: center;
      margin-bottom: 24px;
      font-family: "Times New Roman", Times, "Lora", serif;
    }
    .form-main-title h1 {
      font-size: 20px;
      font-weight: bold;
      text-transform: uppercase;
      color: #0f172a;
      letter-spacing: 0.5px;
    }
    .form-main-title .sub-info {
      font-size: 13.5px;
      font-style: italic;
      color: #475569;
      margin-top: 4px;
    }

    /* Thanh công cụ với nút XUẤT PDF nổi bật */
    .action-toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 28px;
      background: #f1f5f9;
      padding: 12px 18px;
      border-radius: var(--radius);
      border: 1px solid #e2e8f0;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      font-size: 13.5px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.2s ease;
      text-decoration: none;
      user-select: none;
    }

    /* NÚT XUẤT PDF CHÍNH NỔI BẬT */
    .btn-export-pdf {
      background: linear-gradient(135deg, #4338ca 0%, #3730a3 100%);
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(67, 56, 202, 0.25);
    }
    .btn-export-pdf:hover {
      background: linear-gradient(135deg, #3730a3 0%, #312e81 100%);
      box-shadow: 0 6px 16px rgba(67, 56, 202, 0.35);
      transform: translateY(-1px);
    }
    .btn-export-pdf:active {
      transform: translateY(0);
    }

    .btn-secondary {
      background: #ffffff;
      color: #334155;
      border-color: #cbd5e1;
    }
    .btn-secondary:hover {
      background: #f8fafc;
      border-color: #94a3b8;
    }

    .btn-reset {
      background: #f8fafc;
      color: #64748b;
      border-color: #e2e8f0;
    }
    .btn-reset:hover {
      background: #fee2e2;
      color: #dc2626;
      border-color: #fca5a5;
    }

    /* Section Cards */
    .section-card {
      margin-bottom: 24px;
      border: 1px solid #e2e8f0;
      border-radius: var(--radius);
      overflow: hidden;
      background: #ffffff;
    }

    .section-header {
      background: #f8fafc;
      padding: 10px 18px;
      font-size: 14.5px;
      font-weight: 700;
      color: #1e293b;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 8px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .section-body {
      padding: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 14px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .form-group.col-span-2 {
      grid-column: span 2;
    }

    label {
      font-size: 13px;
      font-weight: 600;
      color: #334155;
    }

    .req {
      color: var(--danger);
      margin-left: 2px;
    }

    input[type="text"],
    input[type="date"],
    input[type="tel"],
    input[type="email"],
    input[type="number"],
    select,
    textarea {
      width: 100%;
      padding: 8px 12px;
      font-size: 13.5px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      font-family: inherit;
      color: #1e293b;
      transition: all 0.2s;
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(67, 56, 202, 0.15);
    }

    textarea {
      resize: vertical;
      min-height: 60px;
    }

    .radio-flex {
      display: flex;
      align-items: center;
      gap: 18px;
      padding-top: 6px;
    }

    .radio-label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13.5px;
      font-weight: normal;
      cursor: pointer;
    }

    /* Khung A4 Template khi xuất PDF */
    #pdf-render-target {
      display: none;
      font-family: "Times New Roman", Times, "Lora", serif;
      background: #ffffff;
      color: #000000;
      padding: 12mm 15mm;
      width: 210mm;
      min-height: 297mm;
      line-height: 1.5;
      font-size: 13px;
    }

    .pdf-header-grid {
      display: grid;
      grid-template-columns: 45% 55%;
      margin-bottom: 12px;
      text-align: center;
    }

    .pdf-title-block {
      text-align: center;
      margin: 14px 0 16px;
    }
    .pdf-title-block h2 {
      font-size: 17px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    .pdf-section-title {
      font-weight: bold;
      font-size: 13.5px;
      text-transform: uppercase;
      margin: 10px 0 6px;
      border-bottom: 1px solid #000;
      padding-bottom: 2px;
    }

    .pdf-line {
      margin-bottom: 5px;
      text-align: justify;
    }

    .pdf-dots {
      border-bottom: 1px dotted #444;
      display: inline-block;
      min-width: 40px;
      padding: 0 4px;
      font-weight: 600;
    }

    .pdf-sig-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      text-align: center;
      margin-top: 20px;
      page-break-inside: avoid;
    }

    /* CSS chuẩn @media print khi người dùng bấm Ctrl + P */
    @media print {
      body {
        background: #ffffff !important;
        padding: 0 !important;
        color: #000000 !important;
        font-family: "Times New Roman", Times, "Lora", serif !important;
      }
      .action-toolbar, .no-print {
        display: none !important;
      }
      .app-container {
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
        max-width: 100% !important;
      }
      .section-card {
        border: none !important;
        margin-bottom: 10px !important;
      }
      .section-header {
        background: transparent !important;
        border-bottom: 1px solid #000 !important;
        padding: 4px 0 !important;
        color: #000 !important;
      }
      .section-body {
        padding: 6px 0 !important;
      }
      input, select, textarea {
        border: none !important;
        border-bottom: 1px dotted #666 !important;
        border-radius: 0 !important;
        padding: 2px 4px !important;
        background: transparent !important;
      }
      @page {
        size: A4 portrait;
        margin: 10mm 15mm;
      }
    }

    @media (max-width: 640px) {
      .app-container { padding: 20px 16px; }
      .official-header { grid-template-columns: 1fr; gap: 8px; }
      .form-group.col-span-2 { grid-column: span 1; }
      .action-toolbar { justify-content: stretch; }
      .action-toolbar .btn { flex: 1; justify-content: center; }
    }

    /* Loading overlay */
    .loading-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.7);
      z-index: 99999;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-size: 15px;
      font-weight: 600;
      flex-direction: column;
      gap: 12px;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255,255,255,0.2);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>

  <!-- Loading Indicator khi đang kết xuất PDF -->
  <div class="loading-overlay" id="loadingOverlay">
    <div class="spinner"></div>
    <div id="loadingText">Đang định dạng trang A4 & kết xuất file PDF...</div>
  </div>

  <div class="app-container">
    
    <!-- Tiêu đề hành chính chuẩn -->
    <div class="official-header">
      <div class="school-side">
        <div class="dept-title">SỞ GD&ĐT ĐỒNG THÁP</div>
        <div class="school-name" id="displaySchoolName">TRƯỜNG THPT CHÂU THÀNH 2</div>
        <div class="school-divider"></div>
      </div>
      <div class="country-side">
        <div class="country-name">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
        <div class="country-motto">Độc lập - Tự do - Hạnh phúc</div>
        <div class="country-divider"></div>
      </div>
    </div>

    <!-- Tên biểu mẫu -->
    <div class="form-main-title">
      <h1>SƠ YẾU LÝ LỊCH HỌC SINH</h1>
      <div class="sub-info">
        Lớp: <strong id="displayClassName">10A1</strong> &nbsp;•&nbsp; 
        Năm học: <strong id="displayAcademicYear">2025 - 2026</strong>
      </div>
    </div>

    <!-- Thanh nút hành động -->
    <div class="action-toolbar no-print">
      <button type="button" class="btn btn-reset" onclick="handleResetForm()">
        <span>🔄 Nhập mới</span>
      </button>

      <button type="button" class="btn btn-secondary" onclick="window.print()" title="Mở hộp thoại in hoặc Lưu PDF của trình duyệt">
        <span>🖨️ In trực tiếp (Ctrl+P)</span>
      </button>

      <!-- NÚT XUẤT PDF CHÍNH -->
      <button type="button" class="btn btn-export-pdf" id="btnExportPdf" onclick="exportToPdfStandard()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <path d="M12 18v-6"/>
          <path d="m9 15 3 3 3-3"/>
        </svg>
        <span>XUẤT FILE PDF</span>
      </button>
    </div>

    <!-- Form Nhập dữ liệu -->
    <form id="studentForm" onsubmit="event.preventDefault(); exportToPdfStandard();">
      
      <!-- Cấu hình trường / Lớp -->
      <div class="section-card">
        <div class="section-header">Thông tin Trường & Lớp học</div>
        <div class="section-body">
          <div class="form-row">
            <div class="form-group">
              <label>Tên trường học</label>
              <input type="text" id="schoolName" value="Trường THPT Châu Thành 2" oninput="updateHeaderDisplay()">
            </div>
            <div class="form-group">
              <label>Lớp học <span class="req">*</span></label>
              <input type="text" id="className" value="10A1" required oninput="updateHeaderDisplay()">
            </div>
            <div class="form-group">
              <label>Năm học</label>
              <input type="text" id="academicYear" value="2025 - 2026" oninput="updateHeaderDisplay()">
            </div>
          </div>
        </div>
      </div>

      <!-- I. BẢN THÂN -->
      <div class="section-card">
        <div class="section-header">I. Phần Bản Thân Học Sinh</div>
        <div class="section-body">
          
          <div class="form-row">
            <div class="form-group col-span-2">
              <label>1. Họ và tên học sinh <span class="req">*</span></label>
              <input type="text" id="fullName" placeholder="NGUYỄN VĂN AN" required>
            </div>
            <div class="form-group">
              <label>Giới tính <span class="req">*</span></label>
              <div class="radio-flex">
                <label class="radio-label"><input type="radio" name="gender" value="Nam" checked> Nam</label>
                <label class="radio-label"><input type="radio" name="gender" value="Nữ"> Nữ</label>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Số điện thoại (Zalo) <span class="req">*</span></label>
              <input type="tel" id="phoneZalo" placeholder="09xxxxxxxx" required>
            </div>
            <div class="form-group">
              <label>Địa chỉ Gmail</label>
              <input type="email" id="gmail" placeholder="example@gmail.com">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>2. Ngày, tháng, năm sinh <span class="req">*</span></label>
              <input type="date" id="birthDate" required>
            </div>
            <div class="form-group">
              <label>Nơi sinh (Tỉnh/TP) <span class="req">*</span></label>
              <input type="text" id="birthPlace" placeholder="Đồng Tháp" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>3. Dân tộc</label>
              <input type="text" id="ethnicity" value="Kinh">
            </div>
            <div class="form-group">
              <label>Đoàn viên TNCS HCM</label>
              <div class="radio-flex">
                <label class="radio-label"><input type="radio" name="isYouthUnionMember" value="yes"> Có</label>
                <label class="radio-label"><input type="radio" name="isYouthUnionMember" value="no" checked> Không</label>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-span-2">
              <label>4. Địa chỉ thường trú / Hiện tại <span class="req">*</span></label>
              <input type="text" id="address" placeholder="Số nhà, đường/ấp, xã/phường, quận/huyện..." required>
            </div>
            <div class="form-group">
              <label>Điện thoại bàn / Phụ</label>
              <input type="tel" id="homePhone" placeholder="0277...">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>5. Số anh chị em trong gia đình</label>
              <input type="number" id="siblingCount" min="0" placeholder="2">
            </div>
            <div class="form-group">
              <label>Là con thứ mấy</label>
              <input type="number" id="childOrder" min="1" placeholder="1">
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label>6. Hoàn cảnh gia đình (Thương binh, Liệt sĩ, Hộ nghèo/cận nghèo, mồ côi, khó khăn):</label>
            <textarea id="familyCircumstance" rows="2" placeholder="Ghi rõ hoàn cảnh hoặc chính sách ưu tiên nếu có..."></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>7. Phương tiện đến lớp <span class="req">*</span></label>
              <select id="transportation">
                <option value="Xe đạp">Xe đạp</option>
                <option value="Xe đạp điện">Xe đạp điện</option>
                <option value="Xe máy dưới 50cc">Xe máy dưới 50cc</option>
                <option value="Xe máy trên 50cc">Xe máy / Mô tô trên 50cc</option>
                <option value="Đi bộ">Đi bộ</option>
                <option value="Phụ huynh đưa đón">Phụ huynh đưa đón</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div class="form-group">
              <label>Biển số xe (nếu đi xe máy/xe điện)</label>
              <input type="text" id="licensePlate" placeholder="66-M1 123.45">
            </div>
          </div>

          <div class="form-row" style="margin-top: 10px;">
            <div class="form-group">
              <label>8. Rèn luyện (Hạnh kiểm) năm trước</label>
              <select id="conductLastYear">
                <option value="Tốt">Tốt</option>
                <option value="Khá">Khá</option>
                <option value="Đạt">Đạt / Trung bình</option>
                <option value="Chưa đạt">Chưa đạt / Yếu</option>
              </select>
            </div>
            <div class="form-group">
              <label>Học lực năm trước</label>
              <select id="academicLastYear">
                <option value="Xuất sắc">Xuất sắc</option>
                <option value="Giỏi">Giỏi</option>
                <option value="Khá">Khá</option>
                <option value="Đạt">Đạt / Trung bình</option>
                <option value="Chưa đạt">Chưa đạt / Yếu</option>
              </select>
            </div>
            <div class="form-group">
              <label>Điểm TBM năm trước</label>
              <input type="number" step="0.1" id="gpaLastYear" placeholder="8.5">
            </div>
            <div class="form-group">
              <label>Điểm tuyển sinh vào lớp 10</label>
              <input type="number" step="0.1" id="grade10AdmissionScore" placeholder="42.5">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>9. Môn học còn hạn chế</label>
              <input type="text" id="weakSubjects" placeholder="Ngữ Văn, Tiếng Anh...">
            </div>
            <div class="form-group">
              <label>10. Năng khiếu, sở trường</label>
              <input type="text" id="talents" placeholder="Thể thao, vẽ, thuyết trình, cờ vua...">
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label>11. Mong muốn, mục tiêu đặt ra trong năm học:</label>
            <textarea id="goals" rows="2" placeholder="Đạt danh hiệu Học sinh Giỏi, thi đậu đại học..."></textarea>
          </div>

          <div class="form-group">
            <label>12. Các nhiệm vụ đã tham gia, thành tích các năm trước:</label>
            <textarea id="achievements" rows="2" placeholder="Ban cán sự lớp, đoàn đội, học sinh giỏi..."></textarea>
          </div>

        </div>
      </div>

      <!-- II. GIA ĐÌNH -->
      <div class="section-card">
        <div class="section-header">II. Phần Thông Tin Gia Đình</div>
        <div class="section-body">
          
          <h4 style="font-size: 14px; font-weight: 700; color: #334155; margin-bottom: 10px;">1. Thông tin Cha:</h4>
          <div class="form-row">
            <div class="form-group col-span-2">
              <label>Họ và tên Cha</label>
              <input type="text" id="fatherName" placeholder="Họ tên cha">
            </div>
            <div class="form-group">
              <label>Năm sinh</label>
              <input type="number" id="fatherBirthYear" placeholder="1980">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Nghề nghiệp</label>
              <input type="text" id="fatherJob" placeholder="Nghề nghiệp">
            </div>
            <div class="form-group">
              <label>Số điện thoại</label>
              <input type="tel" id="fatherPhone" placeholder="09xxxxxxxx">
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 16px;">
            <label>Địa chỉ của Cha</label>
            <input type="text" id="fatherAddress" placeholder="Địa chỉ nơi ở của cha">
          </div>

          <hr style="margin: 20px 0; border: none; border-top: 1px dashed #e2e8f0;">

          <h4 style="font-size: 14px; font-weight: 700; color: #334155; margin-bottom: 10px;">2. Thông tin Mẹ:</h4>
          <div class="form-row">
            <div class="form-group col-span-2">
              <label>Họ và tên Mẹ</label>
              <input type="text" id="motherName" placeholder="Họ tên mẹ">
            </div>
            <div class="form-group">
              <label>Năm sinh</label>
              <input type="number" id="motherBirthYear" placeholder="1983">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Nghề nghiệp</label>
              <input type="text" id="motherJob" placeholder="Nghề nghiệp">
            </div>
            <div class="form-group">
              <label>Số điện thoại</label>
              <input type="tel" id="motherPhone" placeholder="09xxxxxxxx">
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 16px;">
            <label>Địa chỉ của Mẹ</label>
            <input type="text" id="motherAddress" placeholder="Địa chỉ nơi ở của mẹ">
          </div>

          <hr style="margin: 20px 0; border: none; border-top: 1px dashed #e2e8f0;">

          <div class="form-group" style="margin-bottom: 16px;">
            <label>3. Hiện đang sống với ai? <span class="req">*</span></label>
            <select id="livingWith">
              <option value="Ba mẹ">Ba mẹ (Cha mẹ)</option>
              <option value="Chỉ sống với Ba">Chỉ sống với Ba</option>
              <option value="Chỉ sống với Mẹ">Chỉ sống với Mẹ</option>
              <option value="Ông bà">Ông bà</option>
              <option value="Người thân/Người nuôi dưỡng">Người thân / Người nuôi dưỡng</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div style="background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
            <p style="font-size: 12.5px; font-style: italic; color: #64748b; margin-bottom: 10px;">
              * Nếu không sống với Ba Mẹ thì điền thông tin Người nuôi dưỡng / Giám hộ:
            </p>
            <div class="form-row">
              <div class="form-group">
                <label>Họ và tên người nuôi dưỡng</label>
                <input type="text" id="guardianName" placeholder="Họ tên người nuôi dưỡng">
              </div>
              <div class="form-group">
                <label>Nghề nghiệp</label>
                <input type="text" id="guardianJob" placeholder="Nghề nghiệp">
              </div>
              <div class="form-group">
                <label>Số điện thoại</label>
                <input type="tel" id="guardianPhone" placeholder="09xxxxxxxx">
              </div>
            </div>
            <div class="form-group">
              <label>Địa chỉ người nuôi dưỡng</label>
              <input type="text" id="guardianAddress" placeholder="Địa chỉ nơi ở">
            </div>
          </div>

          <!-- Chữ ký -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px dashed #cbd5e1;">
            <div>
              <div style="font-weight: 700; font-size: 13.5px;">Chữ ký của Mẹ</div>
              <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">(hoặc Người nuôi dưỡng)</div>
              <input type="text" id="motherSignerName" placeholder="Ghi họ tên" style="text-align: center;">
            </div>
            <div>
              <div style="font-weight: 700; font-size: 13.5px;">Chữ ký của Cha</div>
              <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">&nbsp;</div>
              <input type="text" id="fatherSignerName" placeholder="Ghi họ tên" style="text-align: center;">
            </div>
            <div>
              <div style="font-weight: 700; font-size: 13.5px;">Chữ ký của Học Sinh</div>
              <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">&nbsp;</div>
              <input type="text" id="studentSignerName" placeholder="Ghi họ tên" style="text-align: center;">
            </div>
          </div>

        </div>
      </div>

      <!-- Nút xuất PDF dưới chân trang -->
      <div style="display: flex; gap: 12px; justify-content: center; margin-top: 24px;" class="no-print">
        <button type="button" class="btn btn-reset" onclick="handleResetForm()" style="padding: 12px 24px;">
          🔄 Nhập mới
        </button>
        <button type="submit" class="btn btn-export-pdf" style="padding: 12px 32px; font-size: 15px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <path d="M12 18v-6"/>
            <path d="m9 15 3 3 3-3"/>
          </svg>
          <span>XUẤT TOÀN BỘ RA FILE PDF</span>
        </button>
      </div>

    </form>
  </div>

  <!-- BẢN ĐỊNH DẠNG A4 CHUẨN ĐỂ RENDER THÀNH PDF (HTML2PDF) -->
  <div id="pdf-render-target"></div>

  <script>
    const defaultData = ${jsonString};

    function updateHeaderDisplay() {
      const sch = document.getElementById('schoolName').value || 'TRƯỜNG THPT CHÂU THÀNH 2';
      const cls = document.getElementById('className').value || '10A1';
      const yr = document.getElementById('academicYear').value || '2025 - 2026';
      
      document.getElementById('displaySchoolName').textContent = sch.toUpperCase();
      document.getElementById('displayClassName').textContent = cls;
      document.getElementById('displayAcademicYear').textContent = yr;
    }

    function fillDataToForm(d) {
      document.getElementById('schoolName').value = d.schoolName || 'Trường THPT Châu Thành 2';
      document.getElementById('className').value = d.className || '10A1';
      document.getElementById('academicYear').value = d.academicYear || '2025 - 2026';
      document.getElementById('fullName').value = d.fullName || '';
      
      const genderRadios = document.getElementsByName('gender');
      for (const r of genderRadios) {
        if (r.value === d.gender) r.checked = true;
      }

      document.getElementById('phoneZalo').value = d.phoneZalo || '';
      document.getElementById('gmail').value = d.gmail || '';
      document.getElementById('birthDate').value = d.birthDate || '';
      document.getElementById('birthPlace').value = d.birthPlace || '';
      document.getElementById('ethnicity').value = d.ethnicity || 'Kinh';

      const unionRadios = document.getElementsByName('isYouthUnionMember');
      for (const r of unionRadios) {
        if ((r.value === 'yes' && d.isYouthUnionMember) || (r.value === 'no' && !d.isYouthUnionMember)) {
          r.checked = true;
        }
      }

      document.getElementById('address').value = d.address || '';
      document.getElementById('homePhone').value = d.homePhone || '';
      document.getElementById('siblingCount').value = d.siblingCount || '';
      document.getElementById('childOrder').value = d.childOrder || '';
      document.getElementById('familyCircumstance').value = d.familyCircumstance || '';
      document.getElementById('transportation').value = d.transportation || 'Xe đạp điện';
      document.getElementById('licensePlate').value = d.licensePlate || '';

      document.getElementById('conductLastYear').value = d.conductLastYear || 'Tốt';
      document.getElementById('academicLastYear').value = d.academicLastYear || 'Giỏi';
      document.getElementById('gpaLastYear').value = d.gpaLastYear || '';
      document.getElementById('grade10AdmissionScore').value = d.grade10AdmissionScore || '';

      document.getElementById('weakSubjects').value = d.weakSubjects || '';
      document.getElementById('talents').value = d.talents || '';
      document.getElementById('goals').value = d.goals || '';
      document.getElementById('achievements').value = d.achievements || '';

      document.getElementById('fatherName').value = d.fatherName || '';
      document.getElementById('fatherBirthYear').value = d.fatherBirthYear || '';
      document.getElementById('fatherJob').value = d.fatherJob || '';
      document.getElementById('fatherPhone').value = d.fatherPhone || '';
      document.getElementById('fatherAddress').value = d.fatherAddress || '';

      document.getElementById('motherName').value = d.motherName || '';
      document.getElementById('motherBirthYear').value = d.motherBirthYear || '';
      document.getElementById('motherJob').value = d.motherJob || '';
      document.getElementById('motherPhone').value = d.motherPhone || '';
      document.getElementById('motherAddress').value = d.motherAddress || '';

      document.getElementById('livingWith').value = d.livingWith || 'Ba mẹ';
      document.getElementById('guardianName').value = d.guardianName || '';
      document.getElementById('guardianJob').value = d.guardianJob || '';
      document.getElementById('guardianPhone').value = d.guardianPhone || '';
      document.getElementById('guardianAddress').value = d.guardianAddress || '';

      document.getElementById('studentSignerName').value = d.studentSignerName || d.fullName || '';
      document.getElementById('fatherSignerName').value = d.fatherSignerName || d.fatherName || '';
      document.getElementById('motherSignerName').value = d.motherSignerName || d.motherName || '';

      updateHeaderDisplay();
    }

    function getFormData() {
      const gender = document.querySelector('input[name="gender"]:checked')?.value || 'Nam';
      const isYouth = document.querySelector('input[name="isYouthUnionMember"]:checked')?.value === 'yes';

      return {
        schoolName: document.getElementById('schoolName').value || 'Trường THPT Châu Thành 2',
        className: document.getElementById('className').value || '10A1',
        academicYear: document.getElementById('academicYear').value || '2025 - 2026',
        fullName: document.getElementById('fullName').value.trim(),
        gender: gender,
        phoneZalo: document.getElementById('phoneZalo').value,
        gmail: document.getElementById('gmail').value,
        birthDate: document.getElementById('birthDate').value,
        birthPlace: document.getElementById('birthPlace').value,
        ethnicity: document.getElementById('ethnicity').value || 'Kinh',
        isYouthUnionMember: isYouth,
        address: document.getElementById('address').value,
        homePhone: document.getElementById('homePhone').value,
        siblingCount: document.getElementById('siblingCount').value,
        childOrder: document.getElementById('childOrder').value,
        familyCircumstance: document.getElementById('familyCircumstance').value,
        transportation: document.getElementById('transportation').value,
        licensePlate: document.getElementById('licensePlate').value,
        conductLastYear: document.getElementById('conductLastYear').value,
        academicLastYear: document.getElementById('academicLastYear').value,
        gpaLastYear: document.getElementById('gpaLastYear').value,
        grade10AdmissionScore: document.getElementById('grade10AdmissionScore').value,
        weakSubjects: document.getElementById('weakSubjects').value,
        talents: document.getElementById('talents').value,
        goals: document.getElementById('goals').value,
        achievements: document.getElementById('achievements').value,
        fatherName: document.getElementById('fatherName').value,
        fatherBirthYear: document.getElementById('fatherBirthYear').value,
        fatherJob: document.getElementById('fatherJob').value,
        fatherPhone: document.getElementById('fatherPhone').value,
        fatherAddress: document.getElementById('fatherAddress').value,
        motherName: document.getElementById('motherName').value,
        motherBirthYear: document.getElementById('motherBirthYear').value,
        motherJob: document.getElementById('motherJob').value,
        motherPhone: document.getElementById('motherPhone').value,
        motherAddress: document.getElementById('motherAddress').value,
        livingWith: document.getElementById('livingWith').value,
        guardianName: document.getElementById('guardianName').value,
        guardianJob: document.getElementById('guardianJob').value,
        guardianPhone: document.getElementById('guardianPhone').value,
        guardianAddress: document.getElementById('guardianAddress').value,
        studentSignerName: document.getElementById('studentSignerName').value,
        fatherSignerName: document.getElementById('fatherSignerName').value,
        motherSignerName: document.getElementById('motherSignerName').value,
      };
    }

    function handleResetForm() {
      if (confirm('Bạn có chắc chắn muốn xóa toàn bộ thông tin để nhập hồ sơ mới?')) {
        document.getElementById('studentForm').reset();
        localStorage.removeItem('thpt_ct2_profile_saved');
        document.getElementById('schoolName').value = 'Trường THPT Châu Thành 2';
        document.getElementById('academicYear').value = '2025 - 2026';
        updateHeaderDisplay();
        alert('Đã xóa dữ liệu cũ, sẵn sàng nhập mới!');
      }
    }

    function formatDateVi(dateStr) {
      if (!dateStr) return '.../.../.....';
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return \`\${parts[2]}/\${parts[1]}/\${parts[0]}\`;
      }
      return dateStr;
    }

    /* Tạo bố cục HTML A4 chuẩn đẹp để xuất file PDF */
    function buildA4HtmlTemplate(d) {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      return \`
        <div style="font-family: 'Times New Roman', Times, 'Lora', serif; font-size: 13.5px; line-height: 1.6; color: #000; padding: 10px 15px;">
          
          <!-- Quốc hiệu & Tiêu ngữ -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
            <tr>
              <td style="width: 45%; text-align: center; vertical-align: top;">
                <div style="font-size: 12.5px; text-transform: uppercase;">SỞ GD&ĐT ĐỒNG THÁP</div>
                <div style="font-size: 13.5px; font-weight: bold; text-transform: uppercase;">\${d.schoolName || 'TRƯỜNG THPT CHÂU THÀNH 2'}</div>
                <div style="width: 80px; height: 1px; background: #000; margin: 3px auto 0;"></div>
              </td>
              <td style="width: 55%; text-align: center; vertical-align: top;">
                <div style="font-size: 12.5px; font-weight: bold; text-transform: uppercase;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                <div style="font-size: 13.5px; font-weight: bold;">Độc lập - Tự do - Hạnh phúc</div>
                <div style="width: 120px; height: 1px; background: #000; margin: 3px auto 0;"></div>
              </td>
            </tr>
          </table>

          <!-- Tiêu đề biểu mẫu -->
          <div style="text-align: center; margin: 12px 0 16px;">
            <div style="font-size: 18px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">SƠ YẾU LÝ LỊCH HỌC SINH</div>
            <div style="font-size: 13.5px; font-style: italic; margin-top: 3px;">
              Lớp: <strong>\${d.className || '...'}</strong> &nbsp;&nbsp;•&nbsp;&nbsp; Năm học: <strong>\${d.academicYear || '2025 - 2026'}</strong>
            </div>
          </div>

          <!-- I. PHẦN BẢN THÂN -->
          <div style="font-weight: bold; font-size: 14px; text-transform: uppercase; margin-top: 10px; border-bottom: 1px solid #000; padding-bottom: 2px;">
            I. PHẦN BẢN THÂN:
          </div>

          <div style="margin-top: 6px;">
            <div class="pdf-line">
              1. Họ và tên học sinh: <strong style="font-size: 14px; text-transform: uppercase;">\${d.fullName || '...................................................'}</strong>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Giới tính: <strong>\${d.gender || '.........'}</strong>
            </div>
            <div class="pdf-line">
              Điện thoại (Zalo): <strong>\${d.phoneZalo || '................................'}</strong>
              &nbsp;&nbsp;&nbsp;&nbsp; Gmail: <strong>\${d.gmail || '................................................'}</strong>
            </div>
            <div class="pdf-line">
              2. Ngày, tháng, năm sinh: <strong>\${formatDateVi(d.birthDate)}</strong>
              &nbsp;&nbsp;&nbsp;&nbsp; Nơi sinh: <strong>\${d.birthPlace || '................................................'}</strong>
            </div>
            <div class="pdf-line">
              3. Dân tộc: <strong>\${d.ethnicity || 'Kinh'}</strong>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Đoàn viên TNCS HCM: <strong>\${d.isYouthUnionMember ? 'Có [X]' : 'Không [ ]'}</strong>
            </div>
            <div class="pdf-line">
              4. Địa chỉ (Thường trú/Hiện tại): <strong>\${d.address || '...........................................................................................................................'}</strong>
            </div>
            <div class="pdf-line">
              Điện thoại nhà/phụ: <strong>\${d.homePhone || '................................'}</strong>
            </div>
            <div class="pdf-line">
              5. Số anh, chị, em trong gia đình: <strong>\${d.siblingCount || '......'}</strong>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Là con thứ mấy: <strong>\${d.childOrder || '......'}</strong>
            </div>
            <div class="pdf-line">
              6. Hoàn cảnh gia đình: <strong>\${d.familyCircumstance || 'Bình thường'}</strong>
            </div>
            <div class="pdf-line">
              7. Phương tiện đến lớp: <strong>\${d.transportation || 'Xe đạp điện'}</strong>
              \${d.licensePlate ? \`&nbsp;&nbsp;&nbsp;&nbsp; Biển số xe: <strong>\${d.licensePlate}</strong>\` : ''}
            </div>
            <div class="pdf-line">
              8. Xếp loại ở năm học trước: 
              Rèn luyện (HK): <strong>\${d.conductLastYear || 'Tốt'}</strong>; 
              Học lực: <strong>\${d.academicLastYear || 'Giỏi'}</strong>; 
              Điểm TBM: <strong>\${d.gpaLastYear || '......'}</strong>
              \${d.grade10AdmissionScore ? \`; Điểm tuyển sinh 10: <strong>\${d.grade10AdmissionScore}</strong>\` : ''}
            </div>
            <div class="pdf-line">
              9. Các môn học còn hạn chế: <strong>\${d.weakSubjects || 'Không có'}</strong>
            </div>
            <div class="pdf-line">
              10. Năng khiếu, sở trường: <strong>\${d.talents || 'Không có'}</strong>
            </div>
            <div class="pdf-line">
              11. Mong muốn, mục tiêu trong năm học: <strong>\${d.goals || 'Phấn đấu hoàn thành tốt nhiệm vụ học tập'}</strong>
            </div>
            <div class="pdf-line">
              12. Nhiệm vụ đã tham gia, thành tích: <strong>\${d.achievements || 'Không có'}</strong>
            </div>
          </div>

          <!-- II. PHẦN GIA ĐÌNH -->
          <div style="font-weight: bold; font-size: 14px; text-transform: uppercase; margin-top: 14px; border-bottom: 1px solid #000; padding-bottom: 2px;">
            II. PHẦN GIA ĐÌNH:
          </div>

          <div style="margin-top: 6px;">
            <div class="pdf-line">
              1. Họ, tên cha: <strong>\${d.fatherName || '...................................................'}</strong>
              &nbsp;&nbsp;&nbsp;&nbsp; Năm sinh: <strong>\${d.fatherBirthYear || '............'}</strong>
              &nbsp;&nbsp;&nbsp;&nbsp; Nghề nghiệp: <strong>\${d.fatherJob || '................................'}</strong>
            </div>
            <div class="pdf-line">
              Số ĐT cha: <strong>\${d.fatherPhone || '................................'}</strong>
              &nbsp;&nbsp;&nbsp;&nbsp; Địa chỉ: <strong>\${d.fatherAddress || d.address || '........................................................................'}</strong>
            </div>
            <div class="pdf-line" style="margin-top: 4px;">
              2. Họ, tên mẹ: <strong>\${d.motherName || '...................................................'}</strong>
              &nbsp;&nbsp;&nbsp;&nbsp; Năm sinh: <strong>\${d.motherBirthYear || '............'}</strong>
              &nbsp;&nbsp;&nbsp;&nbsp; Nghề nghiệp: <strong>\${d.motherJob || '................................'}</strong>
            </div>
            <div class="pdf-line">
              Số ĐT mẹ: <strong>\${d.motherPhone || '................................'}</strong>
              &nbsp;&nbsp;&nbsp;&nbsp; Địa chỉ: <strong>\${d.motherAddress || d.address || '........................................................................'}</strong>
            </div>
            <div class="pdf-line" style="margin-top: 4px;">
              3. Hiện đang sống với ai: <strong>\${d.livingWith || 'Ba mẹ'}</strong>
            </div>
            \${d.guardianName ? \`
              <div class="pdf-line">
                * Họ tên người nuôi dưỡng: <strong>\${d.guardianName}</strong>; Nghề nghiệp: <strong>\${d.guardianJob || '-'}</strong>; SĐT: <strong>\${d.guardianPhone || '-'}</strong>; Địa chỉ: <strong>\${d.guardianAddress || '-'}</strong>
              </div>
            \` : ''}
          </div>

          <!-- PHẦN KÝ TÊN -->
          <div style="margin-top: 20px;">
            <table style="width: 100%; border-collapse: collapse; text-align: center;">
              <tr>
                <td style="width: 33%; vertical-align: top;">
                  <div style="font-weight: bold;">Chữ ký, họ tên của Mẹ</div>
                  <div style="font-size: 12px; font-style: italic;">(hoặc Người nuôi dưỡng)</div>
                  <div style="height: 55px;"></div>
                  <div style="font-weight: bold;">\${d.motherSignerName || d.motherName || ''}</div>
                </td>
                <td style="width: 33%; vertical-align: top;">
                  <div style="font-weight: bold;">Chữ ký, họ tên của Cha</div>
                  <div style="font-size: 12px; font-style: italic;">&nbsp;</div>
                  <div style="height: 55px;"></div>
                  <div style="font-weight: bold;">\${d.fatherSignerName || d.fatherName || ''}</div>
                </td>
                <td style="width: 34%; vertical-align: top;">
                  <div style="font-size: 12.5px; font-style: italic;">Châu Thành, ngày \${day} tháng \${month} năm \${year}</div>
                  <div style="font-weight: bold;">Chữ ký, họ tên của HS</div>
                  <div style="height: 40px;"></div>
                  <div style="font-weight: bold; text-transform: uppercase;">\${d.studentSignerName || d.fullName || ''}</div>
                </td>
              </tr>
            </table>
          </div>

        </div>
      \`;
    }

    /* Hàm xuất PDF bằng thư viện html2pdf.js */
    async function exportToPdfStandard() {
      const data = getFormData();
      
      if (!data.fullName) {
        alert('Vui lòng nhập Họ và tên học sinh trước khi xuất file PDF!');
        document.getElementById('fullName').focus();
        return;
      }

      // Lưu lại vào localStorage
      localStorage.setItem('thpt_ct2_profile_saved', JSON.stringify(data));

      // Hiển thị màn hình chờ loading
      const loading = document.getElementById('loadingOverlay');
      loading.style.display = 'flex';

      try {
        const renderDiv = document.getElementById('pdf-render-target');
        renderDiv.innerHTML = buildA4HtmlTemplate(data);
        renderDiv.style.display = 'block';

        // Chuẩn hóa tên file theo đúng cú pháp yêu cầu: Ly_lich_[Hovaten]_[Lop].pdf
        const rawName = data.fullName.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
        const safeName = rawName.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').trim();
        const rawClass = data.className.replace(/[^a-zA-Z0-9]/g, '_').trim();
        const fileName = \`Ly_lich_\${safeName || 'HocSinh'}_\${rawClass || '10A1'}.pdf\`;

        const opt = {
          margin: [10, 12, 10, 12],
          filename: fileName,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2.5, 
            useCORS: true, 
            letterRendering: true,
            logging: false
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
          },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Kết xuất PDF & tự động tải về máy
        await html2pdf().set(opt).from(renderDiv).save();

        setTimeout(() => {
          renderDiv.style.display = 'none';
          loading.style.display = 'none';
        }, 500);

      } catch (err) {
        console.error('Lỗi xuất PDF:', err);
        loading.style.display = 'none';
        alert('Có lỗi khi tạo file PDF. Bạn có thể sử dụng nút "In trực tiếp" để lưu dạng PDF qua trình duyệt.');
      }
    }

    // Khởi tạo nạp dữ liệu khi mở trang
    window.addEventListener('DOMContentLoaded', () => {
      const saved = localStorage.getItem('thpt_ct2_profile_saved');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          Object.assign(defaultData, parsed);
        } catch (e) {}
      }
      fillDataToForm(defaultData);
    });
  </script>
</body>
</html>`;
}
