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
      slug: 'green-meadows-flat',
      title: 'Green Meadows Flat',
      location: 'Arihant Nagar, Chandrapur',
      year: 2008,
      status: 'Completed',
      cover: '/images/img8.jpeg',
      images: [
        
      ],
      description: '3BHK luxury Flat with landscaped terrace and smart home features.',
      specs: { areaSqft: 10000, floors: 3, type: 'Flat' }
    },
    {
      slug: 'skyline-apartments',
      title: 'Skyline Apartments',
      location: 'Shastri Nagar, Chandrapur',
      year: 2004,
      status: 'Completed',
      cover: '/images/img9.jpeg',
      images: [
      ],
      description: '8-storey apartment block with premium amenities and RCC structure.',
      specs: { areaSqft: 20000, floors: 4, type: 'Flat' }
    },
    {
      slug: 'orchid-flat',
      title: 'Orchid Flat',
      location: 'Civil Lines, Chandrapur',
      year: 2011,
      status: 'Completed',
      cover: '/images/img7.jpeg',
      images: [
        
      ],
      description: 'Contemporary 4BHK flat with pool and double-height living.',
      specs: { areaSqft: 4500, floors: 3, type: 'Flat' }
    }
  ]