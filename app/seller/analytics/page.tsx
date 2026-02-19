'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { fetchSellerAnalytics } from './fetchSellerAnalytics'

interface ListingAnalytics {
  id: number
  title: string
  status: string
  views: number
  leads: { count: number }[]
}

export default function SellerAnalyticsPage() {
  const [listings, setListings] = useState<ListingAnalytics[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAnalytics() {
      const { data } = await supabase.auth.getUser()
      if (!data?.user) return

      const result = await fetchSellerAnalytics(data.user.id)
      setListings(result || [])
      setLoading(false)
    }

    loadAnalytics()
  }, [])

  if (loading) {
    return <div className="p-6">Loading analytics…</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">
        Listing Analytics
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Title</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Views</th>
              <th className="border px-3 py-2">Leads</th>
            </tr>
          </thead>

          <tbody>
            {listings.map((l) => (
              <tr key={l.id}>
                <td className="border px-3 py-2">{l.title}</td>
                <td className="border px-3 py-2 text-center">
                  <StatusBadge status={l.status} />
                </td>
                <td className="border px-3 py-2 text-center">
                  {l.views ?? 0}
                </td>
                <td className="border px-3 py-2 text-center">
                  {l.leads?.[0]?.count ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === 'LIVE'
      ? 'bg-green-100 text-green-700'
      : status === 'PAUSED'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-gray-100 text-gray-600'

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${color}`}
    >
      {status}
    </span>
  )
}
