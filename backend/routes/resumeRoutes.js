import { getResume, uploadResume } from "../controllers/resumeController.js";

export const resumeRoutes = async (req, res, url) => {
  if (req.method === "GET" && url.pathname === "/api/resume") {
    await getResume(req, res);
    return true;
  }

  if (req.method === "POST" && url.pathname === "/api/admin/resume") {
    await uploadResume(req, res);
    return true;
  }

  return false;
};
