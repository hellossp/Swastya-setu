"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SummaryCard from "@/components/dashboard/SummaryCard";
import AnalysisCard from "@/components/dashboard/AnalysisCard";
import ResultTable from "@/components/dashboard/ResultTable";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getReports, saveReport, deleteReport } from "@/lib/firebase";
import { t } from "@/lib/translator";

export default function DashboardPage() {
  const [lang, setLang] = useState("en");
  const [activeReport, setActiveReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [viewTab, setViewTab] = useState("cards"); // 'cards' or 'table'
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sync language state
  useEffect(() => {
    setLang(localStorage.getItem("swasthyaSetu_lang") || "en");

    const handleLangChange = () => {
      setLang(localStorage.getItem("swasthyaSetu_lang") || "en");
    };

    window.addEventListener("swasthyaSetu_languageChange", handleLangChange);
    return () => window.removeEventListener("swasthyaSetu_languageChange", handleLangChange);
  }, []);

  // Fetch history and load active report
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const savedReports = await getReports();
      setHistory(savedReports);

      // Try to load current session report
      const sessionAnalysis = localStorage.getItem("swasthyaSetu_currentAnalysis");
      const sessionFileName = localStorage.getItem("swasthyaSetu_fileName");
      const sessionText = localStorage.getItem("swasthyaSetu_currentText");

      if (sessionAnalysis && sessionFileName) {
        let parsedAnalysis = [];
        try {
          parsedAnalysis = JSON.parse(sessionAnalysis);
          if (!Array.isArray(parsedAnalysis)) {
            parsedAnalysis = [];
          }
        } catch (e) {
          console.error("Failed to parse session analysis JSON:", e);
        }

        const current = {
          id: "session",
          fileName: sessionFileName,
          analysis: parsedAnalysis,
          text: sessionText || "",
          date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
          time: new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
        };
        setActiveReport(current);
        
        // Check if this session report is already in history (by filename matching)
        const exists = savedReports.some(r => r.fileName === sessionFileName);
        setIsSaved(exists);
      } else if (savedReports.length > 0) {
        // Smart UX fallback: Load the most recent report from history if no active session
        setActiveReport(savedReports[0]);
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error in loadDashboardData:", error);
    }
  };

  const handleSaveReport = async () => {
    if (!activeReport || isSaved) return;
    setSaving(true);
    try {
      await saveReport(activeReport.fileName, activeReport.analysis, activeReport.text);
      setIsSaved(true);
      // Reload history list
      const savedReports = await getReports();
      setHistory(savedReports);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteReport = async (id, e) => {
    e.stopPropagation(); // Prevent loading report on delete click
    const confirmed = window.confirm(lang === "en" ? "Delete this report from history?" : "ଏହି ରିପୋର୍ଟକୁ ଇତିହାସରୁ କାଟିବାକୁ ଚାହାଁନ୍ତି କି?");
    if (!confirmed) return;

    const success = await deleteReport(id);
    if (success) {
      const updatedReports = await getReports();
      setHistory(updatedReports);

      // If we deleted the report currently showing, load another or set null
      if (activeReport && activeReport.id === id) {
        if (updatedReports.length > 0) {
          setActiveReport(updatedReports[0]);
          setIsSaved(true);
        } else {
          // Clear active view and local storage
          setActiveReport(null);
          localStorage.removeItem("swasthyaSetu_currentAnalysis");
          localStorage.removeItem("swasthyaSetu_fileName");
          localStorage.removeItem("swasthyaSetu_currentText");
          setIsSaved(false);
        }
      } else if (activeReport && activeReport.id === "session") {
        // If viewing current session, check if matches filename
        const deletedReport = history.find(r => r.id === id);
        if (deletedReport && deletedReport.fileName === activeReport.fileName) {
          setIsSaved(false);
        }
      }
    }
  };

  const handleSelectReport = (report) => {
    setActiveReport(report);
    setIsSaved(true);
  };

  const handleNewUpload = () => {
    // Clear session so they can upload fresh
    localStorage.removeItem("swasthyaSetu_currentAnalysis");
    localStorage.removeItem("swasthyaSetu_fileName");
    localStorage.removeItem("swasthyaSetu_currentText");
  };

  return (
    <main className="min-h-screen bg-beige-bg px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-maroon tracking-tight">
              {lang === "en" ? "Medical Analytics Dashboard" : "ରିପୋର୍ଟ ବିଶ୍ଳେଷଣ ଡାସବୋର୍ଡ"}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              {lang === "en" 
                ? "Pathology parameter tracking and medical insights" 
                : "ରକ୍ତ ପରୀକ୍ଷା ରିପୋର୍ଟ ସାରାଂଶ ଓ ପରାମର୍ଶ"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <Link href="/upload" onClick={handleNewUpload}>
              <Button variant="outline" size="sm">
                {t("btn_back_upload", lang)}
              </Button>
            </Link>
            {activeReport && !isSaved && (
              <Button variant="primary" size="sm" onClick={handleSaveReport} disabled={saving}>
                {saving ? "..." : t("btn_save_history", lang)}
              </Button>
            )}
            {activeReport && isSaved && (
              <Button variant="ghost" size="sm" className="bg-green-100/50 text-green-700 pointer-events-none" disabled>
                {t("btn_saved", lang)}
              </Button>
            )}
          </div>
        </div>

        {activeReport ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar - Report History */}
            <div className="lg:col-span-1 order-2 lg:order-1 flex flex-col gap-6">
              <Card className="bg-white/60 border-white/40 shadow-md">
                <h3 className="text-lg font-bold text-primary-maroon border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t("history_title", lang)}
                </h3>
                
                {history.length === 0 ? (
                  <p className="text-sm text-gray-500 italic text-center py-6">
                    {t("history_empty", lang)}
                  </p>
                ) : (
                  <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1">
                    {history.map((rep) => {
                      const isActive = activeReport.id === rep.id || (activeReport.id === "session" && activeReport.fileName === rep.fileName);
                      return (
                        <div
                          key={rep.id}
                          onClick={() => handleSelectReport(rep)}
                          className={`p-3.5 rounded-xl border transition cursor-pointer text-left flex justify-between items-center group
                          ${isActive 
                            ? "bg-primary-maroon text-white border-primary-maroon shadow-md shadow-primary-maroon/20" 
                            : "bg-white/80 border-gray-100 hover:bg-white text-gray-700 hover:border-primary-maroon/30"
                          }`}
                        >
                          <div className="truncate flex-1 mr-2">
                            <p className="font-bold text-sm truncate">{rep.fileName}</p>
                            <p className={`text-xs mt-0.5 ${isActive ? "text-white/85" : "text-gray-400"}`}>
                              {rep.date} • {rep.time}
                            </p>
                          </div>
                          <button
                            onClick={(e) => handleDeleteReport(rep.id, e)}
                            className={`p-1.5 rounded-lg transition hover:bg-red-500 hover:text-white shrink-0
                            ${isActive ? "text-white/80 hover:bg-white/20" : "text-gray-400 hover:bg-red-50"}`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>

              {/* Patient details card */}
              <Card className="bg-white/60 border-white/40 shadow-sm text-sm">
                <h4 className="font-bold text-gray-700 mb-3 border-b border-gray-100 pb-2">
                  {lang === "en" ? "Report Metadata" : "ରିପୋର୍ଟ ସୂଚନା"}
                </h4>
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="text-gray-400 block text-xs uppercase font-semibold">{lang === "en" ? "File Name" : "ଫାଇଲ୍ ନାମ"}</span>
                    <span className="font-bold text-gray-700 truncate block">{activeReport.fileName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs uppercase font-semibold">{lang === "en" ? "Analyzed Date" : "ବିଶ୍ଳେଷଣ ତାରିଖ"}</span>
                    <span className="font-semibold text-gray-700">{activeReport.date} {activeReport.time}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Diagnostics Panel */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              {/* Overall status message card */}
              <SummaryCard results={activeReport.analysis} lang={lang} />

              {/* View Tab Toggle */}
              <div className="flex justify-between items-center mb-6">
                <div className="bg-white/60 p-1 rounded-xl border border-gray-200/50 inline-flex shadow-inner">
                  <button
                    onClick={() => setViewTab("cards")}
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition duration-150 cursor-pointer
                    ${viewTab === "cards" 
                      ? "bg-primary-maroon text-white shadow-sm" 
                      : "text-gray-600 hover:text-primary-maroon"
                    }`}
                  >
                    {lang === "en" ? "Card View" : "କାର୍ଡ ଦେଖନ୍ତୁ"}
                  </button>
                  <button
                    onClick={() => setViewTab("table")}
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition duration-150 cursor-pointer
                    ${viewTab === "table" 
                      ? "bg-primary-maroon text-white shadow-sm" 
                      : "text-gray-600 hover:text-primary-maroon"
                    }`}
                  >
                    {lang === "en" ? "Table View" : "ଟେବୁଲ୍ ଦେଖନ୍ତୁ"}
                  </button>
                </div>

                <span className="text-sm font-semibold text-gray-500">
                  {lang === "en" 
                    ? `Showing ${activeReport.analysis.length} parameters`
                    : `${activeReport.analysis.length} ଟି ପାରାମିଟର ଦର୍ଶାଉଛି`}
                </span>
              </div>

              {/* Render View */}
              {viewTab === "cards" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeReport.analysis.map((param, idx) => (
                    <AnalysisCard key={param.id || idx} result={param} lang={lang} />
                  ))}
                </div>
              ) : (
                <ResultTable results={activeReport.analysis} lang={lang} />
              )}
            </div>
            
          </div>
        ) : (
          /* Empty State */
          <Card className="text-center py-20 bg-white/60 border-white/50 shadow-md max-w-2xl mx-auto flex flex-col items-center">
            <div className="p-4 bg-primary-maroon/5 text-primary-maroon rounded-full mb-6">
              <svg className="w-16 h-16 animate-pulse-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-primary-maroon mb-2">
              {lang === "en" ? "No Medical Report Found" : "କୌଣସି ଡାକ୍ତରୀ ରିପୋର୍ଟ ମିଳିଲା ନାହିଁ"}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
              {lang === "en" 
                ? "Please upload a pathology report first in order to view health parameters and smart AI analysis."
                : "ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ଏବଂ ସଠିକ୍ ଏଆଇ ବିଶ୍ଳେଷଣ ଦେଖିବା ପାଇଁ ଦୟାକରି ପ୍ରଥମେ ଏକ ପାଥୋଲୋଜି ରିପୋର୍ଟ ଅପଲୋଡ୍ କରନ୍ତୁ।"}
            </p>
            <Link href="/upload">
              <Button size="lg">{t("upload_title", lang)}</Button>
            </Link>
          </Card>
        )}

      </div>
    </main>
  );
}
