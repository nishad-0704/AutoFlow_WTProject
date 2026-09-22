import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/StatusBadge";
import Timeline from "../../components/Timeline";
import AddVehicleModal from "../../components/modals/AddVehicleModal";
import BookServiceModal from "../../components/modals/BookServiceModal";
import EstimateApprovalModal from "../../components/modals/EstimateApprovalModal";
import InvoiceModal from "../../components/modals/InvoiceModal";
import {
  Car,
  Plus,
  Calendar,
  Sparkles,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Phone,
  ChevronRight,
  ShieldAlert,
  Wrench
} from "lucide-react";

export default function CustomerPortal() {
  const {
    vehicles,
    services,
    selectedVehicleId,
    setSelectedVehicleId
  } = useApp();

  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isBookServiceOpen, setIsBookServiceOpen] = useState(false);
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  // Selected vehicle
  const currentVehicle =
    vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0] || null;

  // Active or latest service for this vehicle
  const activeService = services.find(
    (s) => s.vehicleId === currentVehicle?.id && s.status !== "COMPLETED"
  ) || services.find((s) => s.vehicleId === currentVehicle?.id) || null;

  // Past completed services
  const pastServices = services.filter(
    (s) => s.vehicleId === currentVehicle?.id && s.status === "COMPLETED"
  );

  return (
    <div className="space-y-6">
      {/* Top Welcome & Vehicle Selector Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900">
              Welcome back, {currentVehicle?.customerName || "Rahul Sharma"}
            </h1>
            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
              Customer Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor live workshop progress, authorize estimates, and track maintenance history.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAddVehicleOpen(true)}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Vehicle</span>
          </button>
          <button
            onClick={() => setIsBookServiceOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book New Service</span>
          </button>
        </div>
      </div>

      {/* Vehicle Switcher Tabs */}
      <div className="flex overflow-x-auto gap-3 pb-1 no-scrollbar">
        {vehicles.map((veh) => {
          const isSelected = veh.id === currentVehicle?.id;
          const hasActiveService = services.some(
            (s) => s.vehicleId === veh.id && s.status !== "COMPLETED"
          );

          return (
            <button
              key={veh.id}
              onClick={() => setSelectedVehicleId(veh.id)}
              className={`flex-shrink-0 text-left p-3.5 rounded-xl border transition-all min-w-[200px] ${
                isSelected
                  ? "bg-blue-50/70 border-blue-400 shadow-xs ring-2 ring-blue-100"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 font-mono">
                  {veh.registrationNumber}
                </span>
                {hasActiveService && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                )}
              </div>
              <p className="text-xs text-slate-600 font-medium mt-1">
                {veh.brand} {veh.model} ({veh.year})
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                <span>{veh.fuelType}</span>
                <span>{veh.odometer?.toLocaleString()} km</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Active Service Progress & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Service Status & Journey */}
        <div className="lg:col-span-2 space-y-6">
          {activeService ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Card Header */}
              <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900">
                      Live Vehicle Service Tracker
                    </h2>
                    <StatusBadge status={activeService.status} size="sm" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Job Card #{activeService.id} • {activeService.serviceType}
                  </p>
                </div>

                {/* Status-specific Call to Action */}
                {activeService.status === "WAITING_APPROVAL" && (
                  <button
                    onClick={() => setIsEstimateOpen(true)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-xs flex items-center gap-1.5 animate-bounce"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Review & Approve Estimate</span>
                  </button>
                )}

                {activeService.status === "READY" && (
                  <button
                    onClick={() => setIsInvoiceOpen(true)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs flex items-center gap-1.5"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>View & Pay Invoice</span>
                  </button>
                )}
              </div>

              {/* Progress Stepper Timeline */}
              <div className="p-5 border-b border-slate-100">
                <Timeline currentStatus={activeService.status} />
              </div>

              {/* Active Service Details & Metadata */}
              <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                    Service Advisor
                  </span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {activeService.advisorName || "Vikram Patil"}
                  </p>
                  <p className="text-slate-500 text-[11px]">Primary Workshop Point of Contact</p>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                    Assigned Technician
                  </span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {activeService.assignedMechanicName || "Pending allocation"}
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    {activeService.assignedMechanicName
                      ? "Certified Bay Mechanic"
                      : "Will be assigned upon approval"}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                    Estimated Cost
                  </span>
                  <p className="font-semibold text-blue-700 font-mono text-sm mt-0.5">
                    {activeService.estimate
                      ? `₹${activeService.estimate.total?.toLocaleString()}`
                      : "Under assessment"}
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    {activeService.estimate?.status || "Pending digital inspection"}
                  </p>
                </div>
              </div>

              {/* Digital Inspection Report preview */}
              {activeService.inspection && (
                <div className="p-5 border-b border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Digital Multi-Point Inspection Summary
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Advisor Inspection Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                      <span className="text-slate-400 text-[10px] block uppercase">Exterior</span>
                      <span className="font-medium text-slate-700">Left Door Minor Scratch</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                      <span className="text-slate-400 text-[10px] block uppercase">Engine Oil</span>
                      <span className="font-medium text-amber-700">Dark / Degradation</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                      <span className="text-slate-400 text-[10px] block uppercase">Brakes</span>
                      <span className="font-medium text-rose-700">Pads Worn (Front)</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                      <span className="text-slate-400 text-[10px] block uppercase">Tyres</span>
                      <span className="font-medium text-emerald-700">3.8mm Tread (Safe)</span>
                    </div>
                  </div>

                  {activeService.inspection.notes && (
                    <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-amber-900">
                      <span className="font-bold">Advisor Note: </span>
                      {activeService.inspection.notes}
                    </div>
                  )}
                </div>
              )}

              {/* Live Service Notes Feed */}
              <div className="p-5 space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Live Service Activity Logs
                </h3>
                <div className="space-y-2">
                  {activeService.serviceNotes?.map((n, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-3 text-xs"
                    >
                      <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">{n.author}</span>
                          <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-600 mt-0.5">{n.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No Active Service Job</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your vehicle {currentVehicle?.registrationNumber} currently does not have an active workshop service card.
              </p>
              <button
                onClick={() => setIsBookServiceOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition"
              >
                Schedule Service Now
              </button>
            </div>
          )}

          {/* Past Service History */}
          {pastServices.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Completed Service Records ({pastServices.length})
              </h3>
              <div className="divide-y divide-slate-100">
                {pastServices.map((past) => (
                  <div key={past.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-800">{past.serviceType}</p>
                      <p className="text-slate-400 text-[11px]">{past.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-semibold text-slate-700">
                        ₹{past.invoice?.total?.toLocaleString() || "Paid"}
                      </span>
                      <button
                        onClick={() => setIsInvoiceOpen(true)}
                        className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: AI Maintenance Insight & Quick Stats */}
        <div className="space-y-6">
          {/* AI Maintenance Insight (Document Section 22.1) */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-5 rounded-2xl shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span className="text-xs font-bold tracking-wider uppercase text-cyan-200">
                  AI Maintenance Insight
                </span>
              </div>
              <span className="text-[10px] bg-cyan-400/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-400/30">
                Predictive Model
              </span>
            </div>

            {currentVehicle?.aiInsight ? (
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {currentVehicle.aiInsight.recommendation}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-400 h-full rounded-full"
                        style={{ width: `${currentVehicle.aiInsight.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-cyan-300">
                      {currentVehicle.aiInsight.confidence}% Confidence
                    </span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-xs space-y-1.5">
                  <p className="text-slate-300">
                    <strong className="text-white">Reason: </strong>
                    {currentVehicle.aiInsight.reason}
                  </p>
                  <p className="text-cyan-200 font-medium">
                    <strong className="text-white">Recommended Action: </strong>
                    {currentVehicle.aiInsight.action}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-300 space-y-2">
                <p>Vehicle telemetry and past service logs analyzed.</p>
                <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                  All monitored systems operating within optimal mechanical tolerance.
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Next Service at: {(currentVehicle?.odometer + 10000).toLocaleString()} km</span>
              <span>Synthetic AI v2.4</span>
            </div>
          </div>

          {/* Workshop Support & Help Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Assigned Workshop Desk
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                VP
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Vikram Patil</p>
                <p className="text-[11px] text-slate-500">Chief Service Advisor</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Direct Workshop Desk:</span>
              <a href="tel:+919876543210" className="font-semibold text-blue-600 hover:underline">
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddVehicleModal
        isOpen={isAddVehicleOpen}
        onClose={() => setIsAddVehicleOpen(false)}
      />
      <BookServiceModal
        isOpen={isBookServiceOpen}
        onClose={() => setIsBookServiceOpen(false)}
        preselectedVehicleId={currentVehicle?.id}
      />
      {activeService && (
        <>
          <EstimateApprovalModal
            isOpen={isEstimateOpen}
            onClose={() => setIsEstimateOpen(false)}
            service={activeService}
          />
          <InvoiceModal
            isOpen={isInvoiceOpen}
            onClose={() => setIsInvoiceOpen(false)}
            service={activeService}
          />
        </>
      )}
    </div>
  );
}
