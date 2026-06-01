import { createServer } from "node:http";
import { config } from "./config/env.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import { downloadRoutes } from "./routes/downloadRoutes.js";
import { resumeRoutes } from "./routes/resumeRoutes.js";
import { withCors } from "./utils/cors.js";
import { sendError } from "./utils/http.js";

const routes = [contactRoutes, downloadRoutes, resumeRoutes];

const server = createServer(async (req, res) => {
  withCors(req, res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  try {
    for (const route of routes) {
      const handled = await route(req, res, url);
      if (handled) return;
    }

    sendError(res, 404, "Route not found.");
  } catch (error) {
    sendError(res, error.statusCode || 500, error.message || "Server error.");
  }
});

server.listen(config.port, () => {
  console.log(`Portfolio backend running on http://localhost:${config.port}`);
});
