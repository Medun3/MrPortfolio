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
    service: "gmail",
    host,
    port,
    secure,
    requireTLS: !secure,
    family: 4,
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
    tls: {
      rejectUnauthorized: true,
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
  let lastError;

  for (const server of mailServers) {
    const transport = createMailTransport(server);

    try {
      await withTimeout(transport.verify(), 10000, `SMTP verification on ${server.host}`);
      console.log(`Gmail SMTP verified on ${server.host}:${server.port}`);
      return transport;
    } catch (error) {
      lastError = error;
      logMailError(`SMTP verification failed on ${server.host}:${server.port}:`, error);
      transport.close();
    }
  }

  throw lastError || new Error("Gmail SMTP verification failed.");
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
