/**
 * SwasthyaSetu Formatting Utilities
 */

/**
 * Format bytes to readable size
 * @param {number} bytes 
 * @returns {string}
 */
export function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

/**
 * Format raw date to localized string
 * @param {string|Date} date 
 * @param {string} lang 
 * @returns {string}
 */
export function formatDate(date, lang = "en") {
  const d = new Date(date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return d.toLocaleDateString(lang === "en" ? "en-US" : "or-IN", options);
}

/**
 * Clean and parse test numeric values
 * @param {number|string} val 
 * @returns {number}
 */
export function formatNumber(val) {
  const parsed = parseFloat(val);
  return isNaN(parsed) ? 0 : parsed;
}
