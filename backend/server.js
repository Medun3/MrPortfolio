import { sendError } from "./utils/http.js";
import dns from 'dns';
import http from "http";
import { createServer } from "node:http";
import nodemailer from "nodemailer"; // Ensure nodemailer is imported for transport creation
import { config } from "./config/env.js";
import { verifyContactEmailTransport } from "./models/contactModel.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import { downloadRoutes } from "./routes/downloadRoutes.js";
import { resumeRoutes } from "./routes/resumeRoutes.js";
import { withCors } from "./utils/cors.js";

dns.setDefaultResultOrder('ipv4first');
const routes = [contactRoutes, downloadRoutes, resumeRoutes];

const server = createServer(async (req, res) => {
  withCors(req, res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // Health check endpoint for probes and easy diagnostics
  if (url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  // Diagnostic endpoint (non-secret): returns status of key config flags
  if (url.pathname === "/_diag") {
    const payload = {
      status: "ok",
      port: config.port,
      emailConfigured: Boolean(config.emailUser && config.emailPass),
      nodeEnv: process.env.NODE_ENV || "development",
      allowedOrigins: process.env.ALLOWED_ORIGINS || null,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(payload));
    return;
  }

  if (url.pathname === "/_smtp-check" || url.pathname === "/test-email") {
    const token = req.headers["x-admin-token"] || url.searchParams.get("token");

    if (token !== config.adminToken) {
      sendError(res, 401, "Unauthorized.");
      return;
    }

    if (url.pathname === "/test-email") {
      try {
        const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transport.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: "Render Test Email",
          text: "Testing email from Render",
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: "Email sent successfully" }));
      } catch (error) {
        console.error("TEST EMAIL ERROR:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message, code: error.code }));
      }
      return;
    }

    try {
      await verifyContactEmailTransport();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", message: "Gmail SMTP verified." }));
    } catch (error) {
      console.error("SMTP diagnostic failed:", error);
      sendError(res, error.statusCode || 502, error.message || "Gmail SMTP verification failed.");
    }
    return;
  }

  try {
    for (const route of routes) {
      const handled = await route(req, res, url);
      if (handled) return;
    }

    sendError(res, 404, "Route not found.");
  } catch (error) {
    // Log full error for debugging and return safe message to client
    console.error("Unhandled server error:", error);
    sendError(res, error.statusCode || 500, error.message || "Server error.");
  }
});

// Global process handlers to surface unexpected crashes during startup/runtime
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${config.port} is already in use. Stop the existing backend or set a different PORT.`);
    console.error(`Find the process on Windows: netstat -ano | findstr :${config.port}`);
  } else {
    console.error("Server failed to start:", error);
  }
  process.exit(1);
});

server.listen(config.port, () => {
  console.log(`Portfolio backend running on http://localhost:${config.port}`);
});

// Startup diagnostics (do not log secrets)
console.log("Node env:", process.env.NODE_ENV || "development");
console.log("Email user configured:", Boolean(config.emailUser));
console.log("Email pass configured:", Boolean(config.emailPass));
console.log("Allowed origins:", process.env.ALLOWED_ORIGINS || "(default list)");

// (diagnostic endpoint handled above in main request handler)
