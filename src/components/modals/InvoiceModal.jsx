import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, CheckCircle, Receipt, CreditCard, QrCode, Download, Printer } from "lucide-react";

export default function InvoiceModal({ isOpen, onClose, service }) {
  const { payInvoice } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !service) return null;

  const invoice = service.invoice || {
    invoiceNumber: "INV-2026-099",
    subtotal: service.estimate?.subtotal || 7500,
    tax: service.estimate?.tax || 1350,
    discount: service.estimate?.discount || 0,
    total: service.estimate?.total || 8850,
    paymentStatus: "PENDING",
    generatedAt: "2026-09-16"
  };

  const handlePayment = (method) => {
    setIsProcessing(true);
    setTimeout(() => {
      payInvoice(service.id, method);
      setIsProcessing(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Workshop Tax Invoice</h3>
              <p className="text-xs text-slate-500">{invoice.invoiceNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Printable View */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Workshop Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">AutoFlow Workshop Ltd.</h2>
              <p className="text-xs text-slate-500">Authorized Automotive Service Center</p>
              <p className="text-xs text-slate-500">GSTIN: 27AABCA1234F1Z8</p>
            </div>
            <div className="text-right">
              <span
                className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                  invoice.paymentStatus === "PAID"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}
              >
                {invoice.paymentStatus === "PAID" ? "✓ PAID IN FULL" : "PAYMENT DUE"}
              </span>
              <p className="text-xs text-slate-400 mt-1">Date: {invoice.generatedAt}</p>
            </div>
          </div>

          {/* Customer & Vehicle Info */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl text-xs border border-slate-200">
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Billed To</span>
              <p className="font-bold text-slate-800 mt-0.5">{service.customerName}</p>
              <p className="text-slate-600">{service.phone}</p>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Vehicle Info</span>
              <p className="font-bold text-slate-800 mt-0.5">{service.registrationNumber}</p>
              <p className="text-slate-600">{service.vehicleModel}</p>
            </div>
          </div>

          {/* Line Items */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Item & Description</th>
                  <th className="p-2.5 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {service.estimate?.items && service.estimate.items.length > 0 ? (
                  service.estimate.items.map((item, i) => (
                    <tr key={i}>
                      <td className="p-2.5 text-slate-800 font-medium">
                        {item.desc} <span className="text-slate-400 text-[10px]">({item.type})</span>
                      </td>
                      <td className="p-2.5 text-right font-mono text-slate-800">
                        ₹{Number(item.cost).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-2.5 text-slate-800">Standard Service & Inspection</td>
                    <td className="p-2.5 text-right font-mono">₹{invoice.subtotal.toLocaleString()}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Total breakdown */}
            <div className="bg-slate-50 p-3 border-t border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono">₹{invoice.subtotal?.toLocaleString()}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount Applied:</span>
                  <span className="font-mono">-₹{invoice.discount?.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>GST (18%):</span>
                <span className="font-mono">+₹{invoice.tax?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Grand Total:</span>
                <span className="font-mono text-emerald-700">₹{invoice.total?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          {invoice.paymentStatus === "PENDING" ? (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Select Payment Mode (Simulated Checkout)
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handlePayment("UPI (Google Pay / PhonePe)")}
                  className="py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Pay via UPI</span>
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handlePayment("Credit / Debit Card")}
                  className="py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card / NetBanking</span>
                </button>
              </div>
              {isProcessing && (
                <p className="text-center text-xs text-blue-700 animate-pulse font-medium">
                  Authorizing payment transaction...
                </p>
              )}
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>
                  Payment completed via {invoice.paymentMethod || "UPI / Digital"}. Service lifecycle finished!
                </span>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 px-2 py-1 text-[11px] bg-white border border-emerald-300 rounded-md font-medium text-emerald-800 hover:bg-emerald-100 transition"
              >
                <Printer className="w-3 h-3" />
                <span>Print</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
