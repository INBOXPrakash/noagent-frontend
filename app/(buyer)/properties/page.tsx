'use client'

import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import BuyFilters from '../components/BuyFilters'
import PropertyCard from '../components/PropertyCard'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchProperties } from '@/lib/fetchProperties'



export default function PropertiesPage() {
  const params = useSearchParams()

  // Core search params
  const city = params.get('city') || 'Hyderabad'
  const locality = params.get('locality') || ''

  // Filters
  const bhk = params.getAll('bhk')
  const type = params.getAll('type')
  const minPrice = params.get('minPrice')
  const maxPrice = params.get('maxPrice')

  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)

      const data = await fetchProperties({
        city,
        locality,
        bhk: bhk.length ? bhk : undefined,
        propertyType: type.length ? type : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      })

      setProperties(data)
      setLoading(false)
    }

    load()
  }, [
    city,
    locality,
    bhk.join(','),      // important: array dependency safety
    type.join(','),
    minPrice,
    maxPrice,
  ])

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header scrolls away */}
      <Header />

      {/* Sticky search bar ONLY */}
      <div className="sticky top-0 z-30 bg-white border-b">
        <div className="max-w-[1280px] mx-auto px-4 py-3">
          <SearchBar showTabs={false} fixedType="buy" />
        </div>
      </div>

      {/* Page body */}
      <div className="max-w-[1280px] mx-auto px-4 py-6 grid grid-cols-12 gap-6">

        {/* LEFT FILTERS */}
        <aside className="col-span-3 hidden lg:block">
          <BuyFilters />
        </aside>

        {/* RESULTS */}
        <main className="col-span-12 lg:col-span-9 space-y-4">

          <h2 className="text-sm text-gray-600">
            Properties for Buy in{' '}
            <b>{locality || 'selected location'}</b>, {city}
          </h2>

          {loading && (
            <p className="text-gray-500">Loading properties...</p>
          )}

          {!loading && properties.length === 0 && (
            <p className="text-gray-500">
              No properties found for this location.
            </p>
          )}

          {!loading &&
            properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
        </main>
      </div>
    </div>
  )
}
