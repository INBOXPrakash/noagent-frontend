'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function SellerStartPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function resolveSellerEntry() {
      // 1️⃣ Check auth session
      const { data: sessionData } = await supabase.auth.getSession()

      if (!mounted) return

      // ❌ Not authenticated → back to seller landing
      if (!sessionData.session) {
        router.replace('/seller')
        return
      }

      const userId = sessionData.session.user.id

      // 2️⃣ Check if seller already has listings
      const { data: listings, error } = await supabase
        .from('properties')
        .select('id')
        .eq('owner_id', userId)
        .limit(1)

      if (!mounted) return

      // 3️⃣ Route based on seller state
      if (!error && listings && listings.length > 0) {
        // Existing seller → analytics (acts as dashboard)
        router.replace('/seller/analytics')
      } else {
        // New seller → create listing
        router.replace('/seller/add-property')
      }

      setLoading(false)
    }

    resolveSellerEntry()

    return () => {
      mounted = false
    }
  }, [router])

  // Prevent UI flicker / double render
  if (loading) return null

  return null
}
