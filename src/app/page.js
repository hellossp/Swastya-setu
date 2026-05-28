"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { t } from "@/lib/translator";

export default function Home() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setLang(localStorage.getItem("swasthyaSetu_lang") || "en");

    const handleLangChange = () => {
      setLang(localStorage.getItem("swasthyaSetu_lang") || "en");
    };

    window.addEventListener("swasthyaSetu_languageChange", handleLangChange);
    return () => window.removeEventListener("swasthyaSetu_languageChange", handleLangChange);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-primary-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
      titleEn: "Easy Upload",
      titleOd: "ସହଜ ଅପଲୋଡ୍",
      descEn: "Drag and drop pathology reports in PDF, JPG, or PNG formats.",
      descOd: "ଆପଣଙ୍କ ରକ୍ତ ପରୀକ୍ଷା ରିପୋର୍ଟ (PDF, JPG, PNG) କୁ ସହଜରେ ଅପଲୋଡ୍ କରନ୍ତୁ।"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      titleEn: "Smart Extraction",
      titleOd: "ବୁଦ୍ଧିମାନ ନିଷ୍କର୍ଷ",
      descEn: "Regex matching engine extracts test values and units with precision.",
      descOd: "ଆମର ଏଆଇ ଇଞ୍ଜିନ୍ ରିପୋର୍ଟରୁ ପରୀକ୍ଷା ମୂଲ୍ୟ ଏବଂ ଏକକକୁ ସଠିକ୍ ଭାବରେ ବାଛିଥାଏ।"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      titleEn: "Layman Explanations",
      titleOd: "ସରଳ ବ୍ୟାଖ୍ୟା",
      descEn: "Demystifies medical jargon into patient-friendly terminology in English and Odia.",
      descOd: "ଜଟିଳ ଡାକ୍ତରୀ ଶବ୍ଦଗୁଡ଼ିକୁ ସରଳ ଓଡ଼ିଆ ଏବଂ ଇଂରାଜୀ ଭାଷାରେ ବୁଝାଇଥାଏ।"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h1.5l2.25-5.25L11.25 18l3.75-11.25 2.25 5.25h1.5" />
        </svg>
      ),
      titleEn: "Clinical Correlation",
      titleOd: "ଡାକ୍ତରୀ ସମ୍ବନ୍ଧ",
      descEn: "Interprets combined markers (e.g. low platelets in Dengue) for health alerts.",
      descOd: "ରକ୍ତ ପରୀକ୍ଷାର ମିଳିତ ସୂଚକକୁ ଯାଞ୍ଚ କରି ଆବଶ୍ୟକୀୟ ସ୍ୱାସ୍ଥ୍ୟ ସତର୍କତା ପ୍ରଦାନ କରେ।"
    }
  ];

  return (
    <main className="min-h-screen bg-beige-bg relative overflow-hidden sambalpuri-pattern flex flex-col justify-between">
      
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-maroon/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-gold/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center z-10 flex-1 flex flex-col justify-center items-center">
        
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-maroon/5 border border-primary-maroon/10 px-4 py-1.5 rounded-full text-sm font-bold text-primary-maroon mb-6 animate-pulse-subtle">
          <span className="w-2 h-2 rounded-full bg-success-green glow-green" />
          {lang === "en" ? "AI Healthcare Prototype" : "ଏଆଇ ସ୍ୱାସ୍ଥ୍ୟସେବା ପ୍ରୋଟୋଟାଇପ୍"}
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-primary-maroon mb-6 tracking-tight leading-none">
          SwasthyaSetu
        </h1>

        {/* Taglines */}
        <p className="text-lg sm:text-2xl md:text-3xl text-gray-700 font-semibold mb-3 max-w-2xl px-4">
          "{t("tagline", "en")}"
        </p>
        <p className="text-base sm:text-lg md:text-2xl text-primary-maroon font-bold mb-10 max-w-2xl leading-relaxed px-4">
          "{t("tagline", "od")}"
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link href="/upload">
            <Button size="lg" variant="primary" className="w-64 font-bold text-lg">
              {lang === "en" ? "Analyze Report" : "ରିପୋର୍ଟ ବିଶ୍ଳେଷଣ କରନ୍ତୁ"}
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="w-64 font-bold text-lg">
              {lang === "en" ? "View Dashboard" : "ଡାସବୋର୍ଡ ଦେଖନ୍ତୁ"}
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
          {features.map((feat, idx) => (
            <Card
              key={idx}
              variant="interactive"
              className="bg-white/75 hover:bg-white border-white/40 shadow-md p-6 flex flex-col gap-4"
            >
              <div className="p-3 bg-primary-maroon/5 rounded-2xl w-fit">
                {feat.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1.5">
                  {lang === "en" ? feat.titleEn : feat.titleOd}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {lang === "en" ? feat.descEn : feat.descOd}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>



    </main>
  );
}