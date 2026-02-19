'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function BuyFilters() {
  const router = useRouter()
  const params = useSearchParams()

  const [bhk, setBhk] = useState(params.getAll('bhk'))
  const [type, setType] = useState(params.getAll('type'))
  const [minPrice, setMinPrice] = useState(params.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(params.get('maxPrice') || '')

  function toggle(setter, value) {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    )
  }

  function applyFilters() {
    const q = new URLSearchParams(params.toString())

    q.delete('bhk')
    bhk.forEach((b) => q.append('bhk', b))

    q.delete('type')
    type.forEach((t) => q.append('type', t))

    minPrice ? q.set('minPrice', minPrice) : q.delete('minPrice')
    maxPrice ? q.set('maxPrice', maxPrice) : q.delete('maxPrice')

    router.push(`/properties?${q.toString()}`)
  }

  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">

      {/* BHK */}
      <div>
        <h4 className="font-semibold text-sm mb-2">BHK Type</h4>
        {['1 RK', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map((b) => (
          <label key={b} className="block text-sm">
            <input
              type="checkbox"
              checked={bhk.includes(b)}
              onChange={() => toggle(setBhk, b)}
              className="mr-2"
            />
            {b}
          </label>
        ))}
      </div>

      {/* Property Type */}
      <div>
        <h4 className="font-semibold text-sm mb-2">Property Type</h4>
        {['Apartment', 'Independent House', 'Villa'].map((t) => (
          <label key={t} className="block text-sm">
            <input
              type="checkbox"
              checked={type.includes(t)}
              onChange={() => toggle(setType, t)}
              className="mr-2"
            />
            {t}
          </label>
        ))}
      </div>

      {/* Price */}
      <div>
        <h4 className="font-semibold text-sm mb-2">Price Range</h4>
        <div className="flex gap-2">
          <input
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border px-2 py-1 text-sm w-20"
          />
          <input
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border px-2 py-1 text-sm w-20"
          />
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-red-500 text-white py-2 rounded text-sm"
      >
        Apply Filters
      </button>
    </div>
  )
}
