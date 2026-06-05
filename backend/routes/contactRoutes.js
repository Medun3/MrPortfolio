import { sendMessage } from "../controllers/contactController.js";

const normalizePath = (pathname) => pathname.replace(/\/+$/, "") || "/";

export const contactRoutes = async (req, res, url) => {
  const path = normalizePath(url.pathname);
  const contactPaths = ["/api/contact", "/contact"];

  if (req.method === "POST" && contactPaths.includes(path)) {
    await sendMessage(req, res);
    return true;
  }

  return false;
};
