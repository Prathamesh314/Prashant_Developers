'use client'
import { useState } from 'react'

export default function Gallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {images.map((src, i) => (
          <button key={src} onClick={() => { setActive(i); setOpen(true); }} className="group overflow-hidden rounded-xl">
            <img src={src} alt="Project" className="h-36 w-full object-cover transition group-hover:brightness-110"/>
          </button>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6" onClick={() => setOpen(false)}>
          <img src={images[active]} alt="Large" className="max-h-[85vh] w-auto rounded-2xl shadow-2xl"/>
        </div>
      )}
    </div>
  )
}