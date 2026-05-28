"use client";

import { useState, useEffect } from "react";

export default function AuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const auth = localStorage.getItem("swasthyaSetu_authenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setLang(localStorage.getItem("swasthyaSetu_lang") || "en");
    setMounted(true);

    const handleLangChange = () => {
      setLang(localStorage.getItem("swasthyaSetu_lang") || "en");
    };

    window.addEventListener("swasthyaSetu_languageChange", handleLangChange);
    return () => window.removeEventListener("swasthyaSetu_languageChange", handleLangChange);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId.trim().toLowerCase() === "subhasis mishra" && password.trim() === "2403") {
      localStorage.setItem("swasthyaSetu_authenticated", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError(
        lang === "en"
          ? "Invalid User ID or Password. Please try again."
          : "ଭୁଲ୍ ୟୁଜର୍ ଆଇଡି କିମ୍ବା ପାସୱାର୍ଡ। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।"
      );
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex-1 flex items-center justify-center bg-beige-bg">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-maroon"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex-1 flex items-center justify-center bg-beige-bg px-4 py-12 sambalpuri-pattern">
        <div className="max-w-md w-full bg-white/80 glass-card rounded-3xl shadow-xl p-8 border border-white/50 text-center flex flex-col gap-6">
          
          {/* Brand Logo Header */}
          <div className="flex flex-col items-center">
            <div className="p-4 bg-primary-maroon/5 rounded-full text-primary-maroon mb-3">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-primary-maroon tracking-tight">SwasthyaSetu</h2>
            <p className="text-xs text-gray-500 font-semibold mt-1">
              {lang === "en" ? "Prototype Access Authentication" : "ପ୍ରୋଟୋଟାଇପ୍ ପ୍ରବେଶ ପ୍ରମାଣୀକରଣ"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
            <div>
              <label className="block text-xs uppercase font-bold text-gray-400 mb-1.5 ml-1">
                {lang === "en" ? "User ID" : "ୟୁଜର୍ ଆଇଡି (User ID)"}
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder={lang === "en" ? "Enter User ID" : "ୟୁଜର୍ ଆଇଡି ଦିଅନ୍ତୁ"}
                required
                className="w-full bg-white/95 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-maroon focus:ring-1 focus:ring-primary-maroon font-medium text-gray-800 transition duration-150"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-bold text-gray-400 mb-1.5 ml-1">
                {lang === "en" ? "Password" : "ପାସୱାର୍ଡ (Password)"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={lang === "en" ? "Enter Password" : "ପାସୱାର୍ଡ ଦିଅନ୍ତୁ"}
                required
                className="w-full bg-white/95 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-maroon focus:ring-1 focus:ring-primary-maroon font-medium text-gray-800 transition duration-150"
              />
            </div>

            {error && (
              <p className="text-danger-red text-xs font-bold text-center mt-1 bg-red-50 py-2 rounded-lg border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-primary-maroon text-white font-bold py-3.5 rounded-xl hover:bg-opacity-95 transition duration-200 shadow-md shadow-primary-maroon/20 active:scale-[0.98] mt-2 cursor-pointer text-center text-sm"
            >
              {lang === "en" ? "Authenticate & Enter" : "ପ୍ରବେଶ କରନ୍ତୁ"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return children;
}
