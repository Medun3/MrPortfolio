import { downloadResume } from "../controllers/downloadController.js";

export const downloadRoutes = async (req, res, url) => {
  if (req.method === "GET" && url.pathname === "/api/resume/download") {
    await downloadResume(req, res);
    return true;
  }

  return false;
};
