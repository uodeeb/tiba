import React from 'react';
import { Order } from '../types';
import { Printer, X, ShieldAlert, CheckCircle2, Truck } from 'lucide-react';

interface PrintableWaybillProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableWaybill: React.FC<PrintableWaybillProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#141312] border border-[#f2ca50]/40 rounded-2xl p-6 shadow-2xl my-8 text-[#e6e1d7]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f2ca50]/20 mb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#f2ca50]" />
            <h3 className="text-base font-bold text-[#f2ca50] font-display">
              بوليصة الشحن الحرارية الرسمية (4×6 إنش)
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#f2ca50] hover:bg-[#ffe17d] text-[#090807] font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
            >
              <Printer className="w-4 h-4" />
              طباعة البوليصة الآن
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable 4x6 Waybill Sheet */}
        <div
          id="printable-waybill"
          className="bg-white text-black p-4 rounded-lg shadow-inner text-xs font-sans border-2 border-black space-y-3 leading-tight"
          dir="rtl"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b-2 border-black pb-2">
            <div className="flex items-center gap-2">
              <img
                src="/assets/brand_logo.jpeg"
                alt="شعار دار طيبة"
                className="w-12 h-12 object-contain border border-black rounded"
              />
              <div>
                <h1 className="text-base font-black tracking-tight">دار طيبة للعطور والعود الملكي</h1>
                <p className="text-[10px] text-gray-700">المركز الرئيسي: أسيوط - جمهورية مصر العربية</p>
                <p className="text-[10px] text-gray-700">هاتف الدعم: 01023062507</p>
              </div>
            </div>
            <div className="text-left">
              <span className="inline-block px-2 py-0.5 border border-black font-black text-[11px] bg-gray-100 uppercase">
                {order.courier}
              </span>
              <p className="text-[9px] font-mono mt-1 text-left">{order.trackingNumber}</p>
            </div>
          </div>

          {/* Barcode Graphic */}
          <div className="text-center py-1 border-b border-black">
            <svg className="w-full h-12 mx-auto" viewBox="0 0 300 48">
              {/* Pseudo-Barcode Lines */}
              <rect x="10" y="2" width="4" height="36" fill="black" />
              <rect x="18" y="2" width="2" height="36" fill="black" />
              <rect x="24" y="2" width="6" height="36" fill="black" />
              <rect x="34" y="2" width="2" height="36" fill="black" />
              <rect x="40" y="2" width="5" height="36" fill="black" />
              <rect x="50" y="2" width="3" height="36" fill="black" />
              <rect x="58" y="2" width="8" height="36" fill="black" />
              <rect x="70" y="2" width="3" height="36" fill="black" />
              <rect x="78" y="2" width="4" height="36" fill="black" />
              <rect x="86" y="2" width="7" height="36" fill="black" />
              <rect x="98" y="2" width="3" height="36" fill="black" />
              <rect x="105" y="2" width="5" height="36" fill="black" />
              <rect x="114" y="2" width="2" height="36" fill="black" />
              <rect x="120" y="2" width="6" height="36" fill="black" />
              <rect x="130" y="2" width="4" height="36" fill="black" />
              <rect x="138" y="2" width="8" height="36" fill="black" />
              <rect x="150" y="2" width="3" height="36" fill="black" />
              <rect x="158" y="2" width="5" height="36" fill="black" />
              <rect x="168" y="2" width="2" height="36" fill="black" />
              <rect x="175" y="2" width="7" height="36" fill="black" />
              <rect x="186" y="2" width="4" height="36" fill="black" />
              <rect x="194" y="2" width="2" height="36" fill="black" />
              <rect x="200" y="2" width="6" height="36" fill="black" />
              <rect x="210" y="2" width="3" height="36" fill="black" />
              <rect x="218" y="2" width="5" height="36" fill="black" />
              <rect x="228" y="2" width="7" height="36" fill="black" />
              <rect x="240" y="2" width="3" height="36" fill="black" />
              <rect x="248" y="2" width="6" height="36" fill="black" />
              <rect x="258" y="2" width="4" height="36" fill="black" />
              <rect x="268" y="2" width="6" height="36" fill="black" />
              <rect x="278" y="2" width="3" height="36" fill="black" />
              <rect x="285" y="2" width="5" height="36" fill="black" />
              <text x="150" y="46" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold">
                *{order.orderNumber}*
              </text>
            </svg>
          </div>

          {/* Recipient Details */}
          <div className="grid grid-cols-2 gap-2 border-b-2 border-black pb-2">
            <div>
              <span className="text-[10px] text-gray-600 block">بيانات المستلم:</span>
              <p className="font-bold text-sm">{order.customerName}</p>
              <p className="font-mono font-bold text-xs mt-0.5">{order.phone}</p>
              {order.altPhone && <p className="font-mono text-[10px] text-gray-700">هاتف بديل: {order.altPhone}</p>}
            </div>
            <div>
              <span className="text-[10px] text-gray-600 block">المحافظة والمدينة:</span>
              <p className="font-bold text-sm">{order.governorate} - {order.city}</p>
              <p className="text-[11px] mt-0.5 text-gray-800">{order.address}</p>
            </div>
          </div>

          {/* CRITICAL ANTI-RTO PROMINENT LANDMARK SECTION */}
          <div className="bg-amber-100 p-2 border-2 border-black rounded">
            <div className="flex items-center gap-1 mb-0.5">
              <ShieldAlert className="w-4 h-4 text-amber-900 inline" />
              <span className="font-black text-[11px] text-amber-950">
                العلامة المميزة لتسليم المندوب (Anti-RTO Landmark):
              </span>
            </div>
            <p className="font-black text-xs text-black bg-white px-2 py-1 rounded border border-black/30">
              {order.antiRtoLandmark || 'لا توجد علامة مميزة مسجلة'}
            </p>
          </div>

          {/* Items Table */}
          <div className="border border-black">
            <div className="grid grid-cols-6 bg-gray-200 font-bold text-[10px] p-1 border-b border-black">
              <span className="col-span-3">المنتج</span>
              <span className="col-span-1 text-center">الحجم</span>
              <span className="col-span-1 text-center">الكمية</span>
              <span className="col-span-1 text-left">السعر</span>
            </div>
            {order.items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-6 text-[10px] p-1 border-b border-gray-300 items-center">
                <span className="col-span-3 font-semibold truncate">{item.product.nameAr}</span>
                <span className="col-span-1 text-center font-mono">{item.selectedSize}</span>
                <span className="col-span-1 text-center font-mono font-bold">×{item.quantity}</span>
                <span className="col-span-1 text-left font-mono">{item.unitPrice * item.quantity} ج.م</span>
              </div>
            ))}
          </div>

          {/* Payment & Inspection Notice */}
          <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black">
            <div>
              <span className="block text-[10px] text-gray-600">طريقة الدفع:</span>
              <span className="font-bold text-xs uppercase">
                {order.paymentMethod === 'cod' ? 'الدفع نقداً عند الاستلام (COD)' : order.paymentMethod === 'instapay' ? 'تم الدفع مقدماً (إنستاباي)' : 'تم الدفع بالبطاقة (Paymob)'}
              </span>
            </div>
            <div className="text-left">
              <span className="block text-[10px] text-gray-600">المبلغ المطلوب تحصيله:</span>
              <span className="font-black text-base font-mono">
                {order.paymentMethod === 'cod' ? `${order.total} ج.م` : '0 ج.م (خالص)'}
              </span>
            </div>
          </div>

          {/* Guarantee stamp */}
          <div className="flex items-center justify-between text-[9px] text-gray-700 pt-1">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-black" />
              <span>يحق للعميل فتح الشحنة ومعاينة العبوة بحضور المندوب قبل الاستلام</span>
            </div>
            <span className="font-mono">{order.createdAt}</span>
          </div>
        </div>

        {/* Modal Footer helper */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#a69c8a] print:hidden">
          <p>جاهزة للطباعة على طابعات الباركود الحرارية (Zebra / Xprinter / Dymo)</p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
};
