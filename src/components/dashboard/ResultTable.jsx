"use client";

import React from "react";
import StatusBadge from "./StatusBadge";
import { t } from "@/lib/translator";

export default function ResultTable({ results = [], lang = "en" }) {
  const data = results || [];
  if (data.length === 0) return null;

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
            const displayName = lang === "od" && row.name.od ? row.name.od : row.name.en;
            
            // Translate remark dynamically
            const displayRemark = lang === "od" ? t(row.remark, "od") : row.remark;

            return (
              <tr 
                key={row.id || idx} 
                className="hover:bg-white/60 transition duration-150"
              >
                <td className="p-3 sm:p-4">
                  <div className="font-bold text-gray-800">{displayName}</div>
                  <div className="text-xs text-gray-400 font-medium">
                    {lang === "en" ? row.category : t(row.category, "od")}
                  </div>
                </td>
                <td className="p-3 sm:p-4 font-extrabold text-primary-maroon">
                  {row.value} <span className="text-xs font-semibold text-gray-400">{row.unit}</span>
                </td>
                <td className="p-3 sm:p-4 font-semibold text-gray-600">
                  {row.normalRange}
                </td>
                <td className="p-3 sm:p-4">
                  <StatusBadge status={row.status} lang={lang} />
                </td>
                <td className="p-3 sm:p-4 text-gray-600 max-w-xs font-medium leading-relaxed italic">
                  "{displayRemark}"
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
