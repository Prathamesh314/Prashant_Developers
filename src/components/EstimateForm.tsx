'use client'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  withMaterial: z.boolean(),
  areaSqft: z.coerce.number().positive('Enter built-up area'),
  floors: z.coerce.number().int().min(1).max(5),
  quality: z.enum(['standard', 'premium', 'luxury']),
  type: z.enum(['flat', 'duplex', 'villa', 'commercial']),
  city: z.string().optional(),
  name: z.string().min(2),
  phone: z.string().min(10, 'Enter a valid phone'),
  email: z.string().email().optional().or(z.literal(''))
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
    ? d.quality === 'standard'
      ? rates.standard
      : d.quality === 'premium'
      ? rates.premium
      : rates.luxury
    : rates.laborOnly
  const base = rate * d.areaSqft
  const floorsFactor = 1 + (d.floors - 1) * 0.06
  const contingency = 0.05 * base
  const taxes = 0.18 * (base + contingency)
  const total = Math.round(base * floorsFactor + contingency + taxes)
  return {
    rate,
    base: Math.round(base),
    contingency: Math.round(contingency),
    taxes: Math.round(taxes),
    total
  }
}

export default function EstimateForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      withMaterial: true,
      floors: 1,
      quality: 'standard',
      type: 'flat',
      city: '',
      name: '',
      phone: '',
      email: '',
      areaSqft: undefined as unknown as number // will be filled by user
    }
  })

  const values = watch()
  const [quoteId, setQuoteId] = useState<string | null>(null)

  const result = useMemo(() => {
    try {
      return computeEstimate(schema.parse(values as any))
    } catch {
      return null
    }
  }, [values])

  
  const onSubmit = (data: FormData) => {
    try {
      console.log('Submitting data:', data)
      console.log('Result preview:', result)
      
      const payload = { ...data, preview: result }
      console.log('Full payload:', payload)
      
      // Synchronous XMLHttpRequest
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/estimate', false); // false makes it synchronous
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(payload));
      
      console.log('Response status:', xhr.status);
      
      if (xhr.status >= 200 && xhr.status < 300) {
        let responseData;
        try {
          responseData = JSON.parse(xhr.responseText);
        } catch {
          responseData = {};
        }
        console.log('Success response:', responseData)
        setQuoteId(responseData.id)
        alert('Estimate submitted. Our team will contact you!')
        reset()
      } else {
        let errorData;
        try {
          errorData = JSON.parse(xhr.responseText);
        } catch {
          errorData = { error: 'Unknown error' };
        }
        console.error('Error response:', errorData)
        alert(`Failed to submit: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('Failed to submit. Please try again.')
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
          <select
            {...register('withMaterial', {
              setValueAs: v => v === 'true' || v === true
            })}
            className="mt-1 w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="true">Yes (Turnkey)</option>
            <option value="false">No (Labor Only)</option>
          </select>
        </div>

        <div>
          <label className="text-sm">Built-up Area (sqft)</label>
          <input
            type="number"
            step="1"
            {...register('areaSqft', { valueAsNumber: true })}
            className="mt-1 w-full rounded-lg border border-slate-300 p-3"
            placeholder="e.g. 1200"
          />
          {errors.areaSqft && <p className="mt-1 text-sm text-red-600">{errors.areaSqft.message}</p>}
        </div>

        <div>
          <label className="text-sm">Floors</label>
          <input
            type="number"
            min={1}
            max={5}
            {...register('floors', { valueAsNumber: true })}
            className="mt-1 w-full rounded-lg border border-slate-300 p-3"
          />
          {errors.floors && <p className="mt-1 text-sm text-red-600">{errors.floors.message}</p>}
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
          <input {...register('name')} className="mt-1 w-full rounded-lg border border-slate-300 p-3" />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm">Phone</label>
          <input {...register('phone')} className="mt-1 w-full rounded-lg border border-slate-300 p-3" />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="text-sm">Email (optional)</label>
          <input type="email" {...register('email')} className="mt-1 w-full rounded-lg border border-slate-300 p-3" placeholder="you@email.com" />
          {errors.email && <p className="mt-1 text-sm text-red-600">{typeof errors.email?.message === 'string' ? errors.email.message : ''}</p>}
        </div>
      </div>

      <button disabled={isSubmitting} className="btn btn-primary mt-6">
        {isSubmitting ? 'Submitting…' : 'Get Detailed Estimate'}
      </button>
      {quoteId && (
        <p className="mt-3 text-sm text-slate-600">
          Your reference ID: <b>{quoteId}</b>
        </p>
      )}
    </form>
  )
}
