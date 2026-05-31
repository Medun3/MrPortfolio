export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

export class EmailConfigError extends AppError {
  constructor() {
    super("Email is not configured. Create backend/.env with EMAIL_USER and EMAIL_PASS.", 503);
    this.name = "EmailConfigError";
  }
}

export class EmailSendError extends AppError {
  constructor() {
    super("Email could not be sent. Check your Gmail App Password and try again.", 502);
    this.name = "EmailSendError";
  }
}
