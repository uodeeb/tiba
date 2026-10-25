import React, { useState } from 'react';
import { ScentNote } from '../types';
import { SCENT_NOTES_DATABASE } from '../data/scentNotesDatabase';
import { useApp } from '../context/AppContext';
import { ArrowLeftRight, Sparkles, Flame, Clock, Wind, Check, ChevronDown, Compass, Award } from 'lucide-react';

interface ScentCompareDeckProps {
  initialNoteId1?: string;
  initialNoteId2?: string;
}

export const ScentCompareDeck: React.FC<ScentCompareDeckProps> = ({
  initialNoteId1 = 'oud-cambodian',
  initialNoteId2 = 'amber-ambergris'
}) => {
  const { products, setSelectedProductId, setView, openNoteExplainer } = useApp();

  const [note1Id, setNote1Id] = useState<string>(initialNoteId1);
  const [note2Id, setNote2Id] = useState<string>(initialNoteId2);

  const note1 = SCENT_NOTES_DATABASE.find((n) => n.id === note1Id) || SCENT_NOTES_DATABASE[0];
  const note2 = SCENT_NOTES_DATABASE.find((n) => n.id === note2Id) || SCENT_NOTES_DATABASE[1];

  // Swap notes
  const handleSwap = () => {
    const temp = note1Id;
    setNote1Id(note2Id);
    setNote2Id(temp);
  };

  // Find products that feature either or both notes
  const mutualProducts = products.filter(
    (p) =>
      note1.featuredInProductIds.includes(p.id) && note2.featuredInProductIds.includes(p.id)
  );

  // Egyptian dialect synergy generator
  const getSynergyExplanation = (n1: ScentNote, n2: ScentNote) => {
    if (n1.category === 'oud' && n2.category === 'amber') {
      return 'الخلطة دي يا باشا بتعمل سحر ملكي! العود بيدك هيبة وفخامة تقيلة، والعنبر بيجي يدفّي الخشب ويثبته على الهدوم يومين وزيادة.. ميكس شيوخ أصيل ومناسب جداً للشتا والمجالس الكبيرة.';
    }
    if (n1.category === 'floral' && n2.category === 'oud') {
      return 'توليفة الملوك التاريخية! الورد بيكسر حدة العود وينعشه في الأول، وبعد ساعة العود يستقر مع عسل الورد ويعملوا فوحان يملأ أي مكان تدخله.. عطر يخلي الكل يلتفت ويسألك عن ريحتك.';
    }
    if (n1.category === 'musk' && n2.category === 'citrus') {
      return 'جرعة نضافة وانتعاش ملهاش حل! النيرولي والليمون يديك طاقة وصحصحة الصبح بدري، والمسك الأبيض يفضل مدي هالة قطنية باردة ونضيفة تدوم طول النهار في شغل أو جامعة.';
    }
    if (n1.category === 'leather') {
      return 'ميكس الفخامة والهيبة الحازمة! نوتة الجلد الطبيعي بتدي طابع قيادي وقوي، ومع النوتة التانية بتعمل هالة مميزة جداً تثبت شخصيتك في كل اجتماع ومقابلة رسمية.';
    }
    return `لما تدمج "${n1.nameAr}" مع "${n2.nameAr}"، هتلاقي التدرج العطري اتزن تماماً؛ نوتة بتفتح وتلفت الانتباه، ونوتة تانية بتثبت تحت وتفضل فايحة في المكان بنعومة وفخامة.`;
  };

  const getIntensityLabel = (score: number) => {
    if (score >= 9.5) return 'فوحان جبار (Beast Mode)';
    if (score >= 8.5) return 'حضور مهيب يملأ الأوضة';
    if (score >= 7.5) return 'فوحان متزن وجذاب جداً';
    return 'هالة رايقة ونظيفة';
  };

  const getLongevityLabel = (hours: number) => {
    if (hours >= 36) return `ثبات أسطوري (+${hours} ساعة على الهدوم)`;
    if (hours >= 20) return `يوم كامل وزيادة (+${hours} ساعة)`;
    return `نهارك كله ثابت (+${hours} ساعة)`;
  };

  return (
    <div className="bg-[#141312]/95 border-2 border-[#f2ca50]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 select-none relative overflow-hidden backdrop-blur-md">
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#f2ca50]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#e8c178]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header in Simple Egyptian Dialect */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f2ca50]/20 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] text-xs font-bold border border-[#f2ca50]/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مقارنة النوتات وجهًا لوجه (Side-by-Side Scent Battle)</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black font-display text-white">
            قارن بين نوتتين عطر وشوف الفرق بنفسك!
          </h2>
          <p className="text-xs sm:text-sm text-[#c4bba9] mt-1">
            اختار أي مكوّنين وشوف قوة فوحانهم، ثباتهم على الهدوم، وإيه اللي هيحصل لو رشيتهم سوا بالبلدي.
          </p>
        </div>

        {/* Quick Presets Buttons in Egyptian Dialect */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setNote1Id('oud-cambodian');
              setNote2Id('amber-ambergris');
            }}
            className="px-3 py-1.5 bg-[#1c1810] hover:bg-[#2a2418] border border-[#f2ca50]/30 text-[#f2ca50] rounded-xl text-[11px] font-bold transition shadow-sm"
          >
            عود كمبودي vs عنبر حوت
          </button>
          <button
            onClick={() => {
              setNote1Id('musk-white-tahara');
              setNote2Id('neroli-nile');
            }}
            className="px-3 py-1.5 bg-[#1c1810] hover:bg-[#2a2418] border border-[#f2ca50]/30 text-[#f2ca50] rounded-xl text-[11px] font-bold transition shadow-sm"
          >
            مسك الطهارة vs نيرولي النيل
          </button>
          <button
            onClick={() => {
              setNote1Id('rose-taif');
              setNote2Id('vanilla-bourbon');
            }}
            className="px-3 py-1.5 bg-[#1c1810] hover:bg-[#2a2418] border border-[#f2ca50]/30 text-[#f2ca50] rounded-xl text-[11px] font-bold transition shadow-sm"
          >
            ورد طائفي vs فانيليا بوربون
          </button>
        </div>
      </div>

      {/* Dual Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center bg-[#090807]/90 p-4 rounded-2xl border border-white/5">
        {/* Selector 1 */}
        <div className="md:col-span-5 space-y-1 text-right">
          <label className="text-xs font-bold text-[#f2ca50] block">
            النوتة الأولى (اختار المكوّن الأول):
          </label>
          <div className="relative">
            <select
              value={note1Id}
              onChange={(e) => setNote1Id(e.target.value)}
              className="w-full bg-[#141312] border-2 border-[#f2ca50]/40 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-[#f2ca50] appearance-none"
            >
              {SCENT_NOTES_DATABASE.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.nameAr} ({n.categoryLabel})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#f2ca50] absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Swap Button (1 col) */}
        <div className="md:col-span-1 flex justify-center py-2 md:py-0">
          <button
            type="button"
            onClick={handleSwap}
            className="p-3 rounded-full bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] hover:scale-110 active:scale-95 shadow-lg transition duration-200"
            title="بدّل مكان النوتتين"
          >
            <ArrowLeftRight className="w-4 h-4 font-black" />
          </button>
        </div>

        {/* Selector 2 */}
        <div className="md:col-span-5 space-y-1 text-right">
          <label className="text-xs font-bold text-[#e8c178] block">
            النوتة التانية (اختار المكوّن التاني):
          </label>
          <div className="relative">
            <select
              value={note2Id}
              onChange={(e) => setNote2Id(e.target.value)}
              className="w-full bg-[#141312] border-2 border-[#e8c178]/40 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-[#f2ca50] appearance-none"
            >
              {SCENT_NOTES_DATABASE.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.nameAr} ({n.categoryLabel})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#e8c178] absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-[#1c1810] border-2 border-[#f2ca50]/50 rounded-3xl p-6 space-y-5 shadow-xl relative overflow-hidden group hover:border-[#f2ca50] transition">
          <div className="flex items-center justify-between border-b border-[#f2ca50]/20 pb-3">
            <div>
              <span className="text-[10px] bg-[#f2ca50]/15 text-[#f2ca50] px-2.5 py-0.5 rounded-full font-bold">
                {note1.categoryLabel}
              </span>
              <h3 className="text-xl font-black font-display text-white mt-1">
                {note1.nameAr}
              </h3>
              <p className="text-[11px] text-[#a69c8a] font-mono">{note1.nameEn}</p>
            </div>
            <button
              onClick={() => openNoteExplainer(note1.id)}
              className="text-xs text-[#f2ca50] underline font-bold"
            >
              تفاصيل أكتر ℹ️
            </button>
          </div>

          {/* Scent Profile in Egyptian */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#f2ca50] block flex items-center gap-1.5">
              <Wind className="w-4 h-4" />
              <span>ريحتها عاملة إزاي بالظبط؟</span>
            </span>
            <p className="text-xs text-[#fff7d6] leading-relaxed bg-[#090807]/70 p-3 rounded-xl border border-white/5">
              {note1.scentProfile}
            </p>
          </div>

          {/* Intensity Comparative Meter */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-[#c4bba9] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#f2ca50]" />
                <span>قوة الفوحان وحضورها:</span>
              </span>
              <span className="font-mono-num font-bold text-[#f2ca50]">
                {note1.intensityRating} من 10 ({getIntensityLabel(note1.intensityRating)})
              </span>
            </div>
            <div className="w-full bg-[#090807] h-2.5 rounded-full overflow-hidden border border-white/5">
              <div
                className="bg-gradient-to-r from-[#b38b33] via-[#f2ca50] to-[#fff7d6] h-full rounded-full transition-all duration-500"
                style={{ width: `${(note1.intensityRating / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Longevity Comparative Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-[#c4bba9] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#18cd61]" />
                <span>ثباتها على الهدوم:</span>
              </span>
              <span className="font-mono-num font-bold text-[#18cd61]">
                {getLongevityLabel(note1.longevityHours)}
              </span>
            </div>
            <div className="w-full bg-[#090807] h-2.5 rounded-full overflow-hidden border border-white/5">
              <div
                className="bg-gradient-to-r from-emerald-600 to-[#18cd61] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (note1.longevityHours / 48) * 100)}%` }}
              />
            </div>
          </div>

          {/* Common Pairings */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#c4bba9] block">
              النوتات اللي تليق وتتدربك معاها زي الفل:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {note1.commonPairings.map((pair, idx) => (
                <button
                  key={idx}
                  onClick={() => openNoteExplainer(pair)}
                  className="px-2.5 py-1 rounded-lg bg-[#090807] text-[#f2ca50] border border-[#f2ca50]/20 hover:border-[#f2ca50] text-[11px] font-medium transition"
                >
                  + {pair}
                </button>
              ))}
            </div>
          </div>

          {/* Best Occasion */}
          <div className="text-xs text-[#a69c8a] pt-2 border-t border-white/5">
            <strong>الجو بتاعها:</strong> {note1.bestSeason}
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#1c1810] border-2 border-[#e8c178]/50 rounded-3xl p-6 space-y-5 shadow-xl relative overflow-hidden group hover:border-[#e8c178] transition">
          <div className="flex items-center justify-between border-b border-[#e8c178]/20 pb-3">
            <div>
              <span className="text-[10px] bg-[#e8c178]/15 text-[#e8c178] px-2.5 py-0.5 rounded-full font-bold">
                {note2.categoryLabel}
              </span>
              <h3 className="text-xl font-black font-display text-white mt-1">
                {note2.nameAr}
              </h3>
              <p className="text-[11px] text-[#a69c8a] font-mono">{note2.nameEn}</p>
            </div>
            <button
              onClick={() => openNoteExplainer(note2.id)}
              className="text-xs text-[#e8c178] underline font-bold"
            >
              تفاصيل أكتر ℹ️
            </button>
          </div>

          {/* Scent Profile in Egyptian */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#e8c178] block flex items-center gap-1.5">
              <Wind className="w-4 h-4" />
              <span>ريحتها عاملة إزاي بالظبط؟</span>
            </span>
            <p className="text-xs text-[#fff7d6] leading-relaxed bg-[#090807]/70 p-3 rounded-xl border border-white/5">
              {note2.scentProfile}
            </p>
          </div>

          {/* Intensity Comparative Meter */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-[#c4bba9] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#e8c178]" />
                <span>قوة الفوحان وحضورها:</span>
              </span>
              <span className="font-mono-num font-bold text-[#e8c178]">
                {note2.intensityRating} من 10 ({getIntensityLabel(note2.intensityRating)})
              </span>
            </div>
            <div className="w-full bg-[#090807] h-2.5 rounded-full overflow-hidden border border-white/5">
              <div
                className="bg-gradient-to-r from-[#b38b33] via-[#e8c178] to-[#fff7d6] h-full rounded-full transition-all duration-500"
                style={{ width: `${(note2.intensityRating / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Longevity Comparative Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-[#c4bba9] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#18cd61]" />
                <span>ثباتها على الهدوم:</span>
              </span>
              <span className="font-mono-num font-bold text-[#18cd61]">
                {getLongevityLabel(note2.longevityHours)}
              </span>
            </div>
            <div className="w-full bg-[#090807] h-2.5 rounded-full overflow-hidden border border-white/5">
              <div
                className="bg-gradient-to-r from-emerald-600 to-[#18cd61] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (note2.longevityHours / 48) * 100)}%` }}
              />
            </div>
          </div>

          {/* Common Pairings */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#c4bba9] block">
              النوتات اللي تليق وتتدربك معاها زي الفل:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {note2.commonPairings.map((pair, idx) => (
                <button
                  key={idx}
                  onClick={() => openNoteExplainer(pair)}
                  className="px-2.5 py-1 rounded-lg bg-[#090807] text-[#e8c178] border border-[#e8c178]/20 hover:border-[#e8c178] text-[11px] font-medium transition"
                >
                  + {pair}
                </button>
              ))}
            </div>
          </div>

          {/* Best Occasion */}
          <div className="text-xs text-[#a69c8a] pt-2 border-t border-white/5">
            <strong>الجو بتاعها:</strong> {note2.bestSeason}
          </div>
        </div>
      </div>

      {/* Chemical Synergy Section: "إيه اللي هيحصل لو رشيتهم سوا؟" */}
      <div className="bg-gradient-to-r from-[#211a0f] via-[#2a2214] to-[#211a0f] border-2 border-[#f2ca50]/50 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#b38b33] to-[#f2ca50] flex items-center justify-center text-[#090807] font-black shadow-lg">
            ⚗️
          </div>
          <div>
            <h4 className="text-lg font-bold font-display text-white">
              سر الخلطة: إيه اللي هيحصل لو رشيت النوتتين دول مع بعض؟
            </h4>
            <p className="text-xs text-[#f2ca50]">كيمياء التوليف الملكي لدار طيبة بالعصارة الصعيدية</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#fff7d6] leading-relaxed font-light">
          {getSynergyExplanation(note1, note2)}
        </p>

        {/* Mutual Products in Dar Tiba */}
        {mutualProducts.length > 0 && (
          <div className="pt-3 border-t border-[#f2ca50]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-white font-bold">
              عطور من دار طيبة بتجمع بين «{note1.nameAr}» و«{note2.nameAr}»:
            </span>
            <div className="flex items-center gap-2">
              {mutualProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProductId(p.id);
                    setView('product-detail');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] font-bold text-xs rounded-xl shadow transition hover:opacity-95 flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>اقتنِ {p.nameAr} ({p.price} ج.م)</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
