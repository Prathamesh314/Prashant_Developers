'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  phone: z.string().min(10, 'Enter a valid phone'),
  email: z.string().email().optional().or(z.literal('')),
  city: z.string().optional(),
  message: z.string().min(5, 'Please add a short message')
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (res.ok) {
      alert('Thanks! We will reach out shortly.')
      reset()
    } else {
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <h3 className="text-xl font-semibold">Send an Enquiry</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm">Name</label>
          <input {...register('name')} className="mt-1 w-full rounded-lg border border-slate-300 p-3" placeholder="Your name"/>
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm">Phone</label>
          <input {...register('phone')} className="mt-1 w-full rounded-lg border border-slate-300 p-3" placeholder="Your phone"/>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="text-sm">Email (optional)</label>
          <input {...register('email')} className="mt-1 w-full rounded-lg border border-slate-300 p-3" placeholder="you@email.com"/>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm">City</label>
          <input {...register('city')} className="mt-1 w-full rounded-lg border border-slate-300 p-3" placeholder="City"/>
        </div>
      </div>
      <div className="mt-4">
        <label className="text-sm">Message</label>
        <textarea {...register('message')} className="mt-1 w-full rounded-lg border border-slate-300 p-3" rows={4} placeholder="Tell us about your plot or project"/>
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>
      <button disabled={isSubmitting} className="btn btn-primary mt-6">{isSubmitting ? 'Submitting…' : 'Submit Enquiry'}</button>
    </form>
  )
}