import { z } from 'zod'

export const enquirySchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  city: z.string().optional(),
  message: z.string().min(5)
})

export const estimateSchema = z.object({
  withMaterial: z.boolean(),
  areaSqft: z.number().positive(),
  floors: z.number().int().min(1).max(5),
  quality: z.enum(['standard','premium','luxury']),
  type: z.enum(['flat','duplex','villa','commercial']),
  city: z.string().optional(),
  name: z.string().min(2),
  phone: z.string().min(10),
  preview: z.any().optional()
})