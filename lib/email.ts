import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  html: string
}

function getTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  }
  if (process.env.RESEND_API_KEY) {
    return nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: { user: "resend", pass: process.env.RESEND_API_KEY },
    })
  }
  return null
}

function getFromAddress() {
  return process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@herahima.vercel.app"
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  const transporter = getTransporter()
  if (!transporter) return false
  try {
    await transporter.sendMail({ from: getFromAddress(), to, subject, html })
    return true
  } catch {
    return false
  }
}
