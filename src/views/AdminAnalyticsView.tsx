import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, TrendingUp, MapPin, Award, ShieldCheck, DollarSign } from 'lucide-react';

export const AdminAnalyticsView: React.FC = () => {
  const { products, orders } = useApp();

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  const regionalData = [
    { name: 'أسيوط (المقر الرئيسي)', percentage: 42, ordersCount: 148, gmv: 139120 },
    { name: 'سوهاج وجنوب الصعيد', percentage: 22, ordersCount: 78, gmv: 73320 },
    { name: 'المنيا وبني سويف', percentage: 16, ordersCount: 56, gmv: 52640 },
    { name: 'القاهرة والجيزة والإسكندرية', percentage: 20, ordersCount: 70, gmv: 65800 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f2ca50]/20 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#f2ca50]" />
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
              تحليلات الصعيد وذكاء الأعمال (BI Analytics)
            </h1>
          </div>
          <p className="text-xs text-[#a69c8a] mt-1">
            تقارير التوزيع الجغرافي للمبيعات، كفاءة مندوبي التوصيل، ونسب تقليل المرتجعات (Anti-RTO)
          </p>
        </div>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-6 shadow-xl space-y-2">
          <div className="flex justify-between items-center text-xs text-[#a69c8a]">
            <span>متوسط سلة المقتنيات (AOV)</span>
            <DollarSign className="w-4 h-4 text-[#f2ca50]" />
          </div>
          <h3 className="text-3xl font-black font-mono-num text-[#f2ca50]">1,420 ج.م</h3>
          <p className="text-[11px] text-[#18cd61] font-semibold">
            مدفوع بعرض اشتر 2 واحصل على الثالث مجاناً
          </p>
        </div>

        <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-6 shadow-xl space-y-2">
          <div className="flex justify-between items-center text-xs text-[#a69c8a]">
            <span>معدل الشراء المتكرر</span>
            <TrendingUp className="w-4 h-4 text-[#18cd61]" />
          </div>
          <h3 className="text-3xl font-black font-mono-num text-[#18cd61]">41.6%</h3>
          <p className="text-[11px] text-[#a69c8a]">
            عملاء يعيدون الطلب خلال 45 يوماً بعد تجربة العينات
          </p>
        </div>

        <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-6 shadow-xl space-y-2">
          <div className="flex justify-between items-center text-xs text-[#a69c8a]">
            <span>معدل نجاح تسليم الصعيد</span>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-3xl font-black font-mono-num text-white">96.8%</h3>
          <p className="text-[11px] text-[#a69c8a]">
            انخفاض بنسبة 88% في المرتجعات (RTO Reduced)
          </p>
        </div>
      </div>

      {/* Regional Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Upper Egypt Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-[#f2ca50]/15 pb-3">
            <MapPin className="w-5 h-5 text-[#f2ca50]" />
            <h3 className="text-base font-bold font-display text-white">
              التوزيع الجغرافي للطلبات ومراكز الثقل
            </h3>
          </div>

          <div className="space-y-4">
            {regionalData.map((reg, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">{reg.name}</span>
                  <span className="font-mono-num text-[#f2ca50] font-bold">
                    {reg.percentage}% ({reg.ordersCount} طلب • {reg.gmv.toLocaleString()} ج.م)
                  </span>
                </div>
                <div className="w-full bg-[#090807] h-2.5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="bg-gradient-to-r from-[#b38b33] via-[#f2ca50] to-[#fff7d6] h-full rounded-full transition-all duration-700"
                    style={{ width: `${reg.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Best-Selling Perfumes Leaderboard (5 cols) */}
        <div className="lg:col-span-5 bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-[#f2ca50]/15 pb-3">
            <Award className="w-5 h-5 text-[#f2ca50]" />
            <h3 className="text-base font-bold font-display text-white">
              ترتيب العطور الأكثر مبيعاً
            </h3>
          </div>

          <div className="space-y-3">
            {products.map((prod, idx) => (
              <div
                key={prod.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#090807]/60 border border-white/5 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/30 text-[#f2ca50] font-mono-num font-bold flex items-center justify-center text-[11px]">
                    0{idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-white block">{prod.nameAr}</span>
                    <span className="text-[10px] text-gray-400">{prod.categoryLabel}</span>
                  </div>
                </div>

                <div className="text-left font-mono-num">
                  <span className="text-[#f2ca50] font-bold block">{prod.price} ج.م</span>
                  <span className="text-[10px] text-[#18cd61] font-semibold">{prod.reviewsCount} مبيعة</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
