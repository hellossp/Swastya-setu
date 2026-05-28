"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { performOCR } from "@/lib/ocr";
import Loader from "@/components/ui/Loader";

// Helper to dynamically load PDF.js from CDN
const loadPdfJs = () => {
  return new Promise((resolve, reject) => {
    if (window.pdfjsLib) {
      resolve(window.pdfjsLib);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js";
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
      resolve(window.pdfjsLib);
    };
    script.onerror = () => {
      reject(new Error("Failed to load PDF parsing library."));
    };
    document.head.appendChild(script);
  });
};

// Helper to extract text from PDF file in browser
const extractTextFromPdf = async (file) => {
  const pdfjsLib = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item) => item.str);
    text += strings.join(" ") + "\n";
  }
  return text;
};

export default function UploadBox() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [progress, setProgress] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const processFile = async (uploadedFile) => {
    setFile(uploadedFile);
    setLoading(true);
    setErrorMsg("");
    setProgress(null);

    const isImage = uploadedFile.type.startsWith("image/");

    try {
      let analysisResult = null;
      let extractedText = "";

      if (isImage) {
        setLoadingMsg("Scanning image report using AI OCR...");
        
        // Run Client-Side OCR
        extractedText = await performOCR(uploadedFile, (pct) => {
          setProgress(pct);
        });

        if (!extractedText || extractedText.trim().length === 0) {
          throw new Error("No readable text found in the image. Please try a clearer picture.");
        }

        setLoadingMsg("Analyzing report parameters and clinical ranges...");
        setProgress(null);

        // Send extracted text to API
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: extractedText }),
        });

        if (!response.ok) {
          throw new Error(`Server returned error: ${response.statusText || response.status}`);
        }

        analysisResult = await response.json();
      } else {
        setLoadingMsg("Extracting pathology data from PDF report...");
        
        try {
          // Attempt client-side PDF text extraction
          extractedText = await extractTextFromPdf(uploadedFile);
          
          if (!extractedText || extractedText.trim().length === 0) {
            throw new Error("No selectable text found in the PDF. If this is a scanned PDF, please upload it as an image (JPG/PNG).");
          }

          setLoadingMsg("Analyzing report parameters and clinical ranges...");
          
          const response = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: extractedText }),
          });

          if (!response.ok) {
            throw new Error(`Server returned error: ${response.statusText || response.status}`);
          }

          analysisResult = await response.json();
        } catch (clientPdfError) {
          console.warn("Client-side PDF extraction failed, trying server-side backup:", clientPdfError);
          
          // Fall back to server-side PDF extraction if client-side failed
          setLoadingMsg("Running server-side backup extraction...");
          const formData = new FormData();
          formData.append("file", uploadedFile);

          const response = await fetch("/api/extract", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            if (response.status === 413) {
              throw new Error("The file is too large for server-side processing. Vercel restricts uploads to 4.5MB. Please upload a smaller PDF or an image.");
            }
            throw new Error(`Server returned error: ${response.statusText || response.status}`);
          }

          analysisResult = await response.json();
        }
      }

      if (analysisResult && analysisResult.success) {
        // Save to localStorage for the dashboard page to consume
        localStorage.setItem("swasthyaSetu_currentAnalysis", JSON.stringify(analysisResult.analysis));
        localStorage.setItem("swasthyaSetu_currentText", analysisResult.text || extractedText || "");
        localStorage.setItem("swasthyaSetu_fileName", uploadedFile.name);
        localStorage.setItem("swasthyaSetu_fileSize", (uploadedFile.size / 1024).toFixed(1) + " KB");
        localStorage.setItem("swasthyaSetu_fileType", uploadedFile.type);

        // Redirect to Dashboard
        router.push("/dashboard");
      } else {
        throw new Error(analysisResult?.message || "Pathology analysis failed.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message || "An unexpected error occurred during processing.");
      setLoading(false);
      setFile(null);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      await processFile(uploadedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: loading,
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    multiple: false,
  });

  return (
    <div className="bg-white/80 glass-card rounded-3xl shadow-xl p-4 sm:p-8 max-w-2xl mx-auto border border-white/50">
      {loading ? (
        <div className="py-12 flex flex-col items-center">
          <Loader 
            message={loadingMsg} 
            subMessage={file ? `Processing: ${file.name}` : ""} 
            progress={progress} 
          />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-12 md:p-16 text-center transition duration-300 cursor-pointer flex flex-col items-center
          ${isDragActive
              ? "border-primary-maroon bg-[#7A3B2E]/5"
              : "border-[#D4A373] hover:bg-[#faf6f0] hover:border-primary-maroon"
            }`}
        >
          <input {...getInputProps()} />
          
          {/* Custom SVG Premium Cloud Upload Icon */}
          <div className="p-4 bg-[#7A3B2E]/5 rounded-full text-primary-maroon mb-6">
            <svg
              className="w-12 h-12 animate-pulse-subtle"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-primary-maroon mb-2">
            Drag & Drop Report
          </h2>

          <p className="text-gray-600 mb-6 text-sm">
            Upload PDF, JPG or PNG medical reports (Max 5MB)
          </p>

          <button className="bg-primary-maroon text-white font-medium px-8 py-3 rounded-xl hover:bg-opacity-95 transition shadow-md shadow-primary-maroon/20 active:scale-95">
            Choose File
          </button>

          {errorMsg && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 text-danger-red text-sm font-semibold border border-red-100 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errorMsg}
            </div>
          )}
        </div>
      )}
    </div>
  );
}