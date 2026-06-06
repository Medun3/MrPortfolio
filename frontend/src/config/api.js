const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, "") || "";
export const API_BASE_URL = import.meta.env.DEV
  ? rawBaseUrl === "http://localhost:5000"
    ? ""
    : rawBaseUrl
  : rawBaseUrl || "https://mrportfolio.onrender.com";
export const resumeDownloadUrl = `${API_BASE_URL}/api/resume/download`;
export const contactUrl = `${API_BASE_URL}/api/contact`;
