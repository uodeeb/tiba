import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Gift, Truck, Megaphone, Tag, Check, Sparkles } from 'lucide-react';

export const AdminPromotionsView: React.FC = () => {
  const { promotions, updatePromotions } = useApp();

  const [announcementText, setAnnouncementText] = useState(promotions.announcementText);
  const [shippingThreshold, setShippingThreshold] = useState(promotions.freeShippingThreshold);
  const [standardFee, setStandardFee] = useState(promotions.standardShippingFee);
  const [asyutFee, setAsyutFee] = useState(promotions.asyutShippingFee);
  const [discoveryPrice, setDiscoveryPrice] = useState(promotions.discoveryBoxPrice);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updatePromotions({
      announcementText,
      freeShippingThreshold: Number(shippingThreshold),
      standardShippingFee: Number(standardFee),
      asyutShippingFee: Number(asyutFee),
      discoveryBoxPrice: Number(discoveryPrice),
      discoveryCashbackAmount: Number(discoveryPrice)
    });
  };

  const handleToggleBuy2Get1 = () => {
    updatePromotions({
      buy2Get1FreeActive: !promotions.buy2Get1FreeActive
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f2ca50]/20 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#f2ca50]" />
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
              محرك العروض الترويجية وسياسات الشحن
            </h1>
          </div>
          <p className="text-xs text-[#a69c8a] mt-1">
            إدارة عروض الخصم التلقائي، حدود الشحن المجاني، ونصوص الإعلانات في واجهة المتجر
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* Buy 2 Get 1 Free Mega Toggle */}
        <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#f2ca50]" />
              <h3 className="text-base font-bold font-display text-white">
                عرض: اشتر قطعتين واحصل على الثالثة مجاناً (Buy 2 Get 1 Free)
              </h3>
            </div>
            <p className="text-xs text-[#a69c8a] max-w-xl">
              عند التفعيل، تحتسب سلة العميل تلقائياً كل زجاجة ثالثة (الأقل سعراً) بنسبة خصم 100% بدون أي تدخّل يدوي أو الحاجة لكود كوبون.
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleBuy2Get1}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition border flex items-center gap-2 shadow-lg ${
              promotions.buy2Get1FreeActive
                ? 'bg-[#18cd61] hover:bg-[#15b254] text-[#090807] border-[#18cd61]'
                : 'bg-gray-800 text-gray-400 border-gray-700'
            }`}
          >
            <span>{promotions.buy2Get1FreeActive ? 'العرض مفعل الآن بالمتجر' : 'العرض متوقف'}</span>
            <Check className="w-4 h-4" />
          </button>
        </div>

        {/* Shipping Policies Configuration */}
        <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-[#f2ca50]/15 pb-3">
            <Truck className="w-5 h-5 text-[#f2ca50]" />
            <h3 className="text-base font-bold font-display text-white">
              إعدادات سياسة الشحن اللوجستي
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#c4bba9] mb-1">
                حد الشحن المجاني (ج.م)
              </label>
              <input
                type="number"
                value={shippingThreshold}
                onChange={(e) => setShippingThreshold(Number(e.target.value))}
                className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono-num focus:outline-none focus:border-[#f2ca50]"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">الطلبات فوق هذا المبلغ تشحن مجاناً</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#c4bba9] mb-1">
                رسوم التوصيل الداخلي بأسيوط (ج.م)
              </label>
              <input
                type="number"
                value={asyutFee}
                onChange={(e) => setAsyutFee(Number(e.target.value))}
                className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono-num focus:outline-none focus:border-[#f2ca50]"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">تسليم فوري مندوب دار طيبة</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#c4bba9] mb-1">
                رسوم الشحن لكافة المحافظات (ج.م)
              </label>
              <input
                type="number"
                value={standardFee}
                onChange={(e) => setStandardFee(Number(e.target.value))}
                className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono-num focus:outline-none focus:border-[#f2ca50]"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">Bosta / Aramex / Mylerz</span>
            </div>
          </div>
        </div>

        {/* Announcement Bar Text */}
        <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-[#f2ca50]/15 pb-3">
            <Megaphone className="w-5 h-5 text-[#f2ca50]" />
            <h3 className="text-base font-bold font-display text-white">
              نص شريط الإعلانات العلوي المتحرك
            </h3>
          </div>

          <div>
            <textarea
              rows={2}
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#f2ca50]"
            />
            <span className="text-[10px] text-[#a69c8a] mt-1 block">
              يظهر في أعلى كل صفحات المتجر للزوار لزيادة معدل التحويل
            </span>
          </div>
        </div>

        {/* Discovery Kit Pricing & Cashback */}
        <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-[#f2ca50]/15 pb-3">
            <Tag className="w-5 h-5 text-[#f2ca50]" />
            <h3 className="text-base font-bold font-display text-white">
              صندوق الاستكشاف وكوبون الاسترداد (TIBA190)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#c4bba9] mb-1">
                سعر صندوق الاستكشاف 3×10مل (ج.م)
              </label>
              <input
                type="number"
                value={discoveryPrice}
                onChange={(e) => setDiscoveryPrice(Number(e.target.value))}
                className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono-num focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#c4bba9] mb-1">
                كود الكوبون النشط للاسترداد
              </label>
              <div className="flex items-center bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#f2ca50] font-mono-num font-bold">
                TIBA190 (يخصم {discoveryPrice} ج.م فورياً عند شراء زجاجة 100مل)
              </div>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-[#b38b33] via-[#f2ca50] to-[#e8c178] hover:opacity-95 text-[#090807] font-display font-black text-xs rounded-xl shadow-lg transition"
          >
            حفظ كافة إعدادات العروض والشحن
          </button>
        </div>
      </form>
    </div>
  );
};
