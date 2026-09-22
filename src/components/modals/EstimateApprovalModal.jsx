import React from "react";
import { useApp } from "../../context/AppContext";
import { X, CheckCircle, XCircle, FileText, IndianRupee, ShieldAlert } from "lucide-react";

export default function EstimateApprovalModal({ isOpen, onClose, service }) {
  const { respondToEstimate } = useApp();

  if (!isOpen || !service || !service.estimate) return null;

  const { estimate } = service;

  const handleApprove = () => {
    respondToEstimate(service.id, true);
    onClose();
  };

  const handleReject = () => {
    if (window.confirm("Are you sure you want to decline this estimate? Service will be put on hold.")) {
      respondToEstimate(service.id, false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Service Estimate #{estimate.id || "EST-1024"}
              </h3>
              <p className="text-xs text-slate-500">
                {service.vehicleModel} • {service.registrationNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-800">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Authorization Requested:</span> Please review the parts and labor
              breakdown prepared by your Service Advisor based on the digital multi-point inspection.
            </div>
          </div>

          {/* Line Items */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3 text-right">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {estimate.items && estimate.items.length > 0 ? (
                  estimate.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3 font-medium text-slate-800">{item.desc}</td>
                      <td className="py-2 px-3 text-slate-500 capitalize">{item.type || "Part"}</td>
                      <td className="py-2 px-3 text-right font-mono font-medium text-slate-800">
                        ₹{Number(item.cost).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-3 text-center text-slate-400">
                      Standard service package
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Calculations Breakdown */}
            <div className="bg-slate-50/80 p-3 border-t border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-mono">₹{estimate.subtotal?.toLocaleString()}</span>
              </div>
              {estimate.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Special Promotional Discount</span>
                  <span className="font-mono">-₹{estimate.discount?.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>GST (18% Goods & Services Tax)</span>
                <span className="font-mono">+₹{estimate.tax?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total Estimated Cost</span>
                <span className="font-mono text-blue-700">₹{estimate.total?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {estimate.status === "PENDING" ? (
            <div className="pt-3 grid grid-cols-2 gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleReject}
                className="w-full py-2.5 px-4 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Decline Estimate</span>
              </button>

              <button
                type="button"
                onClick={handleApprove}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve & Authorize Work</span>
              </button>
            </div>
          ) : (
            <div className="pt-2 text-center text-xs">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold ${
                  estimate.status === "APPROVED"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-rose-100 text-rose-800"
                }`}
              >
                Estimate is {estimate.status}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
