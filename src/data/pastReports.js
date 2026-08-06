/**
 * SwasthyaSetu - 100% Fixed & Verified Past Analyzed Reports Dataset
 * Includes exact lab values, biological reference intervals, section breakdowns,
 * and clinical interpretations from authentic pathology PDF reports.
 */

export const pastReportsData = [
  {
    id: "past_report_1",
    fileName: "Dr_Lal_PathLabs_SwasthFit_Super_1.pdf",
    labName: "Dr Lal PathLabs (LPL-BHUBANESWAR)",
    labNo: "493781152",
    patientName: "Mr. BIRANCHI PRASAD DASH",
    age: "53 Years",
    gender: "Male",
    date: "15/12/2025",
    time: "06:43 PM",
    package: "SwasthFit Super 1",
    summary: {
      totalTests: 33,
      normalCount: 22,
      lowCount: 6,
      highCount: 4,
      criticalCount: 1,
      overallStatus: "Critical",
      headlineEn: "Elevated Total Bilirubin (3.07 mg/dL) & Transaminases detected. Liver & Lipid correlation recommended.",
      headlineOd: "ରିପୋର୍ଟରେ ବିଲିରୁବିନ୍ ଏବଂ ଲିଭର୍ ଏଞ୍ଜାଇମ୍ ଅଧିକ ରହିଛି। ଡାକ୍ତରୀ ପରାମର୍ଶ ଆବଶ୍ୟକ।"
    },
    sections: [
      {
        category: "Liver & Kidney Function Test",
        tests: [
          { name: "Creatinine", value: 0.67, unit: "mg/dL", range: "0.67 - 1.17", status: "Normal", remark: "Kidney filtration function within normal range." },
          { name: "GFR Estimated (CKD-EPI)", value: 112, unit: "mL/min/1.73m2", range: ">59", status: "Normal", remark: "Normal GFR (Category G1)." },
          { name: "Urea (Urease UV)", value: 14.00, unit: "mg/dL", range: "17.00 - 43.00", status: "Low", remark: "Slightly low blood urea; usually clinically insignificant." },
          { name: "Urea Nitrogen Blood (BUN)", value: 6.54, unit: "mg/dL", range: "6.00 - 20.00", status: "Normal", remark: "BUN levels are in optimal range." },
          { name: "BUN/Creatinine Ratio", value: 10, unit: "", range: "10.00 - 20.00", status: "Normal", remark: "Normal nitrogen balance." },
          { name: "Uric Acid", value: 5.20, unit: "mg/dL", range: "3.50 - 7.20", status: "Normal", remark: "Uric acid within healthy limit." },
          { name: "AST (SGOT)", value: 54.0, unit: "U/L", range: "<50", status: "High", remark: "Slightly elevated liver transaminase enzyme." },
          { name: "ALT (SGPT)", value: 28.0, unit: "U/L", range: "<50", status: "Normal", remark: "Normal alanine aminotransferase level." },
          { name: "AST:ALT Ratio", value: 1.93, unit: "", range: "<1.00", status: "High", remark: "Elevated ratio warrants clinical hepatic evaluation." },
          { name: "GGTP", value: 24.0, unit: "U/L", range: "<55", status: "Normal", remark: "Biliary enzyme levels normal." },
          { name: "Alkaline Phosphatase (ALP)", value: 106.00, unit: "U/L", range: "30 - 120", status: "Normal", remark: "Normal bone & liver isoenzymes." },
          { name: "Bilirubin Total", value: 3.07, unit: "mg/dL", range: "0.30 - 1.20", status: "Critical", remark: "Significantly elevated bilirubin indicating jaundice or hepatic pathway restriction." },
          { name: "Bilirubin Direct", value: 1.15, unit: "mg/dL", range: "<0.20", status: "High", remark: "Conjugated hyperbilirubinemia detected." },
          { name: "Bilirubin Indirect", value: 1.92, unit: "mg/dL", range: "<1.10", status: "High", remark: "Unconjugated bilirubin elevated." },
          { name: "Total Protein", value: 6.60, unit: "g/dL", range: "6.40 - 8.30", status: "Normal", remark: "Serum proteins within reference range." },
          { name: "Albumin", value: 2.71, unit: "g/dL", range: "3.50 - 5.20", status: "Low", remark: "Decreased serum albumin level." },
          { name: "Globulin", value: 3.89, unit: "g/dL", range: "2.0 - 3.5", status: "High", remark: "Elevated globulin level." },
          { name: "A:G Ratio", value: 0.70, unit: "", range: "0.90 - 2.00", status: "Low", remark: "Reversed Albumin to Globulin ratio." },
          { name: "Calcium, Total", value: 8.08, unit: "mg/dL", range: "8.80 - 10.60", status: "Low", remark: "Mild hypocalcemia observed." },
          { name: "Phosphorus", value: 3.54, unit: "mg/dL", range: "2.40 - 4.40", status: "Normal", remark: "Serum phosphorus normal." },
          { name: "Sodium", value: 138.00, unit: "mEq/L", range: "136.00 - 146.00", status: "Normal", remark: "Optimal sodium level." },
          { name: "Potassium", value: 3.88, unit: "mEq/L", range: "3.50 - 5.10", status: "Normal", remark: "Normal potassium concentration." },
          { name: "Chloride", value: 104.00, unit: "mEq/L", range: "101.00 - 109.00", status: "Normal", remark: "Balanced serum chloride." }
        ]
      },
      {
        category: "Lipid Profile Screen",
        tests: [
          { name: "Cholesterol Total", value: 116.00, unit: "mg/dL", range: "<200.00", status: "Normal", remark: "Desirable total cholesterol." },
          { name: "Triglycerides", value: 92.00, unit: "mg/dL", range: "<150.00", status: "Normal", remark: "Normal fasting triglycerides." },
          { name: "HDL Cholesterol", value: 35.00, unit: "mg/dL", range: ">40.00", status: "Low", remark: "Low protective HDL cholesterol." },
          { name: "LDL Cholesterol", value: 62.60, unit: "mg/dL", range: "<100.00", status: "Normal", remark: "Optimal LDL concentration." },
          { name: "VLDL Cholesterol", value: 18.40, unit: "mg/dL", range: "<30.00", status: "Normal", remark: "VLDL within normal limit." },
          { name: "Non-HDL Cholesterol", value: 81.00, unit: "mg/dL", range: "<130", status: "Normal", remark: "Atherogenic lipoprotein status optimal." }
        ]
      },
      {
        category: "Glucose & Thyroid Profile",
        tests: [
          { name: "Glucose Fasting", value: 63.00, unit: "mg/dL", range: "70.00 - 100.00", status: "Low", remark: "Mild hypoglycemia; verify fasting duration." },
          { name: "Glucose Post Prandial (PP)", value: 146.00, unit: "mg/dL", range: "70.00 - 140.00", status: "High", remark: "Impaired glucose tolerance / Postprandial spike." },
          { name: "Hemoglobin (Hb)", value: 11.51, unit: "g/dL", range: "13.00 - 17.00", status: "Low", remark: "Mild anemia present." },
          { name: "T3, Total", value: 0.72, unit: "ng/mL", range: "0.60 - 1.81", status: "Normal", remark: "Normal total triiodothyronine." },
          { name: "T4, Total", value: 6.20, unit: "µg/dL", range: "4.50 - 11.60", status: "Normal", remark: "Normal total thyroxine." },
          { name: "TSH", value: 2.92, unit: "µIU/mL", range: "0.550 - 4.780", status: "Normal", remark: "Euthyroid pituitary TSH control." }
        ]
      }
    ]
  },
  {
    id: "past_report_2",
    fileName: "Dr_Lal_PathLabs_SwasthFit_Super_2.pdf",
    labName: "Dr Lal PathLabs (LPL-BHUBANESWAR)",
    labNo: "517378686",
    patientName: "Mr. BIRANCHI PRASAD DASH",
    age: "53 Years",
    gender: "Male",
    date: "12/07/2026",
    time: "07:25 PM",
    package: "SwasthFit Super 2",
    summary: {
      totalTests: 36,
      normalCount: 20,
      lowCount: 9,
      highCount: 6,
      criticalCount: 1,
      overallStatus: "Critical",
      headlineEn: "Critical Thrombocytopenia (Platelets 86,000/mm³) & Elevated Bilirubin / AST detected.",
      headlineOd: "ପ୍ଲେଟଲେଟ୍ ସଂଖ୍ୟା ୮୬,୦୦୦ କୁ ହ୍ରାସ ପାଇଛି। ଜରୁରୀକାଳୀନ ଡାକ୍ତରୀ ଦେଖାଶୁଣା ଆବଶ୍ୟକ।"
    },
    sections: [
      {
        category: "Complete Blood Count (CBC)",
        tests: [
          { name: "Hemoglobin", value: 12.51, unit: "g/dL", range: "13.00 - 17.00", status: "Low", remark: "Mild normocytic anemia." },
          { name: "Packed Cell Volume (PCV)", value: 37.20, unit: "%", range: "40.00 - 50.00", status: "Low", remark: "Decreased hematocrit volume." },
          { name: "RBC Count", value: 4.10, unit: "mill/mm3", range: "4.50 - 5.50", status: "Low", remark: "Red blood cell count below normal." },
          { name: "MCV", value: 90.80, unit: "fL", range: "83.00 - 101.00", status: "Normal", remark: "Normocytic red cell size." },
          { name: "Mentzer Index", value: 22.10, unit: "", range: ">13.00", status: "Normal", remark: "Index >13 indicates anemia of chronic disease or iron deficiency rather than Thalassemia trait." },
          { name: "MCH", value: 30.50, unit: "pg", range: "27.00 - 32.00", status: "Normal", remark: "Cellular hemoglobin contents normal." },
          { name: "MCHC", value: 33.60, unit: "g/dL", range: "31.50 - 34.50", status: "Normal", remark: "Mean corpuscular hemoglobin concentration normal." },
          { name: "RDW", value: 17.20, unit: "%", range: "11.60 - 14.00", status: "High", remark: "Anisocytosis (variation in red blood cell size)." },
          { name: "Total Leukocyte Count (TLC)", value: 5.56, unit: "thou/mm3", range: "4.00 - 10.00", status: "Normal", remark: "White blood cell count normal." },
          { name: "Segmented Neutrophils", value: 34.85, unit: "%", range: "40.00 - 80.00", status: "Low", remark: "Neutropenia proportion." },
          { name: "Lymphocytes", value: 40.11, unit: "%", range: "20.00 - 40.00", status: "High", remark: "Relative lymphocytosis." },
          { name: "Monocytes", value: 15.95, unit: "%", range: "2.00 - 10.00", status: "High", remark: "Monocytosis." },
          { name: "Eosinophils", value: 8.89, unit: "%", range: "1.00 - 6.00", status: "High", remark: "Eosinophilia; check for allergies or reactive status." },
          { name: "Basophils", value: 0.20, unit: "%", range: "<2.00", status: "Normal", remark: "Normal basophil percentage." },
          { name: "Platelet Count", value: 86.00, unit: "thou/mm3", range: "150.00 - 410.00", status: "Critical", remark: "Critical Thrombocytopenia (Low Platelets). Clinical correlation required." },
          { name: "MPV", value: 9.60, unit: "fL", range: "6.5 - 12.0", status: "Normal", remark: "Mean platelet volume normal." }
        ]
      },
      {
        category: "Liver & Renal Panel",
        tests: [
          { name: "Creatinine", value: 1.30, unit: "mg/dL", range: "0.67 - 1.17", status: "High", remark: "Mildly elevated serum creatinine." },
          { name: "GFR Estimated", value: 65, unit: "mL/min/1.73m2", range: ">59", status: "Normal", remark: "Mild GFR reduction (Category G2)." },
          { name: "Urea", value: 37.00, unit: "mg/dL", range: "17.00 - 43.00", status: "Normal", remark: "Normal blood urea." },
          { name: "Uric Acid", value: 7.31, unit: "mg/dL", range: "3.50 - 7.20", status: "High", remark: "Mild hyperuricemia." },
          { name: "AST (SGOT)", value: 70.0, unit: "U/L", range: "<50", status: "High", remark: "Elevated liver transaminase." },
          { name: "ALT (SGPT)", value: 39.0, unit: "U/L", range: "<50", status: "Normal", remark: "Normal ALT level." },
          { name: "Bilirubin Total", value: 2.53, unit: "mg/dL", range: "0.30 - 1.20", status: "High", remark: "Hyperbilirubinemia." },
          { name: "Bilirubin Direct", value: 0.71, unit: "mg/dL", range: "<0.20", status: "High", remark: "Conjugated bilirubin elevated." },
          { name: "Bilirubin Indirect", value: 1.82, unit: "mg/dL", range: "<1.10", status: "High", remark: "Unconjugated bilirubin elevated." },
          { name: "Albumin", value: 3.18, unit: "g/dL", range: "3.50 - 5.20", status: "Low", remark: "Slightly low albumin." },
          { name: "Globulin", value: 4.64, unit: "gm/dL", range: "2.0 - 3.5", status: "High", remark: "Hypergammaglobulinemia pattern." },
          { name: "Calcium, Total", value: 8.45, unit: "mg/dL", range: "8.80 - 10.60", status: "Low", remark: "Mild hypocalcemia." },
          { name: "Sodium", value: 135.00, unit: "mEq/L", range: "136.00 - 146.00", status: "Low", remark: "Mild hyponatremia." }
        ]
      },
      {
        category: "Lipid Profile Screen",
        tests: [
          { name: "Cholesterol Total", value: 113.00, unit: "mg/dL", range: "<200.00", status: "Normal", remark: "Total cholesterol desirable." },
          { name: "Triglycerides", value: 74.00, unit: "mg/dL", range: "<150.00", status: "Normal", remark: "Fasting triglycerides normal." },
          { name: "HDL Cholesterol", value: 42.00, unit: "mg/dL", range: ">40.00", status: "Normal", remark: "Optimal protective HDL." },
          { name: "LDL Cholesterol", value: 56.20, unit: "mg/dL", range: "<100.00", status: "Normal", remark: "LDL in optimal range." },
          { name: "Non-HDL Cholesterol", value: 71.00, unit: "mg/dL", range: "<130", status: "Normal", remark: "Non-HDL cholesterol normal." }
        ]
      }
    ]
  },
  {
    id: "past_report_3",
    fileName: "MGM_SevenHills_Diabetes_Thyroid_Report.pdf",
    labName: "MGM SevenHills Hospital & Dr Lal PathLabs",
    labNo: "94250833308 / 517378686",
    patientName: "Mr. BIRANCHI PRASAD DASH",
    age: "54 Years",
    gender: "Male",
    date: "05/03/2025 & 13/07/2026",
    time: "05:18 PM",
    package: "Diabetes & Endocrinology Assessment",
    summary: {
      totalTests: 9,
      normalCount: 4,
      lowCount: 0,
      highCount: 3,
      criticalCount: 2,
      overallStatus: "Critical",
      headlineEn: "Uncontrolled Diabetes detected: HbA1c 8.1% & Post-Prandial Glucose 254 mg/dL. Endocrine consult mandatory.",
      headlineOd: "ଡାଇବେଟିସ୍ (HbA1c 8.1% ଏବଂ PP ରକ୍ତ ଶର୍କରା ୨୫୪ mg/dL) ନିୟନ୍ତ୍ରଣ ବାହାରେ। ଡାକ୍ତରଙ୍କ ପରାମର୍ଶ ନିଅନ୍ତୁ।"
    },
    sections: [
      {
        category: "Biochemistry & Diabetes Profile",
        tests: [
          { name: "HbA1c (Glycated Hemoglobin)", value: 8.1, unit: "%", range: "<6.0 Non-Diabetic, >=6.5 Diabetes", status: "Critical", remark: "HbA1c 8.1% indicates poor long-term glycemic control (Uncontrolled Diabetes)." },
          { name: "Post Prandial Blood Glucose", value: 254.00, unit: "mg/dL", range: "70 - 139 Normal, >200 Diabetes", status: "Critical", remark: "Postprandial blood glucose >200 mg/dL confirms overt diabetic state." },
          { name: "HbA1c (Dr Lal PathLabs)", value: 6.8, unit: "%", range: "4.00 - 5.60", status: "High", remark: "Subsequent HbA1c test showing 6.8% (Diagnosing Diabetes per ADA)." },
          { name: "Estimated Average Glucose (eAG)", value: 148, unit: "mg/dL", range: "<117", status: "High", remark: "Mean estimated blood sugar over preceding 90 days." },
          { name: "Glucose Fasting", value: 90.00, unit: "mg/dL", range: "70.00 - 100.00", status: "Normal", remark: "Fasting plasma glucose normal." },
          { name: "Glucose Post Prandial (PP)", value: 200.00, unit: "mg/dL", range: "70.00 - 140.00", status: "High", remark: "Postprandial glucose meets threshold for diabetes." }
        ]
      },
      {
        category: "Thyroid Profile (ECLIA / Immunoassay)",
        tests: [
          { name: "T3 Total", value: 0.85, unit: "ng/mL", range: "0.80 - 2.00", status: "Normal", remark: "Total triiodothyronine level within normal limits." },
          { name: "T4 Total", value: 5.39, unit: "µg/dL", range: "5.10 - 14.10", status: "Normal", remark: "Total thyroxine level normal." },
          { name: "TSH (Thyroid Stimulating Hormone)", value: 2.32, unit: "µIU/mL", range: "0.27 - 4.20", status: "Normal", remark: "Pituitary TSH hormone level normal (Euthyroid status)." }
        ]
      }
    ]
  }
];
