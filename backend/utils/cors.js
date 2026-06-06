const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
  "https://medunraj-portfolio.vercel.app",
];

export const normalizeOrigin = (origin) => origin?.replace(/\/+$/, "").toLowerCase();

const envOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => normalizeOrigin(o.trim()))
  .filter(Boolean);

export const allowedOrigins = new Set([...defaultOrigins, ...envOrigins].map(normalizeOrigin));

export const isAllowedOrigin = (origin) => {
  if (!origin) return false;

  if (allowedOrigins.has(origin)) return true;

  if (origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1")) {
    return true;
  }

  return false;
};

export const withCors = (req, res) => {
  const origin = normalizeOrigin(req.headers.origin);
  const allowed = isAllowedOrigin(origin);

  console.log(`[CORS] origin=${origin || "(none)"} allowed=${allowed}`);
  console.log(`[CORS] ALLOWED_ORIGINS env=${process.env.ALLOWED_ORIGINS || "(unset)"}`);

  if (allowed) {
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
};