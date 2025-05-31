import { toast } from "sonner";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";
import React from "react";

export const showToast = (status, message = "Action completed successfully") => {
  const iconMap = {
    success: <CheckCircle className="text-white w-5 h-5" />,
    error: <XCircle className="text-white w-5 h-5" />,
    warning: <AlertTriangle className="text-white w-5 h-5" />,
    info: <Info className="text-white w-5 h-5" />,
  };

  const bgColorMap = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500",
    info: "bg-blue-600",
  };

  const allowedStatuses = ["success", "error", "warning", "info"];

  if (!allowedStatuses.includes(status)) {
    console.warn(`Invalid toast status: "${status}". Must be one of: ${allowedStatuses.join(", ")}`);
    return;
  }

  toast.custom((t) => (
    <div
      className={`w-full px-4 py-4 flex items-center justify-between gap-4 rounded-md shadow-md ${bgColorMap[status]}`}
    >
      <div className="flex items-center gap-3">
        <div>{iconMap[status]}</div>
        <p className="text-white text-lg font-medium">{message}</p>
      </div>
      <button onClick={() => toast.dismiss(t)} className="text-white hover:opacity-70">
        <X className="w-5 h-5" />
      </button>
    </div>
  ), {
    duration: 5000,
    unstyled: true,
  });
};
