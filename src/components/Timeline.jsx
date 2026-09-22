import React from "react";
import { Check, Circle, Clock, AlertTriangle } from "lucide-react";

// The unified pipeline stages
const STAGES = [
  { key: "BOOKED", label: "Booking", subtext: "Service requested" },
  { key: "INSPECTION", label: "Inspection", subtext: "Checked in & diagnosed" },
  { key: "WAITING_APPROVAL", label: "Estimate", subtext: "Cost authorization" },
  { key: "IN_SERVICE", label: "In Service", subtext: "Mechanic repair work" },
  { key: "QUALITY_CHECK", label: "Quality Check", subtext: "Testing & cleaning" },
  { key: "READY", label: "Ready", subtext: "Pickup & billing" },
  { key: "COMPLETED", label: "Completed", subtext: "Delivered to owner" }
];

const STAGE_ORDER = {
  BOOKED: 0,
  CHECKED_IN: 1,
  INSPECTION: 1,
  ESTIMATE_PENDING: 2,
  WAITING_APPROVAL: 2,
  APPROVED: 3,
  ASSIGNED: 3,
  IN_SERVICE: 3,
  QUALITY_CHECK: 4,
  READY: 5,
  COMPLETED: 6,
  REJECTED: 2
};

export default function Timeline({ currentStatus }) {
  const isRejected = currentStatus === "REJECTED";
  const currentIndex = STAGE_ORDER[currentStatus] ?? 0;

  return (
    <div className="w-full py-4">
      {isRejected && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center gap-2 text-sm">
          <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>Estimate was declined. Service work is currently paused.</span>
        </div>
      )}

      {/* Progress Bar and Steps */}
      <div className="relative">
        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between relative z-10">
          {STAGES.map((stage, idx) => {
            const isCompleted = currentIndex > idx;
            const isCurrent = currentIndex === idx;
            const isUpcoming = currentIndex < idx;

            return (
              <div key={stage.key} className="flex flex-col items-center text-center w-28">
                {/* Icon bubble */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-medium transition-all ${
                    isCompleted
                      ? "bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-100"
                      : isCurrent
                      ? "bg-blue-600 text-white shadow-md ring-4 ring-blue-100 animate-pulse"
                      : "bg-slate-100 text-slate-400 border border-slate-300"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <span className="text-xs">{idx + 1}</span>
                  )}
                </div>

                {/* Stage title */}
                <span
                  className={`mt-2 text-xs font-semibold tracking-tight ${
                    isCurrent
                      ? "text-blue-600 font-bold"
                      : isCompleted
                      ? "text-slate-800"
                      : "text-slate-400"
                  }`}
                >
                  {stage.label}
                </span>

                {/* Subtext */}
                <span className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                  {stage.subtext}
                </span>
              </div>
            );
          })}
        </div>

        {/* Desktop Connecting Line */}
        <div className="hidden md:block absolute top-4 left-12 right-12 h-0.5 bg-slate-200 z-0">
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{
              width: `${(Math.min(currentIndex, STAGES.length - 1) / (STAGES.length - 1)) * 100}%`
            }}
          />
        </div>

        {/* Mobile Vertical View */}
        <div className="md:hidden flex flex-col space-y-3 pl-4 border-l-2 border-slate-200">
          {STAGES.map((stage, idx) => {
            const isCompleted = currentIndex > idx;
            const isCurrent = currentIndex === idx;

            return (
              <div key={stage.key} className="relative flex items-start gap-3">
                <div
                  className={`w-6 h-6 -ml-[25px] rounded-full flex items-center justify-center text-xs ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                      ? "bg-blue-600 text-white ring-2 ring-blue-200"
                      : "bg-white text-slate-400 border-2 border-slate-300"
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                </div>
                <div>
                  <p className={`text-xs font-semibold ${isCurrent ? "text-blue-600" : "text-slate-700"}`}>
                    {stage.label} {isCurrent && "— (Current Stage)"}
                  </p>
                  <p className="text-[11px] text-slate-400">{stage.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
