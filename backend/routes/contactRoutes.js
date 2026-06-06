import { sendMessage } from "../controllers/contactController.js";

export const contactRoutes = async (req, res, url) => {
  // Test route
  if (req.method === "GET" && url.pathname === "/api/contact") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Contact route working" }));
    return true;
  }

  // Contact form submission
  if (req.method === "POST" && url.pathname === "/api/contact") {
    await sendMessage(req, res);
    return true;
  }

  return false;
};