import React, { useState } from 'react';
import { ScentNote, Product } from '../types';
import { SCENT_NOTES_DATABASE } from '../data/scentNotesDatabase';
import { useApp } from '../context/AppContext';
import { X, Sparkles, MapPin, Wind, Clock, Flame, ArrowLeft, Search, Compass, Shield } from 'lucide-react';

interface ScentNoteExplainerModalProps {
  note: ScentNote | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ScentNoteExplainerModal: React.FC<ScentNoteExplainerModalProps> = ({
  note: initialNote,
  isOpen,
  onClose
}) => {
  const { products, setSelectedProductId, setView } = useApp();
  const [activeNote, setActiveNote] = useState<ScentNote | null>(initialNote);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Keep synced with prop
  React.useEffect(() => {
    setActiveNote(initialNote || SCENT_NOTES_DATABASE[0]);
  }, [initialNote]);

  if (!isOpen) return null;

  const currentNote = activeNote || SCENT_NOTES_DATABASE[0];

  // Fragrances featuring this note
  const featuredFragrances = products.filter((p) =>
    currentNote.featuredInProductIds.includes(p.id)
  );

  // Search filter
  const filteredNotes = SCENT_NOTES_DATABASE.filter(
    (n) =>
      n.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.scentProfile.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.sensoryDescriptors.some((d) => d.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setView('product-detail');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto select-none">
      <div className="relative w-full max-w-3xl bg-[#141312] border-2 border-[#f2ca50]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-[#e6e1d7] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f2ca50]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#b38b33] to-[#f2ca50] flex items-center justify-center text-[#090807] font-bold shadow-[0_0_15px_#f2ca50]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">
                موسوعة النوتات والمكونات العطرية لدار طيبة
              </h3>
              <p className="text-[11px] text-[#a69c8a]">
                دليلك الشامل لمعرفة أسرار الزيوت الملكية وكيف تُشم وتؤثر على العطر
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search across all notes */}
        <div className="my-4 relative">
          <input
            type="text"
            placeholder="ابحث عن أي مكون (مثال: دهن عود كمبودي، عنبر الحوت، ورد طائفي، لبان...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#f2ca50]"
          />
          <Search className="w-4 h-4 text-[#f2ca50] absolute left-3 top-3 pointer-events-none" />
        </div>

        {/* Quick Notes Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-[#f2ca50]/15 scrollbar-thin">
          {filteredNotes.map((n) => (
            <button
              key={n.id}
              onClick={() => setActiveNote(n)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex-shrink-0 flex items-center gap-1.5 ${
                currentNote.id === n.id
                  ? 'bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] font-bold shadow'
                  : 'bg-[#090807] text-[#c4bba9] hover:text-white border border-white/5 hover:border-[#f2ca50]/30'
              }`}
            >
              <span>{n.nameAr}</span>
            </button>
          ))}
        </div>

        {/* Note Spotlight Card */}
        <div className="mt-5 space-y-6 text-right">
          {/* Note Title & Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] bg-[#f2ca50]/20 text-[#f2ca50] px-2.5 py-0.5 rounded-full border border-[#f2ca50]/30 font-bold">
                  {currentNote.categoryLabel}
                </span>
                <span className="text-[11px] bg-amber-950/60 text-[#e8c178] px-2.5 py-0.5 rounded-full border border-amber-600/30 font-bold">
                  درجة الندرة: {currentNote.rarityLevel}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
                {currentNote.nameAr}
              </h2>
              <span className="text-xs text-[#a69c8a] font-mono tracking-wider">
                {currentNote.nameEn}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#f2ca50] bg-[#090807] px-3 py-2 rounded-xl border border-white/5 self-start sm:self-auto">
              <MapPin className="w-4 h-4 text-[#f2ca50] flex-shrink-0" />
              <span className="font-medium text-[11px]">{currentNote.origin}</span>
            </div>
          </div>

          {/* Scent Profile Highlight: "How it smells like" */}
          <div className="bg-gradient-to-br from-[#1c1810] to-[#14120e] border-2 border-[#f2ca50]/40 rounded-2xl p-5 shadow-inner space-y-2">
            <div className="flex items-center gap-2 text-[#f2ca50]">
              <Wind className="w-5 h-5 flex-shrink-0 animate-pulse" />
              <h4 className="text-sm font-bold font-display text-white">
                كيف هي رائحة هذا المكون وبصمته الشمية؟ (How it smells like)
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[#fff7d6] leading-relaxed font-light">
              {currentNote.scentProfile}
            </p>

            {/* Sensory Descriptors Tags */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              {currentNote.sensoryDescriptors.map((desc, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-[#090807] text-[#f2ca50] px-2.5 py-1 rounded-lg border border-[#f2ca50]/30 font-semibold"
                >
                  #{desc}
                </span>
              ))}
            </div>
          </div>

          {/* Origin & Historical Context */}
          <div className="bg-[#090807]/70 p-4 rounded-2xl border border-white/5 space-y-1.5">
            <h4 className="text-xs font-bold text-[#f2ca50] font-display flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>المنشأ وطريقة الاستخلاص:</span>
            </h4>
            <p className="text-xs text-[#c4bba9] leading-relaxed">
              {currentNote.description}
            </p>
          </div>

          {/* Longevity & Fixative Role */}
          <div className="bg-[#090807]/70 p-4 rounded-2xl border border-white/5 space-y-1.5">
            <h4 className="text-xs font-bold text-[#18cd61] font-display flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>دوره في ثبات العطر وانتشاره:</span>
            </h4>
            <p className="text-xs text-[#c4bba9] leading-relaxed">
              {currentNote.longevityImpact}
            </p>
          </div>

          {/* Featured In Dar Tiba Perfumes */}
          {featuredFragrances.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#f2ca50]/20">
              <h4 className="text-xs font-bold text-white font-display">
                عطور من دار طيبة تحتوي على هذا المكون النادر:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuredFragrances.map((perfume) => (
                  <div
                    key={perfume.id}
                    onClick={() => handleSelectProduct(perfume.id)}
                    className="bg-[#090807] border border-[#f2ca50]/30 hover:border-[#f2ca50] rounded-xl p-3 flex items-center gap-3 cursor-pointer transition hover:bg-[#1a1610] group"
                  >
                    <div className="w-14 h-16 rounded-lg overflow-hidden border border-[#f2ca50]/20 flex-shrink-0">
                      <img
                        src={perfume.image}
                        alt={perfume.nameAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-[#f2ca50] font-medium block">
                        {perfume.categoryLabel}
                      </span>
                      <h5 className="text-xs font-bold text-white truncate font-display">
                        {perfume.nameAr}
                      </h5>
                      <span className="text-xs font-mono-num font-bold text-[#f2ca50] mt-0.5 block">
                        {perfume.price} ج.م
                      </span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-[#f2ca50] transition" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
