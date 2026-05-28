"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { t } from "@/lib/translator";

export default function SummaryCard({ results = [], lang = "en" }) {
  const data = results || [];
  if (data.length === 0) return null;

  // Determine overall status
  const statuses = data.map(r => r.status ? r.status.toLowerCase() : "normal");
  const hasCritical = statuses.includes("critical");
  const hasAttention = statuses.includes("high") || statuses.includes("low");

  let bannerClass = "";
  let iconColor = "";
  let messageKey = "";
  let titleKey = "";
  
  if (hasCritical) {
    bannerClass = "bg-red-50/90 border-red-200 border-2 text-red-900 glow-critical";
    iconColor = "text-danger-red";
    messageKey = "dash_summary_critical";
    titleKey = "status_critical";
  } else if (hasAttention) {
    bannerClass = "bg-orange-50/90 border-orange-200 border-2 text-orange-900 glow-orange";
    iconColor = "text-orange-600";
    messageKey = "dash_summary_attention";
    titleKey = "status_high"; // or warning
  } else {
    bannerClass = "bg-green-50/90 border-green-200 border-2 text-green-950 glow-green";
    iconColor = "text-success-green";
    messageKey = "dash_summary_all_normal";
    titleKey = "status_normal";
  }

  // Get total parameters requiring attention
  const attentionCount = results.filter(r => r.status !== "Normal").length;

  return (
    <Card className={`${bannerClass} mb-8 transition-all duration-300 animate-pulse-subtle`}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
        {/* Animated Icon */}
        <div className={`p-3 rounded-2xl bg-white shadow-sm ${iconColor}`}>
          {hasCritical ? (
            <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : hasAttention ? (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1">
            {lang === "en" 
              ? (hasCritical ? "Action Required" : hasAttention ? "Attention Needed" : "All Normal")
              : (hasCritical ? "ଜରୁରୀକାଳୀନ ପଦକ୍ଷେପ ଆବଶ୍ୟକ" : hasAttention ? "ଦୃଷ୍ଟି ଦେବା ଆବଶ୍ୟକ" : "ସବୁ ସ୍ୱାଭାବିକ")}
          </h2>
          
          <p className="text-lg opacity-90">
            {t(messageKey, lang)}
          </p>

          {attentionCount > 0 && (
            <div className="mt-3 inline-flex items-center bg-white/50 px-3 py-1 rounded-lg text-sm font-semibold">
              {lang === "en" 
                ? `${attentionCount} of ${results.length} parameters outside healthy ranges`
                : `${results.length} ରୁ ${attentionCount} ଟି ପାରାମିଟର ସ୍ୱାଭାବିକ ସୀମା ବାହାରେ ଅଛି`}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
