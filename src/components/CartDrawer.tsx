import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ArrowLeft, Tag, ShieldCheck, Sparkles, Gift, CheckCircle2 } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartItemQty,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartBuy2Get1Discount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    promotions,
    setView,
    royalBoxBurstTimestamp
  } = useApp();

  const [couponInput, setCouponInput] = useState<string>('');
  const [isBurstActive, setIsBurstActive] = useState<boolean>(false);

  useEffect(() => {
    if (royalBoxBurstTimestamp > 0) {
      setIsBurstActive(true);
      const timer = setTimeout(() => setIsBurstActive(false), 2400);
      return () => clearTimeout(timer);
    }
  }, [royalBoxBurstTimestamp]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setView('checkout');
  };

  const missingForFreeShipping = Math.max(0, promotions.freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / promotions.freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop: Product in luxury package photo instead of blurred dark box */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 cursor-pointer overflow-hidden group transition-opacity"
        title="انقر في أي مكان لإغلاق الحقيبة"
      >
        {/* Product in Branded Royal Package Photography */}
        <img
          src="/assets/perfumes/royal_gift_box.jpg"
          alt="صندوق تغليف عطور دار طيبة الفاخر بشعار الدار الذهبي"
          className={`w-full h-full object-cover object-center transform transition-all duration-700 ease-out ${
            isBurstActive ? 'scale-105 filter brightness-110' : 'scale-100 group-hover:scale-105'
          }`}
        />

        {/* Ambient Dark Gradient Overlays (preserves high clarity of the packaging while ensuring cart drawer readability) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40" />
        <div className={`absolute inset-0 bg-[#f2ca50]/10 mix-blend-overlay transition-opacity duration-500 ${isBurstActive ? 'opacity-100' : 'opacity-40'}`} />

        {/* Floating Packaging Callout Badge with Animated Brand Logo Seal */}
        <div className={`hidden lg:flex absolute top-6 right-6 max-w-sm bg-[#141312]/95 border transition-all duration-500 rounded-2xl p-4 shadow-2xl text-right space-y-3 pointer-events-none ${
          isBurstActive ? 'border-[#f2ca50] shadow-[0_0_35px_rgba(242,202,80,0.5)] scale-105' : 'border-[#f2ca50]/40'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#18cd61] animate-ping" />
              <span className="text-[11px] font-bold text-[#f2ca50] bg-[#f2ca50]/15 px-2.5 py-0.5 rounded-full border border-[#f2ca50]/30">
                {isBurstActive ? '✨ استقر بالعلبة الملكية' : 'التغليف الملكي الفاخر'}
              </span>
            </div>

            {/* Contained Animated Brand Logo Video */}
            <div className="w-16 h-8 rounded-lg border border-[#f2ca50]/60 overflow-hidden bg-black shadow-md flex-shrink-0 flex items-center justify-center p-0.5">
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

          <h4 className="text-sm font-bold font-display text-white">
            شكل المنتج داخل العلبة الملكية بشعار طيبة الذهبي
          </h4>
          <p className="text-xs text-[#c4bba9] leading-relaxed">
            كافة طلبات دار طيبة تُغلّف يدويًا داخل صندوق خشبي مبطن بالمخمل الأسود الفاخر مع حفر شعار الدار بذهب 24 قيراط، مجهزة للإهداء الفوري.
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-[#f2ca50]/15 text-[10px] text-[#a69c8a]">
            <span>انقر في أي مكان للإغلاق</span>
            <span className="text-[#f2ca50] font-bold">تغليف VIP مجاني 100%</span>
          </div>
        </div>
      </div>

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#141312] border-r border-[#f2ca50]/30 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#f2ca50]/20 flex items-center justify-between bg-[#1c1812]/50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f2ca50] shadow-[0_0_8px_#f2ca50]" />
              <h2 className="text-lg font-bold font-display text-white">حقيبة الشراء الملكية</h2>
              <span className="text-xs bg-[#f2ca50]/15 text-[#f2ca50] px-2 py-0.5 rounded-full font-mono-num font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#090807] px-5 py-3 border-b border-[#f2ca50]/10">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-[#a69c8a] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#f2ca50]" />
                {missingForFreeShipping === 0 ? (
                  <span className="text-[#18cd61] font-bold">تهانينا! حصلت على شحن مجاني وفوري</span>
                ) : (
                  <span>
                    تبقّى <strong className="text-[#f2ca50] font-mono-num">{missingForFreeShipping} ج.م</strong> للشحن المجاني
                  </span>
                )}
              </span>
              <span className="text-[#f2ca50] font-mono-num text-[11px] font-bold">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full bg-[#2a251e] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#b38b33] via-[#f2ca50] to-[#fff7d6] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Royal Box Showcase & Target Card ("صورة العلبة الملكية") */}
            <div
              id="royal-cart-box-target"
              className={`relative rounded-2xl overflow-hidden border transition-all duration-700 select-none ${
                isBurstActive
                  ? 'border-[#f2ca50] shadow-[0_0_35px_rgba(242,202,80,0.55)] scale-[1.02]'
                  : 'border-[#f2ca50]/35 bg-[#141312] shadow-xl hover:border-[#f2ca50]/60'
              }`}
            >
              {/* Photo of the Royal Coffret Packaging with Brand Logo */}
              <div className="relative h-36 w-full overflow-hidden bg-black">
                <img
                  src="/assets/perfumes/royal_gift_box.jpg"
                  alt="صورة العلبة الملكية الفاخرة بشعار دار طيبة الذهبي"
                  className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                    isBurstActive ? 'scale-110 filter brightness-110' : 'scale-100'
                  }`}
                />
                {/* Royal vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-black/40 to-black/20" />
                <div className={`absolute inset-0 bg-[#f2ca50]/15 transition-opacity duration-500 ${isBurstActive ? 'opacity-100' : 'opacity-0'}`} />

                {/* Burst Shockwave Rings when Product Lands */}
                {isBurstActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-24 h-24 rounded-full border-2 border-[#f2ca50] animate-ping" />
                    <div className="w-16 h-16 rounded-full bg-[#f2ca50]/30 blur-md animate-pulse" />
                  </div>
                )}

                {/* Header Badge & Animated Logo Seal */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-2 bg-[#141312]/95 border border-[#f2ca50]/60 pl-2.5 pr-1 py-0.5 rounded-full text-[10px] text-[#f2ca50] font-bold shadow-lg">
                  <div className="w-12 h-5 rounded overflow-hidden border border-[#f2ca50]/60 bg-black flex-shrink-0 flex items-center justify-center">
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
                  <span>العلبة الملكية بشعار طيبة الذهبي</span>
                </div>

                <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full text-[10px] text-[#18cd61] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#18cd61] animate-ping" />
                  <span>تغليف VIP مجاني</span>
                </div>

                {/* Live Status Banner inside the Royal Box Card */}
                <div className="absolute bottom-2 right-2 left-2 bg-[#0d0c0a]/90 backdrop-blur-md border border-[#f2ca50]/30 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-white">
                    {isBurstActive ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#f2ca50] animate-bounce flex-shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#f2ca50] flex-shrink-0" />
                    )}
                    <span className={`font-medium truncate ${isBurstActive ? 'text-[#f2ca50] font-bold' : 'text-[#d6cebf]'}`}>
                      {isBurstActive
                        ? 'اتحط جوه العلبة الملكية بنجاح وبأعلى فخامة! ✨'
                        : 'العطور بتتسكن يدوي داخل القطيفة السوداء والذهب'}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#f2ca50] font-bold hidden sm:inline flex-shrink-0 mr-1">ختم طيبة</span>
                </div>
              </div>
            </div>
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-24 h-24 mx-auto rounded-2xl border border-[#f2ca50]/30 overflow-hidden shadow-2xl relative group">
                  <img
                    src="/assets/perfumes/discovery_coffret.jpg"
                    alt="صندوق دار طيبة الملكي الفاخر"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <h3 className="text-base font-bold text-white font-display">حقيبة المقتنيات فارغة</h3>
                <p className="text-xs text-[#a69c8a] max-w-xs mx-auto">
                  استكشف الخزينة الملكية أو خض تجربة مرجل العطور الذكي لتعبئة حقيبتك بأندر الإبداعات في صندوق التغليف الفاخر
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setView('catalog');
                  }}
                  className="mt-3 px-5 py-2 bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] font-bold text-xs rounded-xl shadow-lg transition"
                >
                  استكشف الخزينة الملكية
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1c1812]/70 border border-[#f2ca50]/20 rounded-xl p-3 flex gap-3 items-center group relative overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-[#090807] border border-[#f2ca50]/20 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.nameAr}
                      className="w-full h-full object-cover filter drop-shadow"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-white truncate font-display">
                        {item.product.nameAr}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-400 p-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#a69c8a] truncate mt-0.5">
                      {item.selectedSize} • {item.product.categoryLabel}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-[#090807] border border-[#f2ca50]/20 rounded-lg px-2 py-0.5">
                        <button
                          onClick={() => updateCartItemQty(item.id, -1)}
                          className="text-gray-400 hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono-num font-bold text-[#f2ca50] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartItemQty(item.id, 1)}
                          className="text-gray-400 hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-left font-mono-num font-bold text-sm text-[#f2ca50]">
                        {item.unitPrice * item.quantity} ج.م
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Buy 2 Get 1 Free Promo Alert in Cart */}
            {promotions.buy2Get1FreeActive && cartBuy2Get1Discount > 0 && (
              <div className="bg-[#18cd61]/10 border border-[#18cd61]/30 rounded-xl p-3 flex items-center gap-2.5 text-xs text-[#18cd61]">
                <Gift className="w-5 h-5 flex-shrink-0 animate-bounce" />
                <div>
                  <span className="font-bold block">عرض 2 + 1 مفعّل تلقائياً!</span>
                  <span>تم خصم قيمة الزجاجة الثالثة ({cartBuy2Get1Discount} ج.م) كهدية ملكية</span>
                </div>
              </div>
            )}
          </div>

          {/* Coupon Input & Summary Section */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#f2ca50]/20 bg-[#171410] space-y-4">
              {/* Coupon Form */}
              <div>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="أدخل كود الخصم (مثال: TIBA190)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#f2ca50]"
                    />
                    <Tag className="w-3.5 h-3.5 text-[#f2ca50] absolute left-3 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2a251e] hover:bg-[#3a3227] text-[#f2ca50] border border-[#f2ca50]/30 font-bold text-xs rounded-xl transition"
                  >
                    تطبيق
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="flex items-center justify-between mt-2 bg-[#f2ca50]/10 border border-[#f2ca50]/30 px-3 py-1.5 rounded-lg text-xs text-[#f2ca50]">
                    <span>كود مطبق: <strong>{appliedCoupon}</strong></span>
                    <button
                      onClick={removeCoupon}
                      className="text-red-400 hover:text-red-300 text-[11px] underline"
                    >
                      إلغاء
                    </button>
                  </div>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs border-t border-[#f2ca50]/10 pt-3">
                <div className="flex justify-between text-[#a69c8a]">
                  <span>المجموع الفرعي</span>
                  <span className="font-mono-num">{cartSubtotal} ج.م</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#18cd61] font-medium">
                    <span>إجمالي الخصومات الملكية</span>
                    <span className="font-mono-num">-{cartDiscount} ج.م</span>
                  </div>
                )}

                <div className="flex justify-between text-[#a69c8a]">
                  <span>رسوم الشحن والتوصيل</span>
                  <span className="font-mono-num">
                    {cartShipping === 0 ? <strong className="text-[#18cd61]">مجاني</strong> : `${cartShipping} ج.م`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#f2ca50]/20">
                  <span className="font-display">المبلغ الإجمالي</span>
                  <span className="text-[#f2ca50] font-mono-num text-lg">{cartTotal} ج.م</span>
                </div>
              </div>

              {/* Security & Checkout Action */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-gradient-to-r from-[#b38b33] via-[#f2ca50] to-[#e8c178] hover:opacity-95 text-[#090807] font-display font-black text-sm rounded-xl shadow-[0_4px_25px_rgba(242,202,80,0.3)] flex items-center justify-center gap-2 transition"
                >
                  <span>إتمام الطلب الملكي</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#a69c8a]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#18cd61]" />
                  <span>معاينة مجانية للمنتج قبل الدفع عند الاستلام في كافة المحافظات</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
