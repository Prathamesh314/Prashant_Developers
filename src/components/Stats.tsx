export default function Stats() {
    const stats = [
      { label: 'Years Experience', value: '25+' },
      { label: 'Projects Delivered', value: '120+' },
      { label: 'On-Time Delivery', value: '98%' },
      { label: 'Customer Satisfaction', value: '4.9/5' },
    ]
    return (
      <section className="bg-slate-50 py-12">
        <div className="container-max grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {stats.map(s => (
            <div key={s.label} className="card text-center">
              <div className="text-3xl font-bold text-brand">{s.value}</div>
              <div className="mt-1 text-sm text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    )
  }