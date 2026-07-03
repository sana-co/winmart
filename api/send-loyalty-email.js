import nodemailer from "nodemailer";
import { loadLocalEnvFiles } from "./_env.js";

loadLocalEnvFiles();

function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

function requirePost(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { error: "Method not allowed" });
    return false;
  }

  return true;
}

function isEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function createTransporter() {
  const user = process.env.GMAIL_USER?.trim();
  // Google displays app passwords in groups; SMTP auth expects the raw 16 characters.
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

  if (!user || !pass) {
    const error = new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD");
    error.code = "EMAIL_CONFIG_MISSING";
    throw error;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
}

export default async function handler(request, response) {
  if (!requirePost(request, response)) return;

  const email = cleanString(request.body?.email);
  const customerName = cleanString(request.body?.customerName);
  const cardNumber = cleanString(request.body?.cardNumber);

  if (!isEmail(email) || !customerName || !cardNumber) {
    sendJson(response, 400, {
      error: "Customer name, valid email, and card number are required.",
    });
    return;
  }

  try {
    const from = process.env.GMAIL_USER?.trim();
    const transporter = createTransporter();

    await transporter.sendMail({
      from,
      to: email,
      subject: "Welcome to Our Loyalty Program",
      text: `Hello ${customerName},

Thank you for joining our loyalty program.

Your loyalty card has been successfully created.

Card Number:
${cardNumber}

We appreciate your business.`,
    });

    sendJson(response, 200, { ok: true });
  } catch (error) {
    console.error("Failed to send loyalty card email:", error);

    if (error?.code === "EMAIL_CONFIG_MISSING") {
      sendJson(response, 500, { error: "Email service is not configured." });
      return;
    }

    if (error?.code === "EAUTH" || error?.responseCode === 535) {
      sendJson(response, 502, { error: "Gmail rejected the configured credentials." });
      return;
    }

    sendJson(response, 502, { error: "Could not send loyalty card email." });
  }
}
