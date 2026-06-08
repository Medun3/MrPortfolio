import { sendContactEmails } from "../models/contactModel.js";
import { getJsonBody, sendError, sendJson } from "../utils/http.js";

export const sendMessage = async (req, res) => {
  const contentType = req.headers["content-type"] || "";
  if (!contentType.includes("application/json")) {
    sendError(res, 400, "Request must use application/json.");
    return;
  }

  const { name = "", email = "", message = "" } = await getJsonBody(req);
  const trimmedName = String(name).trim();
  const trimmedEmail = String(email).trim();
  const trimmedMessage = String(message).trim();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    sendError(res, 400, "Name, email, and message are required.");
    return;
  }

  if (!isValidEmail) {
    sendError(res, 400, "Please enter a valid email address.");
    return;
  }

  await sendContactEmails({
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
  });

  sendJson(res, 200, { message: "Message sent successfully." });
};
