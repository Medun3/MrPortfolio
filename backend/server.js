import { createServer } from "node:http";
import dns from "node:dns";
import nodemailer from "nodemailer";

import { config } from "./config/env.js";
import { verifyContactEmailTransport } from "./models/contactModel.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import { downloadRoutes } from "./routes/downloadRoutes.js";
import { resumeRoutes } from "./routes/resumeRoutes.js";
import { withCors } from "./utils/cors.js";
import { sendError } from "./utils/http.js";

dns.setDefaultResultOrder("ipv4first");

const routes = [
  contactRoutes,
  downloadRoutes,
  resumeRoutes,
];

const server = createServer(async (req, res) => {
  withCors(req, res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // =========================
  // HEALTH CHECK
  // =========================
  if (url.pathname === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        success: true,
        status: "ok",
        timestamp: new Date().toISOString(),
      })
    );

    return;
  }

  // =========================
  // CONFIG DIAGNOSTICS
  // =========================
  if (url.pathname === "/_diag") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        status: "ok",
        nodeEnv: process.env.NODE_ENV || "development",
        port: config.port,
        emailConfigured: Boolean(
          config.emailUser && config.emailPass
        ),
        emailUser: config.emailUser
          ? `${config.emailUser.substring(0, 4)}***`
          : null,
        allowedOrigins:
          process.env.ALLOWED_ORIGINS || null,
      })
    );

    return;
  }

  // =========================
  // SMTP VERIFY
  // =========================
  if (url.pathname === "/_smtp-check") {
    const token =
      req.headers["x-admin-token"] ||
      url.searchParams.get("token");

    if (token !== config.adminToken) {
      sendError(res, 401, "Unauthorized");
      return;
    }

    try {
      await verifyContactEmailTransport();

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          success: true,
          message: "SMTP verified successfully",
        })
      );
    } catch (error) {
      console.error("SMTP VERIFY ERROR:", error);

      sendError(
        res,
        502,
        error.message || "SMTP verification failed"
      );
    }

    return;
  }

  // =========================
  // SEND TEST EMAIL
  // =========================
  if (url.pathname === "/test-email") {
    const token =
      req.headers["x-admin-token"] ||
      url.searchParams.get("token");

    if (token !== config.adminToken) {
      sendError(res, 401, "Unauthorized");
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: config.emailUser,
          pass: config.emailPass,
        },
        connectionTimeout: 30000,
        greetingTimeout: 30000,
        socketTimeout: 30000,
      });

      await transporter.verify();

      const info = await transporter.sendMail({
        from: `"Portfolio Contact" <${config.emailUser}>`,
        to: config.emailUser,
        subject: "Portfolio SMTP Test",
        html: `
          <h2>SMTP Test Successful</h2>
          <p>Your backend is successfully connected to Gmail SMTP.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        `,
      });

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          success: true,
          message: "Test email sent successfully",
          messageId: info.messageId,
        })
      );
    } catch (error) {
      console.error("TEST EMAIL ERROR:", error);

      res.writeHead(500, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          success: false,
          error: error.message,
          code: error.code,
        })
      );
    }

    return;
  }

  // =========================
  // APPLICATION ROUTES
  // =========================
  try {
    for (const route of routes) {
      const handled = await route(req, res, url);

      if (handled) {
        return;
      }
    }

    sendError(res, 404, "Route not found");
  } catch (error) {
    console.error("SERVER ERROR:", error);

    sendError(
      res,
      error.statusCode || 500,
      error.message || "Internal server error"
    );
  }
});

// =========================
// PROCESS ERROR HANDLERS
// =========================

process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION:", error);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});

// =========================
// SERVER ERROR HANDLER
// =========================

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${config.port} is already in use`
    );
  } else {
    console.error("SERVER START ERROR:", error);
  }

  process.exit(1);
});

// =========================
// START SERVER
// =========================

server.listen(config.port, async () => {
  console.log(
    `🚀 Portfolio backend running on port ${config.port}`
  );

  console.log(
    "Email user configured:",
    Boolean(config.emailUser)
  );

  console.log(
    "Email password configured:",
    Boolean(config.emailPass)
  );

  try {
    await verifyContactEmailTransport();
    console.log("✅ Gmail SMTP verified");
  } catch (error) {
    console.error("❌ Gmail SMTP verification failed");
    console.error(error.message);
  }
});