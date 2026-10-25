import React, { useEffect, useState } from 'react';

interface CrucibleFluidProps {
  progressPercentage: number;
  title?: string;
  subtitle?: string;
}

export const CrucibleFluid: React.FC<CrucibleFluidProps> = ({
  progressPercentage,
  title = 'مرجل التقطير الملكي',
  subtitle = 'نسبة التوليفة العطرية المكتملة'
}) => {
  const [waveOffset, setWaveOffset] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset((prev) => (prev + 1.5) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const clampedProgress = Math.min(100, Math.max(15, progressPercentage));
  const fillY = 200 - (clampedProgress / 100) * 160;

  const rad = (waveOffset * Math.PI) / 180;
  const sin1 = Math.sin(rad) * 6;
  const sin2 = Math.sin(rad + Math.PI / 2) * 6;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-48 h-60 bg-[#141312]/80 rounded-b-[40px] rounded-t-xl border-2 border-[#f2ca50]/40 overflow-hidden shadow-[0_0_30px_rgba(242,202,80,0.15)] backdrop-blur-md">
        <div className="absolute left-2 top-6 bottom-6 flex flex-col justify-between text-[9px] text-[#f2ca50]/50 font-mono-num pointer-events-none z-20">
          <span>100ml</span>
          <span>75ml</span>
          <span>50ml</span>
          <span>25ml</span>
          <span>10ml</span>
        </div>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 200 240"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="liquidGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f7d468" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#d49b28" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#54380a" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="backWaveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e8c178" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8a611c" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          <path
            d={`M 0 240 L 0 ${fillY + 5 + sin2} Q 50 ${fillY - 8 + sin2}, 100 ${fillY + 5 + sin2} T 200 ${fillY + 5 + sin2} L 200 240 Z`}
            fill="url(#backWaveGrad)"
          />

          <path
            d={`M 0 240 L 0 ${fillY + sin1} Q 50 ${fillY + 10 + sin1}, 100 ${fillY + sin1} T 200 ${fillY + sin1} L 200 240 Z`}
            fill="url(#liquidGoldGrad)"
          />
        </svg>

        <div className="absolute inset-x-0 bottom-2 top-10 pointer-events-none overflow-hidden">
          <div className="w-1.5 h-1.5 rounded-full bg-[#fff7d6]/70 absolute left-12 bottom-4 animate-ping" />
          <div className="w-2 h-2 rounded-full bg-[#f2ca50]/80 absolute left-28 bottom-8 animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-[#fff7d6]/60 absolute left-20 bottom-14 animate-bounce" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <span className="text-3xl font-bold font-mono-num text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {Math.round(progressPercentage)}%
          </span>
          <span className="text-[10px] text-[#f2ca50] font-medium tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            تناغم النوتات
          </span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <h4 className="text-sm font-semibold text-[#f2ca50] font-display">{title}</h4>
        <p className="text-xs text-[#a69c8a] mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
};
