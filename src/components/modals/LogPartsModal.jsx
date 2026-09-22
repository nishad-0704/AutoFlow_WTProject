import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, Package, PlusCircle, AlertCircle } from "lucide-react";

export default function LogPartsModal({ isOpen, onClose, service }) {
  const { inventory, logPartsUsed } = useApp();
  const [selectedPartId, setSelectedPartId] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !service) return null;

  const selectedPart = inventory.find((p) => p.id === selectedPartId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPartId) {
      alert("Please select a spare part.");
      return;
    }
    const success = logPartsUsed(service.id, selectedPartId, Number(quantity));
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Record Consumed Part</h3>
              <p className="text-xs text-slate-500">
                {service.registrationNumber} • Job Card #{service.id}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
            Selecting and recording a part automatically consumes it from workshop inventory and adds it to the job card log.
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Select Spare Part *
            </label>
            <select
              value={selectedPartId}
              onChange={(e) => setSelectedPartId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="">-- Choose part from workshop shelf --</option>
              {inventory.map((part) => (
                <option key={part.id} value={part.id} disabled={part.quantity <= 0}>
                  {part.name} (Stock: {part.quantity}) — ₹{part.unitPrice}
                </option>
              ))}
            </select>
          </div>

          {selectedPart && (
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Part Number:</span>
                <span className="font-mono font-semibold text-slate-800">{selectedPart.partNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Available Stock:</span>
                <span
                  className={`font-semibold ${
                    selectedPart.quantity <= selectedPart.minimumStock ? "text-amber-600" : "text-emerald-700"
                  }`}
                >
                  {selectedPart.quantity} units {selectedPart.quantity <= selectedPart.minimumStock && "(Low Stock)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Unit Price:</span>
                <span className="font-mono font-semibold text-slate-800">₹{selectedPart.unitPrice.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Quantity Consumed
            </label>
            <input
              type="number"
              min="1"
              max={selectedPart ? selectedPart.quantity : 10}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record Part Consumption</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
