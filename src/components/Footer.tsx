import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-max grid gap-8 py-12 md:grid-cols-4">
        <div>
          <div className="text-xl font-bold text-brand">Prashant Developers</div>
          <p className="mt-3 text-sm text-slate-600">Premium residential & commercial construction with end-to-end service, on-time delivery, and transparent pricing.</p>
        </div>
        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/projects" className="hover:text-brand">Projects</Link></li>
            <li><Link href="/estimate" className="hover:text-brand">Estimate</Link></li>
            <li><Link href="/plot-dealers" className="hover:text-brand">Plot Dealers</Link></li>
            <li><Link href="/enquiry" className="hover:text-brand">Enquiry</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>+91 99999 99999</li>
            <li>sales@prashantdevelopers.com</li>
            <li>123, Main Road, Pune, Maharashtra</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Hours</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Mon–Sat: 9:00 AM – 7:00 PM</li>
            <li>Sunday: By Appointment</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Prashant Developers. All rights reserved.
      </div>
    </footer>
  )
}