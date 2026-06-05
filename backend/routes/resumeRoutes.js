import { getResume, uploadResume } from "../controllers/resumeController.js";

const normalizePath = (pathname) => pathname.replace(/\/+$/, "") || "/";

export const resumeRoutes = async (req, res, url) => {
  const path = normalizePath(url.pathname);

  if (req.method === "GET" && path === "/api/resume") {
    await getResume(req, res);
    return true;
  }

  if (req.method === "POST" && path === "/api/admin/resume") {
    await uploadResume(req, res);
    return true;
  }

  return false;
};
