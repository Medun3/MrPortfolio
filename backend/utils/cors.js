const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
  "https://medunraj-portfolio.vercel.app",
  "https://mr-portfolio-88r8benhy-medunrajs-projects.vercel.app",
];

const normalizeOrigin = (origin) => origin?.replace(/\/+$/, "").toLowerCase();

const envOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => normalizeOrigin(o.trim()))
  .filter(Boolean);

const allowedOrigins = new Set([...defaultOrigins, ...envOrigins].map(normalizeOrigin));

const isAllowedOrigin = (origin) => {
  if (!origin) return false;
  
  // Direct match
  if (allowedOrigins.has(origin)) return true;
  
  // Wildcard match for Vercel and Render
  if (origin.endsWith(".vercel.app") || origin.endsWith(".onrender.com")) return true;
  
  // Localhost for development
  if (origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1")) return true;
  
  return false;
};

export const withCors = (req, res) => {
  const origin = normalizeOrigin(req.headers.origin);

  if (isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  } else if (process.env.NODE_ENV !== "production") {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Max-Age", "86400");
  
  if (process.env.NODE_ENV !== "production") {
    console.log(`[CORS] Origin: ${origin}, Allowed: ${isAllowedOrigin(origin)}`);
  }
};
