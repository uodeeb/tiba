import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sliders, Plus, Minus, Check, Edit3, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

export const AdminProductsView: React.FC = () => {
  const {
    products,
    adjustProductPriceDelta,
    updateProductPrice,
    toggleProductStock,
    updateProductNotes
  } = useApp();

  const [editingRecipeId, setEditingRecipeId] = useState<string | null>(null);
  const [recipeDraft, setRecipeDraft] = useState<string>('');

  const handleStartEditRecipe = (productId: string, currentRecipe: string = '') => {
    setEditingRecipeId(productId);
    setRecipeDraft(currentRecipe);
  };

  const handleSaveRecipe = (productId: string) => {
    updateProductNotes(productId, recipeDraft);
    setEditingRecipeId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f2ca50]/20 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#f2ca50]" />
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
              التحكم في الأسعار والمخزون الحي
            </h1>
          </div>
          <p className="text-xs text-[#a69c8a] mt-1">
            أي تعديل في أسعار العطور أو المخزون ينعكس فورياً في متجر العملاء وحقائب الشراء دون إعادة تحميل
          </p>
        </div>

        <div className="text-xs bg-[#18cd61]/15 text-[#18cd61] border border-[#18cd61]/30 px-3 py-1.5 rounded-xl font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#18cd61] animate-ping" />
          <span>المزامنة التفاعلية الحية نشطة (Real-Time Reactive Sync)</span>
        </div>
      </div>

      {/* Products Table/Grid */}
      <div className="grid grid-cols-1 gap-6">
        {products.map((product) => {
          const isOutOfStock = product.stock <= 0;

          return (
            <div
              key={product.id}
              className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-20 rounded-xl bg-[#090807] border border-[#f2ca50]/20 overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.nameAr} className="w-full h-full object-cover" />
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-[#f2ca50]/15 text-[#f2ca50] px-2 py-0.5 rounded font-bold">
                      {product.categoryLabel}
                    </span>
                    <span className="text-xs text-gray-400 font-mono-num">{product.concentration}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-white mt-0.5">
                    {product.nameAr}
                  </h3>
                  <p className="text-xs text-[#a69c8a] line-clamp-1 max-w-md">
                    {product.subtitle}
                  </p>

                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#e8c178]">
                    <span>ثبات: +{product.longevityHours} ساعة</span>
                    <span>•</span>
                    <span>فوحان: {product.sillageRadiusMeters} متر</span>
                    <span>•</span>
                    <span className="font-mono-num">تقييم: {product.rating} ★</span>
                  </div>
                </div>
              </div>

              {/* Price Stepper Controllers */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#090807]/80 p-3 rounded-2xl border border-white/5">
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block">السعر الحالي بالمتجر:</span>
                  <span className="text-2xl font-black font-mono-num text-[#f2ca50]">
                    {product.price} ج.م
                  </span>
                </div>

                {/* Delta buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => adjustProductPriceDelta(product.id, -50)}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 text-xs text-red-400 font-mono-num font-bold rounded-lg border border-white/10 transition"
                    title="تخفيض 50 ج.م"
                  >
                    -50
                  </button>
                  <button
                    onClick={() => adjustProductPriceDelta(product.id, -25)}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 text-xs text-red-300 font-mono-num font-bold rounded-lg border border-white/10 transition"
                    title="تخفيض 25 ج.م"
                  >
                    -25
                  </button>
                  <button
                    onClick={() => adjustProductPriceDelta(product.id, 25)}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 text-xs text-green-300 font-mono-num font-bold rounded-lg border border-white/10 transition"
                    title="زيادة 25 ج.م"
                  >
                    +25
                  </button>
                  <button
                    onClick={() => adjustProductPriceDelta(product.id, 50)}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 text-xs text-green-400 font-mono-num font-bold rounded-lg border border-white/10 transition"
                    title="زيادة 50 ج.م"
                  >
                    +50
                  </button>
                  <button
                    onClick={() => adjustProductPriceDelta(product.id, 100)}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 text-xs text-[#f2ca50] font-mono-num font-bold rounded-lg border border-[#f2ca50]/30 transition"
                    title="زيادة 100 ج.م"
                  >
                    +100
                  </button>
                </div>
              </div>

              {/* Stock Status & Recipe Actions */}
              <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                {/* Stock Toggle */}
                <button
                  onClick={() => toggleProductStock(product.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition border ${
                    isOutOfStock
                      ? 'bg-red-500/15 border-red-500/40 text-red-400'
                      : 'bg-[#18cd61]/15 border-[#18cd61]/40 text-[#18cd61]'
                  }`}
                >
                  {isOutOfStock ? 'المخزون: نافذ (0)' : `متوفر بالمستودع (${product.stock})`}
                </button>

                {/* Edit Recipe */}
                <button
                  onClick={() => handleStartEditRecipe(product.id, product.customNoteRecipe)}
                  className="px-3 py-2 bg-[#2a251e] hover:bg-[#383126] text-[#f2ca50] border border-[#f2ca50]/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل التركيبة</span>
                </button>
              </div>

              {/* Recipe Edit Drawer/Modal Inline */}
              {editingRecipeId === product.id && (
                <div className="w-full pt-4 border-t border-[#f2ca50]/20 flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#f2ca50]">
                    سجل المكونات والتركيبة السرية للمختبر:
                  </label>
                  <textarea
                    rows={2}
                    value={recipeDraft}
                    onChange={(e) => setRecipeDraft(e.target.value)}
                    className="w-full bg-[#090807] border border-[#f2ca50]/40 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#f2ca50]"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditingRecipeId(null)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-gray-300 rounded-lg"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={() => handleSaveRecipe(product.id)}
                      className="px-4 py-1.5 bg-[#f2ca50] text-[#090807] font-bold text-xs rounded-lg shadow"
                    >
                      حفظ التركيبة
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
