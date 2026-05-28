"use client";

import React from "react";

export default function Card({
  children,
  variant = "default", // 'default', 'glass', 'interactive'
  className = "",
  padding = "p-6",
  ...props
}) {
  const baseStyles = "rounded-3xl border border-gray-100/50 shadow-sm transition-all duration-300";
  
  const variants = {
    default: "bg-white",
    glass: "glass-card",
    interactive: "glass-card glass-card-hover cursor-pointer",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
