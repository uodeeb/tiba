import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Truck, ArrowRight, ShieldAlert, CreditCard, Banknote, Smartphone, CheckCircle, Sparkles } from 'lucide-react';

const EGYPT_GOVERNORATES = [
  'أسيوط (المقر الرئيسي - توصيل فوري 4 ساعات)',
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'سوهاج',
  'المنيا',
  'قنا',
  'الأقصر',
  'أسوان',
  'بني سويف',
  'الفيوم',
  'الشرقية',
  'الدقهلية',
  'القليوبية',
  'الغربية',
  'المنوفية',
  'البحيرة',
  'كفر الشيخ',
  'دمياط',
  'بورسعيد',
  'الإسماعيلية',
  'السويس',
  'البحر الأحمر',
  'مطروح'
];

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    submitNewOrder,
    setView,
    setSelectedOrderForWaybill,
    setIsWaybillModalOpen,
    promotions
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [governorate, setGovernorate] = useState(EGYPT_GOVERNORATES[0]);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [antiRtoLandmark, setAntiRtoLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'instapay' | 'paymob'>('cod');
  const [orderSubmittedSuccess, setOrderSubmittedSuccess] = useState<any | null>(null);

  // 5% instant discount when choosing InstaPay
  const instaPayDiscount = paymentMethod === 'instapay' ? Math.round(cartSubtotal * 0.05) : 0;
  const finalPayableTotal = Math.max(0, cartTotal - instaPayDiscount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !phone || !address || !antiRtoLandmark) {
      alert('يرجى ملء كافة البيانات بما فيها العلامة المميزة لضمان سرعة التسليم');
      return;
    }

    const cleanGov = governorate.includes('أسيوط') ? 'أسيوط' : governorate;
    const isAsyut = cleanGov === 'أسيوط';

    const newOrder = submitNewOrder({
      customerName,
      phone,
      altPhone: altPhone || undefined,
      governorate: cleanGov,
      city: city || cleanGov,
      address,
      antiRtoLandmark,
      paymentMethod,
      items: cart,
      subtotal: cartSubtotal,
      discount: cartDiscount + instaPayDiscount,
      shipping: cartShipping,
      total: finalPayableTotal,
      status: 'pending_confirmation',
      courier: isAsyut ? 'Asyut Local Express' : 'Bosta',
      estimatedDelivery: isAsyut ? 'اليوم خلال 4 ساعات (تسليم أسيوط الفوري)' : 'خلال 24-48 ساعة'
    });

    setOrderSubmittedSuccess(newOrder);
  };

  if (orderSubmittedSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 select-none">
        <div className="relative w-48 sm:w-56 h-28 sm:h-32 mx-auto">
          <div className="w-full h-full rounded-2xl p-1 bg-gradient-to-tr from-[#8a6820] via-[#f2ca50] to-[#ffd875] shadow-[0_0_35px_rgba(242,202,80,0.5)] overflow-hidden bg-black flex items-center justify-center">
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
          <div className="absolute -bottom-2 -right-2 bg-[#18cd61] text-black p-1.5 rounded-full shadow-lg border-2 border-black">
            <CheckCircle className="w-5 h-5 text-black" />
          </div>
        </div>

        <div>
          <span className="text-xs bg-[#f2ca50]/15 text-[#f2ca50] font-bold px-3 py-1 rounded-full border border-[#f2ca50]/30 inline-block mb-2 font-mono-num">
            رقم الطلب: {orderSubmittedSuccess.orderNumber}
          </span>
          <h2 className="text-3xl font-black font-display text-white">
            تم استلام طلبكم الملكي بنجاح!
          </h2>
          <p className="text-sm text-[#a69c8a] mt-2 max-w-md mx-auto">
            شكراً لثقتكم بدار طيبة للعطور والعود الملكي. جاري الآن تجهيز وتعتيق طلبك بعناية فائقة.
          </p>
        </div>

        {/* Order Card Preview */}
        <div className="bg-[#141312] border border-[#f2ca50]/30 rounded-2xl p-6 text-right space-y-3">
          <div className="flex justify-between text-xs border-b border-[#f2ca50]/15 pb-2">
            <span className="text-gray-400">الاسم:</span>
            <span className="text-white font-bold">{orderSubmittedSuccess.customerName}</span>
          </div>
          <div className="flex justify-between text-xs border-b border-[#f2ca50]/15 pb-2">
            <span className="text-gray-400">العنوان:</span>
            <span className="text-white">{orderSubmittedSuccess.governorate} - {orderSubmittedSuccess.address}</span>
          </div>
          <div className="flex justify-between text-xs border-b border-[#f2ca50]/15 pb-2 bg-amber-950/20 p-2 rounded">
            <span className="text-[#f2ca50] font-bold">العلامة المميزة:</span>
            <span className="text-white font-bold">{orderSubmittedSuccess.antiRtoLandmark}</span>
          </div>
          <div className="flex justify-between text-sm font-bold pt-2">
            <span className="text-white">المبلغ المطلوب سداده:</span>
            <span className="text-[#f2ca50] font-mono-num">{orderSubmittedSuccess.total} ج.م</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => {
              setSelectedOrderForWaybill(orderSubmittedSuccess);
              setIsWaybillModalOpen(true);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#f2ca50] hover:bg-[#ffe17d] text-[#090807] font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
          >
            <span>معاينة وطباعة بوليصة الشحن (4×6)</span>
          </button>

          <button
            onClick={() => setView('catalog')}
            className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition"
          >
            العودة للتسوق
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold font-display text-white">لا توجد منتجات في حقيبة الشراء</h2>
        <p className="text-xs text-[#a69c8a]">يرجى اختيار عطر من الخزينة الملكية قبل الانتقال لإتمام الطلب</p>
        <button
          onClick={() => setView('catalog')}
          className="px-6 py-2.5 bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] font-bold text-xs rounded-xl shadow"
        >
          تصفح الخزينة الملكية
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 select-none">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-[#f2ca50]/20 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            إتمام الطلب والشحن الملكي
          </h1>
          <p className="text-xs text-[#a69c8a] mt-1">
            شحن مباشر من مقر دار طيبة بأسيوط لكافة محافظات الجمهورية مع حق المعاينة
          </p>
        </div>

        <button
          onClick={() => setView('catalog')}
          className="text-xs text-[#f2ca50] hover:underline flex items-center gap-1"
        >
          <span>متابعة التسوق</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Delivery Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 border-b border-[#f2ca50]/20 pb-3">
              <Truck className="w-5 h-5 text-[#f2ca50]" />
              <h2 className="text-base font-bold font-display text-white">بيانات التوصيل والمستلم</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#c4bba9] mb-1">
                  الاسم ثلاثي أو رباعي <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: أحمد عبد الله الشريف"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#f2ca50]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c4bba9] mb-1">
                  رقم الهاتف (الأساسي) <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono-num placeholder-gray-500 focus:outline-none focus:border-[#f2ca50]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#c4bba9] mb-1">
                  رقم هاتف بديل (اختياري)
                </label>
                <input
                  type="tel"
                  placeholder="011 / 012 / 015"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono-num placeholder-gray-500 focus:outline-none focus:border-[#f2ca50]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c4bba9] mb-1">
                  المحافظة <span className="text-red-400">*</span>
                </label>
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#f2ca50]"
                >
                  {EGYPT_GOVERNORATES.map((gov, idx) => (
                    <option key={idx} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#c4bba9] mb-1">
                  المركز / المدينة / الحي <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: أسيوط - حي شرق / ديروط / الفتح"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#f2ca50]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c4bba9] mb-1">
                  العنوان التفصيلي (الشارع والعمارة) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="اسم الشارع، رقم العمارة، رقم الشقة"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#f2ca50]"
                />
              </div>
            </div>

            {/* CRITICAL ANTI-RTO PROMINENT LANDMARK SECTION */}
            <div className="bg-[#1c160a] border-2 border-[#f2ca50] rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-[#f2ca50]">
                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                <label className="block text-xs font-black text-white font-display">
                  العلامة المميزة لتسليم المندوب (Anti-RTO Mandatory Landmark) <span className="text-[#f2ca50]">*</span>
                </label>
              </div>
              <p className="text-[11px] text-[#e8c178] leading-tight">
                أدخل علامة بارزة بجوارك (مسجد، صيدلية شهيرة، مدرسة، بنك، بنزينة) لتمكين مندوب الشحن من الوصول فوراً دون تأخير أو رجوع للشحنة.
              </p>
              <input
                type="text"
                required
                placeholder="مثال: أمام بنك مصر فرع الجمهورية بجوار صيدلية العزبي"
                value={antiRtoLandmark}
                onChange={(e) => setAntiRtoLandmark(e.target.value)}
                className="w-full bg-[#090807] border border-[#f2ca50] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 font-bold focus:outline-none focus:ring-1 focus:ring-[#f2ca50]"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold font-display text-white border-b border-[#f2ca50]/20 pb-3">
              طريقة الدفع والتسليم
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* COD */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  paymentMethod === 'cod'
                    ? 'bg-[#f2ca50]/15 border-[#f2ca50] text-white shadow-md'
                    : 'bg-[#090807] border-white/10 hover:border-white/30 text-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <Banknote className="w-5 h-5 text-[#f2ca50]" />
                  <span className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center">
                    {paymentMethod === 'cod' && <span className="w-2 h-2 rounded-full bg-[#f2ca50]" />}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-xs font-bold block">الدفع عند الاستلام</span>
                  <span className="text-[10px] text-[#a69c8a]">معاينة مجانية للمنتج</span>
                </div>
              </div>

              {/* InstaPay */}
              <div
                onClick={() => setPaymentMethod('instapay')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  paymentMethod === 'instapay'
                    ? 'bg-[#f2ca50]/15 border-[#f2ca50] text-white shadow-md'
                    : 'bg-[#090807] border-white/10 hover:border-white/30 text-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <Smartphone className="w-5 h-5 text-[#18cd61]" />
                  <span className="text-[10px] bg-[#18cd61] text-[#090807] font-bold px-1.5 py-0.2 rounded">
                    خصم 5%
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-xs font-bold block">إنستاباي / فودافون كاش</span>
                  <span className="text-[10px] text-[#18cd61] font-semibold">خصم فوري {instaPayDiscount || '5%'} ج.م</span>
                </div>
              </div>

              {/* Paymob */}
              <div
                onClick={() => setPaymentMethod('paymob')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  paymentMethod === 'paymob'
                    ? 'bg-[#f2ca50]/15 border-[#f2ca50] text-white shadow-md'
                    : 'bg-[#090807] border-white/10 hover:border-white/30 text-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <CreditCard className="w-5 h-5 text-[#f2ca50]" />
                  <span className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center">
                    {paymentMethod === 'paymob' && <span className="w-2 h-2 rounded-full bg-[#f2ca50]" />}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-xs font-bold block">بطاقة بنكية (Paymob)</span>
                  <span className="text-[10px] text-[#a69c8a]">فيزا وماستركارد وميزة</span>
                </div>
              </div>
            </div>

            {paymentMethod === 'instapay' && (
              <div className="bg-[#18cd61]/10 border border-[#18cd61]/30 rounded-xl p-3 text-xs text-[#18cd61]">
                <strong>حساب إنستاباي لدار طيبة:</strong> tiba.royal.oud@instapay أو محفظة كاش على رقم <strong>01023062507</strong>
              </div>
            )}
          </div>
        </div>

        {/* Right Summary: Cart Review & Submit (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold font-display text-white border-b border-[#f2ca50]/20 pb-3">
              ملخص المقتنيات ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>

            {/* Items scroll */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <img src={item.product.image} alt={item.product.nameAr} className="w-8 h-8 object-cover rounded-md border border-[#f2ca50]/20 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white block">{item.product.nameAr}</span>
                      <span className="text-[10px] text-gray-400 font-mono-num">{item.selectedSize} × {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-mono-num font-bold text-[#f2ca50]">{item.unitPrice * item.quantity} ج.م</span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs border-t border-[#f2ca50]/15 pt-3">
              <div className="flex justify-between text-[#a69c8a]">
                <span>المجموع الفرعي</span>
                <span className="font-mono-num">{cartSubtotal} ج.م</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#18cd61]">
                  <span>خصومات العروض الملكية</span>
                  <span className="font-mono-num">-{cartDiscount} ج.م</span>
                </div>
              )}

              {instaPayDiscount > 0 && (
                <div className="flex justify-between text-[#18cd61] font-bold">
                  <span>خصم الدفع عبر إنستاباي (5%)</span>
                  <span className="font-mono-num">-{instaPayDiscount} ج.م</span>
                </div>
              )}

              <div className="flex justify-between text-[#a69c8a]">
                <span>رسوم الشحن والتوصيل</span>
                <span className="font-mono-num">
                  {cartShipping === 0 ? <strong className="text-[#18cd61]">مجاني</strong> : `${cartShipping} ج.م`}
                </span>
              </div>

              <div className="flex justify-between text-lg font-black text-white pt-3 border-t border-[#f2ca50]/20">
                <span className="font-display">المبلغ الإجمالي النهائي</span>
                <span className="text-[#f2ca50] font-mono-num">{finalPayableTotal} ج.م</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#b38b33] via-[#f2ca50] to-[#e8c178] hover:opacity-95 text-[#090807] font-display font-black text-sm rounded-xl shadow-[0_4px_30px_rgba(242,202,80,0.35)] flex items-center justify-center gap-2 transition"
            >
              <span>تأكيد وشحن الطلب الملكي</span>
              <Sparkles className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#a69c8a] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#18cd61]" />
              <span>ضمان استرجاع مجاني في حال عدم المطابقة عند الفتح</span>
            </div>

            {/* Branded Packaging Guarantee Preview */}
            <div className="p-3 bg-[#090807] rounded-xl border border-[#f2ca50]/20 flex items-center gap-3">
              <img
                src="/assets/perfumes/royal_gift_box.jpg"
                alt="العلبة الملكية لدار طيبة"
                className="w-14 h-14 rounded-lg object-cover border border-[#f2ca50]/40 flex-shrink-0"
              />
              <div className="text-right">
                <span className="text-[11px] font-bold text-[#f2ca50] block">علبة الإهداء الملكية مشمولة مجاناً</span>
                <p className="text-[10px] text-[#a69c8a] mt-0.5">
                  تغليف مخملي أسود محفور عليه ختم طيبة بالذهب 24 قيراط
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
