import './globals.css'
import { ReactNode } from 'react'
import { Metadata } from 'next'
import Navbar from 'src/components/Navbar'
import Footer from 'src/components/Footer'

export const metadata: Metadata = {
  title: 'Prashant Developers | Construction • Flats • Duplexes • End-to-End',
  description:
    'Prashant Developers builds premium flats and duplexes with end-to-end service. Material & labor contracts, turnkey solutions, plot dealing, and more.',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}