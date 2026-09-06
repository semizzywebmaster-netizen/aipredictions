import nodemailer from 'nodemailer'
import { emailConfig, env } from '../config/env'

const transporter = emailConfig.enabled
  ? nodemailer.createTransport({ host: env.SMTP_HOST, port: env.SMTP_PORT, secure: env.SMTP_PORT === 465, auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD } })
  : null

export async function sendVerificationEmail(email: string, firstName: string | null, code: string): Promise<boolean> {
  if (!transporter || !env.SMTP_FROM) return false
  const verificationUrl = new URL(env.EMAIL_VERIFICATION_URL)
  verificationUrl.searchParams.set('code', code)
  await transporter.sendMail({ from: env.SMTP_FROM, to: email, subject: 'Verify your PUNTER PREDICTION account', text: `Hello ${firstName || 'there'},\n\nVerify your PUNTER PREDICTION account using this link:\n${verificationUrl.toString()}\n\nThis verification link expires in 24 hours.`, html: `<p>Hello ${firstName || 'there'},</p><p>Verify your PUNTER PREDICTION account:</p><p><a href="${verificationUrl.toString()}">Verify my email</a></p><p>This verification link expires in 24 hours.</p>` })
  return true
}

export async function sendPasswordResetEmail(email: string, firstName: string | null, token: string): Promise<boolean> {
  if (!transporter || !env.SMTP_FROM) return false
  const resetUrl = new URL(env.PASSWORD_RESET_URL)
  resetUrl.searchParams.set('token', token)
  await transporter.sendMail({ from: env.SMTP_FROM, to: email, subject: 'Reset your PUNTER PREDICTION password', text: `Hello ${firstName || 'there'},\n\nReset your password using this link:\n${resetUrl.toString()}\n\nThis link expires in 1 hour. If you did not request this, you can ignore this email.`, html: `<p>Hello ${firstName || 'there'},</p><p>Reset your PUNTER PREDICTION password using the link below:</p><p><a href="${resetUrl.toString()}">Reset password</a></p><p>This link expires in 1 hour. If you did not request this, you can ignore this email.</p>` })
  return true
}
