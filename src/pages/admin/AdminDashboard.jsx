import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/StatusBadge";
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Users,
  AlertTriangle,
  IndianRupee,
  Car,
  CheckCircle,
  Clock,
  Plus,
  RefreshCw,
  Search,
  Activity
} from "lucide-react";

export default function AdminDashboard() {
  const { services, inventory, mechanics, restockPart } = useApp();
  const [inventorySearch, setInventorySearch] = useState("");

  // KPI Calculations
  const totalVehicles = services.length;
  const inServiceVehicles = services.filter((s) => s.status === "IN_SERVICE" || s.status === "ASSIGNED").length;
  const completedServices = services.filter((s) => s.status === "COMPLETED" || s.status === "READY");
  
  // Total Revenue from invoices
  const totalRevenue = services.reduce((sum, s) => {
    if (s.invoice) return sum + Number(s.invoice.total || 0);
    return sum;
  }, 0);

  // Low stock inventory items
  const lowStockItems = inventory.filter((p) => p.quantity <= p.minimumStock);

  // Workshop Utilization %
  const totalBays = 4;
  const workshopUtilization = Math.min(100, Math.round((inServiceVehicles / totalBays) * 100));

  // Filtered inventory
  const filteredInventory = inventory.filter(
    (p) =>
      p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.partNumber.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.category.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900">Workshop Administrator & Analytics</h1>
            <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
              Executive Dashboard
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational digital twin metrics, spare parts inventory thresholds, mechanic workloads, and revenue analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>Workshop Status: <strong>Operating (Online)</strong></span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Gross Revenue</span>
            <p className="text-2xl font-black text-slate-900 mt-1 font-mono">
              ₹{totalRevenue.toLocaleString()}
            </p>
            <span className="text-[11px] text-emerald-600 font-medium">
              Invoiced & In-progress Jobs
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <IndianRupee className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Bay Utilization</span>
            <p className="text-2xl font-black text-blue-600 mt-1">{workshopUtilization}%</p>
            <span className="text-[11px] text-slate-500 font-medium">
              {inServiceVehicles} of {totalBays} Bays Active
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Vehicles In Pipeline</span>
            <p className="text-2xl font-black text-slate-800 mt-1">{totalVehicles}</p>
            <span className="text-[11px] text-slate-500 font-medium">
              {completedServices.length} Completed / Ready
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Car className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Inventory Stock Alerts</span>
            <p className="text-2xl font-black text-amber-600 mt-1">{lowStockItems.length}</p>
            <span className="text-[11px] text-amber-700 font-medium">
              {lowStockItems.length > 0 ? "Items Below Safety Limit" : "Stock Normal"}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Package className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Analytics & Technician Workload Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Parts & Inventory Control (Section 18) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Spare Parts & Inventory Management
                </h2>
                {lowStockItems.length > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full">
                    {lowStockItems.length} Low Stock
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Automated stock deduction when mechanics fit parts to vehicles.
              </p>
            </div>

            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search spare parts..."
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Part Name & ID</th>
                  <th className="p-3">Category</th>
                  <th className="p-3 text-center">In Stock</th>
                  <th className="p-3 text-center">Min Threshold</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInventory.map((part) => {
                  const isLowStock = part.quantity <= part.minimumStock;
                  return (
                    <tr
                      key={part.id}
                      className={`hover:bg-slate-50/70 transition ${
                        isLowStock ? "bg-amber-50/40" : ""
                      }`}
                    >
                      <td className="p-3 font-medium text-slate-900">
                        <p>{part.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{part.partNumber}</p>
                      </td>
                      <td className="p-3 text-slate-500">{part.category}</td>
                      <td className="p-3 text-center font-mono font-bold">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${
                            isLowStock
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {isLowStock && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                          {part.quantity}
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono text-slate-500">
                        {part.minimumStock}
                      </td>
                      <td className="p-3 text-right font-mono font-semibold text-slate-800">
                        ₹{part.unitPrice.toLocaleString()}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => restockPart(part.id, 10)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-lg transition inline-flex items-center gap-1"
                          title="Add 10 units to inventory stock"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Restock (+10)</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Mechanic Team & Workload Overview */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Mechanic Team & Live Workload
              </h3>
              <span className="text-[11px] text-slate-400">{mechanics.length} Active Staff</span>
            </div>

            <div className="space-y-3">
              {mechanics.map((m) => (
                <div key={m.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">{m.name}</p>
                      <p className="text-[11px] text-slate-500">{m.specialization}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        m.currentWorkload > 0
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {m.currentWorkload > 0 ? `${m.currentWorkload} In-Bay` : "Ready"}
                    </span>
                  </div>

                  {/* Workload bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Workload Capacity</span>
                      <span>{Math.min(100, m.currentWorkload * 33)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          m.currentWorkload >= 2 ? "bg-amber-500" : "bg-blue-600"
                        }`}
                        style={{ width: `${Math.min(100, m.currentWorkload * 33)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Architecture / B.Tech Project Note */}
          <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl text-xs space-y-2 text-slate-600">
            <h4 className="font-bold text-slate-800">AutoFlow System Architecture</h4>
            <p className="text-[11px] leading-relaxed">
              Demonstrates a unified real-time vehicle servicing digital twin. State synchronizes across
              Customer, Advisor, Mechanic, and Admin portals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
