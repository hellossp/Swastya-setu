"use client";

import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";
  
  const variants = {
    primary: "bg-primary-maroon text-white hover:bg-opacity-90 focus:ring-primary-maroon shadow-md shadow-primary-maroon/20",
    secondary: "bg-accent-gold text-primary-maroon hover:bg-opacity-90 focus:ring-accent-gold shadow-md shadow-accent-gold/20",
    outline: "border-2 border-primary-maroon text-primary-maroon hover:bg-primary-maroon hover:text-white focus:ring-primary-maroon",
    danger: "bg-danger-red text-white hover:bg-opacity-90 focus:ring-danger-red shadow-md shadow-danger-red/20",
    ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-300",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
