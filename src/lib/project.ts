export type Project = {
    slug: string
    title: string
    location: string
    year: number
    status: 'Completed' | 'Ongoing'
    cover: string
    images: string[]
    description: string
    specs: { areaSqft: number; floors: number; type: 'Flat' | 'Duplex' | 'Villa' | 'Commercial' }
  }
  
  export const projects: Project[] = [
    {
      slug: 'green-meadows-duplex',
      title: 'Green Meadows Duplex',
      location: 'Baner, Pune',
      year: 2024,
      status: 'Completed',
      cover: '/images/projects/green-meadows/cover.jpg',
      images: [
        '/images/projects/green-meadows/1.jpg',
        '/images/projects/green-meadows/2.jpg',
        '/images/projects/green-meadows/3.jpg'
      ],
      description: '3BHK luxury duplex with landscaped terrace and smart home features.',
      specs: { areaSqft: 2400, floors: 2, type: 'Duplex' }
    },
    {
      slug: 'skyline-apartments',
      title: 'Skyline Apartments',
      location: 'Hinjawadi, Pune',
      year: 2023,
      status: 'Completed',
      cover: '/images/projects/skyline/cover.jpg',
      images: [
        '/images/projects/skyline/1.jpg',
        '/images/projects/skyline/2.jpg',
        '/images/projects/skyline/3.jpg'
      ],
      description: '8-storey apartment block with premium amenities and RCC structure.',
      specs: { areaSqft: 78000, floors: 8, type: 'Flat' }
    },
    {
      slug: 'orchid-villa',
      title: 'Orchid Villa',
      location: 'Kothrud, Pune',
      year: 2025,
      status: 'Ongoing',
      cover: '/images/projects/orchid/cover.jpg',
      images: [
        '/images/projects/orchid/1.jpg',
        '/images/projects/orchid/2.jpg',
        '/images/projects/orchid/3.jpg'
      ],
      description: 'Contemporary 4BHK villa with pool and double-height living.',
      specs: { areaSqft: 4500, floors: 2, type: 'Villa' }
    }
  ]