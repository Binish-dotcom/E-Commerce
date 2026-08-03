import nodemailer from "nodemailer";
import env from "../config/env.js";

// Reuses the same transporter pattern as sendOTP.js. Kept in its own
// file (rather than editing sendOTP.js) since it sends a different
// family of emails with their own templates.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.EMAIL,
    pass: env.EMAIL_PASSWORD,
  },
});

const TEMPLATES = {
  review_approved: (data) => ({
    subject: "Your review has been approved",
    html: `
      <h2>Your review is live 🎉</h2>
      <p>Your review for <b>${data.productTitle}</b> has been approved and is now visible to other buyers.</p>
    `,
  }),
  seller_reply: (data) => ({
    subject: "The seller replied to your review",
    html: `
      <h2>You got a reply</h2>
      <p>The seller of <b>${data.productTitle}</b> replied to your review:</p>
      <blockquote>${data.replyMessage}</blockquote>
    `,
  }),
  review_deleted: (data) => ({
    subject: "Your review was removed",
    html: `
      <h2>Review removed</h2>
      <p>Your review for <b>${data.productTitle}</b> was removed by our moderation team${
        data.reason ? `: ${data.reason}` : "."
      }</p>
    `,
  }),
  review_reminder: (data) => ({
    subject: `How was ${data.productTitle}?`,
    html: `
      <h2>Got a minute to review your purchase?</h2>
      <p>You purchased <b>${data.productTitle}</b> a while ago — sharing your experience helps other buyers.</p>
    `,
  }),
};

// Every call is wrapped by the caller in try/catch so a missing SMTP
// config or transient email failure never blocks the actual review
// action (create/reply/delete) from succeeding.
const sendReviewEmail = async (to, type, data = {}) => {
  const template = TEMPLATES[type];
  if (!template) throw new Error(`Unknown review email template: ${type}`);

  const { subject, html } = template(data);

  await transporter.sendMail({
    from: env.EMAIL,
    to,
    subject,
    html,
  });
};

export default sendReviewEmail;
