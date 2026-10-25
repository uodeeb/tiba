import React from 'react';
import { useApp } from '../context/AppContext';
import { BottleTilt3D } from '../components/BottleTilt3D';
import { SillageRadar } from '../components/SillageRadar';
import { Sparkles, ShoppingBag, RotateCcw, CheckCircle, Star, ArrowLeft } from 'lucide-react';

export const MatchResultView: React.FC = () => {
  const {
    quizResultProduct,
    products,
    addToCart,
    setSelectedProductId,
    setView,
    resetQuiz,
    openNoteExplainer
  } = useApp();

  const product = quizResultProduct || products[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Top Congratulatory Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18cd61]/10 border border-[#18cd61]/30 text-[#18cd61] text-xs font-bold">
          <CheckCircle className="w-4 h-4" />
          <span>تم اكتمال التقطير والتحليل بنسبة توافق 98.6%</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-display text-white">
          عطرك الملكي المختار: <span className="gold-gradient-text">{product.nameAr}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#a69c8a] max-w-xl mx-auto">
          بناءً على اختياراتك للفوحان والمناخ، هذا العطر هو التجسيد المثالي لحضورك وشخصيتك
        </p>
      </div>

      {/* Main Revelation Grid */}
      <div className="bg-[#141312]/95 border border-[#f2ca50]/40 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D Bottle Showcase (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <BottleTilt3D
              imageSrc={product.image}
              name={product.nameAr}
              size="hero"
              badge="التوافق الأعلى 98%"
            />

            <div className="mt-4 flex items-center gap-2 text-xs text-[#f2ca50]">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-mono-num font-bold text-base">{product.rating}</span>
              <span className="text-[#a69c8a]">({product.reviewsCount} تقييم موثق)</span>
            </div>
          </div>

          {/* Right: Olfactory Specs & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div>
              <span className="text-xs font-bold text-[#f2ca50] bg-[#f2ca50]/10 px-2.5 py-1 rounded-full border border-[#f2ca50]/20">
                {product.concentration}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-2">
                {product.nameAr}
              </h2>
              <p className="text-xs sm:text-sm text-[#c4bba9] mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Olfactory Pyramid Breakdown */}
            <div className="space-y-3 bg-[#090807]/70 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#f2ca50] font-display">الهرم العطري الملكي:</h4>
                <span className="text-[10px] text-[#a69c8a]">انقر على أي نوتة لمعرفة رائحتها ℹ️</span>
              </div>

              <div className="text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <span className="w-20 text-[#a69c8a] flex-shrink-0 pt-0.5">قمة العطر:</span>
                  <div className="flex flex-wrap gap-1">
                    {product.topNotes.map((note, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => openNoteExplainer(note)}
                        className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#f2ca50]/20 text-white hover:text-[#f2ca50] transition flex items-center gap-1 text-[11px]"
                      >
                        <span>{note}</span>
                        <span className="text-[9px] text-[#f2ca50]">ℹ️</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-20 text-[#a69c8a] flex-shrink-0 pt-0.5">قلب العطر:</span>
                  <div className="flex flex-wrap gap-1">
                    {product.heartNotes.map((note, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => openNoteExplainer(note)}
                        className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#f2ca50]/20 text-white hover:text-[#f2ca50] transition flex items-center gap-1 text-[11px]"
                      >
                        <span>{note}</span>
                        <span className="text-[9px] text-[#f2ca50]">ℹ️</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-20 text-[#a69c8a] flex-shrink-0 pt-0.5">قاعدة العطر:</span>
                  <div className="flex flex-wrap gap-1">
                    {product.baseNotes.map((note, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => openNoteExplainer(note)}
                        className="px-2 py-0.5 rounded bg-[#1c1810] hover:bg-[#2a2418] text-[#f2ca50] border border-[#f2ca50]/30 transition flex items-center gap-1 text-[11px] font-bold"
                      >
                        <span>{note}</span>
                        <span className="text-[9px] text-[#f2ca50]">ℹ️</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sillage Sonar Radar Mini */}
            <SillageRadar
              radiusMeters={product.sillageRadiusMeters}
              longevityHours={product.longevityHours}
              rating={product.sillageRating}
              scentName={product.nameAr}
            />

            {/* Price & Action Buttons */}
            <div className="pt-4 border-t border-[#f2ca50]/20 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-500 line-through block font-mono-num">
                  {product.originalPrice} ج.م
                </span>
                <span className="text-2xl font-black font-mono-num text-[#f2ca50]">
                  {product.price} ج.م
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setView('product-detail');
                  }}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition"
                >
                  عرض تفاصيل العطر
                </button>

                <button
                  onClick={(e) => addToCart(product, 1, '100ml', e)}
                  className="px-6 py-3 bg-gradient-to-r from-[#b38b33] via-[#f2ca50] to-[#e8c178] hover:opacity-95 text-[#090807] font-display font-black text-sm rounded-xl shadow-[0_4px_25px_rgba(242,202,80,0.3)] flex items-center gap-2 transition active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>اقتناء هذا العطر الآن</span>
                </button>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <button
                onClick={() => {
                  resetQuiz();
                  setView('quiz');
                }}
                className="text-xs text-gray-400 hover:text-[#f2ca50] flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة اختبار المستشار الذكي بمواصفات أخرى</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
