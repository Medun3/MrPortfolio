const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
  "https://mr-portfolio-sepia.vercel.app",
  "https://mr-portfolio-b7jycsx69-medunrajs-projects.vercel.app",
];

const normalizeOrigin = (origin) => origin?.replace(/\/+$/, "");

const envOrigins = (process.env.ALLOWED_ORIGINS || "").split(",");
const allowedOrigins = new Set(
  [...defaultOrigins, ...envOrigins]
    .map((origin) => normalizeOrigin(origin.trim()))
    .filter(Boolean)
);

const isAllowedOrigin = (origin) =>
  origin &&
  (allowedOrigins.has(origin) ||
    origin.endsWith(".vercel.app") ||
    origin.endsWith(".onrender.com"));

export const withCors = (req, res) => {
  const origin = normalizeOrigin(req.headers.origin);

  if (isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (process.env.NODE_ENV !== "production") {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Max-Age", "86400");
};
