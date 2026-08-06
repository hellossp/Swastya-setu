"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { pastReportsData } from "@/data/pastReports";

export default function PastReportsModal({ isOpen, onClose, onSelectReport }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  if (!isOpen) return null;

  // Filter reports based on search query and category tags
  const filteredReports = pastReportsData.filter((report) => {
    const matchesSearch =
      report.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.labName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.sections.some((sec) =>
        sec.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sec.tests.some(
          (t) =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.status.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

    if (!matchesSearch) return false;

    if (selectedFilter === "critical") return report.summary.overallStatus === "Critical";
    if (selectedFilter === "drlal") return report.labName.includes("Dr Lal");
    if (selectedFilter === "mgm") return report.labName.includes("MGM");
    if (selectedFilter === "diabetes") return report.package.includes("Diabetes") || report.fileName.includes("Diabetes");

    return true;
  });

  const handleLoadReport = (report) => {
    // Flatten tests to format compatible with dashboard components
    const flattenedAnalysis = [];
    report.sections.forEach((sec) => {
      sec.tests.forEach((t) => {
        flattenedAnalysis.push({
          id: t.name.toLowerCase().replace(/[^a-z0-9]/g, "_"),
          testName: t.name,
          category: sec.category,
          value: t.value,
          unit: t.unit,
          normalRange: t.range,
          status: t.status,
          remark: t.remark,
          remarks: {
            normal: t.remark,
            low: t.remark,
            high: t.remark,
            critical: t.remark
          }
        });
      });
    });

    // Store in localStorage
    localStorage.setItem("swasthyaSetu_currentAnalysis", JSON.stringify(flattenedAnalysis));
    localStorage.setItem("swasthyaSetu_fileName", report.fileName);
    localStorage.setItem(
      "swasthyaSetu_currentText",
      `PATIENT: ${report.patientName} | LAB: ${report.labName} | DATE: ${report.date} | PACKAGE: ${report.package}`
    );

    if (onSelectReport) {
      onSelectReport(report, flattenedAnalysis);
    }

    onClose();
    router.push("/dashboard");
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-white/50 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#7A3B2E] text-white p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl">
              <svg className="w-7 h-7 text-[#D4A373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">Past Analyzed Reports</h2>
              <p className="text-xs text-[#E8D8C8]">
                Select any report below to view full medical analysis & diagnostic breakdown
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 sm:p-6 bg-[#FAF6F0] border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0">
          {/* Search Box */}
          <div className="relative w-full sm:w-96">
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by test name, status, lab, or patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B2E] text-gray-800 shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {[
              { id: "all", label: "All Reports" },
              { id: "critical", label: "🔴 Critical" },
              { id: "drlal", label: "Dr Lal PathLabs" },
              { id: "mgm", label: "MGM Hospital" },
              { id: "diabetes", label: "Diabetes Profile" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedFilter === f.id
                    ? "bg-[#7A3B2E] text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Main Content Area (Clean Cards Grid) */}
        <div className="p-6 overflow-y-auto bg-[#FAF8F5] flex-1">
          {filteredReports.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-sm">
              No matching past reports found. Try clearing your search term.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-200 p-5 flex flex-col justify-between hover:border-[#7A3B2E]/40 group"
                >
                  <div>
                    {/* Header info */}
                    <div className="mb-3 border-b border-gray-100 pb-3">
                      <h3 className="font-extrabold text-base text-[#7A3B2E] line-clamp-1 group-hover:text-[#5c2b21]">
                        {report.package}
                      </h3>
                      <p className="text-xs font-semibold text-gray-600 mt-0.5">{report.labName}</p>
                    </div>

                    {/* Metadata details */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-4 bg-[#FAF6F0] p-3 rounded-xl border border-gray-200/60">
                      <div>
                        <span className="text-gray-400 font-bold uppercase text-[10px] block">Patient</span>
                        <span className="font-bold text-gray-800 truncate block">{report.patientName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold uppercase text-[10px] block">Gender & Age</span>
                        <span className="font-semibold text-gray-800 block">{report.gender}, {report.age}</span>
                      </div>
                      <div className="col-span-2 pt-1.5 border-t border-gray-200/50 flex justify-between items-center">
                        <span className="text-gray-400 font-bold uppercase text-[10px]">Report Date</span>
                        <span className="font-semibold text-gray-800">{report.date}</span>
                      </div>
                    </div>

                    {/* Status summary badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4 text-[11px]">
                      <span className="px-2.5 py-1 rounded-lg bg-green-100 text-green-800 font-bold border border-green-200">
                        {report.summary.normalCount} Normal
                      </span>
                      {report.summary.lowCount > 0 && (
                        <span className="px-2.5 py-1 rounded-lg bg-yellow-100 text-yellow-800 font-bold border border-yellow-200">
                          {report.summary.lowCount} Low
                        </span>
                      )}
                      {report.summary.highCount > 0 && (
                        <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800 font-bold border border-orange-200">
                          {report.summary.highCount} High
                        </span>
                      )}
                      {report.summary.criticalCount > 0 && (
                        <span className="px-2.5 py-1 rounded-lg bg-red-100 text-red-800 font-bold border border-red-200">
                          {report.summary.criticalCount} Critical
                        </span>
                      )}
                    </div>

                    {/* Headline overview note */}
                    <div className="p-3 bg-red-50/70 rounded-xl border border-red-100 text-xs text-red-900 mb-5 leading-relaxed line-clamp-3">
                      <span className="font-bold block mb-0.5">Diagnostic Focus:</span>
                      {report.summary.headlineEn}
                    </div>
                  </div>

                  {/* Analyze Report Button */}
                  <button
                    onClick={() => handleLoadReport(report)}
                    className="w-full bg-[#7A3B2E] hover:bg-[#5c2b21] text-white py-3 px-4 rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>Analyze Report</span>
                    <svg className="w-4 h-4 text-[#D4A373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
