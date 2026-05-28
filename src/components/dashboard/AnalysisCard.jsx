"use client";

import React from "react";
import Card from "@/components/ui/Card";
import StatusBadge from "./StatusBadge";
import { t } from "@/lib/translator";

export default function AnalysisCard({ result, lang = "en" }) {
  if (!result) return null;
  
  const { 
    name = { en: "", od: "" }, 
    value = "", 
    unit = "", 
    status = "Normal", 
    normalRange = "", 
    description = { en: "", od: "" }, 
    remark = "", 
    category = "", 
    aiInsight 
  } = result;

  // Localized title & description
  const displayName = lang === "od" && name && name.od ? name.od : (name ? name.en : "");
  const displayDesc = lang === "od" && description && description.od ? description.od : (description ? description.en : "");

  // Localized remarks translation lookup helper
  const translateRemark = (rem) => {
    if (!rem) return "";
    if (lang === "en") return rem;
    
    // Check if there is an Odia translation in the translation dictionary
    return t(rem, "od");
  };

  const getStatusColorBorder = (stat) => {
    const s = stat.toLowerCase();
    if (s === "critical") return "border-l-8 border-l-red-800 border-red-200";
    if (s === "high") return "border-l-8 border-l-orange-500 border-orange-200";
    if (s === "low") return "border-l-8 border-l-yellow-500 border-yellow-200";
    return "border-l-8 border-l-green-500 border-green-100";
  };

  return (
    <Card
      variant="interactive"
      className={`${getStatusColorBorder(status)} bg-white/80 hover:bg-white overflow-hidden`}
      padding="p-0"
    >
      <div className="p-6">
        {/* Category & Badge */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-150 px-2.5 py-1 rounded-md">
            {lang === "en" ? category : t(category, "od")}
          </span>
          <StatusBadge status={status} lang={lang} />
        </div>

        {/* Name and Value */}
        <div className="flex justify-between items-baseline mb-4">
          <h3 className="text-xl font-bold text-gray-800">{displayName}</h3>
          <div className="text-right">
            <span className="text-2xl font-black text-primary-maroon">
              {value}
            </span>
            <span className="text-sm font-medium text-gray-500 ml-1">
              {unit}
            </span>
          </div>
        </div>

        {/* Range and Info grid */}
        <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-3 mb-4 text-sm">
          <div>
            <span className="text-gray-400 block text-xs uppercase font-semibold">
              {lang === "en" ? "Normal Range" : t("col_range", "od")}
            </span>
            <span className="font-semibold text-gray-700">{normalRange}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 block text-xs uppercase font-semibold">
              {lang === "en" ? "User Value" : t("col_value", "od")}
            </span>
            <span className="font-semibold text-gray-700">
              {value} {unit}
            </span>
          </div>
        </div>

        {/* Explanation */}
        <div className="mb-4">
          <h4 className="text-xs uppercase font-bold text-gray-400 mb-1">
            {lang === "en" ? "Layman Explanation" : t("col_desc", "od")}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">{displayDesc}</p>
        </div>

        {/* Remarks */}
        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
          <h4 className="text-xs uppercase font-bold text-gray-400 mb-1">
            {lang === "en" ? "Medical Remark" : t("col_remark", "od")}
          </h4>
          <p className="text-gray-700 text-sm font-medium italic">
            "{translateRemark(remark)}"
          </p>
        </div>

        {/* AI Insight Box (Clinical correlation alerts) */}
        {aiInsight && (
          <div className="mt-4 p-4 rounded-2xl border border-red-150 bg-red-50/40 text-red-900 text-sm">
            <div className="flex gap-2">
              <svg className="w-5 h-5 text-red-700 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <span className="font-bold block mb-0.5">
                  {lang === "en" ? "AI Health Insight" : t("col_insights", "od")}
                </span>
                <p className="font-medium leading-relaxed">
                  {lang === "od" && aiInsight.od ? aiInsight.od : aiInsight.en}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
