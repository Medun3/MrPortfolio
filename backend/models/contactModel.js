// // import nodemailer from "nodemailer";
// // import { config } from "../config/env.js";
// // import { EmailConfigError, EmailSendError } from "../utils/errors.js";

// // const escapeHtml = (value) =>
// //   String(value)
// //     .replaceAll("&", "&amp;")
// //     .replaceAll("<", "&lt;")
// //     .replaceAll(">", "&gt;")
// //     .replaceAll('"', "&quot;")
// //     .replaceAll("'", "&#039;");

// // // const mailServers = [
// // //   { host: "smtp.gmail.com", port: 465, secure: true },
// // //   { host: "smtp.gmail.com", port: 587, secure: false },
// // // ];

// // const createMailTransport = ({ host, port, secure }) => {
// //   if (!config.emailUser || !config.emailPass) {
// //     throw new EmailConfigError();
// //   }

// // //   return nodemailer.createTransport({
// // //     host,
// // //     port,
// // //     secure,
// // //     requireTLS: !secure,
// // //     connectionTimeout: 10000,
// // //     greetingTimeout: 10000,
// // //     socketTimeout: 15000,
// // //     auth: {
// // //       user: config.emailUser,
// // //       pass: config.emailPass,
// // //     },
// // //   });


// // // return nodemailer.createTransport({
// // //   host: "smtp.gmail.com",
// // //   port: 587,
// // //   secure: false,
// // //   family: 4, // Force IPv4
// // //   requireTLS: true,

// // //   connectionTimeout: 30000,
// // //   greetingTimeout: 30000,
// // //   socketTimeout: 30000,

// // //   auth: {
// // //     user: config.emailUser,
// // //     pass: config.emailPass,
// // //   },

// // //   tls: {
// // //     rejectUnauthorized: false,
// // //   },
// // // });

// // return nodemailer.createTransport({
// //   host: "smtp.gmail.com",
// //   port: 587,
// //   secure: false, // Must be false for 587
  
// //   // Crucial for Render network routing
// //   family: 4, 

// //   // Timeouts (Increased to give Render enough time to route)
// //   connectionTimeout: 45000, 
// //   greetingTimeout: 45000,
// //   socketTimeout: 45000,
  
// //   service: "gmail",
// //   auth: {
// //     user: config.emailUser,
// //     pass: config.emailPass, // Make sure this is a 16-character App Password, NO spaces
// //   },

// //   tls: {
// //     // Keeps connection from dropping if Render's proxy interferes
// //     ciphers: 'SSLv3',
// //     rejectUnauthorized: false
// //   },
// // });
// // };




// // const logMailError = (label, error) => {
// //   console.error(label, {
// //     code: error.code,
// //     command: error.command,
// //     response: error.response,
// //     responseCode: error.responseCode,
// //     message: error.message,
// //   });
// // };

// // const createVerifiedMailTransport = async () => {
// //   let lastError;

// //   for (const server of mailServers) {
// //     const transport = createMailTransport(server);

// //     try {
// //       await transport.verify();
// //       console.log(`Gmail SMTP verified on ${server.host}:${server.port}`);
// //       return transport;
// //     } catch (error) {
// //       lastError = error;
// //       logMailError(`Gmail SMTP verify failed on ${server.host}:${server.port}:`, error);
// //     }
// //   }

// //   throw lastError || new Error("Gmail SMTP verification failed.");
// // };

// // export const verifyContactEmailTransport = async () => {
// //   const transport = await createVerifiedMailTransport();
// //   transport.close();
// // };

// // export const sendContactEmails = async ({ name, email, message }) => {
// //   let transport;
// //   const safeName = escapeHtml(name);
// //   const safeEmail = escapeHtml(email);
// //   const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

// //   try {
// //     transport = await createVerifiedMailTransport();
// //   } catch (error) {
// //     logMailError("Contact email verify failed:", error);
// //     throw new EmailSendError();
// //   }

// //   try {
// //     await transport.sendMail({
// //       from: `"Portfolio Contact" <${config.emailUser}>`,
// //       to: config.contactToEmail,
// //       replyTo: email,
// //       subject: `Portfolio Contact from ${name}`,
// //       text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
// //       html: `
// //         <h2>New portfolio contact message</h2>
// //         <p><strong>Name:</strong> ${safeName}</p>
// //         <p><strong>Email:</strong> ${safeEmail}</p>
// //         <p><strong>Message:</strong></p>
// //         <p>${safeMessage}</p>
// //       `,
// //     });
// //   } catch (error) {
// //     logMailError("Contact owner email failed:", error);
// //     throw new EmailSendError();
// //   }

// //   try {
// //     await transport.sendMail({
// //       from: `"Medun Raj" <${config.emailUser}>`,
// //       to: email,
// //       subject: "Thanks for contacting me",
// //       text: `Hi ${name},\n\nThanks for reaching out through my portfolio. I received your message and will get back to you soon.\n\nYour message:\n${message}\n\nRegards,\nMedun Raj`,
// //       html: `
// //         <p>Hi ${safeName},</p>
// //         <p>Thanks for reaching out through my portfolio. I received your message and will get back to you soon.</p>
// //         <p><strong>Your message:</strong></p>
// //         <p>${safeMessage}</p>
// //         <p>Regards,<br>Medun Raj</p>
// //       `,
// //     });
// //   } catch (error) {
// //     logMailError("Contact auto-reply email skipped:", error);
// //   }
// // };
// import nodemailer from "nodemailer";
// import { config } from "../config/env.js";
// import { EmailConfigError, EmailSendError } from "../utils/errors.js";

// const escapeHtml = (value) =>
//   String(value)
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;")
//     .replaceAll("'", "&#039;");

// const mailServers = [
//   { host: "smtp.gmail.com", port: 465, secure: true },
//   { host: "smtp.gmail.com", port: 587, secure: false },
// ];

// const createMailTransport = ({ host, port, secure }) => {
//   if (!config.emailUser || !config.emailPass) {
//     throw new EmailConfigError();
//   }

//   return nodemailer.createTransport({
//     service: "gmail",
//     host,
//     port,
//     secure,
//     requireTLS: !secure,
//     family: 4,
//     connectionTimeout: 30000,
//     greetingTimeout: 30000,
//     socketTimeout: 30000,
//     auth: {
//       user: config.emailUser,
//       pass: config.emailPass,
//     },
//     tls: {
//       rejectUnauthorized: true,
//     },
//   });
// };

// const logMailError = (label, error) => {
//   console.error(label, {
//     code: error.code,
//     command: error.command,
//     response: error.response,
//     responseCode: error.responseCode,
//     message: error.message,
//   });
// };

// const withTimeout = (promise, timeoutMs, label) => {
//   let timeoutId;
//   const timeout = new Promise((_, reject) => {
//     timeoutId = setTimeout(() => reject(new Error(`${label} timed out.`)), timeoutMs);
//   });

//   return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
// };

// const createVerifiedMailTransport = async () => {
//   let lastError;

//   for (const server of mailServers) {
//     const transport = createMailTransport(server);

//     try {
//       await transport.verify();
//       console.log(`Gmail SMTP verified on ${server.host}:${server.port}`);
//       return transport;
//     } catch (error) {
//       lastError = error;
//       logMailError(`SMTP verification failed on ${server.host}:${server.port}:`, error);
//     }
//   }

//   throw lastError || new Error("Gmail SMTP verification failed.");
// };

// export const verifyContactEmailTransport = async () => {
//   const transport = await createVerifiedMailTransport();
//   transport.close();
// };

// export const sendContactEmails = async ({ name, email, message }) => {
//   const safeName = escapeHtml(name);
//   const safeEmail = escapeHtml(email);
//   const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

//   let transport;

//   try {
//     transport = await createVerifiedMailTransport();
//   } catch (error) {
//     if (error instanceof EmailConfigError) {
//       throw error;
//     }
//     throw new EmailSendError();
//   }

//   try {
//     await withTimeout(
//       transport.sendMail({
//         from: `"Portfolio Contact" <${config.emailUser}>`,
//         to: config.contactToEmail,
//         replyTo: email,
//         subject: `Portfolio Contact from ${name}`,
//         text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
//         html: `
//           <h2>New portfolio contact message</h2>
//           <p><strong>Name:</strong> ${safeName}</p>
//           <p><strong>Email:</strong> ${safeEmail}</p>
//           <p><strong>Message:</strong></p>
//           <p>${safeMessage}</p>
//         `,
//       }),
//       12000,
//       "Contact owner email"
//     );
//   } catch (error) {
//     logMailError("Contact owner email failed:", error);
//     transport.close();
//     throw new EmailSendError();
//   }

//   try {
//     await withTimeout(
//       transport.sendMail({
//         from: `"Medun Raj" <${config.emailUser}>`,
//         to: email,
//         subject: "Thanks for contacting me",
//         text: `Hi ${name},

// Thanks for reaching out through my portfolio. I received your message and will get back to you soon.

// Regards,
// Medun Raj`,
//         html: `
//           <p>Hi ${safeName},</p>
//           <p>Thanks for reaching out through my portfolio.</p>
//           <p>I received your message and will get back to you soon.</p>
//           <p>Regards,<br>Medun Raj</p>
//         `,
//       }),
//       8000,
//       "Contact auto-reply email"
//     );
//   } catch (error) {
//     logMailError("Contact auto-reply email skipped:", error);
//   } finally {
//     transport?.close();
//   }
// };


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
    family: 4, // Force IPv4 for Render network compatibility
    connectionTimeout: 45000, // Increased timeout for Render's network
    greetingTimeout: 45000,
    socketTimeout: 45000,
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
    tls: {
      rejectUnauthorized: false, // More permissive for deployment environments
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
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    emailConfigured: Boolean(config.emailUser && config.emailPass),
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
      await transport.verify();
      console.log(`Gmail SMTP verified on ${server.host}:${server.port}`);
      return transport;
    } catch (error) {
      lastError = error;
      logMailError(`SMTP verification failed on ${server.host}:${server.port}:`, error);
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

  console.log(`[EMAIL] Starting email send to ${email} at ${new Date().toISOString()}`);
  console.log(`[EMAIL] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[EMAIL] Email configured: ${Boolean(config.emailUser && config.emailPass)}`);

  let transport;

  try {
    transport = await createVerifiedMailTransport();
    console.log(`[EMAIL] Transport verified successfully`);
  } catch (error) {
    console.error(`[EMAIL] Transport verification failed:`, error.message);
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
    console.log(`[EMAIL] Owner email sent successfully to ${config.contactToEmail}`);
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
    console.log(`[EMAIL] Auto-reply email sent successfully to ${email}`);
  } catch (error) {
    logMailError("Contact auto-reply email skipped:", error);
  } finally {
    transport?.close();
    console.log(`[EMAIL] Email process completed for ${email}`);
  }
};