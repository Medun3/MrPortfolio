const defaultBaseUrl = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "http://localhost:5000" : "https://mrportfolio.onrender.com");

export const API_BASE_URL = defaultBaseUrl;
export const resumeDownloadUrl = `${API_BASE_URL}/api/resume/download`;
