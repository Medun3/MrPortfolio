import { sendMessage } from "../controllers/contactController.js";

export const contactRoutes = async (req, res, url) => {
  if (req.method === "POST" && url.pathname === "/api/contact") {
    await sendMessage(req, res);
    return true;
  }

  return false;
};
