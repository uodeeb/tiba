import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { Box, Sparkles, Check, Plus, Trash2, ArrowLeft, Shield, Gift, RefreshCw } from 'lucide-react';

export const DiscoveryKitView: React.FC = () => {
  const {
    products,
    discoverySlots,
    setDiscoverySlot,
    clearDiscoverySlot,
    autoFillDiscoveryBox,
    addDiscoveryBoxToCart,
    promotions
  } = useApp();

  const [activePickingSlot, setActivePickingSlot] = useState<number | null>(null);

  const selectedCount = discoverySlots.filter(Boolean).length;
  const isBoxFull = selectedCount === 3;

  const handleSelectProductForSlot = (product: Product) => {
    if (activePickingSlot !== null) {
      setDiscoverySlot(activePickingSlot, product);
      setActivePickingSlot(null);
    }
  };

  const handleAddToCart = () => {
    const validProducts = discoverySlots.filter(Boolean) as Product[];
    if (validProducts.length !== 3) return;
    addDiscoveryBoxToCart(validProducts);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 select-none">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/30 text-[#f2ca50] text-xs font-semibold">
          <Box className="w-3.5 h-3.5" />
          <span>التجربة المنزلية الأولى من دار طيبة</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-display text-white">
          صندوق الاستكشاف الملكي <span className="gold-gradient-text">(3 عينات × 10مل)</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#a69c8a] max-w-xl mx-auto leading-relaxed">
          جرّب 3 من أفخم العطور الملكية في منزلك بكل راحة وتأنٍ مقابل <strong>190 ج.م</strong> فقط، مع كود استرداد فوري (<strong>TIBA190</strong>) يخصم لك الـ 190 ج.م كاملة عند طلب الزجاجة الكبيرة!
        </p>

        {/* Visual Coffret Preview */}
        <div className="max-w-md mx-auto pt-2">
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#f2ca50]/40 shadow-2xl">
            <img
              src="/assets/perfumes/discovery_coffret.jpg"
              alt="صندوق الاستكشاف الملكي الفاخر"
              className="w-full h-44 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-transparent pointer-events-none" />
            
            {/* Animated Logo Seal Badge */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-[#141312]/95 border border-[#f2ca50]/60 pl-2.5 pr-1 py-0.5 rounded-full text-[10px] text-[#f2ca50] font-bold shadow-lg">
              <div className="w-12 h-5 rounded overflow-hidden border border-[#f2ca50] bg-black flex-shrink-0 flex items-center justify-center">
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
              <span>ختم طيبة الملكي المعتمد</span>
            </div>

            <div className="absolute bottom-2 right-3 left-3 flex justify-between items-center text-xs text-white">
              <span className="font-display font-bold text-[#f2ca50]">صندوق مخملي أسود ملكي مدمج</span>
              <span className="text-[10px] bg-[#18cd61] text-black font-bold px-2 py-0.5 rounded">كوبون 190 ج.م مرفق</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Velvet Tray Showcase */}
      <div className="bg-[#141312]/95 border border-[#f2ca50]/40 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#f2ca50]/20 pb-5 mb-8">
          <div>
            <span className="text-xs text-[#f2ca50] font-bold">حالة التجهيز:</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-lg font-bold text-white font-display">
                تم اختيار {selectedCount} من 3 عينات
              </span>
              {isBoxFull && (
                <span className="text-xs bg-[#18cd61]/20 text-[#18cd61] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 border border-[#18cd61]/30">
                  <Check className="w-3 h-3" />
                  مكتمل وجاهز
                </span>
              )}
            </div>
          </div>

          <button
            onClick={autoFillDiscoveryBox}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[#f2ca50] border border-[#f2ca50]/30 rounded-xl text-xs font-bold transition flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>تعبئة تلقائية بأعلى العطور تقييماً</span>
          </button>
        </div>

        {/* 3 Slots Velvet Tray Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((slotIndex) => {
            const product = discoverySlots[slotIndex];

            return (
              <div
                key={slotIndex}
                className={`relative rounded-2xl p-5 border-2 transition-all duration-300 flex flex-col justify-between ${
                  product
                    ? 'bg-[#1a1610] border-[#f2ca50]/50 shadow-[0_4px_20px_rgba(242,202,80,0.15)]'
                    : 'bg-[#090807]/80 border-dashed border-[#f2ca50]/30 hover:border-[#f2ca50]'
                }`}
              >
                {/* Slot Tag */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[11px] font-bold text-[#f2ca50] font-mono-num">
                    العينة رقم 0{slotIndex + 1} (10ml)
                  </span>
                  {product && (
                    <button
                      onClick={() => clearDiscoverySlot(slotIndex)}
                      className="text-gray-400 hover:text-red-400 transition p-1"
                      title="إفراغ الخانة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Slot Content */}
                {product ? (
                  <div className="space-y-3 text-center my-2">
                    <div className="w-24 h-28 mx-auto relative flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.nameAr}
                        className="w-full h-full object-cover rounded-xl filter drop-shadow-md border border-[#f2ca50]/20"
                      />
                      <span className="absolute bottom-0 right-0 text-[10px] bg-[#f2ca50] text-[#090807] font-bold px-1.5 py-0.5 rounded shadow">
                        10ml
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white font-display">{product.nameAr}</h4>
                      <p className="text-[11px] text-[#a69c8a] mt-0.5 line-clamp-1">{product.subtitle}</p>
                    </div>

                    <div className="text-[10px] text-[#f2ca50] bg-[#090807] p-1.5 rounded-lg border border-white/5">
                      النوتات: {product.topNotes[0]} + {product.baseNotes[0]}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">خانة شاغرة</span>
                      <span className="text-[11px] text-[#a69c8a]">انقر لاختيار عينة عطرية</span>
                    </div>
                    <button
                      onClick={() => setActivePickingSlot(slotIndex)}
                      className="mt-2 px-3 py-1.5 bg-[#f2ca50]/20 hover:bg-[#f2ca50]/30 text-[#f2ca50] border border-[#f2ca50]/40 rounded-lg text-xs font-bold transition"
                    >
                      اختر عطر
                    </button>
                  </div>
                )}

                {/* Change Picker Button if already filled */}
                {product && (
                  <button
                    onClick={() => setActivePickingSlot(slotIndex)}
                    className="mt-3 w-full py-1.5 bg-white/5 hover:bg-white/10 text-xs text-gray-300 rounded-lg transition"
                  >
                    استبدال العينة
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal/Drawer To Pick Fragrance for Active Slot */}
        {activePickingSlot !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#141312] border border-[#f2ca50]/40 rounded-2xl p-6 max-w-xl w-full max-h-[80vh] overflow-y-auto space-y-4">
              <div className="flex justify-between items-center border-b border-[#f2ca50]/20 pb-3">
                <h3 className="text-base font-bold text-white font-display">
                  اختر عينة للخانة رقم {activePickingSlot + 1}
                </h3>
                <button
                  onClick={() => setActivePickingSlot(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProductForSlot(p)}
                    className="bg-[#090807] border border-[#f2ca50]/20 hover:border-[#f2ca50] rounded-xl p-3 flex items-center gap-3 cursor-pointer transition hover:bg-[#1f1b14]"
                  >
                    <div className="w-12 h-14 flex-shrink-0">
                      <img src={p.image} alt={p.nameAr} className="w-full h-full object-cover rounded-lg border border-[#f2ca50]/20" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{p.nameAr}</h4>
                      <p className="text-[10px] text-[#a69c8a] truncate">{p.categoryLabel}</p>
                      <span className="text-[10px] text-[#f2ca50] font-mono-num font-bold">10ml Sample</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Cashback Guarantee Banner & Action */}
        <div className="mt-8 pt-6 border-t border-[#f2ca50]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 bg-[#090807]/70 p-4 rounded-2xl border border-white/5">
            <Gift className="w-8 h-8 text-[#f2ca50] flex-shrink-0" />
            <div className="text-right">
              <span className="text-xs font-bold text-white block">
                كوبون الاسترداد الملكي (TIBA190)
              </span>
              <p className="text-[11px] text-[#a69c8a] mt-0.5">
                مرفق داخل العلبة كارت مختوم بكود استرداد فوري بقيمة 190 ج.م عند طلب أي زجاجة 100مل
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="text-right">
              <span className="text-xs text-[#a69c8a] block">سعر الصندوق</span>
              <span className="text-2xl font-black font-mono-num text-[#f2ca50]">
                {promotions.discoveryBoxPrice} ج.م
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!isBoxFull}
              className={`flex-1 sm:flex-none px-8 py-3.5 rounded-xl font-display font-black text-sm transition flex items-center justify-center gap-2 shadow-lg ${
                isBoxFull
                  ? 'bg-gradient-to-r from-[#b38b33] via-[#f2ca50] to-[#e8c178] hover:opacity-95 text-[#090807]'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>{isBoxFull ? 'أضف الصندوق للحقيبة (190 ج.م)' : 'اكتمل من اختيار 3 عينات'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
