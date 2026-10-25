import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Sparkles, Shield, Compass, FlaskConical, Box, LayoutDashboard, MessageCircle, ArrowRightLeft, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    view,
    setView,
    cart,
    setIsCartOpen,
    promotions
  } = useApp();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleRole = () => {
    if (role === 'customer') {
      setRole('admin');
      setView('admin-dashboard');
    } else {
      setRole('customer');
      setView('main');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090807]/90 backdrop-blur-md border-b border-[#f2ca50]/20 print:hidden select-none">
      {/* Top Announcement Bar */}
      {promotions.announcementText && (
        <div className="bg-gradient-to-r from-[#1c180f] via-[#2d2412] to-[#1c180f] text-[#f2ca50] text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium border-b border-[#f2ca50]/20 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#f2ca50] animate-spin" style={{ animationDuration: '8s' }} />
          <span>{promotions.announcementText}</span>
        </div>
      )}

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => setView('main')}
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group flex-shrink-0"
          >
            {/* Contained Video Brand Crest - Full 16:9 Native Proportions */}
            <div className="relative h-12 sm:h-14 w-28 sm:w-36 rounded-xl bg-black border border-[#f2ca50]/50 shadow-[0_0_20px_rgba(242,202,80,0.35)] group-hover:shadow-[0_0_30px_rgba(242,202,80,0.65)] group-hover:border-[#f2ca50] transition-all duration-300 overflow-hidden flex items-center justify-center p-1">
              <video
                src="/assets/aistudio/logo_anim_opt.mp4"
                poster="/assets/aistudio/logo_frame.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain pointer-events-none"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#f2ca50]/20 rounded-xl pointer-events-none" />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-bold font-display text-white tracking-wide group-hover:text-[#f2ca50] transition whitespace-nowrap">
                  دار طيبة الملكية
                </span>
                <span className="text-[9px] sm:text-[10px] bg-[#f2ca50]/15 text-[#f2ca50] px-1.5 py-0.5 rounded border border-[#f2ca50]/30 font-semibold font-mono">
                  أسيوط
                </span>
              </div>
              <p className="text-[10px] text-[#a69c8a] tracking-wider uppercase font-mono-num whitespace-nowrap hidden sm:block">
                Royal Oud • Est. 1998
              </p>
            </div>
          </div>

          {/* Customer Navigation Links */}
          {role === 'customer' ? (
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <button
                onClick={() => setView('main')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  view === 'main'
                    ? 'text-[#f2ca50] bg-[#f2ca50]/10 border border-[#f2ca50]/30'
                    : 'text-[#d6cebf] hover:text-[#f2ca50] hover:bg-white/5'
                }`}
              >
                الرئيسية
              </button>
              <button
                onClick={() => setView('catalog')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  view === 'catalog' || view === 'product-detail'
                    ? 'text-[#f2ca50] bg-[#f2ca50]/10 border border-[#f2ca50]/30'
                    : 'text-[#d6cebf] hover:text-[#f2ca50] hover:bg-white/5'
                }`}
              >
                <Compass className="w-4 h-4 text-[#f2ca50]" />
                الخزينة الملكية
              </button>
              <button
                onClick={() => setView('quiz')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  view === 'quiz' || view === 'quiz-result'
                    ? 'text-[#f2ca50] bg-[#f2ca50]/10 border border-[#f2ca50]/30'
                    : 'text-[#d6cebf] hover:text-[#f2ca50] hover:bg-white/5'
                }`}
              >
                <FlaskConical className="w-4 h-4 text-[#f2ca50]" />
                مستشار العطور الذكي
              </button>
              <button
                onClick={() => setView('discovery-kit')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  view === 'discovery-kit'
                    ? 'text-[#f2ca50] bg-[#f2ca50]/10 border border-[#f2ca50]/30'
                    : 'text-[#d6cebf] hover:text-[#f2ca50] hover:bg-white/5'
                }`}
              >
                <Box className="w-4 h-4 text-[#f2ca50]" />
                صندوق الاستكشاف
              </button>
              <button
                onClick={() => setView('notes-encyclopedia')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  view === 'notes-encyclopedia'
                    ? 'text-[#f2ca50] bg-[#f2ca50]/10 border border-[#f2ca50]/30'
                    : 'text-[#d6cebf] hover:text-[#f2ca50] hover:bg-white/5'
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#f2ca50]" />
                موسوعة النوتات
              </button>
            </nav>
          ) : (
            /* Admin Operations Nav Links */
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <button
                onClick={() => setView('admin-dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  view === 'admin-dashboard'
                    ? 'text-[#f2ca50] bg-[#f2ca50]/15 border border-[#f2ca50]/40'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                لوحة العمليات
              </button>
              <button
                onClick={() => setView('admin-orders')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  view === 'admin-orders'
                    ? 'text-[#f2ca50] bg-[#f2ca50]/15 border border-[#f2ca50]/40'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                الشحنات والبوالص
              </button>
              <button
                onClick={() => setView('admin-products')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  view === 'admin-products'
                    ? 'text-[#f2ca50] bg-[#f2ca50]/15 border border-[#f2ca50]/40'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                الأسعار والمخزون
              </button>
              <button
                onClick={() => setView('admin-promotions')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  view === 'admin-promotions'
                    ? 'text-[#f2ca50] bg-[#f2ca50]/15 border border-[#f2ca50]/40'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                محرك العروض
              </button>
              <button
                onClick={() => setView('admin-analytics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  view === 'admin-analytics'
                    ? 'text-[#f2ca50] bg-[#f2ca50]/15 border border-[#f2ca50]/40'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                تحليلات الصعيد
              </button>
            </nav>
          )}

          {/* Right Action Elements */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct WhatsApp Concierge Button */}
            <a
              href="https://wa.me/201023062507?text=مرحباً دار طيبة للعطور والعود الملكي، أود الاستفسار عن التشكيلة الملكية"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/30 text-[#25d366] text-xs font-semibold transition shadow-sm"
              title="تواصل مباشر عبر واتساب دار طيبة"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>مستشار واتساب</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#141312] border border-[#f2ca50]/30 hover:border-[#f2ca50] text-[#f2ca50] transition shadow-md group"
              title="حقيبة الشراء الملكية"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#f2ca50] text-[#090807] font-bold text-[11px] font-mono-num flex items-center justify-center shadow-lg border border-[#090807]">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Instant Role Switcher (Storefront <-> Operations Deck) */}
            <button
              onClick={toggleRole}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition shadow-md border ${
                role === 'admin'
                  ? 'bg-gradient-to-r from-[#b38b33] to-[#f2ca50] text-[#090807] border-white/40'
                  : 'bg-[#141312] hover:bg-[#201c17] text-[#e8c178] border-[#f2ca50]/30'
              }`}
              title="التبديل الفوري بين واجهة المتجر وإدارة العمليات"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {role === 'customer' ? 'إدارة عمليات أسيوط' : 'معاينة المتجر الفاخر'}
              </span>
              <span className="sm:hidden font-mono">
                {role === 'customer' ? 'إدارة' : 'متجر'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="md:hidden flex items-center justify-around py-2 px-3 bg-[#141312]/95 border-t border-[#f2ca50]/15 text-xs">
        {role === 'customer' ? (
          <>
            <button
              onClick={() => setView('main')}
              className={`py-1 px-2 rounded ${view === 'main' ? 'text-[#f2ca50] font-bold' : 'text-gray-300'}`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => setView('catalog')}
              className={`py-1 px-2 rounded ${view === 'catalog' ? 'text-[#f2ca50] font-bold' : 'text-gray-300'}`}
            >
              الخزينة
            </button>
            <button
              onClick={() => setView('quiz')}
              className={`py-1 px-2 rounded ${view === 'quiz' ? 'text-[#f2ca50] font-bold' : 'text-gray-300'}`}
            >
              المستشار الذكي
            </button>
            <button
              onClick={() => setView('discovery-kit')}
              className={`py-1 px-1.5 rounded ${view === 'discovery-kit' ? 'text-[#f2ca50] font-bold' : 'text-gray-300'}`}
            >
              العينات
            </button>
            <button
              onClick={() => setView('notes-encyclopedia')}
              className={`py-1 px-1.5 rounded ${view === 'notes-encyclopedia' ? 'text-[#f2ca50] font-bold' : 'text-gray-300'}`}
            >
              الموسوعة
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setView('admin-dashboard')}
              className={`py-1 px-1.5 rounded ${view === 'admin-dashboard' ? 'text-[#f2ca50] font-bold' : 'text-gray-300'}`}
            >
              العمليات
            </button>
            <button
              onClick={() => setView('admin-orders')}
              className={`py-1 px-1.5 rounded ${view === 'admin-orders' ? 'text-[#f2ca50] font-bold' : 'text-gray-300'}`}
            >
              الشحنات
            </button>
            <button
              onClick={() => setView('admin-products')}
              className={`py-1 px-1.5 rounded ${view === 'admin-products' ? 'text-[#f2ca50] font-bold' : 'text-gray-300'}`}
            >
              الأسعار
            </button>
            <button
              onClick={() => setView('admin-promotions')}
              className={`py-1 px-1.5 rounded ${view === 'admin-promotions' ? 'text-[#f2ca50] font-bold' : 'text-gray-300'}`}
            >
              العروض
            </button>
            <button
              onClick={() => setView('admin-analytics')}
              className={`py-1 px-1.5 rounded ${view === 'admin-analytics' ? 'text-[#f2ca50] font-bold' : 'text-gray-300'}`}
            >
              التحليلات
            </button>
          </>
        )}
      </div>
    </header>
  );
};
