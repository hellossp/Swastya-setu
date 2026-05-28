"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { t } from "@/lib/translator";

export default function AboutPage() {
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
    <main className="min-h-screen bg-beige-bg px-6 py-12 md:py-20 sambalpuri-pattern">
      <div className="max-w-4xl mx-auto z-10 relative">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-primary-maroon mb-4">
            {t("about_title", lang)}
          </h1>
          <p className="text-gray-600 text-lg">
            {lang === "en" ? "Bridging the gap between complexity and care" : "ଜଟିଳ ରକ୍ତ ପରୀକ୍ଷା ରିପୋର୍ଟ ସାରାଂଶ ଓ ପରାମର୍ଶ"}
          </p>
        </div>

        {/* Content Card */}
        <Card className="bg-white/80 glass-card shadow-lg p-8 md:p-12 mb-8 flex flex-col gap-6">
          <section>
            <h2 className="text-2xl font-bold text-primary-maroon mb-3">
              {lang === "en" ? "Our Mission" : "ଆମର ଲକ୍ଷ୍ୟ"}
            </h2>
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              {t("about_p1", lang)}
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              {t("about_p2", lang)}
            </p>
          </section>

          <section className="border-t border-gray-150 pt-6">
            <h2 className="text-2xl font-bold text-primary-maroon mb-3">
              {lang === "en" ? "Features Built In" : "ପ୍ରମୁଖ ବିଶେଷତା"}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 font-semibold">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-gold" />
                {lang === "en" ? "PDF Report Parsing (pdf-parse)" : "ପିଡିଏଫ୍ ରିପୋର୍ଟ ବିଶ୍ଳେଷଣ"}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-gold" />
                {lang === "en" ? "Dynamic Image OCR (Tesseract CDN)" : "ଫଟୋରୁ ଲେଖା ପଢା (OCR)"}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-gold" />
                {lang === "en" ? "Odia & English Instant Localization" : "ଓଡ଼ିଆ ଏବଂ ଇଂରାଜୀ ଭାଷା ବିକଳ୍ପ"}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-gold" />
                {lang === "en" ? "25+ Diagnostic Parameters Map" : "୨୫+ ରକ୍ତ ପରୀକ୍ଷା ସାରାଂଶ"}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-gold" />
                {lang === "en" ? "Local Database History Tracking" : "ରିପୋର୍ଟ ଇତିହାସ ସଂରକ୍ଷଣ"}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-gold" />
                {lang === "en" ? "AI Insights and Drug Warnings" : "ଏଆଇ ସ୍ୱାସ୍ଥ୍ୟ ସତର୍କତା ଓ ପରାମର୍ଶ"}
              </li>
            </ul>
          </section>

          <section className="border-t border-gray-150 pt-6">
            <h2 className="text-2xl font-bold text-primary-maroon mb-3">
              {lang === "en" ? "Disclaimer & Credits" : "ସୂଚନା ଏବଂ ଶ୍ରେୟ"}
            </h2>
            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5 flex flex-col gap-3.5 text-sm text-gray-700">
              <div className="flex items-start gap-2.5">
                <svg className="w-5 h-5 text-danger-red shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <span className="font-bold text-gray-800 block mb-0.5">
                    {lang === "en" ? "Prototype Disclaimer:" : "ପ୍ରୋଟୋଟାଇପ୍ ସତର୍କତା:"}
                  </span>
                  <p className="leading-relaxed">
                    {lang === "en" 
                      ? "This platform is in a prototype stage and is not intended for clinical use, professional medical diagnosis, or healthcare decision-making."
                      : "ଏହି ପ୍ଲାଟଫର୍ମଟି ଏକ ପ୍ରୋଟୋଟାଇପ୍ ସ୍ତରରେ ଅଛି ଏବଂ ଏହା ଚିକିତ୍ସା କିମ୍ବା ସ୍ୱାସ୍ଥ୍ୟ ସମ୍ବନ୍ଧୀୟ ନିଷ୍ପତ୍ତି ନେବା ପାଇଁ ଉଦ୍ଦିଷ୍ଟ ନୁହେଁ।"}
                  </p>
                </div>
              </div>
              <div className="border-t border-red-100/50 pt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs font-semibold text-gray-500">
                <p>
                  {lang === "en" ? "Made by: " : "ନିର୍ମାତା: "}
                  <span className="text-gray-800 font-bold">Subhasis Mishra</span>
                </p>
                <p>
                  {lang === "en" ? "Developed by: " : "ବିକାଶକାରୀ: "}
                  <span className="text-gray-800 font-bold">noobDevelopers</span>
                </p>
              </div>
            </div>
          </section>

          <div className="flex justify-center mt-6">
            <Link href="/upload">
              <Button size="lg" variant="primary">
                {lang === "en" ? "Get Started" : "ଆରମ୍ଭ କରନ୍ତୁ"}
              </Button>
            </Link>
          </div>
        </Card>
        
      </div>
    </main>
  );
}
