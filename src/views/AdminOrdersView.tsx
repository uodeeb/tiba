import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { Truck, Printer, Search, Filter, ShieldAlert, CheckCircle, Clock, MapPin, Eye } from 'lucide-react';

export const AdminOrdersView: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    assignCourier,
    setSelectedOrderForWaybill,
    setIsWaybillModalOpen
  } = useApp();

  const [search, setSearch] = useState('');
  const [courierFilter, setCourierFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<Order | null>(null);

  const couriers: Order['courier'][] = [
    'Asyut Local Express',
    'Bosta',
    'Aramex',
    'Mylerz'
  ];

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search) ||
      o.governorate.toLowerCase().includes(search.toLowerCase()) ||
      o.antiRtoLandmark.toLowerCase().includes(search.toLowerCase());

    const matchesCourier = courierFilter === 'all' || o.courier === courierFilter;
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;

    return matchesSearch && matchesCourier && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f2ca50]/20 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#f2ca50]" />
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
              إدارة الشحنات وبوالص التوصيل الحرارية
            </h1>
          </div>
          <p className="text-xs text-[#a69c8a] mt-1">
            إسناد مناديب الشحن، طباعة ملصقات 4×6 إنش الحرارية، ومتابعة توصيل الصعيد ومصر
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-[#141312] border border-[#f2ca50]/30 text-[#f2ca50] font-mono-num font-bold">
            إجمالي الشحنات: {orders.length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search */}
        <div className="md:col-span-5 relative">
          <input
            type="text"
            placeholder="ابحث برقم الطلب، اسم العميل، الهاتف، أو العلامة المميزة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3.5 py-2 pl-9 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#f2ca50]"
          />
          <Search className="w-4 h-4 text-[#f2ca50] absolute left-3 top-2.5 pointer-events-none" />
        </div>

        {/* Courier Filter */}
        <div className="md:col-span-3">
          <select
            value={courierFilter}
            onChange={(e) => setCourierFilter(e.target.value)}
            className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option value="all">كافة شركات الشحن</option>
            <option value="Asyut Local Express">Asyut Local Express (تسليم فوري)</option>
            <option value="Bosta">Bosta (بوسطة)</option>
            <option value="Aramex">Aramex (أرامكس)</option>
            <option value="Mylerz">Mylerz (مايلرز)</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#090807] border border-[#f2ca50]/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option value="all">كافة الحالات</option>
            <option value="pending_confirmation">قيد التأكيد (Pending)</option>
            <option value="processing">جاري التجهيز (Processing)</option>
            <option value="shipped">تم تسليم الشحنة (Shipped)</option>
            <option value="delivered">تم التسليم بنجاح (Delivered)</option>
            <option value="cancelled">ملغي (Cancelled)</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#1c1812] border-b border-[#f2ca50]/20 text-[#a69c8a]">
              <tr>
                <th className="py-3 px-4">رقم الشحنة</th>
                <th className="py-3 px-4">العميل والموقع</th>
                <th className="py-3 px-4">العلامة المميزة (Anti-RTO)</th>
                <th className="py-3 px-4">شركة الشحن وتتبعها</th>
                <th className="py-3 px-4">المبلغ والدفع</th>
                <th className="py-3 px-4">حالة الشحنة</th>
                <th className="py-3 px-4 text-center">طباعة بوليصة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    لا توجد شحنات مطابقة لمعايير البحث الحالية
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition">
                    {/* Order Number */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono-num font-bold text-[#f2ca50] block">
                        #{order.orderNumber}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono-num">{order.createdAt}</span>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-white block">{order.customerName}</span>
                      <span className="text-[10px] text-gray-400 font-mono-num">{order.phone}</span>
                      <span className="text-[10px] text-[#e8c178] block mt-0.5">{order.governorate} - {order.city}</span>
                    </td>

                    {/* Mandatory Anti-RTO Landmark */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="bg-amber-950/30 border border-amber-600/40 p-2 rounded-lg">
                        <span className="text-[10px] text-[#f2ca50] font-bold block flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 inline" />
                          العلامة المميزة:
                        </span>
                        <p className="text-[11px] text-white font-medium mt-0.5 leading-snug">
                          {order.antiRtoLandmark}
                        </p>
                      </div>
                    </td>

                    {/* Courier Assignment Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={order.courier}
                        onChange={(e) => assignCourier(order.id, e.target.value as any)}
                        className="bg-[#090807] border border-[#f2ca50]/30 rounded-lg px-2 py-1 text-[11px] text-white font-semibold focus:outline-none mb-1"
                      >
                        {couriers.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <span className="text-[9px] font-mono text-gray-400 block tracking-tight">
                        {order.trackingNumber}
                      </span>
                    </td>

                    {/* Amount & Method */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono-num font-bold text-sm text-[#f2ca50] block">
                        {order.total} ج.م
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase">
                        {order.paymentMethod === 'cod' ? 'عند الاستلام (COD)' : order.paymentMethod === 'instapay' ? 'إنستاباي (مسدد)' : 'فيزا / Paymob'}
                      </span>
                    </td>

                    {/* Status Select */}
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
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
                        <option value="shipped" className="bg-[#141312] text-white">تم تسليم الشحنة للمندوب</option>
                        <option value="delivered" className="bg-[#141312] text-white">تم التسليم بنجاح</option>
                        <option value="cancelled" className="bg-[#141312] text-white">ملغي</option>
                      </select>
                    </td>

                    {/* Print 4x6 Waybill Button */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedOrderForWaybill(order);
                          setIsWaybillModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-[#f2ca50] hover:bg-[#ffe17d] text-[#090807] font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5 mx-auto"
                        title="طباعة ملصق البوليصة الحراري Zebra/Xprinter"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>طباعة 4×6</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
