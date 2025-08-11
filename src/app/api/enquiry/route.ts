import { NextResponse } from 'next/server'
import { sendMail } from 'src/lib/email'
import { enquirySchema } from 'src/lib/validator'

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const data = enquirySchema.parse(json)

    const html = `
      <h2>New Enquiry</h2>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Phone:</b> ${data.phone}</p>
      <p><b>Email:</b> ${data.email ?? ''}</p>
      <p><b>City:</b> ${data.city ?? ''}</p>
      <p><b>Message:</b><br/>${data.message}</p>
    `
    await sendMail('New Website Enquiry', html)

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Invalid payload' }, { status: 400 })
  }
}