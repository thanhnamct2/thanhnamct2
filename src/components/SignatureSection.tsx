import React, { useRef, useState } from 'react';
import { PenLine, Eraser, Calendar, FileCheck } from 'lucide-react';
import { StudentProfile } from '../types';

interface SignatureSectionProps {
  profile: StudentProfile;
  onChange: (field: keyof StudentProfile, value: any) => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({
  profile,
  onChange
}) => {
  const [activeCanvas, setActiveCanvas] = useState<'student' | 'father' | 'mother' | null>(null);
  
  // Canvas refs
  const studentCanvasRef = useRef<HTMLCanvasElement>(null);
  const fatherCanvasRef = useRef<HTMLCanvasElement>(null);
  const motherCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>, canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>, canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.strokeStyle = '#312e81';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = (type: 'student' | 'father' | 'mother', canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    if (type === 'student') onChange('studentSignature', dataUrl);
    if (type === 'father') onChange('fatherSignature', dataUrl);
    if (type === 'mother') onChange('motherSignature', dataUrl);
  };

  const clearCanvas = (type: 'student' | 'father' | 'mother', canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (type === 'student') onChange('studentSignature', '');
    if (type === 'father') onChange('fatherSignature', '');
    if (type === 'mother') onChange('motherSignature', '');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      
      {/* Section Header */}
      <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-6 flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
          Xác nhận & Chữ ký cam kết
        </span>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-normal normal-case">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Ngày lập:</span>
          <input
            type="date"
            value={profile.signDate}
            onChange={(e) => onChange('signDate', e.target.value)}
            className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </h2>

      <div>
        <p className="text-xs italic text-slate-500 mb-6 text-center max-w-xl mx-auto">
          "Tôi xin cam đoan những lời khai trong bản Sơ yếu lý lịch này là hoàn toàn đúng sự thật. Nếu có gì sai sót, tôi và gia đình xin chịu hoàn toàn trách nhiệm trước nhà trường."
        </p>

        {/* 3 Column Signature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
          {/* Mẹ hoặc Người nuôi dưỡng */}
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-0.5">
                Chữ ký của Mẹ
              </div>
              <div className="text-[11px] text-slate-400 mb-3">
                (hoặc Người nuôi dưỡng)
              </div>

              {/* Signature Canvas Box */}
              <div className="relative mb-3 bg-white rounded border border-slate-200 overflow-hidden h-28 flex items-center justify-center">
                {profile.motherSignature ? (
                  <img
                    src={profile.motherSignature}
                    alt="Chữ ký mẹ"
                    className="max-h-full max-w-full object-contain pointer-events-none"
                  />
                ) : (
                  <canvas
                    ref={motherCanvasRef}
                    width={240}
                    height={110}
                    onMouseDown={(e) => startDrawing(e, motherCanvasRef)}
                    onMouseMove={(e) => draw(e, motherCanvasRef)}
                    onMouseUp={() => stopDrawing('mother', motherCanvasRef)}
                    onMouseLeave={() => stopDrawing('mother', motherCanvasRef)}
                    onTouchStart={(e) => startDrawing(e, motherCanvasRef)}
                    onTouchMove={(e) => draw(e, motherCanvasRef)}
                    onTouchEnd={() => stopDrawing('mother', motherCanvasRef)}
                    className="w-full h-full cursor-crosshair touch-none"
                  />
                )}
                {!profile.motherSignature && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-[11px] text-slate-300 italic">
                    Ký vẽ tay tại đây
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => clearCanvas('mother', motherCanvasRef)}
                  className="text-[11px] text-slate-500 hover:text-rose-600 flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs transition-colors"
                >
                  <Eraser className="w-3 h-3" /> Xóa chữ ký
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-left">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Ghi rõ họ tên:
              </label>
              <input
                id="input-mother-signer-name"
                type="text"
                value={profile.motherSignerName || profile.motherName || profile.guardianName}
                onChange={(e) => onChange('motherSignerName', e.target.value)}
                placeholder="Họ tên Mẹ / Người nuôi dưỡng"
                className="w-full px-3 py-1.5 text-xs font-semibold text-center border border-slate-200 rounded bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Cha */}
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-0.5">
                Chữ ký của Cha
              </div>
              <div className="text-[11px] text-slate-400 mb-3">
                (Ký và ghi rõ họ tên)
              </div>

              {/* Signature Canvas Box */}
              <div className="relative mb-3 bg-white rounded border border-slate-200 overflow-hidden h-28 flex items-center justify-center">
                {profile.fatherSignature ? (
                  <img
                    src={profile.fatherSignature}
                    alt="Chữ ký cha"
                    className="max-h-full max-w-full object-contain pointer-events-none"
                  />
                ) : (
                  <canvas
                    ref={fatherCanvasRef}
                    width={240}
                    height={110}
                    onMouseDown={(e) => startDrawing(e, fatherCanvasRef)}
                    onMouseMove={(e) => draw(e, fatherCanvasRef)}
                    onMouseUp={() => stopDrawing('father', fatherCanvasRef)}
                    onMouseLeave={() => stopDrawing('father', fatherCanvasRef)}
                    onTouchStart={(e) => startDrawing(e, fatherCanvasRef)}
                    onTouchMove={(e) => draw(e, fatherCanvasRef)}
                    onTouchEnd={() => stopDrawing('father', fatherCanvasRef)}
                    className="w-full h-full cursor-crosshair touch-none"
                  />
                )}
                {!profile.fatherSignature && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-[11px] text-slate-300 italic">
                    Ký vẽ tay tại đây
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => clearCanvas('father', fatherCanvasRef)}
                  className="text-[11px] text-slate-500 hover:text-rose-600 flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs transition-colors"
                >
                  <Eraser className="w-3 h-3" /> Xóa chữ ký
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-left">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Ghi rõ họ tên:
              </label>
              <input
                id="input-father-signer-name"
                type="text"
                value={profile.fatherSignerName || profile.fatherName}
                onChange={(e) => onChange('fatherSignerName', e.target.value)}
                placeholder="Họ tên Cha"
                className="w-full px-3 py-1.5 text-xs font-semibold text-center border border-slate-200 rounded bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Học sinh */}
          <div className="p-4 rounded-lg border border-indigo-100 bg-indigo-50/20 flex flex-col justify-between">
            <div>
              <div className="font-bold text-xs uppercase tracking-wider text-indigo-900 mb-0.5">
                Chữ ký của Học sinh
              </div>
              <div className="text-[11px] text-slate-400 mb-3">
                (Học sinh ký tên)
              </div>

              {/* Signature Canvas Box */}
              <div className="relative mb-3 bg-white rounded border border-indigo-200 overflow-hidden h-28 flex items-center justify-center">
                {profile.studentSignature ? (
                  <img
                    src={profile.studentSignature}
                    alt="Chữ ký học sinh"
                    className="max-h-full max-w-full object-contain pointer-events-none"
                  />
                ) : (
                  <canvas
                    ref={studentCanvasRef}
                    width={240}
                    height={110}
                    onMouseDown={(e) => startDrawing(e, studentCanvasRef)}
                    onMouseMove={(e) => draw(e, studentCanvasRef)}
                    onMouseUp={() => stopDrawing('student', studentCanvasRef)}
                    onMouseLeave={() => stopDrawing('student', studentCanvasRef)}
                    onTouchStart={(e) => startDrawing(e, studentCanvasRef)}
                    onTouchMove={(e) => draw(e, studentCanvasRef)}
                    onTouchEnd={() => stopDrawing('student', studentCanvasRef)}
                    className="w-full h-full cursor-crosshair touch-none"
                  />
                )}
                {!profile.studentSignature && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-[11px] text-slate-300 italic">
                    Ký vẽ tay tại đây
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => clearCanvas('student', studentCanvasRef)}
                  className="text-[11px] text-slate-500 hover:text-rose-600 flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs transition-colors"
                >
                  <Eraser className="w-3 h-3" /> Xóa chữ ký
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-left">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Ghi rõ họ tên:
              </label>
              <input
                id="input-student-signer-name"
                type="text"
                value={profile.studentSignerName || profile.fullName}
                onChange={(e) => onChange('studentSignerName', e.target.value)}
                placeholder="Họ tên học sinh"
                className="w-full px-3 py-1.5 text-xs font-semibold text-center border border-indigo-200 rounded bg-white text-indigo-950 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
