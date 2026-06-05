import { downloadResume } from "../controllers/downloadController.js";

const normalizePath = (pathname) => pathname.replace(/\/+$/, "") || "/";

export const downloadRoutes = async (req, res, url) => {
  if (req.method === "GET" && normalizePath(url.pathname) === "/api/resume/download") {
    await downloadResume(req, res);
    return true;
  }

  return false;
};
