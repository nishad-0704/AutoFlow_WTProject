import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Wrench,
  User,
  ClipboardList,
  LayoutDashboard,
  Tv,
  Bell,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Info,
  Car
} from "lucide-react";

export default function Navbar() {
  const { currentRole, setCurrentRole, notifications, resetToDefaults, toast } = useApp();
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const roles = [
    { id: "customer", label: "Customer", icon: User, badge: "Portal" },
    { id: "advisor", label: "Service Advisor", icon: ClipboardList, badge: "Operations" },
    { id: "mechanic", label: "Mechanic", icon: Wrench, badge: "Workshop Bay" },
    { id: "admin", label: "Admin", icon: LayoutDashboard, badge: "Analytics" },
    { id: "liveboard", label: "Live Board", icon: Tv, badge: "Display" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner for academic demo */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200">AutoFlow Prototype</span>
          <span className="text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-400">
            Intelligent Vehicle Service & Workshop Operations Management System
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded transition"
            title="Reset all workshop data back to original seed demo state"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Auto<span className="text-blue-600">Flow</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none">Workshop Digital Twin</p>
            </div>
          </div>

          {/* Role Navigation Switcher (Tabs) */}
          <nav className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            {roles.map((r) => {
              const Icon = r.icon;
              const isActive = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setCurrentRole(r.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Notifications & Current Role Pill */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Live Workshop Events
                    </span>
                    <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {notifications.length} updates
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-center text-xs text-slate-400">No events recorded yet.</p>
                    ) : (
                      notifications.slice(0, 6).map((n) => (
                        <div key={n.id} className="p-3 hover:bg-slate-50 transition flex items-start gap-2.5">
                          {n.type === "success" && <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />}
                          {n.type === "warning" && <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />}
                          {n.type === "alert" && <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />}
                          {n.type === "info" && <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-800 leading-tight">{n.title}</p>
                            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{n.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-3 py-1.5 border-t border-slate-100 text-center">
                    <button
                      onClick={() => setShowNotifMenu(false)}
                      className="text-xs text-blue-600 font-medium hover:underline"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Current Active Role Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>{roles.find((r) => r.id === currentRole)?.label}</span>
            </div>
          </div>
        </div>

        {/* Mobile Role Switcher */}
        <div className="md:hidden flex overflow-x-auto py-2 gap-1.5 border-t border-slate-100 no-scrollbar">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setCurrentRole(r.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold whitespace-nowrap rounded-lg ${
                  isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Toast notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <span className="text-xs font-medium">{toast.message}</span>
        </div>
      )}
    </header>
  );
}
