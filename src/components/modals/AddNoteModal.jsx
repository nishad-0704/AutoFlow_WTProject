import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, MessageSquare, Send } from "lucide-react";

export default function AddNoteModal({ isOpen, onClose, service }) {
  const { addServiceNote, currentRole } = useApp();
  const [note, setNote] = useState("");

  if (!isOpen || !service) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    addServiceNote(service.id, note.trim(), currentRole);
    setNote("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Add Service Log Note</h3>
              <p className="text-xs text-slate-500">{service.registrationNumber}</p>
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
              Note Description *
            </label>
            <textarea
              rows={4}
              required
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Engine oil drained cleanly, new oil filter torqued to OEM specification..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
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
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Post to Job Card</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
