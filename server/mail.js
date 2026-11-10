const nodemailer = require("nodemailer");

const TOPIC_LABELS = {
  general: "General",
  media: "Ripke Media",
  other: "Something else",
};

function trimEnv(name) {
  const value = process.env[name];
  return value == null ? "" : String(value).trim();
}

function isSmtpConfigured() {
  return Boolean(trimEnv("SMTP_HOST") && trimEnv("SMTP_USER") && trimEnv("SMTP_PASS"));
}

async function sendContactNote({ name, email, topic, body }) {
  const to = trimEnv("CONTACT_TO") || "jeff@jeffripke.com";
  const from = trimEnv("SMTP_FROM") || "Jeff Ripke <jeff@jeffripke.com>";
  const subject = `Portfolio note from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Topic: ${TOPIC_LABELS[topic] || topic}`,
    "",
    body,
  ].join("\n");

  if (!isSmtpConfigured()) {
    if (process.env.NODE_ENV === "production") {
      const error = new Error("SMTP is not configured");
      error.mailFailed = true;
      throw error;
    }
    console.log(`Contact note for ${to} (SMTP is not configured):\n${text}`);
    return;
  }

  const port = Number.parseInt(trimEnv("SMTP_PORT") || "587", 10);
  const secure = trimEnv("SMTP_SECURE") === "true" || port === 465;
  const transporter = nodemailer.createTransport({
    host: trimEnv("SMTP_HOST"),
    port,
    secure,
    auth: {
      user: trimEnv("SMTP_USER"),
      pass: trimEnv("SMTP_PASS"),
    },
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: email,
    subject,
    text,
  });
}

module.exports = { sendContactNote };
