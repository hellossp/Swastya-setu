/**
 * SwasthyaSetu Database Service
 * Uses Firebase Firestore if configured, with an automatic LocalStorage fallback.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Check if credentials are set
const isFirebaseEnabled = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

let db = null;
if (isFirebaseEnabled) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    console.log("Firebase Firestore initialized successfully.");
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.log("Firebase credentials not configured. Falling back to LocalStorage database.");
}

// Fetch all saved reports from LocalStorage
function getReportsFromLocalStorage() {
  try {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("swasthyaSetu_history");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to retrieve reports from LocalStorage:", error);
    return [];
  }
}

// Save a report to the database
export async function saveReport(fileName, analysis, text = "") {
  const newReport = {
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
    timestamp: Date.now() // to allow sorting
  };

  if (db) {
    try {
      const docRef = await addDoc(collection(db, "reports"), newReport);
      return { id: docRef.id, ...newReport };
    } catch (error) {
      console.error("Firestore save failed, falling back to LocalStorage:", error);
    }
  }

  // LocalStorage fallback
  try {
    const localReport = { id: "report_" + Date.now(), ...newReport };
    const history = getReportsFromLocalStorage();
    const updated = [localReport, ...history];
    localStorage.setItem("swasthyaSetu_history", JSON.stringify(updated));
    return localReport;
  } catch (error) {
    console.error("Failed to save report to LocalStorage:", error);
    throw error;
  }
}

// Fetch all saved reports
export async function getReports() {
  if (db) {
    try {
      const q = query(collection(db, "reports"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const reports = [];
      querySnapshot.forEach((doc) => {
        reports.push({ id: doc.id, ...doc.data() });
      });
      return reports;
    } catch (error) {
      console.error("Firestore fetch failed, falling back to LocalStorage:", error);
    }
  }

  return getReportsFromLocalStorage();
}

// Delete a report from history
export async function deleteReport(id) {
  if (db) {
    try {
      // Check if document exists in Firestore (Firestore IDs do not start with "report_")
      if (id && !id.startsWith("report_")) {
        await deleteDoc(doc(db, "reports", id));
        return true;
      }
    } catch (error) {
      console.error("Firestore delete failed, falling back to LocalStorage:", error);
    }
  }

  // LocalStorage delete fallback
  try {
    const history = getReportsFromLocalStorage();
    const filtered = history.filter((r) => r.id !== id);
    localStorage.setItem("swasthyaSetu_history", JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Failed to delete report:", error);
    return false;
  }
}
