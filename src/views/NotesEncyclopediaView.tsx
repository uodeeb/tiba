import React, { useState } from 'react';
import { SCENT_NOTES_DATABASE } from '../data/scentNotesDatabase';
import { ScentNote } from '../types';
import { useApp } from '../context/AppContext';
import { ScentCompareDeck } from '../components/ScentCompareDeck';
import {
  BookOpen,
  Search,
  MapPin,
  Wind,
  Sparkles,
  ArrowLeft,
  ArrowLeftRight,
  Flame,
  Clock,
  Layers,
  Award
} from 'lucide-react';

export const NotesEncyclopediaView: React.FC = () => {
  const { products, setSelectedProductId, setView, openNoteExplainer } = useApp();

  // Active view tab: 'compare' for the side-by-side battle deck, 'browse' for the full 12 notes catalog
  const [activeTab, setActiveTab] = useState<'compare' | 'browse'>('compare');

  // Comparison deck selected IDs state (persisted when switching from browse cards)
  const [compareNote1, setCompareNote1] = useState<string>('oud-cambodian');
  const [compareNote2, setCompareNote2] = useState<string>('amber-ambergris');

  // Search and filter for browse tab
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'كافة المكونات النادرة (12)' },
    { id: 'oud', label: 'العود الملكي' },
    { id: 'amber', label: 'العنبر والبلسم' },
    { id: 'floral', label: 'الورود والزهور' },
    { id: 'musk', label: 'المسك والنقاء' },
    { id: 'leather', label: 'الجلود الفاخرة' },
    { id: 'wood', label: 'الأخشاب النادرة' },
    { id: 'citrus', label: 'الحمضيات والانتعاش' }
  ];

  const filtered = SCENT_NOTES_DATABASE.filter((note) => {
    const matchesCategory = categoryFilter === 'all' || note.category === categoryFilter;
    const matchesSearch =
      note.nameAr.toLowerCase().includes(search.toLowerCase()) ||
      note.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      note.origin.toLowerCase().includes(search.toLowerCase()) ||
      note.scentProfile.toLowerCase().includes(search.toLowerCase()) ||
      note.sensoryDescriptors.some((d) => d.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleLaunchCompare = (noteId: string) => {
    setCompareNote1(noteId);
    // If second note is identical, pick a complementary one
    if (noteId === compareNote2) {
      const fallback = SCENT_NOTES_DATABASE.find((n) => n.id !== noteId)?.id || 'amber-ambergris';
      setCompareNote2(fallback);
    }
    setActiveTab('compare');
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 select-none">
      {/* Top Banner & Egyptian Dialect Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#f2ca50]/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/30 text-[#f2ca50] text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>موسوعة المكونات الشمّية • دار طيبة للعطور بأسيوط</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-white">
            دليل أسرار النوتات الملكية ومقارنة الفوحان
          </h1>
          <p className="text-xs sm:text-sm text-[#c4bba9] mt-1.5 max-w-2xl leading-relaxed">
            بالعامية الصعيدية الأصيلة: اعرف ريحة كل مكوّن قبل ما تشتري، قارن بين قوة ثباتهم، واكتشف سر التوليف لما ترش نوتتين سوا في عطر واحد!
          </p>
        </div>

        {/* Tab Switcher: Compare Deck vs All Notes */}
        <div className="inline-flex p-1.5 rounded-2xl bg-[#141312] border-2 border-[#f2ca50]/30 shadow-lg">
          <button
            type="button"
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition duration-200 ${
              activeTab === 'compare'
                ? 'bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] shadow-md'
                : 'text-[#c4bba9] hover:text-white'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>مقارنة وجهًا لوجه (Scent Battle)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('browse')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition duration-200 ${
              activeTab === 'browse'
                ? 'bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] shadow-md'
                : 'text-[#c4bba9] hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>تصفح دليل النوتات (12 مكوّن)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Scent Compare Deck View */}
      {activeTab === 'compare' && (
        <div className="space-y-6">
          <div className="bg-[#1c1810]/70 border border-[#f2ca50]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#fff7d6]">
            <div className="flex items-center gap-2">
              <span className="text-lg">💡</span>
              <span>
                <strong>نصيحة خبير دار طيبة:</strong> جرب تبديل مكان النوتتين بالأيقونة الذهبية (⇄)، وشوف إزاي كل مكوّن بيأثر على الفوحان وثبات الهدوم.
              </span>
            </div>
            <button
              onClick={() => setActiveTab('browse')}
              className="text-[#f2ca50] font-bold hover:underline whitespace-nowrap"
            >
              عرض دليل الـ 12 نوتة بالتفصيل ←
            </button>
          </div>

          <ScentCompareDeck
            key={`${compareNote1}-${compareNote2}`}
            initialNoteId1={compareNote1}
            initialNoteId2={compareNote2}
          />
        </div>
      )}

      {/* Tab 2: Browse All 12 Notes Grid */}
      {activeTab === 'browse' && (
        <div className="space-y-6">
          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#141312]/80 p-4 rounded-2xl border border-[#f2ca50]/20">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                    categoryFilter === cat.id
                      ? 'bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] font-bold shadow'
                      : 'bg-[#1c1810] text-[#d6cebf] hover:text-white border border-[#f2ca50]/20 hover:border-[#f2ca50]/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="ابحث بالاسم أو الرائحة (عود، عنبر، مسك...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1c1810] border border-[#f2ca50]/30 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#f2ca50] transition"
              />
              <Search className="w-4 h-4 text-[#f2ca50] absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Scent Notes Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((note) => {
              const featured = products.filter((p) => note.featuredInProductIds.includes(p.id));

              return (
                <div
                  key={note.id}
                  className="bg-[#141312]/90 border border-[#f2ca50]/30 hover:border-[#f2ca50]/80 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_35px_rgba(242,202,80,0.15)] group relative"
                >
                  <div className="space-y-4">
                    {/* Note Header & Origin */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] bg-[#f2ca50]/15 text-[#f2ca50] px-2.5 py-0.5 rounded font-bold border border-[#f2ca50]/30">
                          {note.categoryLabel}
                        </span>
                        <span className="text-[10px] text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded font-bold">
                          {note.rarityLevel}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-white group-hover:text-[#f2ca50] transition">
                        {note.nameAr}
                      </h3>
                      <p className="text-[11px] text-[#a69c8a] font-mono mt-0.5">
                        {note.nameEn}
                      </p>

                      <div className="flex items-center gap-1.5 text-[11px] text-[#e8c178] mt-2">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#f2ca50]" />
                        <span className="line-clamp-1">{note.origin}</span>
                      </div>
                    </div>

                    {/* What it smells like (Direct user request focus) */}
                    <div className="bg-[#1c1810] border border-[#f2ca50]/25 rounded-2xl p-3.5 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white font-display">
                        <Wind className="w-4 h-4 text-[#f2ca50]" />
                        <span>ريحتها عاملة إزاي بالظبط؟</span>
                      </div>
                      <p className="text-xs text-[#fff7d6] leading-relaxed line-clamp-3">
                        {note.scentProfile}
                      </p>
                    </div>

                    {/* Key stats: Longevity and Sillage */}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-[#090807] p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#18cd61] flex-shrink-0" />
                        <div>
                          <span className="text-[#a69c8a] block text-[10px]">الثبات على الثياب</span>
                          <span className="font-bold text-white font-mono-num">+{note.longevityHours} ساعة</span>
                        </div>
                      </div>
                      <div className="bg-[#090807] p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                        <Flame className="w-3.5 h-3.5 text-[#f2ca50] flex-shrink-0" />
                        <div>
                          <span className="text-[#a69c8a] block text-[10px]">قوة الفوحان</span>
                          <span className="font-bold text-[#f2ca50] font-mono-num">{note.intensityRating}/10</span>
                        </div>
                      </div>
                    </div>

                    {/* Sensory Descriptors */}
                    <div className="flex flex-wrap gap-1">
                      {note.sensoryDescriptors.slice(0, 3).map((d, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#090807] text-[#c4bba9] px-2 py-0.5 rounded-md border border-white/5"
                        >
                          #{d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions: Compare & Full Explainer Modal */}
                  <div className="mt-5 pt-4 border-t border-[#f2ca50]/15 space-y-2.5">
                    {featured.length > 0 && (
                      <div className="flex items-center justify-between text-xs pb-1">
                        <span className="text-[10px] text-[#a69c8a]">متوفر في عطر:</span>
                        <button
                          onClick={() => {
                            setSelectedProductId(featured[0].id);
                            setView('product-detail');
                          }}
                          className="text-xs font-bold text-[#f2ca50] hover:underline flex items-center gap-1"
                        >
                          <span>{featured[0].nameAr}</span>
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => openNoteExplainer(note.id)}
                        className="w-full py-2 bg-[#1f1b14] hover:bg-[#2e261a] text-[#f2ca50] border border-[#f2ca50]/30 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>الشرح الكامل</span>
                      </button>

                      <button
                        onClick={() => handleLaunchCompare(note.id)}
                        className="w-full py-2 bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] rounded-xl text-[11px] font-bold transition shadow hover:opacity-95 flex items-center justify-center gap-1"
                      >
                        <ArrowLeftRight className="w-3 h-3" />
                        <span>قارن مع نوتة ⚔️</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
