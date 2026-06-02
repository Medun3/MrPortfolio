import { sendMessage } from "../controllers/contactController.js";

export const contactRoutes = async (req, res, url) => {
  const path = url.pathname || "";
  if (req.method === "POST" && path.endsWith("/api/contact")) {
    await sendMessage(req, res);
    return true;
  }

  return false;
};
