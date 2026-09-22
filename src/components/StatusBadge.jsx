import React from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Wrench,
  ShieldCheck,
  CheckCheck,
  XCircle,
  FileSearch,
  UserCheck
} from "lucide-react";

export const getStatusConfig = (status) => {
  switch (status) {
    case "BOOKED":
      return {
        label: "Booked",
        bg: "bg-blue-50 text-blue-700 border-blue-200",
        icon: Calendar,
        dot: "bg-blue-500"
      };
    case "CHECKED_IN":
      return {
        label: "Checked In",
        bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
        icon: Clock,
        dot: "bg-indigo-500"
      };
    case "INSPECTION":
      return {
        label: "Inspection",
        bg: "bg-amber-50 text-amber-700 border-amber-200",
        icon: FileSearch,
        dot: "bg-amber-500"
      };
    case "ESTIMATE_PENDING":
      return {
        label: "Estimate Pending",
        bg: "bg-amber-50 text-amber-800 border-amber-300",
        icon: Clock,
        dot: "bg-amber-500"
      };
    case "WAITING_APPROVAL":
      return {
        label: "Awaiting Approval",
        bg: "bg-orange-50 text-orange-700 border-orange-200",
        icon: Clock,
        dot: "bg-orange-500"
      };
    case "APPROVED":
      return {
        label: "Approved",
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle2,
        dot: "bg-emerald-500"
      };
    case "REJECTED":
      return {
        label: "Declined",
        bg: "bg-rose-50 text-rose-700 border-rose-200",
        icon: XCircle,
        dot: "bg-rose-500"
      };
    case "ASSIGNED":
      return {
        label: "Mechanic Assigned",
        bg: "bg-purple-50 text-purple-700 border-purple-200",
        icon: UserCheck,
        dot: "bg-purple-500"
      };
    case "IN_SERVICE":
      return {
        label: "In Service",
        bg: "bg-blue-50 text-blue-700 border-blue-300 animate-pulse",
        icon: Wrench,
        dot: "bg-blue-600"
      };
    case "QUALITY_CHECK":
      return {
        label: "Quality Check",
        bg: "bg-teal-50 text-teal-700 border-teal-200",
        icon: ShieldCheck,
        dot: "bg-teal-500"
      };
    case "READY":
      return {
        label: "Ready for Pickup",
        bg: "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold",
        icon: CheckCheck,
        dot: "bg-emerald-600"
      };
    case "COMPLETED":
      return {
        label: "Completed",
        bg: "bg-slate-100 text-slate-700 border-slate-300",
        icon: CheckCheck,
        dot: "bg-slate-500"
      };
    default:
      return {
        label: status || "Unknown",
        bg: "bg-slate-50 text-slate-700 border-slate-200",
        icon: Clock,
        dot: "bg-slate-400"
      };
  }
};

export default function StatusBadge({ status, size = "md" }) {
  const config = getStatusConfig(status);
  const Icon = config.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-sm px-3 py-1.5"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full ${config.bg} ${sizeClasses[size]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <Icon className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  );
}
