
import Link from 'next/link'
import Gallery from 'src/components/Gallery'
import Hero from 'src/components/Hero'
import ProjectCard from 'src/components/ProjectCard'
import Services from 'src/components/Services'
import Stats from 'src/components/Stats'
import { projects } from 'src/lib/project'

export default function HomePage() {
  const gallery = projects.flatMap(p => p.images.slice(0, 1))

  return (
    <>
      <Hero />
      <Services />
      <Stats />

      <section className="section">
        <div className="container-max">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Featured Projects</h2>
              <p className="mt-2 text-slate-600">A snapshot of our recent work.</p>
            </div>
            <Link href="/projects" className="text-brand">See all</Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map(p => (
              <ProjectCard key={p.slug} slug={p.slug} title={p.title} location={p.location} cover={p.cover} year={p.year} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-max">
          <h2 className="text-3xl font-bold">Gallery</h2>
          <p className="mt-2 text-slate-600">Browse highlights from completed sites.</p>
          <div className="mt-6">
            <Gallery images={gallery} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-max grid items-center gap-8 rounded-3xl bg-gradient-to-r from-brand to-brand-light p-8 text-white md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold">Have a Plot? Get a Free Consultation</h3>
            <p className="mt-2 text-white/90">Our experts will evaluate feasibility, budget & timelines.</p>
          </div>
          <div className="flex justify-end">
            <Link href="/enquiry" className="btn bg-white text-brand">Book a Call</Link>
          </div>
        </div>
      </section>
    </>
  )
}