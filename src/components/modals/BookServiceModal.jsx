import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, Calendar, Clock, Wrench } from "lucide-react";

export default function BookServiceModal({ isOpen, onClose, preselectedVehicleId }) {
  const { vehicles, bookService } = useApp();

  const [vehicleId, setVehicleId] = useState(preselectedVehicleId || (vehicles[0] ? vehicles[0].id : ""));
  const [serviceType, setServiceType] = useState("General Periodic Service (10,000 km)");
  const [preferredDate, setPreferredDate] = useState("2026-09-18");
  const [preferredTime, setPreferredTime] = useState("10:00 AM - 12:00 PM");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vehicleId) {
      alert("Please select a vehicle.");
      return;
    }
    bookService({
      vehicleId,
      serviceType,
      preferredDate,
      preferredTime,
      description: description.trim() || "Regular maintenance and safety inspection requested."
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Book Workshop Service</h3>
              <p className="text-xs text-slate-500">Initiates a real-time service job card</p>
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
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Select Vehicle *
            </label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.brand} {v.model} — {v.registrationNumber} ({v.fuelType})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Service Package / Category *
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="General Periodic Service (10,000 km)">General Periodic Service (10,000 km)</option>
              <option value="Major Service (40,000 km)">Major Service (40,000 km)</option>
              <option value="Brake Inspection & Pad Replacement">Brake Inspection & Pad Replacement</option>
              <option value="AC Cooling Diagnostics & Gas Topup">AC Cooling Diagnostics & Gas Topup</option>
              <option value="Wheel Alignment & Suspension Check">Wheel Alignment & Suspension Check</option>
              <option value="Engine Diagnostics & Oil Change">Engine Diagnostics & Oil Change</option>
              <option value="Custom Repair / Issue Investigation">Custom Repair / Issue Investigation</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Time Slot
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Vehicle Complaints / Specific Notes
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Squeaking sound when applying brakes, check cabin air filter..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              <Wrench className="w-4 h-4" />
              <span>Confirm Booking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
