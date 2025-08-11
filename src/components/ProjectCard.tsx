import Link from 'next/link'

type Props = {
  slug: string
  title: string
  location: string
  cover: string
  year: number
}

export default function ProjectCard({ slug, title, location, cover, year }: Props) {
  return (
    <Link href={`/projects/${slug}`} className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
      <img src={cover} alt={title} className="h-52 w-full object-cover transition group-hover:scale-105"/>
      <div className="p-4">
        <div className="text-sm text-slate-500">{location} • {year}</div>
        <h3 className="mt-1 text-lg font-semibold group-hover:text-brand">{title}</h3>
      </div>
    </Link>
  )
}