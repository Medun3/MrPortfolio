// Normalize VITE_API_BASE_URL (remove trailing slash and trim)
const rawBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "");
const isDev = Boolean(import.meta.env.DEV);

// Resolution strategy:
// 1. If VITE_API_BASE_URL is provided, use it (trimmed, no trailing slash)
// 2. If in dev and no env var, return empty string so fetch('/api/...') hits Vite proxy
// 3. In production with no env var, default to the Render backend URL
export const API_BASE_URL = rawBaseUrl || (isDev ? "" : "https://mrportfolio.onrender.com");

export const resumeDownloadUrl = API_BASE_URL ? `${API_BASE_URL}/api/resume/download` : "/api/resume/download";
