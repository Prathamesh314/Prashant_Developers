'use client'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  withMaterial: z.boolean().default(true),
  areaSqft: z.coerce.number().positive('Enter built-up area'),
  floors: z.coerce.number().int().min(1).max(5).default(1),
  quality: z.enum(['standard','premium','luxury']).default('standard'),
  type: z.enum(['flat','duplex','villa','commercial']).default('flat'),
  city: z.string().optional(),
  name: z.string().min(2),
  phone: z.string().min(10)
})

type FormData = z.infer<typeof schema>

type Rates = {
  laborOnly: number
  standard: number
  premium: number
  luxury: number
}

const BASE_RATES: Record<string, Rates> = {
  flat: { laborOnly: 650, standard: 1600, premium: 2000, luxury: 2600 },
  duplex: { laborOnly: 700, standard: 1700, premium: 2150, luxury: 2800 },
  villa: { laborOnly: 750, standard: 1800, premium: 2300, luxury: 3000 },
  commercial: { laborOnly: 800, standard: 1900, premium: 2400, luxury: 3200 }
}

function computeEstimate(d: FormData) {
  const rates = BASE_RATES[d.type]
  const rate = d.withMaterial
    ? d.quality === 'standard' ? rates.standard : d.quality === 'premium' ? rates.premium : rates.luxury
    : rates.laborOnly
  const base = rate * d.areaSqft
  const floorsFactor = 1 + (d.floors - 1) * 0.06 // 6% increment per extra floor
  const contingency = 0.05 * base
  const taxes = 0.18 * (base + contingency) // 18% GST approx
  const total = Math.round((base * floorsFactor) + contingency + taxes)
  return { rate, base: Math.round(base), contingency: Math.round(contingency), taxes: Math.round(taxes), total }
}

export default function EstimateForm() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { withMaterial: true, floors: 1, quality: 'standard', type: 'flat' }
  })

  const values = watch()
  const [quoteId, setQuoteId] = useState<string | null>(null)

  const result = useMemo(() => {
    try { return computeEstimate(schema.parse(values as any)) } catch { return null }
  }, [values])

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/estimate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, preview: result }) })
    if (res.ok) {
      const { id } = await res.json()
      setQuoteId(id)
      alert('Estimate submitted. Our team will contact you!')
      reset()
    } else {
      alert('Failed to submit. Try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <h3 className="text-xl font-semibold">Instant Construction Estimate</h3>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm">Project Type</label>
          <select {...register('type')} className="mt-1 w-full rounded-lg border border-slate-300 p-3">
            <option value="flat">Flat</option>
            <option value="duplex">Duplex</option>
            <option value="villa">Villa</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label className="text-sm">With Material?</label>
          <select {...register('withMaterial', { setValueAs: v => v === 'true' || v === true })} className="mt-1 w-full rounded-lg border border-slate-300 p-3">
            <option value="true">Yes (Turnkey)</option>
            <option value="false">No (Labor Only)</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Built-up Area (sqft)</label>
          <input type="number" step="1" {...register('areaSqft', { valueAsNumber: true })} className="mt-1 w-full rounded-lg border border-slate-300 p-3" placeholder="e.g. 1200" />
          {errors.areaSqft && <p className="mt-1 text-sm text-red-600">{errors.areaSqft.message}</p>}
        </div>
        <div>
          <label className="text-sm">Floors</label>
          <input type="number" {...register('floors', { valueAsNumber: true })} className="mt-1 w-full rounded-lg border border-slate-300 p-3" min={1} max={5} />
        </div>
        <div>
          <label className="text-sm">Quality</label>
          <select {...register('quality')} className="mt-1 w-full rounded-lg border border-slate-300 p-3">
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
        <div>
          <label className="text-sm">City (for local rates)</label>
          <input {...register('city')} className="mt-1 w-full rounded-lg border border-slate-300 p-3" placeholder="e.g. Pune" />
        </div>
      </div>

      <h4 className="mt-8 text-lg font-semibold">Your Details</h4>
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm">Name</label>
          <input {...register('name')} className="mt-1 w-full rounded-lg border border-slate-300 p-3"/>
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm">Phone</label>
          <input {...register('phone')} className="mt-1 w-full rounded-lg border border-slate-300 p-3"/>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="text-sm">Email (optional)</label>
          <input type="email" className="mt-1 w-full rounded-lg border border-slate-300 p-3" placeholder="your@email.com"/>
        </div>
      </div>

      <button disabled={isSubmitting} className="btn btn-primary mt-6">{isSubmitting ? 'Submitting…' : 'Get Detailed Estimate'}</button>
      {quoteId && <p className="mt-3 text-sm text-slate-600">Your reference ID: <b>{quoteId}</b></p>}
    </form>
  )
}