import { config } from "../config/env.js";
import { getResumeMeta, saveResumeFile } from "../models/resumeModel.js";
import { getRequestBody, sendError, sendJson } from "../utils/http.js";
import { parseMultipartResume } from "../utils/multipart.js";

const isAdmin = (req) => req.headers.authorization === `Bearer ${config.adminToken}`;

export const getResume = async (_req, res) => {
  const meta = await getResumeMeta();
  if (!meta) {
    sendJson(res, 200, { hasResume: false });
    return;
  }

  sendJson(res, 200, { hasResume: true, ...meta });
};

export const uploadResume = async (req, res) => {
  if (!isAdmin(req)) {
    sendError(res, 401, "Admin token is missing or invalid.");
    return;
  }

  const contentType = req.headers["content-type"] || "";
  if (!contentType.includes("multipart/form-data")) {
    sendError(res, 400, "Upload must use multipart/form-data.");
    return;
  }

  const body = await getRequestBody(req);
  const resume = parseMultipartResume(body, contentType);
  if (!resume) {
    sendError(res, 400, "Resume file is required.");
    return;
  }

  try {
    const meta = await saveResumeFile(resume);
    sendJson(res, 200, { message: "Resume uploaded successfully.", resume: meta });
  } catch (error) {
    sendError(res, 400, error.message || "Resume upload failed.");
  }
};
