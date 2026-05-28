/**
 * SwasthyaSetu Medical Report Analyzer Engine
 */

import medicalTests from "@/data/medicalTests.json";
import { extractParameters } from "./matcher.js";

// Helper to detect patient gender from report text
function detectGender(text) {
  const lowerText = text.toLowerCase();
  
  // Search for gender indicators
  const femalePattern = /\b(gender|sex)\s*:\s*female\b|\b(gender|sex)\s*:\s*f\b|\bfemale\b/i;
  const malePattern = /\b(gender|sex)\s*:\s*male\b|\b(gender|sex)\s*:\s*m\b|\bmale\b/i;
  
  if (femalePattern.test(lowerText)) {
    return "female";
  }
  if (malePattern.test(lowerText)) {
    return "male";
  }
  return "general";
}

// Helper to get normal range for a test based on gender
function getNormalRange(test, gender) {
  if (!test.normalRange) return null;
  
  if (test.normalRange.male && test.normalRange.female) {
    return gender === "female" ? test.normalRange.female : test.normalRange.male;
  }
  
  return test.normalRange; // general range
}

export function analyzeReport(text) {
  if (!text) return [];

  const gender = detectGender(text);
  const matchedParameters = extractParameters(text, medicalTests);
  const results = [];

  // Parse matched parameters
  for (const match of matchedParameters) {
    const test = medicalTests.find(t => t.id === match.testId);
    if (!test) continue;

    let status = "Normal";
    let remark = test.remarks.normal;
    let normalRangeStr = "";

    const isNumeric = match.value !== null;
    const range = getNormalRange(test, gender);

    if (isNumeric) {
      const val = match.value;
      if (range) {
        normalRangeStr = `${range.min} - ${range.max} ${test.unit}`;
        
        // Critical checks
        if (test.criticalRange) {
          const crit = test.criticalRange;
          if ((crit.min !== undefined && val < crit.min) || (crit.max !== undefined && val > crit.max)) {
            status = "Critical";
            remark = test.remarks.critical || test.remarks.low || test.remarks.high;
          }
        }
        
        // Standard high/low checks
        if (status !== "Critical") {
          if (val < range.min) {
            status = "Low";
            remark = test.remarks.low;
          } else if (val > range.max) {
            status = "High";
            remark = test.remarks.high;
          }
        }
      }
    } else {
      // Qualitative text checks
      const textVal = match.textValue;
      normalRangeStr = test.normalRangeText || "Negative / Normal";
      
      const normalValues = test.normalValues || ["negative", "non-reactive", "normal"];
      const isNormal = normalValues.some(nv => textVal.includes(nv));

      if (isNormal) {
        status = "Normal";
        remark = test.remarks.normal;
      } else {
        // Check for specific classifications (e.g. positive)
        status = test.abnormalStatus || "High";
        remark = test.remarks.abnormal || test.remarks.high;
        if (test.remarks.critical && (textVal.includes("positive") || textVal.includes("reactive"))) {
          status = "Critical";
          remark = test.remarks.critical;
        }
      }
    }

    results.push({
      id: test.id,
      parameter: test.name.en,
      name: test.name, // hold both languages
      value: isNumeric ? match.value : match.textValue,
      unit: test.unit || "",
      status,
      normalRange: normalRangeStr,
      description: test.description, // hold both languages
      remark: remark, // hold raw remark structure or string
      category: test.category,
    });
  }

  // Cross-parameter AI Insights & Warnings (Clinical correlations)
  applyClinicalCorrelations(results);

  return results;
}

function applyClinicalCorrelations(results) {
  // 1. G6PD Deficiency Drug Warning List
  const g6pdResult = results.find(r => r.id === "g6pd");
  if (g6pdResult && g6pdResult.status === "Low") {
    g6pdResult.aiInsight = {
      en: "WARNING: G6PD deficiency detected. Avoid triggers such as fava beans, mothballs, and medications like Aspirin, Sulfa drugs, and Antimalarials (Primaquine).",
      od: "ସତର୍କତା: ଜି୬ପିଡ଼ି ଅଭାବ ଚିହ୍ନଟ ହୋଇଛି। ଆସ୍ପିରିନ୍, ସଲଫା ଔଷଧ ଏବଂ ମ୍ୟାଲେରିଆ ନିରୋଧୀ ଔଷଧ ଖାଆନ୍ତୁ ନାହିଁ।"
    };
  }

  // 2. Dengue + Low Platelet Warning
  const dengueResult = results.find(r => r.id === "dengue");
  const plateletResult = results.find(r => r.id === "platelet_count");
  if (dengueResult && (dengueResult.value === "positive" || dengueResult.status === "High" || dengueResult.status === "Critical")) {
    if (plateletResult && plateletResult.value < 100000) {
      const emergencyStr = plateletResult.value < 20000 
        ? "EMERGENCY: Platelet count is critically low. High risk of internal bleeding. Require immediate hospitalization!"
        : "ALERT: Dengue positive with low platelet count. Monitor platelets daily and consult a doctor immediately.";
      const emergencyOdia = plateletResult.value < 20000
        ? "ଜରୁରୀକାଳୀନ: ପ୍ଲେଟଲେଟ୍ ମାତ୍ରା ଅତ୍ୟନ୍ତ କମ୍ ଅଛି। ରକ୍ତସ୍ରାବର ଭୟ ଅଛି। ତୁରନ୍ତ ଡାକ୍ତରଖାନାରେ ଭର୍ତ୍ତି ହୁଅନ୍ତୁ!"
        : "ସତର୍କତା: ଡେଙ୍ଗୁ ସହିତ ପ୍ଲେଟଲେଟ୍ ମାତ୍ରା କମ୍ ଅଛି। ପ୍ରତିଦିନ ପ୍ଲେଟଲେଟ୍ ଯାଞ୍ଚ କରନ୍ତୁ।";
      
      dengueResult.aiInsight = {
        en: emergencyStr,
        od: emergencyOdia
      };
      plateletResult.aiInsight = {
        en: emergencyStr,
        od: emergencyOdia
      };
    }
  }

  // 3. Kidney Function Correlation: High Urea + High Creatinine
  const ureaResult = results.find(r => r.id === "blood_urea");
  const creatinineResult = results.find(r => r.id === "creatinine");
  if (ureaResult && creatinineResult && ureaResult.status === "High" && creatinineResult.status === "High") {
    const insightStr = "Combined High Urea and Creatinine strongly indicates kidney dysfunction. Consult a nephrologist.";
    const insightOdia = "ୟୁରିଆ ଏବଂ କ୍ରିଏଟିନିନର ମିଳିତ ବୃଦ୍ଧି ବୃକ୍କ (କିଡନୀ) ରୋଗକୁ ଦର୍ଶାଏ। ତୁରନ୍ତ ଡାକ୍ତରଙ୍କ ସହିତ ପରାମର୍ଶ କରନ୍ତୁ।";
    ureaResult.aiInsight = { en: insightStr, od: insightOdia };
    creatinineResult.aiInsight = { en: insightStr, od: insightOdia };
  }

  // 4. Vitamin B12 + CBC Correlation (Low B12 + High MCV)
  const b12Result = results.find(r => r.id === "vit_b12");
  const mcvResult = results.find(r => r.id === "mcv"); // in case MCV is added
  if (b12Result && b12Result.status === "Low" && mcvResult && mcvResult.status === "High") {
    const insightStr = "Low B12 with High MCV suggests Macrocytic Anemia. Dietary changes or supplements recommended.";
    const insightOdia = "କମ୍ ବି୧୨ ଏବଂ ଅଧିକ ଏମସିଭି ମ୍ୟାକ୍ରୋସାଇଟିକ୍ ଆନିମିଆକୁ ଦର୍ଶାଏ। ସପ୍ଲିମେଣ୍ଟ ଆବଶ୍ୟକ ହୋଇପାରେ।";
    b12Result.aiInsight = { en: insightStr, od: insightOdia };
  }
}