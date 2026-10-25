import React from 'react';

interface SillageRadarProps {
  radiusMeters: number; // e.g. 3.8
  longevityHours: number; // e.g. 18
  rating: number; // e.g. 9.6
  scentName: string;
}

export const SillageRadar: React.FC<SillageRadarProps> = ({
  radiusMeters,
  longevityHours,
  rating,
  scentName
}) => {
  return (
    <div className="bg-[#141312]/90 border border-[#f2ca50]/20 rounded-2xl p-5 relative overflow-hidden backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-semibold text-[#f2ca50] font-display flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping" />
            رادار الفوحان والانطباع الملكي (Sillage Sonar)
          </h4>
          <p className="text-xs text-[#a69c8a] mt-0.5">محاكاة نصف قطر الانتشار في الغرف والمجالس</p>
        </div>
        <span className="text-xs font-mono-num px-2.5 py-1 rounded bg-[#f2ca50]/15 text-[#f2ca50] border border-[#f2ca50]/30 font-bold">
          {rating} / 10
        </span>
      </div>

      {/* Sonar visual display */}
      <div className="relative w-full h-48 flex items-center justify-center my-2">
        {/* Pulsing Sonar Concentric Rings */}
        <div className="absolute w-44 h-44 rounded-full border border-[#f2ca50]/15 animate-ping opacity-25 pointer-events-none" />
        <div className="absolute w-36 h-36 rounded-full border border-[#f2ca50]/25 pointer-events-none" />
        <div className="absolute w-28 h-28 rounded-full border border-[#f2ca50]/40 pointer-events-none" />
        <div className="absolute w-16 h-16 rounded-full border border-[#f2ca50]/60 bg-[#f2ca50]/5 pointer-events-none" />

        {/* Center Scent Origin Point */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#b38b33] to-[#f2ca50] flex items-center justify-center shadow-[0_0_20px_#f2ca50] text-[#090807] font-bold text-xs">
            ♔
          </div>
          <span className="text-[11px] font-semibold text-white mt-1.5 drop-shadow">
            {scentName}
          </span>
        </div>

        {/* Sonar Sweep Ray */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center animate-spin"
          style={{ animationDuration: '6s' }}
        >
          <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#f2ca50]/40 to-[#f2ca50] origin-left self-center ml-auto" />
        </div>

        {/* Distance markers */}
        <span className="absolute top-2 right-4 text-[10px] text-[#f2ca50]/70 font-mono-num">
          محيط الفوحان: {radiusMeters} متر
        </span>
        <span className="absolute bottom-2 left-4 text-[10px] text-[#e8c178]/70 font-mono-num">
          ثبات الأثر: +{longevityHours} ساعة
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-[#f2ca50]/10 text-center">
        <div className="bg-[#090807]/60 p-2 rounded-lg border border-white/5">
          <span className="block text-[10px] text-[#a69c8a]">نطاق الرائحة</span>
          <span className="text-sm font-bold text-[#f2ca50] font-mono-num">{radiusMeters}m</span>
        </div>
        <div className="bg-[#090807]/60 p-2 rounded-lg border border-white/5">
          <span className="block text-[10px] text-[#a69c8a]">الثبات على الثياب</span>
          <span className="text-sm font-bold text-[#f2ca50] font-mono-num">+{longevityHours}h</span>
        </div>
        <div className="bg-[#090807]/60 p-2 rounded-lg border border-white/5">
          <span className="block text-[10px] text-[#a69c8a]">تصنيف الانتشار</span>
          <span className="text-xs font-bold text-[#18cd61]">عاصف / مهيب</span>
        </div>
      </div>
    </div>
  );
};
