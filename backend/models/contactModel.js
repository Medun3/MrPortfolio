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

const mailServers = [
  { host: "smtp.gmail.com", port: 465, secure: true },
  { host: "smtp.gmail.com", port: 587, secure: false },
];

const createMailTransport = ({ host, port, secure }) => {
  if (!config.emailUser || !config.emailPass) {
    throw new EmailConfigError();
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
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
  });
};

const createVerifiedMailTransport = async () => {
  let lastError;

  for (const server of mailServers) {
    const transport = createMailTransport(server);

    try {
      await transport.verify();
      console.log(`Gmail SMTP verified on ${server.host}:${server.port}`);
      return transport;
    } catch (error) {
      lastError = error;
      logMailError(`Gmail SMTP verify failed on ${server.host}:${server.port}:`, error);
    }
  }

  throw lastError || new Error("Gmail SMTP verification failed.");
};

export const verifyContactEmailTransport = async () => {
  const transport = await createVerifiedMailTransport();
  transport.close();
};

export const sendContactEmails = async ({ name, email, message }) => {
  let transport;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

  try {
    transport = await createVerifiedMailTransport();
  } catch (error) {
    logMailError("Contact email verify failed:", error);
    throw new EmailSendError();
  }

  try {
    await transport.sendMail({
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
    });
  } catch (error) {
    logMailError("Contact owner email failed:", error);
    throw new EmailSendError();
  }

  try {
    await transport.sendMail({
      from: `"Medun Raj" <${config.emailUser}>`,
      to: email,
      subject: "Thanks for contacting me",
      text: `Hi ${name},\n\nThanks for reaching out through my portfolio. I received your message and will get back to you soon.\n\nYour message:\n${message}\n\nRegards,\nMedun Raj`,
      html: `
        <p>Hi ${safeName},</p>
        <p>Thanks for reaching out through my portfolio. I received your message and will get back to you soon.</p>
        <p><strong>Your message:</strong></p>
        <p>${safeMessage}</p>
        <p>Regards,<br>Medun Raj</p>
      `,
    });
  } catch (error) {
    logMailError("Contact auto-reply email skipped:", error);
  }
};
