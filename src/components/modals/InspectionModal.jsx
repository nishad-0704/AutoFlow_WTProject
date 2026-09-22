import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, CheckCircle, AlertTriangle, XCircle, ClipboardCheck } from "lucide-react";

export default function InspectionModal({ isOpen, onClose, service }) {
  const { saveInspection } = useApp();

  const [checklist, setChecklist] = useState({
    exterior: {
      frontBumper: "ok",
      rearBumper: "ok",
      leftDoor: "issue",
      rightDoor: "ok"
    },
    engine: {
      engineOil: "issue",
      battery: "ok",
      coolant: "ok"
    },
    brakes: {
      frontBrake: "issue",
      rearBrake: "ok"
    },
    tyres: {
      fl: "ok",
      fr: "issue",
      rl: "ok",
      rr: "ok"
    },
    notes: "Front brake pads worn to ~2.5mm. Engine oil dirty. Front right tyre pressure low."
  });

  if (!isOpen || !service) return null;

  const toggleItem = (category, key) => {
    const current = checklist[category][key];
    const next = current === "ok" ? "issue" : current === "issue" ? "bad" : "ok";
    setChecklist({
      ...checklist,
      [category]: {
        ...checklist[category],
        [key]: next
      }
    });
  };

  const getStatusIcon = (status) => {
    if (status === "ok") return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    if (status === "issue") return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    return <XCircle className="w-4 h-4 text-rose-600" />;
  };

  const getStatusLabel = (status) => {
    if (status === "ok") return "OK";
    if (status === "issue") return "Attention Required";
    return "Damaged / Critical";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveInspection(service.id, checklist);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Digital Multi-Point Inspection</h3>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          <div className="text-xs text-slate-500 bg-blue-50 border border-blue-200 rounded-lg p-3">
            Click any component chip to cycle through status:{" "}
            <span className="font-semibold text-emerald-700">OK (✓)</span> →{" "}
            <span className="font-semibold text-amber-600">Attention (⚠)</span> →{" "}
            <span className="font-semibold text-rose-700">Critical (❌)</span>
          </div>

          {/* Exterior */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Exterior Body & Panels
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(checklist.exterior).map(([key, val]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleItem("exterior", key)}
                  className="flex items-center justify-between p-2 text-xs border rounded-lg hover:border-blue-400 transition bg-slate-50"
                >
                  <span className="capitalize text-slate-700">{key.replace(/([A-Z])/g, " $1")}</span>
                  {getStatusIcon(val)}
                </button>
              ))}
            </div>
          </div>

          {/* Engine & Fluids */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Engine & Fluid Levels
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(checklist.engine).map(([key, val]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleItem("engine", key)}
                  className="flex items-center justify-between p-2 text-xs border rounded-lg hover:border-blue-400 transition bg-slate-50"
                >
                  <span className="capitalize text-slate-700">{key.replace(/([A-Z])/g, " $1")}</span>
                  {getStatusIcon(val)}
                </button>
              ))}
            </div>
          </div>

          {/* Brakes & Tyres */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Braking System
              </h4>
              <div className="space-y-2">
                {Object.entries(checklist.brakes).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleItem("brakes", key)}
                    className="w-full flex items-center justify-between p-2 text-xs border rounded-lg hover:border-blue-400 transition bg-slate-50"
                  >
                    <span className="capitalize text-slate-700">{key.replace(/([A-Z])/g, " $1")}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500">{getStatusLabel(val)}</span>
                      {getStatusIcon(val)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Tyres & Tread Condition
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(checklist.tyres).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleItem("tyres", key)}
                    className="flex items-center justify-between p-2 text-xs border rounded-lg hover:border-blue-400 transition bg-slate-50 uppercase"
                  >
                    <span className="font-semibold text-slate-700">{key}</span>
                    {getStatusIcon(val)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Advisor Diagnosis Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Advisor Diagnostic Summary & Discovered Defects
            </label>
            <textarea
              rows={3}
              value={checklist.notes}
              onChange={(e) => setChecklist({ ...checklist, notes: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Record any wear and tear, parts requiring replacement, or recommended tasks..."
            ></textarea>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Save & Proceed to Estimate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
