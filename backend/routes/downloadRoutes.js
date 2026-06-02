import { downloadResume } from "../controllers/downloadController.js";

export const downloadRoutes = async (req, res, url) => {
  const path = url.pathname || "";
  if (req.method === "GET" && path.endsWith("/api/resume/download")) {
    await downloadResume(req, res);
    return true;
  }

  return false;
};
