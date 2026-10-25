import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BottleTilt3D } from '../components/BottleTilt3D';
import { Compass, Search, Star, ShoppingBag, SlidersHorizontal, Sparkles } from 'lucide-react';

export const RoyalVaultView: React.FC = () => {
  const {
    products,
    setSelectedProductId,
    setView,
    addToCart
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'longevity'>('rating');

  const categories = [
    { id: 'all', label: 'كافة المقتنيات الملكية' },
    { id: 'oud', label: 'العود الملكي المعتق' },
    { id: 'oriental', label: 'الشرقي والعنبر' },
    { id: 'floral', label: 'المسك والزهور' },
    { id: 'leather', label: 'الجلود الفاخرة' },
    { id: 'fresh', label: 'الحمضيات المنعشة' }
  ];

  // Filter & Search
  let filtered = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.baseNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'longevity') return b.longevityHours - a.longevityHours;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 select-none">
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#f2ca50]/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/30 text-[#f2ca50] text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>الخزينة الملكية لدار طيبة • أسيوط</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-white">
            تشكيلة العطور الملكية والمستخلصات النادرة
          </h1>
          <p className="text-xs sm:text-sm text-[#a69c8a] mt-1 max-w-xl">
            كل عطر هو قصيدة شمية مستقلة مصنوعة من أنقى الزيوت الطبيعية بتركيز Extrait de Parfum 32%
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="ابحث بالنوتة العطرية أو اسم العطر..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141312] border border-[#f2ca50]/30 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#f2ca50] transition"
          />
          <Search className="w-4 h-4 text-[#f2ca50] absolute left-3 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Filter Category Pills & Sort Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] shadow-lg font-bold'
                  : 'bg-[#141312] text-[#d6cebf] hover:text-white border border-[#f2ca50]/20 hover:border-[#f2ca50]/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-[#a69c8a]">
          <SlidersHorizontal className="w-4 h-4 text-[#f2ca50]" />
          <span>ترتيب حسب:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#141312] border border-[#f2ca50]/30 text-white rounded-lg px-2.5 py-1.5 focus:outline-none text-xs"
          >
            <option value="rating">الأعلى تقييماً</option>
            <option value="longevity">أطول ثبات (+18h)</option>
            <option value="price-asc">السعر (من الأقل للأعلى)</option>
            <option value="price-desc">السعر (من الأعلى للأقل)</option>
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filtered.map((product) => {
          const isOutOfStock = product.stock <= 0;

          return (
            <div
              key={product.id}
              data-product-card={product.id}
              className={`bg-[#141312]/90 border border-[#f2ca50]/20 hover:border-[#f2ca50]/60 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_35px_rgba(242,202,80,0.15)] group relative overflow-hidden ${
                isOutOfStock ? 'opacity-70' : ''
              }`}
            >
              <div>
                {/* 3D Bottle Clickable to details */}
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
                    badge={product.isBestSeller ? 'الأعلى مبيعاً' : product.isNew ? 'إصدار جديد' : undefined}
                    className="mx-auto"
                  />
                </div>

                {/* Details */}
                <div className="mt-5 space-y-2 text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-[#f2ca50]/15 text-[#f2ca50] px-2.5 py-0.5 rounded-full font-medium border border-[#f2ca50]/30">
                      {product.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#f2ca50]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-mono-num font-bold">{product.rating}</span>
                      <span className="text-[10px] text-gray-500 font-mono-num">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setView('product-detail');
                    }}
                    className="text-xl font-bold font-display text-white group-hover:text-[#f2ca50] cursor-pointer transition"
                  >
                    {product.nameAr}
                  </h3>

                  <p className="text-xs text-[#a69c8a] line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>

                  {/* Notes preview tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {product.topNotes.slice(0, 2).map((note, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-[#090807] text-[#c4bba9] px-2.5 py-1 rounded-md border border-white/5"
                      >
                        {note}
                      </span>
                    ))}
                    <span className="text-[10px] bg-[#090807] text-[#f2ca50] px-2.5 py-1 rounded-md border border-[#f2ca50]/20 font-mono-num font-semibold">
                      +{product.longevityHours}h ثبات
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="mt-6 pt-4 border-t border-[#f2ca50]/15 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 line-through block font-mono-num">
                    {product.originalPrice} ج.م
                  </span>
                  <span className="text-xl font-black font-mono-num text-[#f2ca50]">
                    {product.price} ج.م
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setView('product-detail');
                    }}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition"
                  >
                    تفاصيل
                  </button>

                  <button
                    onClick={(e) => {
                      if (!isOutOfStock) addToCart(product, 1, '100ml', e);
                    }}
                    disabled={isOutOfStock}
                    className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow active:scale-95 ${
                      isOutOfStock
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#b38b33] to-[#f2ca50] hover:opacity-95 text-[#090807]'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isOutOfStock ? 'نفذ المخزون' : 'أضف للحقيبة'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
