import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/StatusBadge";
import LogPartsModal from "../../components/modals/LogPartsModal";
import AddNoteModal from "../../components/modals/AddNoteModal";
import {
  Wrench,
  Play,
  CheckCircle2,
  Package,
  MessageSquare,
  AlertCircle,
  Car,
  Clock,
  CheckCheck,
  ChevronRight,
  User
} from "lucide-react";

export default function MechanicPortal() {
  const { mechanics, services, startService, completeService } = useApp();

  const [activeMechanicId, setActiveMechanicId] = useState("mech-1");
  const [selectedService, setSelectedService] = useState(null);
  const [isLogPartsOpen, setIsLogPartsOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  const currentMechanic =
    mechanics.find((m) => m.id === activeMechanicId) || mechanics[0];

  // Jobs assigned to this mechanic
  const assignedServices = services.filter(
    (s) => s.assignedMechanicId === currentMechanic?.id
  );

  const activeJobs = assignedServices.filter(
    (s) => s.status === "ASSIGNED" || s.status === "IN_SERVICE"
  );
  const completedJobs = assignedServices.filter(
    (s) => s.status === "QUALITY_CHECK" || s.status === "READY" || s.status === "COMPLETED"
  );

  const handleOpenParts = (service) => {
    setSelectedService(service);
    setIsLogPartsOpen(true);
  };

  const handleOpenNote = (service) => {
    setSelectedService(service);
    setIsAddNoteOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Mechanic Header & Profile Switcher */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900">Mechanic Bay Terminal</h1>
            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
              Bay Operations
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Log parts consumption, document technician progress notes, and execute service job cards.
          </p>
        </div>

        {/* Mechanic Quick Selector */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 rounded-xl text-xs">
          <User className="w-4 h-4 text-blue-600 ml-1.5" />
          <span className="font-semibold text-slate-700">Technician:</span>
          <select
            value={activeMechanicId}
            onChange={(e) => setActiveMechanicId(e.target.value)}
            className="px-2.5 py-1 text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mechanics.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.specialization}) — {m.currentWorkload} jobs
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Technician Stat Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">Active In-Bay Jobs</span>
            <p className="text-2xl font-black text-blue-600 mt-1">{activeJobs.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Wrench className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">Specialization</span>
            <p className="text-sm font-bold text-slate-800 mt-1">{currentMechanic?.specialization}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <span className="text-xs font-mono">{currentMechanic?.experienceYears}y</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase">Jobs Cleared Today</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">{completedJobs.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Assigned Active Job Cards */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Active Job Cards Assigned ({activeJobs.length})
        </h2>

        {activeJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
            <Wrench className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="font-semibold text-sm">No active vehicles assigned right now.</p>
            <p className="text-xs text-slate-400 mt-1">
              Switch technician profile or check with Service Advisor for new job dispatches.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold font-mono text-slate-900">
                          {job.registrationNumber}
                        </span>
                        <StatusBadge status={job.status} size="sm" />
                      </div>
                      <p className="text-xs text-slate-500">
                        {job.vehicleModel} • Owner: {job.customerName} ({job.phone})
                      </p>
                    </div>
                  </div>

                  {/* Top Action Button */}
                  {job.status === "ASSIGNED" && (
                    <button
                      onClick={() => startService(job.id)}
                      className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition flex items-center gap-2 animate-pulse"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Start Vehicle Service</span>
                    </button>
                  )}

                  {job.status === "IN_SERVICE" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenParts(job)}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition flex items-center gap-1.5"
                      >
                        <Package className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Record Parts Used</span>
                      </button>

                      <button
                        onClick={() => handleOpenNote(job)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                        <span>Add Note</span>
                      </button>

                      <button
                        onClick={() => completeService(job.id)}
                        className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Complete Service & Submit QC</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Body details */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  {/* Complaint & Diagnostic Findings */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px]">
                        Customer Reported Issue
                      </span>
                      <p className="font-semibold text-slate-800 mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        {job.problemDescription}
                      </p>
                    </div>

                    {job.inspection?.notes && (
                      <div>
                        <span className="text-slate-400 font-bold uppercase text-[10px]">
                          Advisor Inspection Findings
                        </span>
                        <p className="text-amber-800 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200 mt-1">
                          {job.inspection.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Consumed Parts for this vehicle */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">
                        Parts Consumed for this Job
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {job.partsUsed?.length || 0} parts recorded
                      </span>
                    </div>

                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      {job.partsUsed && job.partsUsed.length > 0 ? (
                        <div className="divide-y divide-slate-100 max-h-36 overflow-y-auto">
                          {job.partsUsed.map((p, idx) => (
                            <div key={idx} className="p-2.5 flex items-center justify-between bg-white">
                              <span className="font-medium text-slate-800">{p.name}</span>
                              <span className="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                                Qty: {p.quantity} (₹{p.price * p.quantity})
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-slate-400 text-xs">
                          No parts logged yet. Click "Record Parts Used" when replacing components.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recent notes preview */}
                {job.serviceNotes && job.serviceNotes.length > 0 && (
                  <div className="px-5 pb-4 border-t border-slate-100 pt-3 text-xs">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1.5">
                      Recent Activity Note
                    </span>
                    <p className="text-slate-600 italic">
                      "{job.serviceNotes[job.serviceNotes.length - 1]?.author}:{" "}
                      {job.serviceNotes[job.serviceNotes.length - 1]?.text}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedService && (
        <>
          <LogPartsModal
            isOpen={isLogPartsOpen}
            onClose={() => setIsLogPartsOpen(false)}
            service={selectedService}
          />
          <AddNoteModal
            isOpen={isAddNoteOpen}
            onClose={() => setIsAddNoteOpen(false)}
            service={selectedService}
          />
        </>
      )}
    </div>
  );
}
