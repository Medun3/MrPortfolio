import nodemailer from "nodemailer";
import { config } from "../config/env.js";
import { EmailConfigError, EmailSendError } from "../utils/errors.js";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const createMailTransport = () => {
  if (!config.emailUser || !config.emailPass) {
    const error = new EmailConfigError();
    console.error("❌ EMAIL CONFIG ERROR - Missing credentials");
    console.error("   EMAIL_USER:", config.emailUser ? "✓ Set" : "✗ NOT SET");
    console.error("   EMAIL_PASS:", config.emailPass ? "✓ Set" : "✗ NOT SET");
    throw error;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });
};

const logMailError = (label, error) => {
  console.error(label, {
    code: error.code,
    command: error.command,
    response: error.response,
    responseCode: error.responseCode,
    message: error.message,
    fullError: error.toString(),
  });
};

const withTimeout = (promise, timeoutMs, label) => {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(`${label} timed out.`)), timeoutMs);
  });

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
};

const createVerifiedMailTransport = async () => {
  const transport = createMailTransport();
  
  try {
    console.log("🔍 Verifying Gmail SMTP connection...");
    await transport.verify();
    console.log("✓ Gmail SMTP verified successfully");
    return transport;
  } catch (error) {
    console.error("❌ Gmail SMTP verification failed:");
    logMailError("SMTP Error", error);
    transport.close();
    throw error;
  }
};

export const verifyContactEmailTransport = async () => {
  const transport = await createVerifiedMailTransport();
  transport.close();
};

export const sendContactEmails = async ({ name, email, message }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

  let transport;

  // Log credentials status
  console.log("\n📧 === CONTACT EMAIL SEND ===");
  console.log("   Recipient Email:", email);
  console.log("   Sender Email:", config.emailUser || "NOT SET");
  console.log("   Password Length:", config.emailPass?.length || 0);
  console.log("   =============================\n");

  try {
    transport = await createVerifiedMailTransport();
  } catch (error) {
    console.error("❌ FAILED TO CREATE TRANSPORT:", error.message);
    throw new EmailSendError();
  }

  try {
    console.log("📨 Sending message to admin...");
    await withTimeout(
      transport.sendMail({
        from: `"Portfolio Contact" <${config.emailUser}>`,
        to: config.contactToEmail,
        replyTo: email,
        subject: `Portfolio Contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h2>New portfolio contact message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      }),
      15000,
      "Admin email"
    );
    console.log("✓ Admin email sent successfully");
  } catch (error) {
    console.error("❌ ADMIN EMAIL FAILED:", error.message);
    logMailError("Contact owner email", error);
    transport?.close();
    throw new EmailSendError();
  }

  try {
    console.log("📨 Sending confirmation to user...");
    await withTimeout(
      transport.sendMail({
        from: `"Medun Raj" <${config.emailUser}>`,
        to: email,
        subject: "Thanks for contacting me",
        text: `Hi ${name},

Thanks for reaching out through my portfolio. I received your message and will get back to you soon.

Regards,
Medun Raj`,
        html: `
          <p>Hi ${safeName},</p>
          <p>Thanks for reaching out through my portfolio.</p>
          <p>I received your message and will get back to you soon.</p>
          <p>Regards,<br>Medun Raj</p>
        `,
      }),
      10000,
      "User confirmation email"
    );
    console.log("✓ Confirmation email sent to user");
  } catch (error) {
    console.error("⚠️  CONFIRMATION EMAIL FAILED (non-critical):", error.message);
    logMailError("User confirmation email", error);
  } finally {
    transport?.close();
    console.log("🔒 SMTP connection closed\n");
  }
};
