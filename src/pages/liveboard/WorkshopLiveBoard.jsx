import React from "react";
import { useApp } from "../../context/AppContext";
import {
  Tv,
  Clock,
  Car,
  CheckCircle2,
  Wrench,
  ShieldCheck,
  CheckCheck,
  AlertCircle
} from "lucide-react";

export default function WorkshopLiveBoard() {
  const { services } = useApp();

  // Kanban Columns matching section 23
  const columns = [
    {
      id: "checkin",
      title: "CHECK-IN",
      subtitle: "Arrival & Reception",
      color: "border-indigo-400 bg-indigo-50/50 text-indigo-800",
      filter: (s) => s.status === "BOOKED" || s.status === "CHECKED_IN"
    },
    {
      id: "inspection",
      title: "INSPECTION",
      subtitle: "Diagnostics & Approval",
      color: "border-amber-400 bg-amber-50/50 text-amber-800",
      filter: (s) =>
        s.status === "INSPECTION" ||
        s.status === "ESTIMATE_PENDING" ||
        s.status === "WAITING_APPROVAL" ||
        s.status === "APPROVED"
    },
    {
      id: "service",
      title: "IN SERVICE",
      subtitle: "Mechanic Bay Work",
      color: "border-blue-500 bg-blue-50/50 text-blue-800",
      filter: (s) => s.status === "ASSIGNED" || s.status === "IN_SERVICE"
    },
    {
      id: "qc",
      title: "QUALITY CHECK",
      subtitle: "Testing & Clean Bay",
      color: "border-teal-400 bg-teal-50/50 text-teal-800",
      filter: (s) => s.status === "QUALITY_CHECK"
    },
    {
      id: "ready",
      title: "READY FOR PICKUP",
      subtitle: "Delivered / Paid",
      color: "border-emerald-400 bg-emerald-50/50 text-emerald-800",
      filter: (s) => s.status === "READY" || s.status === "COMPLETED"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Board Header styled like digital workshop screen */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-wider uppercase text-white">
                AUTOFLOW LIVE WORKSHOP BOARD
              </h1>
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                LIVE SYNC
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Real-time digital twin bay status broadcast for floor technicians and customer lounge.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
          <div>
            Total Active Bays: <span className="text-white font-bold">{services.length}</span>
          </div>
          <div className="hidden sm:block">|</div>
          <div>
            Clock: <span className="text-emerald-400 font-bold">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* 5 Column Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {columns.map((col) => {
          const colServices = services.filter(col.filter);

          return (
            <div
              key={col.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden"
            >
              {/* Column Header */}
              <div className={`p-3.5 border-b border-slate-200 text-center ${col.color}`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-black tracking-wider">{col.title}</h2>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/70 shadow-2xs">
                    {colServices.length}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 text-left mt-0.5">{col.subtitle}</p>
              </div>

              {/* Column Cards */}
              <div className="p-3 flex-1 space-y-3 bg-slate-50/50 min-h-[350px] overflow-y-auto">
                {colServices.length === 0 ? (
                  <div className="h-32 flex items-center justify-center text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    No vehicles in this stage
                  </div>
                ) : (
                  colServices.map((s) => (
                    <div
                      key={s.id}
                      className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2 hover:border-slate-300 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {s.registrationNumber}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          #{s.id.replace("srv-", "")}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-800">{s.customerName}</p>
                        <p className="text-[11px] text-slate-500 leading-tight">{s.vehicleModel}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        {s.assignedMechanicName ? (
                          <span className="text-blue-700 font-semibold flex items-center gap-1">
                            <Wrench className="w-3 h-3 text-blue-600" />
                            {s.assignedMechanicName.split(" ")[0]}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic text-[10px]">Unassigned</span>
                        )}

                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {s.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
