"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageToggle from "@/components/language/LanguageToggle";
import { t } from "@/lib/translator";

export default function Navbar() {
  const pathname = usePathname();
  const [lang, setLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initial load
    setLang(localStorage.getItem("swasthyaSetu_lang") || "en");

    const handleLangChange = () => {
      setLang(localStorage.getItem("swasthyaSetu_lang") || "en");
    };

    window.addEventListener("swasthyaSetu_languageChange", handleLangChange);
    return () => window.removeEventListener("swasthyaSetu_languageChange", handleLangChange);
  }, []);

  const links = [
    { href: "/", labelKey: "nav_home" },
    { href: "/upload", labelKey: "nav_upload" },
    { href: "/dashboard", labelKey: "nav_dashboard" },
    { href: "/about", labelKey: "nav_about" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm px-6 md:px-8 py-4 flex flex-col justify-center transition-all duration-300">
      <div className="flex justify-between items-center w-full">
        {/* Brand Branding */}
        <div>
          <Link href="/" className="group flex flex-col">
            <h1 className="text-xl md:text-2xl font-black text-primary-maroon tracking-tight flex items-center gap-1.5 transition group-hover:opacity-90">
              {/* Inline heart activity SVG for logo */}
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-primary-maroon"
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
              SwasthyaSetu
            </h1>
            <p className="hidden sm:block text-[10px] md:text-xs text-gray-500 font-medium">
              {t("tagline", lang)}
            </p>
          </Link>
        </div>

        {/* Nav Links, Language Switcher & Hamburger */}
        <div className="flex items-center gap-3 md:gap-8">
          <div className="hidden md:flex gap-6 text-gray-600 font-bold text-sm">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-1 transition duration-200 hover:text-primary-maroon border-b-2 
                  ${isActive 
                    ? "text-primary-maroon border-primary-maroon" 
                    : "border-transparent text-gray-500"
                  }`}
                >
                  {t(link.labelKey, lang)}
                </Link>
              );
            })}
          </div>

          <LanguageToggle />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-gray-600 hover:text-primary-maroon focus:outline-none transition duration-200"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-lg px-6 py-4 flex flex-col gap-3.5 z-40">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-2 px-3 rounded-lg transition duration-150 font-bold text-sm
                ${isActive 
                  ? "bg-primary-maroon/5 text-primary-maroon border-l-4 border-primary-maroon" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-primary-maroon"
                }`}
              >
                {t(link.labelKey, lang)}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}