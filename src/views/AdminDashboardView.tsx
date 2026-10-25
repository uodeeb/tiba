import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  Package, 
  Truck, 
  ShieldCheck, 
  Printer, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    orders,
    products,
    updateOrderStatus,
    setSelectedOrderForWaybill,
    setIsWaybillModalOpen,
    setView
  } = useApp();

  const totalGMV = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending_confirmation');
  const processingOrders = orders.filter(o => o.status === 'processing');
  const shippedOrders = orders.filter(o => o.status === 'shipped');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f2ca50]/20 pb-5">
        <div>
          <span className="text-xs bg-[#f2ca50]/15 text-[#f2ca50] px-3 py-1 rounded-full font-bold border border-[#f2ca50]/30 inline-block mb-1">
            مركز عمليات أسيوط اللوجستية • مباشر
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            لوحة قيادة العمليات والشحنات الملكية
          </h1>
          <p className="text-xs text-[#a69c8a] mt-0.5">
            متابعة فورية للطلبات، تعيين المناديب، وطباعة بوالص الشحن الحرارية 4×6 إنش
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('admin-orders')}
            className="px-4 py-2 bg-[#f2ca50] hover:bg-[#ffe17d] text-[#090807] font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>إدارة بوالص الشحن</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total GMV */}
        <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs text-[#a69c8a]">إجمالي مبيعات الدار</span>
            <div className="p-2 rounded-xl bg-[#f2ca50]/15 text-[#f2ca50]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black font-mono-num text-[#f2ca50]">{totalGMV.toLocaleString()} ج.م</h3>
            <span className="text-[11px] text-[#18cd61] font-semibold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4% نمو أسبوعي بصعيد مصر</span>
            </span>
          </div>
        </div>

        {/* Anti-RTO Delivery Success */}
        <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-xs text-[#a69c8a]">نسبة نجاح التسليم (Anti-RTO)</span>
            <div className="p-2 rounded-xl bg-[#18cd61]/15 text-[#18cd61]">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black font-mono-num text-[#18cd61]">95.2%</h3>
            <span className="text-[11px] text-[#a69c8a] mt-1 block">
              بفضل حقل العلامة المميزة الإلزامي
            </span>
          </div>
        </div>

        {/* Active In-Flight Orders */}
        <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-xs text-[#a69c8a]">شحنات قيد التوصيل الآن</span>
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black font-mono-num text-white">{shippedOrders.length + processingOrders.length}</h3>
            <span className="text-[11px] text-blue-400 font-semibold mt-1 block">
              {processingOrders.length} تجهيز • {shippedOrders.length} خرجت مع المندوب
            </span>
          </div>
        </div>

        {/* Pending Confirmation */}
        <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-xs text-[#a69c8a]">بانتظار التأكيد الفوري</span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black font-mono-num text-[#f2ca50]">{pendingOrders.length}</h3>
            <span className="text-[11px] text-amber-300 font-semibold mt-1 block">
              يتطلب اتصال أو تأكيد عبر واتساب
            </span>
          </div>
        </div>
      </div>

      {/* Recent Orders Deck Table */}
      <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#f2ca50]/15 pb-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#f2ca50]" />
            <h2 className="text-base font-bold font-display text-white">
              أحدث الشحنات وعمليات التوصيل
            </h2>
          </div>
          <button
            onClick={() => setView('admin-orders')}
            className="text-xs text-[#f2ca50] hover:underline font-semibold"
          >
            عرض سجل كافة الطلبات ({orders.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-[#f2ca50]/20 text-[#a69c8a] pb-2">
                <th className="py-2.5 px-3">رقم الطلب</th>
                <th className="py-2.5 px-3">العميل والمحافظة</th>
                <th className="py-2.5 px-3">العلامة المميزة (Anti-RTO)</th>
                <th className="py-2.5 px-3">شركة الشحن</th>
                <th className="py-2.5 px-3">الإجمالي</th>
                <th className="py-2.5 px-3">الحالة</th>
                <th className="py-2.5 px-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition">
                  {/* Order Number */}
                  <td className="py-3 px-3 font-mono-num font-bold text-[#f2ca50]">
                    #{order.orderNumber}
                  </td>

                  {/* Customer & Location */}
                  <td className="py-3 px-3">
                    <span className="font-bold text-white block">{order.customerName}</span>
                    <span className="text-[10px] text-gray-400 font-mono-num">{order.phone} • {order.governorate}</span>
                  </td>

                  {/* Anti-RTO Landmark */}
                  <td className="py-3 px-3 max-w-xs truncate">
                    <span className="text-[11px] text-[#e8c178] bg-[#1c1810] px-2 py-0.5 rounded border border-[#f2ca50]/20 inline-block font-semibold">
                      {order.antiRtoLandmark}
                    </span>
                  </td>

                  {/* Courier */}
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 font-medium">
                      {order.courier}
                    </span>
                  </td>

                  {/* Total */}
                  <td className="py-3 px-3 font-mono-num font-bold text-white">
                    {order.total} ج.م
                  </td>

                  {/* Status Pill with Quick Switcher */}
                  <td className="py-3 px-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                        order.status === 'delivered'
                          ? 'bg-[#18cd61]/15 border-[#18cd61]/40 text-[#18cd61]'
                          : order.status === 'shipped'
                          ? 'bg-blue-500/15 border-blue-500/40 text-blue-400'
                          : order.status === 'processing'
                          ? 'bg-[#f2ca50]/15 border-[#f2ca50]/40 text-[#f2ca50]'
                          : 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                      }`}
                    >
                      <option value="pending_confirmation" className="bg-[#141312] text-white">قيد التأكيد</option>
                      <option value="processing" className="bg-[#141312] text-white">جاري التجهيز</option>
                      <option value="shipped" className="bg-[#141312] text-white">تم تسليم الشحنة</option>
                      <option value="delivered" className="bg-[#141312] text-white">تم التسليم بنجاح</option>
                      <option value="cancelled" className="bg-[#141312] text-white">ملغي</option>
                    </select>
                  </td>

                  {/* Action Print */}
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedOrderForWaybill(order);
                        setIsWaybillModalOpen(true);
                      }}
                      className="px-2.5 py-1.5 bg-[#f2ca50]/20 hover:bg-[#f2ca50] text-[#f2ca50] hover:text-[#090807] rounded-lg font-bold transition flex items-center justify-center gap-1 mx-auto"
                      title="طباعة بوليصة شحن حرارية"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>بوليصة 4×6</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
