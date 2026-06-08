import Brevo from "@getbrevo/brevo";
import { config } from "../config/env.js";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  config.brevoApiKey
);

export const sendEmail = async ({
  name,
  email,
  subject,
  message,
}) => {
  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = `Portfolio Contact: ${subject}`;

  sendSmtpEmail.htmlContent = `
    <h2>New Portfolio Contact</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  sendSmtpEmail.sender = {
    name: "Portfolio Website",
    email: "sender@example.com"
  };

  sendSmtpEmail.to = [
    {
      email: "yourgmail@gmail.com",
      name: "Portfolio Owner"
    }
  ];

  return await apiInstance.sendTransacEmail(sendSmtpEmail);
};