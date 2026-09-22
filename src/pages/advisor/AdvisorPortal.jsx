import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/StatusBadge";
import InspectionModal from "../../components/modals/InspectionModal";
import CreateEstimateModal from "../../components/modals/CreateEstimateModal";
import AssignMechanicModal from "../../components/modals/AssignMechanicModal";
import InvoiceModal from "../../components/modals/InvoiceModal";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  Sparkles,
  FileSearch,
  Calculator,
  UserCheck,
  ShieldCheck,
  Search,
  Filter,
  Car
} from "lucide-react";

export default function AdvisorPortal() {
  const { services, checkInVehicle, approveQualityCheck } = useApp();

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  // Modals state
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  // Filter list
  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === "all") return true;
    if (activeTab === "booked") return s.status === "BOOKED";
    if (activeTab === "inspection") return s.status === "INSPECTION" || s.status === "ESTIMATE_PENDING";
    if (activeTab === "estimate") return s.status === "WAITING_APPROVAL" || s.status === "APPROVED";
    if (activeTab === "active") return s.status === "ASSIGNED" || s.status === "IN_SERVICE";
    if (activeTab === "qc") return s.status === "QUALITY_CHECK";
    if (activeTab === "ready") return s.status === "READY" || s.status === "COMPLETED";
    return true;
  });

  // Action Triggers
  const handleOpenInspection = (service) => {
    setSelectedService(service);
    setIsInspectionOpen(true);
  };

  const handleOpenEstimate = (service) => {
    setSelectedService(service);
    setIsEstimateOpen(true);
  };

  const handleOpenAssign = (service) => {
    setSelectedService(service);
    setIsAssignOpen(true);
  };

  const handleOpenInvoice = (service) => {
    setSelectedService(service);
    setIsInvoiceOpen(true);
  };

  // KPI Counters
  const countBooked = services.filter((s) => s.status === "BOOKED").length;
  const countInspection = services.filter((s) => s.status === "INSPECTION" || s.status === "ESTIMATE_PENDING").length;
  const countApproval = services.filter((s) => s.status === "WAITING_APPROVAL").length;
  const countInService = services.filter((s) => s.status === "IN_SERVICE").length;
  const countQC = services.filter((s) => s.status === "QUALITY_CHECK").length;

  return (
    <div className="space-y-6">
      {/* Advisor Header & KPI cards */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900">Service Advisor Dashboard</h1>
            <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full">
              Workshop Desk
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Check-in arriving vehicles, execute digital multi-point inspections, prepare cost estimates, and manage technician allocation.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <Clock className="w-4 h-4 text-indigo-600" />
          <span>Advisor on Duty: <strong>Vikram Patil</strong></span>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">New Bookings</span>
          <p className="text-xl font-black text-slate-800 mt-1">{countBooked}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">Awaiting Inspection</span>
          <p className="text-xl font-black text-amber-600 mt-1">{countInspection}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">Estimate Approval</span>
          <p className="text-xl font-black text-orange-600 mt-1">{countApproval}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">In Bay Service</span>
          <p className="text-xl font-black text-blue-600 mt-1">{countInService}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">Quality Check (QC)</span>
          <p className="text-xl font-black text-teal-600 mt-1">{countQC}</p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex overflow-x-auto gap-1.5 no-scrollbar">
          {[
            { id: "all", label: "All Vehicles" },
            { id: "booked", label: "Bookings", badge: countBooked },
            { id: "inspection", label: "Inspections", badge: countInspection },
            { id: "estimate", label: "Estimates", badge: countApproval },
            { id: "active", label: "Active Jobs", badge: countInService },
            { id: "qc", label: "Quality Check", badge: countQC },
            { id: "ready", label: "Ready / Paid" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search reg no, customer, model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>
      </div>

      {/* Vehicles Table / Job Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Vehicle & Reg No</th>
                <th className="py-3 px-4">Customer & Phone</th>
                <th className="py-3 px-4">Service Package</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">Assigned Mechanic</th>
                <th className="py-3 px-4 text-right">Workflow Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No vehicle job cards match current filter.
                  </td>
                </tr>
              ) : (
                filteredServices.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition">
                    {/* Vehicle */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                          <Car className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 font-mono">{s.registrationNumber}</p>
                          <p className="text-[11px] text-slate-500">{s.vehicleModel}</p>
                        </div>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{s.customerName}</p>
                      <p className="text-[11px] text-slate-400">{s.phone}</p>
                    </td>

                    {/* Service */}
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-800">{s.serviceType}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[200px]" title={s.problemDescription}>
                        {s.problemDescription}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <StatusBadge status={s.status} size="sm" />
                    </td>

                    {/* Mechanic */}
                    <td className="py-3 px-4">
                      {s.assignedMechanicName ? (
                        <span className="font-medium text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          {s.assignedMechanicName}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">Unassigned</span>
                      )}
                    </td>

                    {/* Dynamic Action Trigger per Step */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      {s.status === "BOOKED" && (
                        <button
                          onClick={() => checkInVehicle(s.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition flex items-center gap-1 ml-auto"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Check In Vehicle</span>
                        </button>
                      )}

                      {s.status === "INSPECTION" && (
                        <button
                          onClick={() => handleOpenInspection(s)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition flex items-center gap-1 ml-auto"
                        >
                          <FileSearch className="w-3.5 h-3.5" />
                          <span>Digital Inspection</span>
                        </button>
                      )}

                      {s.status === "ESTIMATE_PENDING" && (
                        <button
                          onClick={() => handleOpenEstimate(s)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-xs transition flex items-center gap-1 ml-auto"
                        >
                          <Calculator className="w-3.5 h-3.5" />
                          <span>Generate Estimate</span>
                        </button>
                      )}

                      {s.status === "WAITING_APPROVAL" && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-lg">
                          <Clock className="w-3 h-3" />
                          <span>Awaiting Customer Approval</span>
                        </span>
                      )}

                      {s.status === "APPROVED" && (
                        <button
                          onClick={() => handleOpenAssign(s)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-xs transition flex items-center gap-1 ml-auto animate-pulse"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Assign Mechanic (AI)</span>
                        </button>
                      )}

                      {s.status === "ASSIGNED" && (
                        <span className="text-[11px] text-slate-500 italic">
                          Dispatched to {s.assignedMechanicName}
                        </span>
                      )}

                      {s.status === "IN_SERVICE" && (
                        <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                          Work In Progress
                        </span>
                      )}

                      {s.status === "QUALITY_CHECK" && (
                        <button
                          onClick={() => approveQualityCheck(s.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition flex items-center gap-1 ml-auto"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Pass QC & Mark Ready</span>
                        </button>
                      )}

                      {(s.status === "READY" || s.status === "COMPLETED") && (
                        <button
                          onClick={() => handleOpenInvoice(s)}
                          className="px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-lg transition inline-flex items-center gap-1"
                        >
                          <span>Invoice</span>
                        </button>
                      )}

                      {s.status === "REJECTED" && (
                        <span className="text-[11px] text-rose-600 font-semibold">
                          Declined by customer
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedService && (
        <>
          <InspectionModal
            isOpen={isInspectionOpen}
            onClose={() => setIsInspectionOpen(false)}
            service={selectedService}
          />
          <CreateEstimateModal
            isOpen={isEstimateOpen}
            onClose={() => setIsEstimateOpen(false)}
            service={selectedService}
          />
          <AssignMechanicModal
            isOpen={isAssignOpen}
            onClose={() => setIsAssignOpen(false)}
            service={selectedService}
          />
          <InvoiceModal
            isOpen={isInvoiceOpen}
            onClose={() => setIsInvoiceOpen(false)}
            service={selectedService}
          />
        </>
      )}
    </div>
  );
}
