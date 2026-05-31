import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.join(__dirname, "..");

export const loadEnv = () => {
  try {
    const env = readFileSync(path.join(backendRoot, ".env"), "utf8");
    for (const line of env.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const separator = trimmed.indexOf("=");
      if (separator === -1) continue;

      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    // Local .env is optional. Production hosts usually inject env vars directly.
  }
};

loadEnv();

export const config = {
  port: Number(process.env.PORT || 5000),
  adminToken: process.env.ADMIN_TOKEN || "Medun@156",
  contactToEmail: process.env.CONTACT_TO_EMAIL || "medunraj3@gmail.com",
  emailUser: process.env.EMAIL_USER || "",
  emailPass: process.env.EMAIL_PASS || "",
};
