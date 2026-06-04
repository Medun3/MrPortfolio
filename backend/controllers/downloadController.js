import { createReadStream } from "node:fs";
import { getResumeFile, getResumeMeta } from "../models/downloadModel.js";
import { sendError } from "../utils/http.js";

export const downloadResume = async (_req, res) => {
  const meta = await getResumeMeta();
  if (!meta) {
    sendError(res, 404, "Resume is not uploaded yet.");
    return;
  }

  const file = await getResumeFile(meta);
  const fileName = meta.originalName.replaceAll('"', "");
  res.setHeader("Content-Type", file.mimeType);
  res.setHeader("Content-Length", file.size);
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`);
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  createReadStream(file.filePath).pipe(res);
};
