import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="container-max grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Building <span className="text-brand">Flats</span>, Duplexes & Turnkey Homes
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            End-to-end construction with or without material — transparent, on-time, and quality-first.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/estimate" className="btn btn-primary">Get Instant Estimate</Link>
            <Link href="/projects" className="btn btn-outline">View Projects</Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 text-sm text-slate-700 md:grid-cols-3">
            <li className="card">RCC Structure</li>
            <li className="card">Architect & PMC</li>
            <li className="card">Material / Labor</li>
            <li className="card">Vastu Compliant</li>
            <li className="card">5-Year Warranty</li>
            <li className="card">Weekly Reporting</li>
          </ul>
        </div>
        <div className="relative">
          <img src="/images/hero.jpg" alt="Modern duplex by Prashant Developers" className="h-full w-full rounded-3xl object-cover shadow-soft"/>
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5"/>
        </div>
      </div>
    </section>
  )
}