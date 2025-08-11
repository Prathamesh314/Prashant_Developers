import nodemailer from 'nodemailer'

export async function sendMail(subject: string, html: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_FROM || !MAIL_TO) {
    console.log('[DEV] Email not configured. Logging instead:\nSUBJECT:', subject, '\nHTML:\n', html)
    return { ok: true, dev: true }
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  })

  await transporter.sendMail({ from: MAIL_FROM, to: MAIL_TO, subject, html })
  return { ok: true }
}