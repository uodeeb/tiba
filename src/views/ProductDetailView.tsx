import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BottleTilt3D } from '../components/BottleTilt3D';
import { SillageRadar } from '../components/SillageRadar';
import { Sparkles, Shield, Clock, Star, ArrowRight, ShoppingBag, Plus, Minus, Truck, Check, Share2, Box, Award } from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    setView,
    addToCart,
    openNoteExplainer,
    showToast
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('100ml');
  const [activeVisualMode, setActiveVisualMode] = useState<'bottle' | 'box'>('bottle');

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('تم نسخ رابط العطر الفاخر لمشاركته');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 select-none">
      {/* Breadcrumb Bar */}
      <div className="flex items-center justify-between text-xs text-[#a69c8a] border-b border-[#f2ca50]/20 pb-4">
        <button
          onClick={() => setView('catalog')}
          className="flex items-center gap-1.5 hover:text-[#f2ca50] transition"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى الخزينة الملكية</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1 hover:text-white transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة العطر</span>
          </button>
          <span>/</span>
          <span className="text-[#f2ca50] font-semibold">{product.categoryLabel}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: 3D Flacon & Branded Gift Box Stage (5 cols) */}
        <div className="lg:col-span-5 bg-[#141312]/80 border border-[#f2ca50]/30 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center relative shadow-2xl backdrop-blur-md">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 mb-6 bg-black/60 p-1.5 rounded-2xl border border-[#f2ca50]/30 w-full">
            <button
              onClick={() => setActiveVisualMode('bottle')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeVisualMode === 'bottle'
                  ? 'bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] shadow-md'
                  : 'text-[#d6cebf] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>زجاجة العطر (3D)</span>
            </button>
            <button
              onClick={() => setActiveVisualMode('box')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeVisualMode === 'box'
                  ? 'bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] shadow-md'
                  : 'text-[#d6cebf] hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>العلبة الملكية بشعار طيبة</span>
            </button>
          </div>

          {activeVisualMode === 'bottle' ? (
            <>
              <BottleTilt3D
                imageSrc={product.image}
                name={product.nameAr}
                size="hero"
                badge="مستخلص ملكي نقي"
              />

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#a69c8a]">
                <span>حرك الفأرة على الزجاجة لرؤية انعكاس الضوء ثلاثي الأبعاد</span>
              </div>
            </>
          ) : (
            <div className="w-full space-y-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#f2ca50]/40 shadow-2xl aspect-[4/3] bg-black group">
                <img
                  src={product.packagingImage || '/assets/perfumes/royal_gift_box.jpg'}
                  alt={`العلبة الملكية الفاخرة لعطر ${product.nameAr} بشعار دار طيبة`}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 right-3 bg-[#090807]/90 border border-[#f2ca50] px-3 py-1 rounded-full text-[11px] text-[#f2ca50] font-bold flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3 h-3 text-[#f2ca50]" />
                  <span>حفر شعار طيبة بالذهب الخالص</span>
                </div>
                <div className="absolute bottom-3 right-3 left-3 flex justify-between items-center text-xs text-white">
                  <span className="font-semibold text-[#f2ca50]">خشب ومخمل أسود VIP</span>
                  <span className="text-[10px] bg-[#18cd61] text-black font-bold px-2 py-0.5 rounded">مشمول مجاناً</span>
                </div>
              </div>
              <p className="text-xs text-[#c4bba9] text-center leading-relaxed">
                كل زجاجة بتوصلك داخل صندوق الإهداء الملكي المحفور عليه شعار دار طيبة بذهب 24 قيراط، مبطنة بالقطيفة للحفاظ على الزيت العطري.
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#f2ca50]/15 w-full flex justify-between items-center text-xs">
            <span className="text-[#f2ca50] font-mono-num font-bold">الوزن مع العبوة الفاخرة:</span>
            <span className="text-white font-mono-num">{product.weightGrams || 420} جرام</span>
          </div>
        </div>

        {/* Right Column: Olfactory Info & Purchase Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-right">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-[#f2ca50]/40 text-xs text-[#f2ca50] shadow-sm">
                <div className="h-5 w-12 rounded overflow-hidden border border-[#f2ca50]/50 bg-black flex-shrink-0 flex items-center justify-center">
                  <video
                    src="/assets/aistudio/logo_anim_opt.mp4"
                    poster="/assets/aistudio/logo_frame.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain pointer-events-none"
                  />
                </div>
                <span className="font-bold">دار طيبة للعطور والعود الملكي</span>
              </div>
              <span className="text-xs bg-[#f2ca50]/15 text-[#f2ca50] px-3 py-1 rounded-full border border-[#f2ca50]/30 font-bold">
                {product.concentration}
              </span>
              <span className="text-xs bg-white/5 text-[#c4bba9] px-3 py-1 rounded-full border border-white/10">
                {product.gender === 'unisex' ? 'للجنسين (أرستقراطي)' : 'رجالي ملكي'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
              {product.nameAr}
            </h1>
            <p className="text-xs text-[#a69c8a] font-mono mt-0.5 tracking-wider uppercase">
              {product.nameEn}
            </p>

            <div className="flex items-center gap-2 mt-3 text-xs text-[#f2ca50]">
              <div className="flex text-[#f2ca50]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-mono-num font-bold text-sm text-white">{product.rating}</span>
              <span className="text-[#a69c8a]">({product.reviewsCount} تقييم موثق من عملاء الصعيد ومصر)</span>
            </div>

            <p className="text-sm text-[#d6cebf] leading-relaxed mt-4 font-light">
              {product.description}
            </p>
          </div>

          {/* Secret Recipe / Notes Inscription */}
          {product.customNoteRecipe && (
            <div className="p-3.5 rounded-xl bg-[#1c1812] border border-[#f2ca50]/20 text-xs">
              <span className="font-bold text-[#f2ca50] block mb-1">سر التقطير الملكي:</span>
              <p className="text-[#c4bba9] font-mono-num text-[11px]">{product.customNoteRecipe}</p>
            </div>
          )}

          {/* Olfactory Pyramid Accordion/Card with Scent DB Triggers */}
          <div className="bg-[#090807]/80 rounded-2xl p-5 border border-[#f2ca50]/20 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#f2ca50] font-display flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>الهرم العطري والتدرج الزمني</span>
              </h3>
              <span className="text-[10px] text-[#a69c8a]">
                💡 انقر على أي نوتة للتعرف على رائحتها وأصلها
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <span className="text-[#a69c8a] font-bold w-24 flex-shrink-0 pt-1">قمة العطر (0-30 دقيقة):</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.topNotes.map((note, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => openNoteExplainer(note)}
                      className="px-2.5 py-0.5 rounded-lg bg-[#141312] hover:bg-[#201c15] text-white hover:text-[#f2ca50] border border-white/10 hover:border-[#f2ca50]/40 transition flex items-center gap-1 group"
                    >
                      <span>{note}</span>
                      <span className="text-[10px] text-[#f2ca50] opacity-60 group-hover:opacity-100">ℹ️</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#a69c8a] font-bold w-24 flex-shrink-0 pt-1">قلب العطر (1-6 ساعات):</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.heartNotes.map((note, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => openNoteExplainer(note)}
                      className="px-2.5 py-0.5 rounded-lg bg-[#141312] hover:bg-[#201c15] text-white hover:text-[#f2ca50] border border-white/10 hover:border-[#f2ca50]/40 transition flex items-center gap-1 group"
                    >
                      <span>{note}</span>
                      <span className="text-[10px] text-[#f2ca50] opacity-60 group-hover:opacity-100">ℹ️</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#a69c8a] font-bold w-24 flex-shrink-0 pt-1">قاعدة العطر (+18 ساعة):</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.baseNotes.map((note, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => openNoteExplainer(note)}
                      className="px-2.5 py-0.5 rounded-lg bg-[#1a160f] hover:bg-[#282115] text-[#f2ca50] border border-[#f2ca50]/30 hover:border-[#f2ca50] font-bold transition flex items-center gap-1 group shadow-sm"
                    >
                      <span>{note}</span>
                      <span className="text-[10px] text-[#f2ca50]">ℹ️</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sonar Radar Diffusion Metric */}
          <SillageRadar
            radiusMeters={product.sillageRadiusMeters}
            longevityHours={product.longevityHours}
            rating={product.sillageRating}
            scentName={product.nameAr}
          />

          {/* Price, Stepper & Purchase Action */}
          <div className="bg-[#141312] p-6 rounded-2xl border border-[#f2ca50]/30 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-400 line-through block font-mono-num">
                  السعر الأصلي: {product.originalPrice} ج.م
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono-num text-[#f2ca50]">
                    {product.price} ج.م
                  </span>
                  <span className="text-xs text-[#18cd61] font-bold bg-[#18cd61]/15 px-2 py-0.5 rounded">
                    شامل الضريبة
                  </span>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#a69c8a]">الكمية:</span>
                <div className="flex items-center gap-3 bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono-num font-bold text-base text-[#f2ca50] w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={(e) => addToCart(product, quantity, selectedSize, e)}
                className="w-full py-4 bg-gradient-to-r from-[#b38b33] via-[#f2ca50] to-[#e8c178] hover:opacity-95 text-[#090807] font-display font-black text-sm rounded-xl shadow-[0_4px_25px_rgba(242,202,80,0.35)] flex items-center justify-center gap-2 transition active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>أضف للحقيبة الملكية ({product.price * quantity} ج.م)</span>
              </button>

              <button
                onClick={(e) => {
                  addToCart(product, quantity, selectedSize, e);
                  setView('checkout');
                }}
                className="w-full py-4 bg-[#1c1812] hover:bg-[#252018] text-[#f2ca50] border border-[#f2ca50]/40 font-display font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 active:scale-95"
              >
                <span>شراء فوري الآن</span>
              </button>
            </div>

            {/* Regional Delivery Guarantee */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#f2ca50]/15 text-xs text-[#d6cebf]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#f2ca50]" />
                <span>تسليم أسيوط الفوري (خلال 4 ساعات)</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#18cd61]" />
                <span>معاينة الرائحة قبل دفع الثمن للمندوب</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Royal Seal of Authenticity & Upper Egyptian Quality Pledge */}
      <div className="rounded-3xl border border-[#f2ca50]/35 bg-gradient-to-r from-[#12100d] via-[#1a1610] to-[#12100d] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Animated Gold Logo Emblem (4 cols) */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative">
              <div className="w-56 sm:w-64 h-32 sm:h-36 rounded-2xl p-1 bg-gradient-to-tr from-[#997324] via-[#f2ca50] to-[#ffe594] shadow-[0_0_35px_rgba(242,202,80,0.35)] overflow-hidden">
                <div className="w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center p-2">
                  <video
                    src="/assets/aistudio/logo_anim_opt.mp4"
                    poster="/assets/aistudio/logo_frame.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain pointer-events-none"
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#090807] border border-[#f2ca50] px-3 py-0.5 rounded-full text-[10px] text-[#f2ca50] font-bold shadow-md flex items-center gap-1 whitespace-nowrap">
                <Sparkles className="w-3 h-3 text-[#f2ca50]" />
                <span>الختم الملكي المعتمد</span>
              </div>
            </div>
          </div>

          {/* Guarantee Copy & Egyptian Accent (8 cols) */}
          <div className="md:col-span-8 space-y-3 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] border border-[#f2ca50]/30 text-xs font-bold">
              <Shield className="w-3.5 h-3.5 text-[#18cd61]" />
              <span>عهد دار طيبة لأهل الصعيد وكل مصر</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              مش هتدفع قرش إلا لما تعاين وتتأكد بنفسك!
            </h3>

            <p className="text-xs sm:text-sm text-[#d6cebf] leading-relaxed font-light">
              ثقتك هي رأس مالنا الحقيقي: مع كل زجاجة بتطلبها، بيوصلك مع المندوب طرد مختوم بالختم الذهبي لدار طيبة، ومعاه عينة تجريبية مجانية لنفس العطر. افتح العبوة، جرّب الرائحة على معصمك، اتأكد من العلبة الملكية المحفورة بالذهب.. عجبك وثبت؟ ادفع للمندوب وأنت مبسوط ومرتاح. ما ناسبكش؟ يرجع فوراً وبدون أي مصاريف شحن على الإطلاق.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-[#141312] p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                <Check className="w-4 h-4 text-[#18cd61] flex-shrink-0" />
                <span className="text-white font-medium">مستخلص ملكي نقي 32%</span>
              </div>
              <div className="bg-[#141312] p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                <Check className="w-4 h-4 text-[#f2ca50] flex-shrink-0" />
                <span className="text-white font-medium">علبة خشب ومخمل VIP</span>
              </div>
              <div className="bg-[#141312] p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                <Check className="w-4 h-4 text-[#18cd61] flex-shrink-0" />
                <span className="text-white font-medium">شحن سريع ومباشر باليد</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
