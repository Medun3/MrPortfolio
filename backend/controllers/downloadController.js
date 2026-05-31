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
  res.writeHead(200, {
    "Content-Type": file.mimeType,
    "Content-Length": file.size,
    "Content-Disposition": `attachment; filename="${meta.originalName.replaceAll('"', "")}"`,
  });
  createReadStream(file.filePath).pipe(res);
};
