import { notFound } from 'next/navigation'
import Gallery from 'src/components/Gallery'
import { projects } from 'src/lib/project'

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) return notFound()

  return (
    <section className="section">
      <div className="container-max">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <img src={project.cover} alt={project.title} className="w-full rounded-2xl border border-slate-200 object-cover"/>
            <div className="mt-4">
              <Gallery images={project.images} />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <div className="mt-2 text-slate-600">{project.location} • {project.year} • {project.status}</div>
            <p className="mt-4 text-slate-700">{project.description}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="card"><div className="text-sm text-slate-500">Area</div><div className="text-xl font-semibold">{project.specs.areaSqft} sqft</div></div>
              <div className="card"><div className="text-sm text-slate-500">Floors</div><div className="text-xl font-semibold">{project.specs.floors}</div></div>
              <div className="card"><div className="text-sm text-slate-500">Type</div><div className="text-xl font-semibold">{project.specs.type}</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}