'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchBar({
  showTabs = true,
  fixedType = 'buy'
}) {
  const router = useRouter()
  const params = useSearchParams()

  const [type, setType] = useState(fixedType)
  const [city, setCity] = useState(params.get('city') || 'Hyderabad')
  const [locality, setLocality] = useState(params.get('locality') || '')

  const onSearch = () => {
    router.push(
      `/properties?type=${type}&city=${encodeURIComponent(city)}&locality=${encodeURIComponent(locality)}`
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">

      {/* 🔴 TABS (ONLY ON HOME PAGE) */}
      {showTabs && (
        <div className="flex justify-center gap-12 border-b">
          {['buy', 'rent', 'commercial'].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`relative py-4 text-sm font-semibold uppercase transition ${
                type === t ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
              {type === t && (
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-red-500" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* 🔍 SEARCH ROW */}
      <div className="flex items-stretch h-[44px]">

        {/* CITY */}
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 border-r text-sm outline-none bg-white text-gray-700 min-w-[160px]"
        >
          <option>Hyderabad</option>
          <option>Bangalore</option>
          <option>Mumbai</option>
          <option>Pune</option>
        </select>

        {/* LOCALITY */}
        <input
          type="text"
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          placeholder="Search upto 3 localities or landmarks"
          className="flex-1 px-4 text-sm outline-none text-gray-700"
        />

        {/* SEARCH BUTTON */}
        <button
          onClick={onSearch}
          className="bg-red-500 hover:bg-red-600 text-white px-12 text-lg font-semibold flex items-center gap-2"
        >
          🔍 Search
        </button>

      </div>
    </div>
  )
}

