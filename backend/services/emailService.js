import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendContactEmail = async ({ name, email, message }) => {
  // Email to you
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: `New Contact Form Message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  // Confirmation email to visitor
  await transporter.sendMail({
    from: `"Medunraj Portfolio" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Thank you for contacting me",
    html: `
      <h2>Thank You, ${name}!</h2>
      <p>I have received your message.</p>
      <p>I will get back to you as soon as possible.</p>

      <hr />

      <h3>Your Message:</h3>
      <p>${message}</p>

      <br />

      <p>Regards,</p>
      <p><strong>Medunraj</strong></p>
      <p>Junior Software Engineer</p>
    `,
  });
};