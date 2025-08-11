'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/estimate', label: 'Estimate' },
  { href: '/plot-dealers', label: 'Plot Dealers' },
  { href: '/enquiry', label: 'Enquiry' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container-max flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-brand">
          Prashant <span className="text-slate-900">Developers</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium hover:text-brand">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <a href="tel:+919999999999" className="btn btn-primary"><Phone className="h-4 w-4"/> +91 99999 99999</a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-max flex flex-col gap-4 py-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base">
                {l.label}
              </Link>
            ))}
            <a href="tel:+919999999999" className="btn btn-primary w-full justify-center"><Phone className="h-4 w-4"/> Call Us</a>
          </div>
        </div>
      )}
    </header>
  )
}