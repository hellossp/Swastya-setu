"use client";

import React from "react";
import { translateStatus } from "@/lib/translator";

export default function StatusBadge({ status, lang = "en" }) {
  const statusLower = status ? status.toLowerCase() : "";

  const config = {
    normal: {
      bg: "bg-green-50 border-green-200 text-green-700",
      dot: "bg-success-green glow-green",
      label: "Normal",
    },
    high: {
      bg: "bg-orange-50 border-orange-200 text-orange-700",
      dot: "bg-orange-500 glow-orange",
      label: "High",
    },
    low: {
      bg: "bg-yellow-50 border-yellow-200 text-yellow-700",
      dot: "bg-warning-yellow glow-yellow",
      label: "Low",
    },
    critical: {
      bg: "bg-red-50 border-red-200 text-red-900 font-semibold border",
      dot: "bg-critical-red glow-critical animate-ping",
      label: "Critical",
    },
  };

  const current = config[statusLower] || config.normal;
  const displayLabel = translateStatus(status, lang);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${current.bg}`}
    >
      <span className={`w-2 h-2 rounded-full ${current.dot}`} />
      {displayLabel}
    </span>
  );
}
