const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, "") || "";
export const API_BASE_URL = rawBaseUrl === "http://localhost:5000" && import.meta.env.DEV ? "" : rawBaseUrl;
export const resumeDownloadUrl = `${API_BASE_URL}/api/resume/download`;
