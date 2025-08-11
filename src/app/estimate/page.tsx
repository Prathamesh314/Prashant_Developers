import EstimateForm from "src/components/EstimateForm";


export default function EstimatePage() {
  return (
    <section className="section">
      <div className="container-max">
        <h1 className="text-3xl font-bold">Estimate</h1>
        <p className="mt-2 text-slate-600">Get a ballpark cost instantly. Exact pricing depends on site conditions and specifications.</p>
        <div className="mt-6">
          <EstimateForm />
        </div>
      </div>
    </section>
  )
}