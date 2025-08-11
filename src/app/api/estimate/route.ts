import { NextResponse } from 'next/server'
import { sendMail } from 'src/lib/email'
import { estimateSchema } from 'src/lib/validator'

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const data = estimateSchema.parse(json)

    const id = Math.random().toString(36).slice(2, 8).toUpperCase()
    const html = `
      <h2>New Estimate Request (#${id})</h2>
      <ul>
        <li><b>Name:</b> ${data.name}</li>
        <li><b>Phone:</b> ${data.phone}</li>
        <li><b>City:</b> ${data.city ?? ''}</li>
        <li><b>Type:</b> ${data.type}</li>
        <li><b>With Material:</b> ${data.withMaterial ? 'Yes' : 'No'}</li>
        <li><b>Area (sqft):</b> ${data.areaSqft}</li>
        <li><b>Floors:</b> ${data.floors}</li>
        <li><b>Quality:</b> ${data.quality}</li>
      </ul>
      <pre>${JSON.stringify(data.preview, null, 2)}</pre>
    `
    await sendMail(`Estimate Request #${id}`, html)

    return NextResponse.json({ ok: true, id })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Invalid payload' }, { status: 400 })
  }
}