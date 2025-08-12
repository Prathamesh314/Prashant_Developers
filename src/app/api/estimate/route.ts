import { NextResponse } from 'next/server'
import { sendMail } from '../../../lib/email'
import { z } from 'zod'
import { connectDb } from '@/lib/db'
import User from 'src/models/User'

const estimateSchema = z.object({
  withMaterial: z.boolean(),
  areaSqft: z.number().positive(),
  floors: z.number().int().min(1).max(5),
  quality: z.enum(['standard', 'premium', 'luxury']),
  type: z.enum(['flat', 'duplex', 'villa', 'commercial']),
  city: z.string().optional(),
  name: z.string().min(2),
  phone: z.string().min(10),
  preview: z.any().optional()
})

export async function POST(req: Request) {
  try {
    console.log('API route called')
    
    // Parse JSON
    const json = await req.json()
    console.log('Received data:', json)
    
    // Validate data
    const data = estimateSchema.parse(json)
    console.log('Validated data:', data)
    
    // ✅ CRITICAL: Connect to database before using models
    await connectDb()
    console.log('Database connected successfully')
    
    // Create a new user document and save to db
    const user = await User.create({
        name: data.name,
        phone: data.phone,
        city: data.city ?? "Not provided",
        type: data.type,
        withMaterial: data.withMaterial,
        areaSqft: data.areaSqft,
        floors: data.floors,
        quality: data.quality,
      });

    console.log('User created:', user._id)
    return NextResponse.json({ ok: true, id: user._id })
    
  } catch (e: any) {
    console.error('API Error:', e)
    
    // More detailed error response
    if (e.name === 'ZodError') {
      return NextResponse.json({ 
        ok: false, 
        error: 'Validation failed',
        details: e.errors 
      }, { status: 400 })
    }
    
    // Handle MongoDB connection errors specifically
    if (e.name === 'MongooseError' || e.message?.includes('buffering timed out')) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Database connection failed',
        details: 'Unable to connect to MongoDB. Please check your connection.'
      }, { status: 503 })
    }
    
    return NextResponse.json({ 
      ok: false, 
      error: e?.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? e?.stack : undefined
    }, { status: 500 })
  }
}