import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import DemoFlowGuide from "./components/DemoFlowGuide";
import CustomerPortal from "./pages/customer/CustomerPortal";
import AdvisorPortal from "./pages/advisor/AdvisorPortal";
import MechanicPortal from "./pages/mechanic/MechanicPortal";
import AdminDashboard from "./pages/admin/AdminDashboard";
import WorkshopLiveBoard from "./pages/liveboard/WorkshopLiveBoard";
import "./App.css";

function AppContent() {
  const { currentRole } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation & Role Switcher */}
      <Navbar />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Interactive Guide / Viva Walkthrough banner */}
        <DemoFlowGuide />

        {/* Dynamic Role Page */}
        <div className="transition-all duration-200">
          {currentRole === "customer" && <CustomerPortal />}
          {currentRole === "advisor" && <AdvisorPortal />}
          {currentRole === "mechanic" && <MechanicPortal />}
          {currentRole === "admin" && <AdminDashboard />}
          {currentRole === "liveboard" && <WorkshopLiveBoard />}
        </div>
      </main>

      {/* Academic Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">AutoFlow System</span>
            <span>•</span>
            <span>Intelligent Vehicle Service & Workshop Operations Digital Twin</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
              B.Tech Web Technology Project
            </span>
            <span className="text-slate-400">React + Vite + Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
