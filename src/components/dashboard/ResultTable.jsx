"use client";

import React from "react";
import StatusBadge from "./StatusBadge";
import { t } from "@/lib/translator";

export default function ResultTable({ results = [], lang = "en" }) {
  const data = results || [];
  if (data.length === 0) return null;

  // Safe Parameter Name Extractor
  const getDisplayName = (row) => {
    if (!row) return "";
    if (typeof row.name === "object" && row.name !== null) {
      if (lang === "od" && row.name.od) return row.name.od;
      if (row.name.en) return row.name.en;
    }
    return row.testName || row.parameter || (typeof row.name === "string" ? row.name : "Medical Test");
  };

  // Safe Reference Range Extractor
  const getNormalRangeStr = (row) => {
    if (!row || row.normalRange === undefined || row.normalRange === null) return "N/A";
    if (typeof row.normalRange === "string") return row.normalRange;
    if (typeof row.normalRange === "number") return String(row.normalRange);
    if (typeof row.normalRange === "object") {
      if (row.normalRange.male && row.normalRange.female) {
        return `Male: ${row.normalRange.male.min}-${row.normalRange.male.max} | Female: ${row.normalRange.female.min}-${row.normalRange.female.max}`;
      }
      if (row.normalRange.min !== undefined && row.normalRange.max !== undefined) {
        return `${row.normalRange.min} - ${row.normalRange.max} ${row.unit || ""}`;
      }
    }
    return String(row.normalRange);
  };

  // Safe Category Extractor
  const getCategoryStr = (row) => {
    if (!row || !row.category) return "";
    if (typeof row.category === "string") {
      return lang === "od" ? t(row.category, "od") : row.category;
    }
    return "";
  };

  // Safe Remark Extractor
  const getRemarkStr = (row) => {
    if (!row || !row.remark) return "";
    if (typeof row.remark === "string") {
      return lang === "od" ? t(row.remark, "od") : row.remark;
    }
    if (typeof row.remark === "object") {
      return lang === "od" && row.remark.od ? row.remark.od : row.remark.en || "";
    }
    return "";
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200/60 bg-white/70 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-primary-maroon/5 text-primary-maroon text-sm font-bold border-b border-gray-200">
            <th className="p-3 sm:p-4 font-semibold">{lang === "en" ? "Parameter" : t("col_parameter", "od")}</th>
            <th className="p-3 sm:p-4 font-semibold">{lang === "en" ? "Value" : t("col_value", "od")}</th>
            <th className="p-3 sm:p-4 font-semibold">{lang === "en" ? "Normal Range" : t("col_range", "od")}</th>
            <th className="p-3 sm:p-4 font-semibold">{lang === "en" ? "Status" : t("col_status", "od")}</th>
            <th className="p-3 sm:p-4 font-semibold">{lang === "en" ? "Remark" : t("col_remark", "od")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {data.map((row, idx) => {
            const displayName = getDisplayName(row);
            const categoryName = getCategoryStr(row);
            const rangeStr = getNormalRangeStr(row);
            const displayRemark = getRemarkStr(row);

            return (
              <tr 
                key={row.id || idx} 
                className="hover:bg-white/60 transition duration-150"
              >
                <td className="p-3 sm:p-4">
                  <div className="font-bold text-gray-800">{displayName}</div>
                  {categoryName && (
                    <div className="text-xs text-gray-400 font-medium">
                      {categoryName}
                    </div>
                  )}
                </td>
                <td className="p-3 sm:p-4 font-extrabold text-primary-maroon">
                  {row.value !== undefined && row.value !== null ? row.value : "-"} <span className="text-xs font-semibold text-gray-400">{row.unit || ""}</span>
                </td>
                <td className="p-3 sm:p-4 font-semibold text-gray-600">
                  {rangeStr}
                </td>
                <td className="p-3 sm:p-4">
                  <StatusBadge status={row.status || "Normal"} lang={lang} />
                </td>
                <td className="p-3 sm:p-4 text-gray-600 max-w-xs font-medium leading-relaxed italic">
                  {displayRemark ? `"${displayRemark}"` : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
