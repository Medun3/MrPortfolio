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
    port: 465,
    secure: true,
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });
};

export const sendContactEmails = async ({ name, email, message }) => {
  const transport = createMailTransport();
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

  try {
    await transport.verify();

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
    console.error("Contact email failed:", error.message);
    throw new EmailSendError();
  }
};
