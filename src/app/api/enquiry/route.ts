import { connectDb } from '@/lib/db'
import { NextResponse } from 'next/server'
import { enquirySchema } from 'src/lib/validator'
import Enquiry from 'src/models/Enquiry'

export async function POST(req: Request) {
  try {
    await connectDb()
    const json = await req.json()
    const data = enquirySchema.parse(json)

    const enquiry = await Enquiry.create({
      name: data.name,
      phone: data.phone,
      email: data.email,
      city: data.city ?? "Not provided",
      message: data.message
    });
    
    console.log("Enquiry added: ", enquiry._id)
    return NextResponse.json({ ok: true, enquiry_id: enquiry._id })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Invalid payload' }, { status: 400 })
  }
}