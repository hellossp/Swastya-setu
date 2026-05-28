/**
 * SwasthyaSetu Translation and Localization Helper
 */

import odiaTranslations from "@/data/odiaTranslations.json";

/**
 * Translates a UI key into English or Odia
 * @param {string} key 
 * @param {string} lang - 'en' or 'od'
 * @returns {string}
 */
export function t(key, lang = "en") {
  if (lang === "en") {
    // If we have a custom english override in the translation file, use it, otherwise return the key itself
    const enKey = `${key}_en`;
    if (odiaTranslations[enKey]) {
      return odiaTranslations[enKey];
    }
    // Remove underscores and capitalize first letter as a fallback
    return odiaTranslations[key] ? key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()) : key;
  }

  // Odia translation lookup
  return odiaTranslations[key] || odiaTranslations[`${key}_od`] || key;
}

/**
 * Helper to translate standard test statuses
 * @param {string} status - 'Normal', 'High', 'Low', 'Critical'
 * @param {string} lang 
 * @returns {string}
 */
export function translateStatus(status, lang = "en") {
  if (lang === "en") return status;
  
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case "normal":
      return t("status_normal", "od");
    case "high":
      return t("status_high", "od");
    case "low":
      return t("status_low", "od");
    case "critical":
      return t("status_critical", "od");
    default:
      return status;
  }
}
