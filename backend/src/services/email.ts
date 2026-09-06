import nodemailer from 'nodemailer'
import { emailConfig, env } from '../config/env'

const transporter = emailConfig.enabled
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
    })
  : null

export async function sendVerificationEmail(email: string, firstName: string | null, code: string): Promise<boolean> {
  if (!transporter || !env.SMTP_FROM) return false

  const verificationUrl = new URL(env.EMAIL_VERIFICATION_URL)
  verificationUrl.searchParams.set('code', code)

  await transporter.sendMail({
    from: env.SMTP_FROM,
    to: email,
    subject: 'Verify your PUNTER PREDICTION account',
    text: `Hello ${firstName || 'there'},\n\nVerify your PUNTER PREDICTION account using this link:\n${verificationUrl.toString()}\n\nThis verification link expires in 24 hours. If you did not create this account, you can ignore this email.`,
    html: `<p>Hello ${firstName || 'there'},</p><p>Verify your PUNTER PREDICTION account by clicking the link below:</p><p><a href="${verificationUrl.toString()}">Verify my email</a></p><p>This verification link expires in 24 hours.</p><p>If you did not create this account, you can ignore this email.</p>`,
  })

  return true
}
