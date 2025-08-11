import ContactForm from "src/components/ContactForm";


export default function EnquiryPage() {
  return (
    <section className="section">
      <div className="container-max grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold">Enquiry</h1>
          <p className="mt-2 text-slate-600">Tell us about your plot, requirements, and budget. Our team will call you within 24 hours.</p>
          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            <li>• End-to-end construction with/without material</li>
            <li>• Architectural design & approvals</li>
            <li>• Turnkey interior finishing</li>
            <li>• Transparent BOQ & schedules</li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}