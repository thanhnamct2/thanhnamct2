import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { StudentProfile } from '../types';

export async function exportElementToPdf(
  elementId: string, 
  profile: StudentProfile
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Không tìm thấy nội dung để xuất PDF');
  }

  // Ensure element is visible and styled properly
  const canvas = await html2canvas(element, {
    scale: 2.5, // 2.5x high-DPI ensures razor-sharp text and borders for Adobe Acrobat
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: 860
  });

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);
  const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
  heightLeft -= pageHeight;

  // Additional pages if needed
  while (heightLeft > 5) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;
  }

  const safeName = (profile.fullName || 'HocSinh').replace(/[/\\?%*:|"<>]/g, '').trim().replace(/\s+/g, '_');
  const safeClass = (profile.className || 'Lop').replace(/[/\\?%*:|"<>]/g, '').trim().replace(/\s+/g, '_');
  const fileName = `Ly_lich_${safeName || 'HocSinh'}_${safeClass || 'Lop'}.pdf`;

  pdf.save(fileName);
}
