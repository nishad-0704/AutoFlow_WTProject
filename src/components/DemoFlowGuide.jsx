import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ArrowRight,
  Sparkles,
  CheckCircle,
  PlayCircle
} from "lucide-react";

export default function DemoFlowGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentRole } = useApp();

  const steps = [
    {
      role: "customer",
      roleLabel: "Customer Portal",
      action: "Book a new service or review and approve an estimate (e.g. for MH 31 CD 9012)."
    },
    {
      role: "advisor",
      roleLabel: "Service Advisor",
      action: "Check in vehicle, run digital multi-point inspection, generate estimate, or assign a technician using the AI recommendation engine."
    },
    {
      role: "mechanic",
      roleLabel: "Mechanic Bay",
      action: "Start job (marks vehicle 'In Service'), consume spare parts (auto-deducts inventory), add notes, and finish service."
    },
    {
      role: "advisor",
      roleLabel: "Quality Check",
      action: "Pass quality inspection to transition vehicle status to 'Ready for Pickup' and generate final invoice."
    },
    {
      role: "customer",
      roleLabel: "Payment & Completion",
      action: "Simulate UPI/Card payment to mark service complete and archive to history."
    },
    {
      role: "liveboard",
      roleLabel: "Workshop Live Board",
      action: "View all vehicle job cards organized across floor stages on a digital twin Kanban board."
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/80 rounded-2xl p-4 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
            <PlayCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Interactive Project Presentation Guide
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                B.Tech Web Technology
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Demonstrates real-time state synchronization across Customer, Advisor, Mechanic, and Admin portals.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-semibold text-blue-700 hover:text-blue-900 bg-white border border-blue-200 px-3 py-1.5 rounded-lg flex items-center gap-1 transition shadow-2xs"
        >
          <span>{isOpen ? "Hide Steps" : "View Demo Flow"}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 pt-3 border-t border-blue-200/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs text-xs space-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Step {idx + 1}</span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {step.roleLabel}
                  </span>
                </div>
                <p className="text-slate-700 text-[11px] mt-1">{step.action}</p>
              </div>

              <button
                type="button"
                onClick={() => setCurrentRole(step.role)}
                className="mt-2 text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start"
              >
                <span>Switch to {step.roleLabel}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
