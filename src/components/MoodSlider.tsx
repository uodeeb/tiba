import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Flame, Wind, Sparkles, Citrus } from 'lucide-react';

interface MoodSliderProps {
  value: number; // 0 to 100
  onChange: (value: number) => void;
  className?: string;
}

export const MoodSlider: React.FC<MoodSliderProps> = ({ value, onChange, className = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Derive active mood details from 0 to 100
  const getMoodDetails = (val: number) => {
    if (val < 25) {
      return {
        label: 'حيوي ومنعش شمسي (Energetic / Citrus)',
        subtitle: 'انتعاش النيرولي وزهر الليمون الصعيدي والبرغموت المتألق',
        accords: ['حمضيات نضرة', 'شاي ياسمين', 'إشراقة صباحية', 'طاقة ووضوح'],
        vibeKey: 'fresh_citrus',
        matchedProduct: 'زهرة النيل الملكية',
        bgHue: 'from-[#f59e0b] via-[#eab308] to-[#10b981]'
      };
    } else if (val < 50) {
      return {
        label: 'نقي وأرستقراطي هادئ (Pure / Clean Musk)',
        subtitle: 'مسك الطهارة الأبيض مع نسائم السوسن الفلورنسي وزنابق الوادي',
        accords: ['مسك بارد', 'سوسن إيطالي', 'نعومة مخملية', 'أناقة صامتة'],
        vibeKey: 'fresh_citrus',
        matchedProduct: 'مسك الليل الأسيوطي',
        bgHue: 'from-[#38bdf8] via-[#818cf8] to-[#c084fc]'
      };
    } else if (val < 75) {
      return {
        label: 'دافئ وعنبري بلسمي (Warm / Amber & Vanilla)',
        subtitle: 'عنبر سلطاني مبخر بلبان الحوجري وفانيليا البوربون والتونكا',
        accords: ['عنبر دافئ', 'لبان حوجري', 'فانيليا سوداء', 'دفء ساحر'],
        vibeKey: 'sweet_amber',
        matchedProduct: 'عنبر سلطاني مبخر',
        bgHue: 'from-[#f97316] via-[#d97706] to-[#b45309]'
      };
    } else {
      return {
        label: 'غامض وعود ملكي معتق (Mysterious / Royal Oud)',
        subtitle: 'دهن عود كمبودي 25 سنة، بخور ملكي، ورد طائفي وجلود معتقة',
        accords: ['عود معتق', 'دخان بخوري', 'زعفران كشميري', 'هيبة وسلطان'],
        vibeKey: 'smoky_oud',
        matchedProduct: 'طيبة عود ملكي معتق',
        bgHue: 'from-[#b38b33] via-[#78350f] to-[#1c1917]'
      };
    }
  };

  const mood = getMoodDetails(value);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateValueFromPointer(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateValueFromPointer(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const updateValueFromPointer = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pos = (clientX - rect.left) / rect.width;
    // In RTL, left is 100% and right is 0%, or vice-versa. Let's make left = 0% (Energetic) and right = 100% (Mysterious)
    const clamped = Math.max(0, Math.min(100, Math.round(pos * 100)));
    onChange(clamped);
  };

  return (
    <div className={`space-y-5 select-none ${className}`}>
      {/* Slider Header */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-[#f2ca50] font-bold">
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-display">مقياس المزاج العطري (Interactive Mood Slider)</span>
        </div>
        <span className="font-mono-num font-bold text-xs px-2.5 py-0.5 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] border border-[#f2ca50]/30">
          درجة العود: {value}%
        </span>
      </div>

      {/* Extreme Poles Labels */}
      <div className="flex items-center justify-between text-xs text-[#c4bba9]">
        <div className="flex items-center gap-1.5 text-amber-300">
          <Sun className="w-4 h-4 animate-pulse text-amber-400" />
          <span className="font-bold">منعش / حمضيات (Energetic Citrus)</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#e8c178]">
          <Moon className="w-4 h-4 text-[#f2ca50]" />
          <span className="font-bold">غامض / عود معتق (Mysterious Oud)</span>
        </div>
      </div>

      {/* Fluid Slider Track */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative h-7 bg-[#090807] rounded-full p-1 cursor-pointer border-2 border-[#f2ca50]/40 shadow-[0_0_20px_rgba(242,202,80,0.15)] flex items-center"
      >
        {/* Dynamic Gradient Bar with Fluid Visual */}
        <div
          className="absolute inset-y-1 left-1 rounded-full transition-all duration-150 ease-out bg-gradient-to-r from-[#eab308] via-[#f2ca50] to-[#78350f]"
          style={{ width: `${value}%` }}
        />

        {/* Shimmer pulse inside bar */}
        <div className="absolute inset-0 rounded-full opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />

        {/* Interactive Fluid Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-tr from-[#b38b33] via-[#fff7d6] to-[#f2ca50] shadow-[0_0_20px_#f2ca50] border-2 border-[#090807] flex items-center justify-center transition-transform duration-100 ease-out cursor-grab active:cursor-grabbing hover:scale-110"
          style={{
            left: `calc(${value}% - 16px)`
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#090807]" />
        </div>
      </div>

      {/* Preset Quick Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { label: 'انتعاش حمضي', value: 10, icon: Citrus },
          { label: 'مسك أرستقراطي', value: 35, icon: Wind },
          { label: 'عنبر بلسمي دافئ', value: 65, icon: Flame },
          { label: 'عود ملكي معتق', value: 95, icon: Sparkles }
        ].map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onChange(preset.value)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition border flex items-center justify-center gap-1.5 ${
              Math.abs(value - preset.value) <= 15
                ? 'bg-[#f2ca50] text-[#090807] border-[#f2ca50] font-bold shadow-md'
                : 'bg-[#141312] text-gray-300 hover:text-white border-white/10 hover:border-[#f2ca50]/40'
            }`}
          >
            <preset.icon className="w-3.5 h-3.5" />
            <span>{preset.label}</span>
          </button>
        ))}
      </div>

      {/* Real-time Dynamic Mood & Olfactory Breakdown Card */}
      <div className="bg-[#1c1812]/90 border border-[#f2ca50]/30 rounded-2xl p-4 space-y-3 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#f2ca50] font-bold block">
              الحالة المزاجية المحددة:
            </span>
            <h4 className="text-sm font-bold font-display text-white mt-0.5">
              {mood.label}
            </h4>
          </div>
          <span className="text-[11px] bg-[#090807] text-[#e8c178] px-2.5 py-1 rounded-lg border border-[#f2ca50]/20 font-bold">
            العطر الأقرب: {mood.matchedProduct}
          </span>
        </div>

        <p className="text-xs text-[#c4bba9] leading-relaxed">
          {mood.subtitle}
        </p>

        {/* Accords Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {mood.accords.map((accord, i) => (
            <span
              key={i}
              className="text-[10px] bg-[#090807] text-[#f2ca50] px-2.5 py-0.5 rounded-md border border-white/5 font-medium"
            >
              • {accord}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
