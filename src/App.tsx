import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { CanvasMist } from './components/CanvasMist';
import { CartDrawer } from './components/CartDrawer';
import { PrintableWaybill } from './components/PrintableWaybill';
import { FlyingProductAnimation } from './components/FlyingProductAnimation';

// Customer Views
import { MainStageView } from './views/MainStageView';
import { FragranceAdvisorView } from './views/FragranceAdvisorView';
import { MatchResultView } from './views/MatchResultView';
import { RoyalVaultView } from './views/RoyalVaultView';
import { ProductDetailView } from './views/ProductDetailView';
import { DiscoveryKitView } from './views/DiscoveryKitView';
import { CheckoutView } from './views/CheckoutView';
import { NotesEncyclopediaView } from './views/NotesEncyclopediaView';
import { ScentNoteExplainerModal } from './components/ScentNoteExplainerModal';

// Admin Views
import { AdminDashboardView } from './views/AdminDashboardView';
import { AdminProductsView } from './views/AdminProductsView';
import { AdminOrdersView } from './views/AdminOrdersView';
import { AdminPromotionsView } from './views/AdminPromotionsView';
import { AdminAnalyticsView } from './views/AdminAnalyticsView';

// Lucide Icons for Footer
import { Sparkles, Phone, MapPin, ShieldCheck, Heart, BookOpen } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    view,
    setView,
    selectedOrderForWaybill,
    isWaybillModalOpen,
    setIsWaybillModalOpen,
    selectedScentNote,
    isNoteExplainerOpen,
    setIsNoteExplainerOpen
  } = useApp();

  const bgVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const [bgVivid, setBgVivid] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#090807] text-[#e6e1d7] flex flex-col relative selection:bg-[#f2ca50]/30 selection:text-[#f2ca50] overflow-x-hidden">
      {/* Ambient Animated Luxury Video Background - Vivid & High Quality */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <video
          ref={bgVideoRef}
          poster="/assets/aistudio/background_poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`w-full h-full object-cover transition-all duration-700 ${
            bgVivid
              ? 'opacity-70 filter saturate-125 contrast-105'
              : 'opacity-40 filter saturate-105'
          }`}
        >
          <source src="/assets/aistudio/background_loop_opt.mp4" type="video/mp4" />
          <source src="/assets/aistudio/tiba_website_animated_background_8344e00c.mp4" type="video/mp4" />
        </video>
        {/* Soft Ambient Vignette for readability while letting the video glow clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090807]/55 via-transparent to-[#090807]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#090807]/25 to-[#090807]/75 pointer-events-none" />
      </div>

      {/* Floating Background Ambiance Visibility Toggle */}
      <div className="fixed bottom-4 left-4 z-40 print:hidden hidden sm:block">
        <button
          onClick={() => setBgVivid(!bgVivid)}
          className="px-3 py-1.5 rounded-full bg-black/80 hover:bg-black text-[#f2ca50] border border-[#f2ca50]/40 text-[11px] font-bold shadow-2xl backdrop-blur-md transition flex items-center gap-1.5 hover:border-[#f2ca50]"
          title="تعديل شدة وضوح خلفية الفيديو السينمائية"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{bgVivid ? 'الخلفية السينمائية: واضحة ✨' : 'الخلفية: خافتة'}</span>
        </button>
      </div>

      {/* Background Ambient Incense Mist & Golden Particles */}
      <CanvasMist intensity="rich" />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1 relative z-10">
        {view === 'main' && <MainStageView />}
        {view === 'quiz' && <FragranceAdvisorView />}
        {view === 'quiz-result' && <MatchResultView />}
        {view === 'catalog' && <RoyalVaultView />}
        {view === 'product-detail' && <ProductDetailView />}
        {view === 'discovery-kit' && <DiscoveryKitView />}
        {view === 'checkout' && <CheckoutView />}
        {view === 'notes-encyclopedia' && <NotesEncyclopediaView />}

        {/* Admin Operational Views */}
        {view === 'admin-dashboard' && <AdminDashboardView />}
        {view === 'admin-products' && <AdminProductsView />}
        {view === 'admin-orders' && <AdminOrdersView />}
        {view === 'admin-promotions' && <AdminPromotionsView />}
        {view === 'admin-analytics' && <AdminAnalyticsView />}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Royal Box Flying Product Flight Animation */}
      <FlyingProductAnimation />

      {/* Scent Note Explainer Modal (Explains how each oud, amber, rose, musk smells like) */}
      <ScentNoteExplainerModal
        note={selectedScentNote}
        isOpen={isNoteExplainerOpen}
        onClose={() => setIsNoteExplainerOpen(false)}
      />

      {/* High-Contrast 4x6 Thermal Courier Waybill Modal */}
      {selectedOrderForWaybill && (
        <PrintableWaybill
          order={selectedOrderForWaybill}
          isOpen={isWaybillModalOpen}
          onClose={() => setIsWaybillModalOpen(false)}
        />
      )}

      {/* Royal Luxury Footer */}
      <footer className="relative z-10 bg-[#0d0c0a] border-t border-[#f2ca50]/20 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-right print:hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/5">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-28 rounded-xl bg-black border border-[#f2ca50]/40 p-1 flex items-center justify-center overflow-hidden shadow-md">
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
              <div>
                <span className="font-display font-black text-xl text-[#f2ca50] block">دار طيبة</span>
                <span className="text-xs text-white">للعطور والعود الملكي</span>
              </div>
            </div>
            <p className="text-xs text-[#a69c8a] leading-relaxed">
              تأسست في صعيد مصر، متخصصة في ابتكار أندر العطور الشرقية المعتقة بتركيز مستخلص العطر الملكي 32% مع خدمة تسليم فوري باليد.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#f2ca50] pt-1">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>المقر الإقليمي: أسيوط - شارع الجمهورية</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">
              أقسام الدار
            </h4>
            <ul className="space-y-2 text-xs text-[#c4bba9]">
              <li>
                <button onClick={() => setView('catalog')} className="hover:text-[#f2ca50] transition">
                  الخزينة الملكية (العطور الكاملة)
                </button>
              </li>
              <li>
                <button onClick={() => setView('quiz')} className="hover:text-[#f2ca50] transition">
                  مرجل التقطير ومستشار العطور
                </button>
              </li>
              <li>
                <button onClick={() => setView('discovery-kit')} className="hover:text-[#f2ca50] transition">
                  صندوق الاستكشاف 3×10مل (مع استرداد 190 ج.م)
                </button>
              </li>
              <li>
                <button onClick={() => setView('notes-encyclopedia')} className="hover:text-[#f2ca50] transition text-[#f2ca50] font-semibold flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>موسوعة المكونات والنوتات العطرية (Scent DB)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setView('admin-dashboard')} className="hover:text-[#f2ca50] transition text-gray-400">
                  بوابة إدارة العمليات اللوجستية
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Guarantees */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">
              الضمانات الملكية
            </h4>
            <div className="space-y-2 text-xs text-[#c4bba9]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#18cd61] flex-shrink-0" />
                <span>حق فتح الشحنة ومعاينتها قبل سداد القيمة</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#f2ca50] flex-shrink-0" />
                <span>زيوت عطرية طبيعية غير مغشوشة أو ممددة</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>خدمة عملاء وكونسيرج: 01023062507</span>
              </div>
            </div>
          </div>

          {/* Col 4: Regional Delivery info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">
              الشحن المباشر
            </h4>
            <p className="text-xs text-[#a69c8a] leading-relaxed">
              شحن لكافة مراكز وقرى أسيوط وسوهاج وقنا والمنيا والقاهرة والإسكندرية عبر أسطول مناديب مدرب ومزود بنظام تتبع باركود فوري.
            </p>
            <div className="p-3 rounded-xl bg-[#141312] border border-[#f2ca50]/20 text-[11px] text-[#e8c178]">
              العلامة المميزة (Landmark) تضمن وصول شحنتك من المحاولة الأولى.
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7d7465] gap-2">
          <span>© 1998 - 2026 دار طيبة للعطور والعود الملكي. جميع الحقوق محفوظة.</span>
          <span className="flex items-center gap-1 font-mono-num">
            <span>سجل تجاري وبطاقة ضريبية معتمدة • أسيوط، مصر</span>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
