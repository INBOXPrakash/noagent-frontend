'use client'
import { useState } from 'react'

export default function HeroSearchTabs() {
  const [tab, setTab] = useState<'buy' | 'rent' | 'commercial'>('buy')

  const common = (
    <>
      <input className="input" placeholder="Search city, area or landmark" />
      <select className="input">
        <option>Property Type</option>
        <option>Full House</option>
        <option>Land / Plot</option>
        <option>Commercial Space</option>
      </select>
      <select className="input">
        <option>BHK</option>
        <option>1 BHK</option>
        <option>2 BHK</option>
        <option>3 BHK</option>
      </select>
    </>
  )

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-[90%] max-w-3xl">

        {/* Tabs */}
        <div className="flex gap-4 mb-4 justify-center">
          {['buy','rent','commercial'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`px-5 py-2 rounded-full font-semibold ${
                tab === t ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {common}

          {tab === 'rent' && (
            <select className="input">
              <option>Furnishing</option>
              <option>Fully Furnished</option>
              <option>Semi Furnished</option>
              <option>Unfurnished</option>
            </select>
          )}

          {tab === 'commercial' && (
            <select className="input">
              <option>Use Type</option>
              <option>Office</option>
              <option>Retail</option>
              <option>Warehouse</option>
            </select>
          )}
        </div>

        <button className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
          Search Properties
        </button>
      </div>
    </div>
  )
}
