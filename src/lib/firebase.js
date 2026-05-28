/**
 * SwasthyaSetu Database Service
 * Uses localStorage as a reliable fallback database.
 */

// Save a report to the user's history
export async function saveReport(fileName, analysis, text = "") {
  try {
    const newReport = {
      id: "report_" + Date.now(),
      fileName,
      date: new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: new Date().toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      analysis,
      text,
    };

    const history = await getReports();
    const updated = [newReport, ...history];
    localStorage.setItem("swasthyaSetu_history", JSON.stringify(updated));
    return newReport;
  } catch (error) {
    console.error("Failed to save report to database:", error);
    throw error;
  }
}

// Fetch all saved reports
export async function getReports() {
  try {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("swasthyaSetu_history");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to retrieve reports:", error);
    return [];
  }
}

// Delete a report from history
export async function deleteReport(id) {
  try {
    const history = await getReports();
    const filtered = history.filter((r) => r.id !== id);
    localStorage.setItem("swasthyaSetu_history", JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Failed to delete report:", error);
    return false;
  }
}
