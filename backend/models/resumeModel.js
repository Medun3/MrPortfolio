import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.join(__dirname, "..");
const storageDir = path.join(backendRoot, "storage", "resume");
const metaPath = path.join(storageDir, "resume.json");

export const contentTypes = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export const getResumeMeta = async () => {
  try {
    return JSON.parse(await readFile(metaPath, "utf8"));
  } catch {
    return null;
  }
};

const saveResumeMeta = async (meta) => {
  await mkdir(storageDir, { recursive: true });
  await writeFile(metaPath, JSON.stringify(meta, null, 2));
};

const cleanPreviousResumes = async () => {
  await mkdir(storageDir, { recursive: true });
  const files = await readdir(storageDir);
  await Promise.all(
    files
      .filter((file) => file.startsWith("resume.") || file.startsWith("resume-upload."))
      .map((file) => rm(path.join(storageDir, file), { force: true }))
  );
};

export const getResumeFile = async (meta) => {
  const filePath = path.join(storageDir, meta.fileName);
  const fileInfo = await stat(filePath);
  const ext = path.extname(meta.fileName);

  return {
    filePath,
    size: fileInfo.size,
    mimeType: meta.mimeType || contentTypes[ext] || "application/octet-stream",
  };
};

export const saveResumeFile = async ({ originalName, content }) => {
  const ext = path.extname(originalName).toLowerCase();
  if (![".pdf", ".doc", ".docx"].includes(ext)) {
    throw new Error("Only PDF, DOC, or DOCX files are allowed.");
  }

  await cleanPreviousResumes();

  const tempName = `resume-upload${ext}`;
  const finalName = `resume${ext}`;
  await writeFile(path.join(storageDir, tempName), content);
  await rename(path.join(storageDir, tempName), path.join(storageDir, finalName));

  const meta = {
    fileName: finalName,
    originalName,
    mimeType: contentTypes[ext] || "application/octet-stream",
    size: content.length,
    updatedAt: new Date().toISOString(),
  };

  await saveResumeMeta(meta);
  return meta;
};
