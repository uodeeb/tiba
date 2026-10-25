import React from 'react';
import { useApp } from '../context/AppContext';
import { BottleTilt3D } from '../components/BottleTilt3D';
import { SillageRadar } from '../components/SillageRadar';
import { Sparkles, Shield, Clock, Flame, ArrowLeft, Star, Box, ChevronRight, Award, Zap } from 'lucide-react';

export const MainStageView: React.FC = () => {
  const {
    products,
    setView,
    setSelectedProductId,
    addToCart,
    promotions
  } = useApp();

  const heroProduct = products[0]; // طيبة عود ملكي معتق
  const featuredProducts = products.slice(1, 4);

  return (
    <div className="relative overflow-hidden space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-28 sm:w-32 rounded-xl bg-black p-1 border border-[#f2ca50]/60 shadow-[0_0_20px_rgba(242,202,80,0.35)] overflow-hidden flex items-center justify-center flex-shrink-0">
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/30 text-[#f2ca50] text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-[#f2ca50]" />
                <span>المقر الإقليمي بأسيوط • تسليم فوري باليد</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white leading-tight">
              أصالة العود المعتق.. <br />
              <span className="gold-gradient-text">وهيبة الحضور الأرستقراطي</span>
            </h1>

            <p className="text-sm sm:text-base text-[#c4bba9] leading-relaxed max-w-2xl font-light">
              من قلب صعيد مصر، نبتكر خلطات عطرية نادرة بتركيز مستخلص العطر الملكي (Extrait de Parfum 32%).
              دهن عود كمبودي نخب أول، ورد طائفي عتيق، وعنبر حوت نقي لا يزول أثره لأيام.
            </p>

            {/* Quick Hero Highlights */}
            <div className="grid grid-cols-3 gap-3 py-2 border-y border-[#f2ca50]/15 max-w-lg">
              <div className="text-right">
                <span className="text-xs text-[#a69c8a] block">نسبة التركيز</span>
                <span className="text-base sm:text-lg font-bold text-[#f2ca50] font-mono-num">32% Extrait</span>
              </div>
              <div className="text-right border-r border-[#f2ca50]/20 pr-3">
                <span className="text-xs text-[#a69c8a] block">ثبات الأثر</span>
                <span className="text-base sm:text-lg font-bold text-[#f2ca50] font-mono-num">+18 ساعة</span>
              </div>
              <div className="text-right border-r border-[#f2ca50]/20 pr-3">
                <span className="text-xs text-[#a69c8a] block">الضمان الملكي</span>
                <span className="text-base sm:text-lg font-bold text-[#18cd61]">معاينة قبل الدفع</span>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedProductId(heroProduct.id);
                  setView('product-detail');
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-[#b38b33] via-[#f2ca50] to-[#e8c178] hover:opacity-95 text-[#090807] font-display font-black text-sm rounded-xl shadow-[0_4px_30px_rgba(242,202,80,0.35)] flex items-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <span>اقتنِ أيقونة الدار (940 ج.م)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setView('quiz')}
                className="px-5 py-3.5 bg-[#141312] hover:bg-[#201c17] text-[#f2ca50] border border-[#f2ca50]/40 font-display font-semibold text-sm rounded-xl transition flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-[#f2ca50]" />
                <span>مستشار العطور التفاعلي</span>
              </button>

              <button
                onClick={() => setView('discovery-kit')}
                className="px-4 py-3.5 bg-white/5 hover:bg-white/10 text-white/90 font-medium text-xs rounded-xl border border-white/10 transition flex items-center gap-1.5"
              >
                <Box className="w-4 h-4 text-[#e8c178]" />
                <span>صندوق العينات (190 ج.م)</span>
              </button>
            </div>
          </div>

          {/* Hero 3D Interactive Bottle Canvas (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative group">
              <BottleTilt3D
                imageSrc={heroProduct.image}
                name={heroProduct.nameAr}
                size="hero"
                badge="الأكثر طلباً بالصعيد"
              />

              {/* Floating Scent Spec Card */}
              <div className="absolute -bottom-4 right-2 sm:right-6 bg-[#141312]/95 border border-[#f2ca50]/40 rounded-xl p-3.5 shadow-2xl backdrop-blur-md max-w-[240px]">
                <div className="flex items-center gap-1.5 text-xs text-[#f2ca50] font-bold mb-1">
                  <Award className="w-4 h-4" />
                  <span>طيبة عود ملكي معتق 25 سنة</span>
                </div>
                <p className="text-[11px] text-[#a69c8a] line-clamp-2">
                  ورد طائفي، عنبر رمادي، ودهن كمبودي صافي غير ممدد
                </p>
                <div className="mt-2 flex items-center justify-between text-xs pt-1 border-t border-[#f2ca50]/15">
                  <span className="font-mono-num font-bold text-[#f2ca50]">{heroProduct.price} ج.م</span>
                  <button
                    onClick={(e) => addToCart(heroProduct, 1, '100ml', e)}
                    className="text-[11px] text-[#f2ca50] underline font-semibold hover:text-white transition active:scale-95"
                  >
                    أضف للحقيبة +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#141312]/80 border border-[#f2ca50]/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f2ca50]/10 border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-display">معاينة قبل الدفع</h4>
              <p className="text-[11px] text-[#a69c8a] mt-0.5">افتح الطرد وتأكد من الزجاجة بنفسك</p>
            </div>
          </div>

          <div className="bg-[#141312]/80 border border-[#f2ca50]/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f2ca50]/10 border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-display">توصيل سريع بأسيوط</h4>
              <p className="text-[11px] text-[#a69c8a] mt-0.5">تسليم فوري خلال 4 ساعات داخل المحافظة</p>
            </div>
          </div>

          <div className="bg-[#141312]/80 border border-[#f2ca50]/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f2ca50]/10 border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-display">ثبات مضمون +14 ساعة</h4>
              <p className="text-[11px] text-[#a69c8a] mt-0.5">تركيزات مستخلص العطر الأصلي النقي</p>
            </div>
          </div>

          <div className="bg-[#141312]/80 border border-[#f2ca50]/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f2ca50]/10 border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-display">استرداد 190 ج.م مجاناً</h4>
              <p className="text-[11px] text-[#a69c8a] mt-0.5">قيمة صندوق العينات تخصم من الزجاجة الكبيرة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Royal Packaging & Official Brand Seal Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#f2ca50]/40 bg-gradient-to-br from-[#12100d] via-[#1a1610] to-[#0d0c0a] p-6 sm:p-10 shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f2ca50]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content / Video Seal (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                {/* Golden Animated Logo Seal Container - Contained Imperial Plaque */}
                <div className="w-64 sm:w-80 h-36 sm:h-44 rounded-3xl p-1 bg-gradient-to-tr from-[#8a6820] via-[#f2ca50] to-[#ffd875] shadow-[0_0_40px_rgba(242,202,80,0.4)] relative overflow-hidden">
                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-black relative flex items-center justify-center p-2">
                    <video
                      src="/assets/aistudio/logo_anim_opt.mp4"
                      poster="/assets/aistudio/logo_frame.jpg"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-radial from-transparent to-black/20 pointer-events-none" />
                  </div>
                </div>

                {/* Sparkling Seal Badge */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#090807] border border-[#f2ca50] px-4 py-1 rounded-full text-xs text-[#f2ca50] font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>ختم الأصالة الملكي المتحرك</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-[#a69c8a] tracking-widest font-mono">
                  DAR TIBA ROYAL SEAL
                </span>
                <p className="text-xs text-[#c4bba9] mt-1">
                  طيبة للعطور والعود الملكي • أسيوط
                </p>
              </div>
            </div>

            {/* Right Content: Box Design & Ammiya Microcopy (7 cols) */}
            <div className="lg:col-span-7 space-y-5 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ca50]/15 border border-[#f2ca50]/35 text-[#f2ca50] text-xs font-bold">
                <Award className="w-4 h-4 text-[#f2ca50]" />
                <span>التغليف الملكي الفاخر مجاناً مع كل زجاجة</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white leading-tight">
                العلبة الملكية المحفورة بذهب 24 قيراط.. <br />
                <span className="gold-gradient-text">فخامة تشرّفك وإهداء من القلب</span>
              </h3>

              <p className="text-sm text-[#d6cebf] leading-relaxed font-light">
                إحنا في صعيد مصر ما بنرضاش غير بالأصول: كل عطر بيطلع من معاملنا بأسيوط بيتسكن يدوي جوه صندوق خشبي فاخر مبطن بالمخمل والحرير الأسود، ومحفور على غطاه شعار دار طيبة المذهب، عشان لما تستلمه أو تهديه لحد غالي، تحس بهيبة الملوك من أول لمسة.
              </p>

              {/* Box Preview Thumbnail & Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="relative rounded-2xl overflow-hidden border border-[#f2ca50]/30 group">
                  <img
                    src="/assets/perfumes/royal_gift_box.jpg"
                    alt="علبة الإهداء الملكية بشعار طيبة"
                    className="w-full h-36 object-cover object-center group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-xs text-[#f2ca50] font-bold">صندوق المخمل الأسود بالحفر المذهب</span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-[#f2ca50]/30 group">
                  <img
                    src="/assets/perfumes/oud_box_design.jpg"
                    alt="تصميم علبة عود ملكي بشعار طيبة"
                    className="w-full h-36 object-cover object-center group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-xs text-[#f2ca50] font-bold">إصدار التعتيق الأخضر الإمبراطوري</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#a69c8a] border-t border-[#f2ca50]/15">
                <div className="flex items-center gap-1.5 text-[#18cd61] font-bold">
                  <Shield className="w-4 h-4" />
                  <span>معاينة العلبة والرائحة قبل دفع مليم</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#f2ca50]">
                  <Box className="w-4 h-4" />
                  <span>تغليف إهداء VIP مجاني 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Masterpieces Carousel/Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#f2ca50]/20 pb-4">
          <div>
            <div className="text-xs font-semibold text-[#f2ca50] flex items-center gap-1.5">
              <span>★</span>
              <span>نخبة ابتكارات دار طيبة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
              الخزينة الملكية المختارة
            </h2>
          </div>
          <button
            onClick={() => setView('catalog')}
            className="text-xs text-[#f2ca50] hover:text-white font-semibold flex items-center gap-1 transition"
          >
            <span>عرض التشكيلة الكاملة (6 عطور)</span>
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              data-product-card={product.id}
              className="bg-[#141312]/90 border border-[#f2ca50]/20 hover:border-[#f2ca50]/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(242,202,80,0.15)] group"
            >
              <div>
                {/* 3D Bottle Card Presentation */}
                <div
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setView('product-detail');
                  }}
                  className="cursor-pointer"
                >
                  <BottleTilt3D
                    imageSrc={product.image}
                    name={product.nameAr}
                    size="md"
                    className="mx-auto"
                  />
                </div>

                <div className="mt-4 space-y-1.5 text-right">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#f2ca50]/15 text-[#f2ca50] font-medium">
                      {product.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#f2ca50]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-mono-num font-bold">{product.rating}</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setView('product-detail');
                    }}
                    className="text-lg font-bold font-display text-white group-hover:text-[#f2ca50] cursor-pointer transition"
                  >
                    {product.nameAr}
                  </h3>

                  <p className="text-xs text-[#a69c8a] line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>

                  {/* Notes Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {product.topNotes.slice(0, 2).map((note, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-[#090807] text-[#c4bba9] px-2 py-0.5 rounded-full border border-white/5"
                      >
                        {note}
                      </span>
                    ))}
                    <span className="text-[10px] bg-[#090807] text-[#f2ca50] px-2 py-0.5 rounded-full border border-[#f2ca50]/20">
                      +{product.longevityHours}h ثبات
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Price & Add Action */}
              <div className="mt-5 pt-4 border-t border-[#f2ca50]/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 line-through block font-mono-num">
                    {product.originalPrice} ج.م
                  </span>
                  <span className="text-base font-bold font-mono-num text-[#f2ca50]">
                    {product.price} ج.م
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setView('product-detail');
                    }}
                    className="px-3 py-1.5 text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition"
                  >
                    تفاصيل
                  </button>
                  <button
                    onClick={(e) => addToCart(product, 1, '100ml', e)}
                    className="px-3.5 py-1.5 bg-[#f2ca50] hover:bg-[#ffe17d] text-[#090807] font-bold text-xs rounded-lg transition shadow active:scale-95"
                  >
                    أضف للحقيبة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discovery Box Promotion Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1a160f] via-[#201b12] to-[#120f0a] border border-[#f2ca50]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-right">
              <span className="text-xs bg-[#f2ca50]/20 text-[#f2ca50] font-bold px-3 py-1 rounded-full border border-[#f2ca50]/30 inline-block">
                ميزة حصرية للمترددين في الاختيار
              </span>

              <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
                صندوق الاستكشاف الملكي (3 عينات × 10مل) <br />
                <span className="text-[#f2ca50]">مع كود استرداد 190 ج.م مجاناً!</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#d6cebf] leading-relaxed max-w-xl">
                اختر 3 عينات من العطور التي تلهمك لتصلك في صندوق مخملي فاخر بقيمة 190 ج.م فقط.
                ستحصل داخل الصندوق على كود خصم فوري (<strong>TIBA190</strong>) يخصم لك الـ 190 ج.م كاملة عند طلب أي زجاجة 100مل لاحقاً!
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setView('discovery-kit')}
                  className="px-6 py-3 bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] font-display font-black text-sm rounded-xl shadow-lg hover:opacity-95 transition"
                >
                  صمّم صندوق عيناتك الآن (190 ج.م)
                </button>
                <span className="text-xs text-[#a69c8a] flex items-center gap-1">
                  <Shield className="w-4 h-4 text-[#18cd61]" />
                  <span>استرداد فوري 100% مضمون</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-56 sm:w-72 h-48 sm:h-64 rounded-2xl bg-[#090807] border-2 border-[#f2ca50]/40 flex items-center justify-center p-2 shadow-[0_0_40px_rgba(242,202,80,0.25)] overflow-hidden">
                <img
                  src="/assets/perfumes/discovery_coffret.jpg"
                  alt="صندوق الاستكشاف الملكي"
                  className="w-full h-full object-cover rounded-xl filter drop-shadow-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/perfumes/royal_oud.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 bg-[#18cd61] text-[#090807] font-bold text-[10px] px-2.5 py-1 rounded-full uppercase shadow">
                  Cashback 100%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scent Sonar Demo Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#141312]/60 border border-[#f2ca50]/20 rounded-3xl p-6 sm:p-8">
          <div>
            <span className="text-xs text-[#f2ca50] font-bold">الهندسة الشمية لدار طيبة</span>
            <h3 className="text-2xl font-black font-display text-white mt-1">
              رادار الفوحان الملكي: لماذا يدوم عطرنا +18 ساعة؟
            </h3>
            <p className="text-xs sm:text-sm text-[#a69c8a] mt-3 leading-relaxed">
              نعتمد في دار طيبة على التعتيق في براميل خشب الأرز النقي بنسبة زيوت عطرية 32% (Extrait de Parfum)، مما يعطي الزيت ثقلاً جزيئياً يمنع تطايره السريع، ويخلق هالة انتشار محيطية تصل إلى 3.8 متر حولك.
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-[#d6cebf]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f2ca50]" />
                <span>زيوت طبيعية نقية 100%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#18cd61]" />
                <span>خالٍ من المذيبات الكيميائية الحادة</span>
              </div>
            </div>
          </div>
          <div>
            <SillageRadar
              radiusMeters={3.8}
              longevityHours={18}
              rating={9.6}
              scentName="طيبة عود ملكي"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
