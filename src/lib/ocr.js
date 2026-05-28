/**
 * SwasthyaSetu Client-Side OCR Fallback (using Tesseract.js from CDN)
 */

function loadTesseract() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("OCR must be run in browser context"));
      return;
    }
    if (window.Tesseract) {
      resolve(window.Tesseract);
      return;
    }
    
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Tesseract) {
        resolve(window.Tesseract);
      } else {
        reject(new Error("Tesseract failed to initialize from CDN"));
      }
    };
    script.onerror = () => {
      reject(new Error("Failed to load Tesseract script from CDN"));
    };
    document.head.appendChild(script);
  });
}

export async function performOCR(file, onProgress) {
  try {
    const Tesseract = await loadTesseract();
    
    // recognize the file
    const result = await Tesseract.recognize(file, "eng", {
      logger: (m) => {
        if (onProgress && m.status === "recognizing text") {
          onProgress(Math.round(m.progress * 100));
        }
      },
    });
    
    return result.data.text;
  } catch (error) {
    console.error("OCR Extraction Error:", error);
    throw error;
  }
}
