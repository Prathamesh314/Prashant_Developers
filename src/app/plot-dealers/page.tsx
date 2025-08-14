'use client'
import { useMemo, useState } from 'react'

type Dealer = { name: string; phone: string; city: string; notes?: string, img?: string }

const DEALERS: Dealer[] = [
  { name: 'Prashant Developers', phone: '+91 91757 35018', city: 'Chandrapur', notes: 'Residential plots', img: "images/plot-dealers-1.jpeg"},
  { name: 'Prashant Developers', phone: '+91 91757 35018', city: 'Nagpur', notes: 'Residential plots', img: "images/plot-dealer-2.jpeg" },
  // { name: 'Omkar Lands', phone: '+91 98220 11223', city: 'Nagpur', notes: 'Township plots' },
  // { name: 'Mahadev Properties', phone: '+91 98909 77881', city: 'Nashik', notes: 'NA plots' },
]

export default function PlotDealersPage() {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => DEALERS.filter(d => (d.city + d.name).toLowerCase().includes(q.toLowerCase())), [q])

  return (
    <section className="section">
      <div className="container-max">
        <h1 className="text-3xl font-bold">Plot Dealers</h1>
        <p className="mt-2 text-slate-600">Our partner network for verified plots. Looking to partner? Email <b>prashantmohitkar9@gmail.com</b></p>

        <div className="mt-6 flex items-center gap-3">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by city or name" className="w-full rounded-xl border border-slate-300 p-3"/>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(d => (
            <div key={d.name} className="card">
              <img src={d.img} alt={d.name} className="w-full h-40 object-cover rounded-t-xl" />
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