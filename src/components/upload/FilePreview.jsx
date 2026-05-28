"use client";

import React from "react";

export default function FilePreview({ file, onClear, lang = "en" }) {
  if (!file) return null;

  const isPDF = file.type === "application/pdf" || file.name.endsWith(".pdf");
  const fileSizeKB = (file.size / 1024).toFixed(1);

  return (
    <div className="w-full mt-6 bg-[#7A3B2E]/5 rounded-2xl p-4 border border-[#7A3B2E]/10 flex items-center justify-between text-left animate-pulse-subtle">
      <div className="flex items-center gap-3 truncate">
        {/* PDF vs Image Icon */}
        <div className="p-2.5 bg-white rounded-xl shadow-sm text-primary-maroon shrink-0">
          {isPDF ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* File Metadata */}
        <div className="truncate">
          <p className="font-bold text-sm text-gray-800 truncate leading-snug">
            {file.name}
          </p>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">
            {fileSizeKB} KB • {isPDF ? "PDF Report" : "Image Report"}
          </p>
        </div>
      </div>

      {/* Clear Button */}
      <button
        onClick={onClear}
        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50/50 transition cursor-pointer shrink-0 ml-2"
        title={lang === "en" ? "Remove file" : "ଫାଇଲ୍ ହଟାନ୍ତୁ"}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
