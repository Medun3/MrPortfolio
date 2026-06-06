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
    throw new EmailConfigError();
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
    connectionTimeout: 60000,
    greetingTimeout: 60000,
    socketTimeout: 60000,
    tls: {
      rejectUnauthorized: false,
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
    await transport.verify();
    console.log("SMTP verified successfully");
    return transport;
  } catch (error) {
    logMailError("SMTP verification failed:", error);
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

  try {
    transport = await createVerifiedMailTransport();
  } catch (error) {
    if (error instanceof EmailConfigError) {
      throw error;
    }
    throw new EmailSendError();
  }

  try {
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
      12000,
      "Contact owner email"
    );
  } catch (error) {
    logMailError("Contact owner email failed:", error);
    transport.close();
    throw new EmailSendError();
  }

  try {
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
      8000,
      "Contact auto-reply email"
    );
  } catch (error) {
    logMailError("Contact auto-reply email skipped:", error);
  } finally {
    transport?.close();
  }
};
