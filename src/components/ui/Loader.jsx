"use client";

import React from "react";

export default function Loader({
  message = "Loading...",
  subMessage = "",
  progress = null,
  className = "",
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      {/* Animated Medical Pulsing Rings */}
      <div className="relative flex items-center justify-center w-24 h-24 mb-6">
        <div className="absolute inset-0 rounded-full bg-primary-maroon opacity-10 animate-ping" />
        <div className="absolute w-20 h-20 rounded-full bg-primary-maroon opacity-20 animate-pulse" />
        <div className="relative w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
          {/* Inline Heartbeat/Activity SVG */}
          <svg
            className="w-8 h-8 text-primary-maroon animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h1.5l2.25-5.25L11.25 18l3.75-11.25 2.25 5.25h1.5"
            />
          </svg>
        </div>
      </div>

      <h3 className="text-xl font-bold text-primary-maroon mb-2 animate-pulse-subtle">
        {message}
      </h3>
      
      {subMessage && (
        <p className="text-gray-600 text-sm max-w-xs mb-4">
          {subMessage}
        </p>
      )}

      {progress !== null && (
        <div className="w-64 bg-gray-200 h-2.5 rounded-full overflow-hidden shadow-inner">
          <div
            className="bg-primary-maroon h-full transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
          <span className="text-xs font-semibold text-primary-maroon mt-2 block">
            {progress}% completed
          </span>
        </div>
      )}
    </div>
  );
}
