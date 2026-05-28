"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { t } from "@/lib/translator";

export default function Footer() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setLang(localStorage.getItem("swasthyaSetu_lang") || "en");

    const handleLangChange = () => {
      setLang(localStorage.getItem("swasthyaSetu_lang") || "en");
    };

    window.addEventListener("swasthyaSetu_languageChange", handleLangChange);
    return () => window.removeEventListener("swasthyaSetu_languageChange", handleLangChange);
  }, []);

  return (
    <footer className="w-full bg-primary-maroon text-[#F5EFE6]/80 text-center py-8 border-t border-accent-gold/20 z-10 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-4 items-center">
        
        {/* Navigation Links */}
        <div className="flex gap-6 text-sm font-semibold">
          <Link href="/about" className="hover:text-white transition duration-200">
            {lang === "en" ? "About" : "ଆମ ବିଷୟରେ"}
          </Link>
          <Link href="/upload" className="hover:text-white transition duration-200">
            {lang === "en" ? "Upload" : "ଅପଲୋଡ୍"}
          </Link>
          <Link href="/dashboard" className="hover:text-white transition duration-200">
            {lang === "en" ? "Dashboard" : "ଡାସବୋର୍ଡ"}
          </Link>
        </div>

        {/* Prototype Warning Disclaimer */}
        <p className="text-[11px] text-[#F5EFE6]/60 max-w-2xl leading-relaxed text-center font-medium">
          {lang === "en"
            ? "Disclaimer: This platform is in a prototype stage and is not intended for clinical use or healthcare decision-making."
            : "ସତର୍କତା: ଏହି ପ୍ଲାଟଫର୍ମଟି ଏକ ପ୍ରୋଟୋଟାଇପ୍ ସ୍ତରରେ ଅଛି ଏବଂ ଏହା ଚିକିତ୍ସା କିମ୍ବା ସ୍ୱାସ୍ଥ୍ୟ ସମ୍ବନ୍ଧୀୟ ନିଷ୍ପତ୍ତି ନେବା ପାଇଁ ଉଦ୍ଦିଷ୍ଟ ନୁହେଁ।"}
        </p>

        {/* Divider */}
        <div className="w-full max-w-xs h-[1px] bg-accent-gold/10 my-1" />

        {/* Copyright and Credits */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl text-xs gap-3 text-[#F5EFE6]/70">
          <p>© 2026 SwasthyaSetu. All rights reserved.</p>
          <p className="font-semibold">
            {lang === "en" ? "Developed by " : "ବିକଶିତ କରିଛନ୍ତି "}
            <a
              href="https://www.instagram.com/noobdeveloper_products?igsh=MW9sanRtajVxM3Azdg=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5EFE6] underline hover:text-white transition duration-200"
            >
              noobDeveloper
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
