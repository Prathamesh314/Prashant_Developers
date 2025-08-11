'use client'
import { useMemo, useState } from 'react'

type Dealer = { name: string; phone: string; city: string; notes?: string }

const DEALERS: Dealer[] = [
  { name: 'Shree Realty', phone: '+91 98765 43210', city: 'Pune', notes: 'Residential plots' },
  { name: 'Omkar Lands', phone: '+91 98220 11223', city: 'Mumbai', notes: 'Township plots' },
  { name: 'Mahadev Properties', phone: '+91 98909 77881', city: 'Nashik', notes: 'NA plots' },
]

export default function PlotDealersPage() {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => DEALERS.filter(d => (d.city + d.name).toLowerCase().includes(q.toLowerCase())), [q])

  return (
    <section className="section">
      <div className="container-max">
        <h1 className="text-3xl font-bold">Plot Dealers</h1>
        <p className="mt-2 text-slate-600">Our partner network for verified plots. Looking to partner? Email <b>partners@prashantdevelopers.com</b></p>

        <div className="mt-6 flex items-center gap-3">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by city or name" className="w-full rounded-xl border border-slate-300 p-3"/>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(d => (
            <div key={d.name} className="card">
              <div className="text-lg font-semibold">{d.name}</div>
              <div className="text-sm text-slate-600">{d.city}</div>
              <div className="mt-2 text-sm">{d.notes}</div>
              <a className="btn btn-primary mt-4 w-full justify-center" href={`tel:${d.phone}`}>Call {d.phone}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}