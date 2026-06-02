const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
  "https://mr-portfolio-sepia.vercel.app",
  "https://mr-portfolio-qcwrfsa5f-medunrajs-projects.vercel.app",
]);

const normalizeOrigin = (origin) => origin?.replace(/\/+$/, "");

export const withCors = (req, res) => {
  const origin = normalizeOrigin(req.headers.origin);
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
};
