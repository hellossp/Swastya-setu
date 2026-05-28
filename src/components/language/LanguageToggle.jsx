"use client";

import { useEffect, useState } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    // Initial load
    const currentLang = localStorage.getItem("swasthyaSetu_lang") || "en";
    setLang(currentLang);

    const handleLangChange = () => {
      setLang(localStorage.getItem("swasthyaSetu_lang") || "en");
    };

    window.addEventListener("swasthyaSetu_languageChange", handleLangChange);
    return () => window.removeEventListener("swasthyaSetu_languageChange", handleLangChange);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "od" : "en";
    localStorage.setItem("swasthyaSetu_lang", newLang);
    setLang(newLang);
    // Dispatch event to synchronize all client components instantly
    window.dispatchEvent(new Event("swasthyaSetu_languageChange"));
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-[#7A3B2E]/5 border border-[#7A3B2E]/20 hover:bg-[#7A3B2E]/10 text-primary-maroon px-4 py-2 rounded-xl transition duration-200 shadow-sm active:scale-95 font-semibold text-sm cursor-pointer"
    >
      {/* Globe Icon */}
      <svg
        className="w-4 h-4 text-primary-maroon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.003 9.003 0 018.716 6.747M12 3a9.003 9.003 0 00-8.716 6.747M3 12h18"
        />
      </svg>
      {lang === "en" ? "ଓଡ଼ିଆ" : "English"}
    </button>
  );
}
