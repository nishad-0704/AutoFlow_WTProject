import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, Plus, Trash2, Calculator, Send } from "lucide-react";

export default function CreateEstimateModal({ isOpen, onClose, service }) {
  const { inventory, createEstimate } = useApp();

  const [items, setItems] = useState([
    { desc: "Synthetic Engine Oil 5W-40 (4L)", cost: 3500, type: "part" },
    { desc: "Premium Oil Filter", cost: 800, type: "part" },
    { desc: "Front Ceramic Brake Pads", cost: 2800, type: "part" },
    { desc: "General Labor & Inspection Charge", cost: 1500, type: "labor" }
  ]);

  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemCost, setNewItemCost] = useState("");
  const [newItemType, setNewItemType] = useState("part");
  const [discount, setDiscount] = useState(0);

  if (!isOpen || !service) return null;

  const addItem = () => {
    if (!newItemDesc || !newItemCost) return;
    setItems([...items, { desc: newItemDesc, cost: Number(newItemCost), type: newItemType }]);
    setNewItemDesc("");
    setNewItemCost("");
  };

  const removeItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleSelectInventoryPart = (e) => {
    const partId = e.target.value;
    if (!partId) return;
    const part = inventory.find((p) => p.id === partId);
    if (part) {
      setItems([...items, { desc: part.name, cost: part.unitPrice, type: "part" }]);
    }
  };

  const subtotal = items.reduce((acc, curr) => acc + Number(curr.cost || 0), 0);
  const tax = Math.round((subtotal - Number(discount || 0)) * 0.18);
  const total = subtotal - Number(discount || 0) + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Please include at least one item in the estimate.");
      return;
    }
    createEstimate(service.id, items, discount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Generate Service Estimate</h3>
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

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Quick Add from Inventory */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Quick-Add from Parts Inventory
            </label>
            <select
              onChange={handleSelectInventoryPart}
              defaultValue=""
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="" disabled>
                -- Select part to add to estimate --
              </option>
              {inventory.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ₹{p.unitPrice.toLocaleString()} (Stock: {p.quantity})
                </option>
              ))}
            </select>
          </div>

          {/* Add custom item */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Add Custom Part or Labor Item
            </span>
            <div className="grid grid-cols-12 gap-2">
              <input
                type="text"
                placeholder="Item name / labor job"
                value={newItemDesc}
                onChange={(e) => setNewItemDesc(e.target.value)}
                className="col-span-6 px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
              />
              <input
                type="number"
                placeholder="Cost (₹)"
                value={newItemCost}
                onChange={(e) => setNewItemCost(e.target.value)}
                className="col-span-3 px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
              />
              <button
                type="button"
                onClick={addItem}
                className="col-span-3 px-2 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Description</th>
                  <th className="p-2.5">Type</th>
                  <th className="p-2.5 text-right">Cost (₹)</th>
                  <th className="p-2.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-2.5 font-medium text-slate-800">{item.desc}</td>
                    <td className="p-2.5 text-slate-500 capitalize">{item.type}</td>
                    <td className="p-2.5 text-right font-mono font-medium">₹{Number(item.cost).toLocaleString()}</td>
                    <td className="p-2.5 text-center">
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Calculations */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Discount (₹):</span>
                <input
                  type="number"
                  min="0"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-24 text-right px-2 py-0.5 border border-slate-300 rounded font-mono text-xs bg-white"
                />
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (18%):</span>
                <span className="font-mono">+₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total Estimated Cost:</span>
                <span className="font-mono text-blue-700">₹{total.toLocaleString()}</span>
              </div>
            </div>
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
              className="px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Send to Customer for Approval</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
