import ProjectCard from "src/components/ProjectCard";
import { projects } from "src/lib/project";


export default function ProjectsPage() {
  return (
    <section className="section">
      <div className="container-max">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-slate-600">Residential & commercial projects delivered with precision.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(p => (
            <ProjectCard key={p.slug} slug={p.slug} title={p.title} location={p.location} cover={p.cover} year={p.year} />
          ))}
        </div>
      </div>
    </section>
  )
}