import { Hammer, Building2, Home, Ruler, PackageCheck, Handshake } from 'lucide-react'

const services = [
  { icon: Home, title: 'Flats & Apartments', desc: 'Premium finishing with efficient layouts and amenities.' },
  { icon: Building2, title: 'Duplexes & Villas', desc: 'Custom luxury homes with turnkey execution.' },
  { icon: Hammer, title: 'End-to-End Execution', desc: 'Design, approvals, construction, and handover.' },
  { icon: PackageCheck, title: 'With / Without Material', desc: 'Flexible contracts per your budget & timeline.' },
  { icon: Ruler, title: 'Architecture & PMC', desc: 'Concept to completion by expert architects & PMs.' },
  { icon: Handshake, title: 'Developers & JV', desc: 'Landowner collaborations, redevelopment & JV models.' },
]

export default function Services() {
  return (
    <section className="section">
      <div className="container-max">
        <h2 className="text-3xl font-bold">What We Do</h2>
        <p className="mt-2 text-slate-600">Comprehensive solutions for residential & commercial construction.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card">
              <Icon className="h-6 w-6 text-brand" />
              <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}