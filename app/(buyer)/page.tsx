'use client'


import OwnerCTA from '../components/OwnerCTA'
import PropertyTabs from '../components/PropertyTabs'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const slides = [
  { src: '/images/hero1.png', text: 'Buy & Sell Without Agents' },
  { src: '/images/hero2.png', text: 'Zero Brokerage. Full Support.' },
  { src: '/images/hero3.png', text: 'Trusted by Global Home Buyers' },
]

export default function Home() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 6500) // slower, premium timing
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">

      {/* Header (static) */}
      

      {/* =========================
          BACKGROUND IMAGE SLIDER
         ========================= */}
      {slides.map((slide, i) => (
        <div key={i} className="absolute inset-0">

          {/* ONLY image fades */}
          <div
            className={`absolute inset-0 transition-opacity ease-in-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDuration: '2200ms' }}
          >
            <Image
              src={slide.src}
              alt={slide.text}
              fill
              className="object-cover"
              priority={i === 0}
            />

            {/* dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

        </div>
      ))}

      {/* =========================
          STATIC UI OVERLAY
         ========================= */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 ui-lock z-40">

        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
          {slides[index].text}
        </h1>

        <p className="text-white/90 text-lg mb-8 max-w-2xl">
          NoAgent.com connects buyers and sellers directly.
          Zero brokerage. Full support.
        </p>

        {/* Buy | Rent | Commercial */}
        <PropertyTabs />

        {/* Are you a Property Owner? */}
        <OwnerCTA />
      </div>

    </div>
  )
}
