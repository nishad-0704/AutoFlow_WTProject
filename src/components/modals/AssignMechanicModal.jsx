import React from "react";
import { useApp } from "../../context/AppContext";
import { X, Sparkles, UserCheck, ShieldCheck, Check, Star } from "lucide-react";

export default function AssignMechanicModal({ isOpen, onClose, service }) {
  const { mechanics, assignMechanic } = useApp();

  if (!isOpen || !service) return null;

  // Calculate Smart Recommendation Score based on Section 22.2
  // Score = specialization * 0.5 + availability * 0.3 + workload * 0.2
  const scoredMechanics = mechanics.map((m) => {
    let specMatch = 0.5; // Baseline
    const serviceText = (
      (service.serviceType || "") + " " + (service.problemDescription || "")
    ).toLowerCase();

    if (
      (m.specialization.toLowerCase().includes("brake") && serviceText.includes("brake")) ||
      (m.specialization.toLowerCase().includes("ac") && (serviceText.includes("ac") || serviceText.includes("air"))) ||
      (m.specialization.toLowerCase().includes("engine") && (serviceText.includes("oil") || serviceText.includes("engine"))) ||
      (m.specialization.toLowerCase().includes("general") && serviceText.includes("periodic"))
    ) {
      specMatch = 1.0;
    }

    const availScore = m.available ? 1.0 : 0.2;
    // Workload: 0 active jobs = 1.0, 1 active job = 0.7, 2 active jobs = 0.4, 3+ = 0.1
    const workloadScore = Math.max(0.1, 1.0 - m.currentWorkload * 0.3);

    const totalScore = specMatch * 0.5 + availScore * 0.3 + workloadScore * 0.2;
    const matchPercentage = Math.round(totalScore * 100);

    return {
      ...m,
      specMatch,
      availScore,
      workloadScore,
      totalScore,
      matchPercentage
    };
  });

  // Sort by highest score first
  scoredMechanics.sort((a, b) => b.totalScore - a.totalScore);
  const bestMatch = scoredMechanics[0];

  const handleAssign = (mechId) => {
    assignMechanic(service.id, mechId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Assign Workshop Mechanic</h3>
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Smart AI Assignment Explanation Card */}
          <div className="p-3.5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>AI Smart Allocation Engine Active</span>
            </div>
            <p className="text-[11px] text-purple-700 mt-1 leading-relaxed">
              Mechanics scored by: <span className="font-semibold">Specialization (50%)</span> +{" "}
              <span className="font-semibold">Availability (30%)</span> +{" "}
              <span className="font-semibold">Workload Balance (20%)</span>.
            </p>
          </div>

          {/* Mechanic list */}
          <div className="space-y-2.5">
            {scoredMechanics.map((m, idx) => {
              const isBest = idx === 0;

              return (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isBest
                      ? "border-purple-300 bg-purple-50/40 shadow-xs"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-800">{m.name}</span>
                        {isBest && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-600 text-white rounded-full flex items-center gap-1 shadow-xs">
                            <Sparkles className="w-3 h-3" />
                            Best AI Match ({m.matchPercentage}%)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        <span className="font-medium text-slate-700">{m.specialization}</span> • {m.experienceYears} yrs exp
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAssign(m.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1 ${
                        isBest
                          ? "bg-purple-600 hover:bg-purple-700 text-white shadow-xs"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Assign</span>
                    </button>
                  </div>

                  {/* Badges / Metrics */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <span
                          className={`w-2 h-2 rounded-full ${m.available ? "bg-emerald-500" : "bg-amber-500"}`}
                        />
                        {m.available ? "Available" : "In Bay"}
                      </span>
                      <span>
                        Active Jobs: <strong className="text-slate-700">{m.currentWorkload}</strong>
                      </span>
                      <span className="flex items-center gap-1 text-amber-600">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {m.rating}
                      </span>
                    </div>

                    <span className="text-[10px] text-purple-700 font-mono">
                      Match: {m.matchPercentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
