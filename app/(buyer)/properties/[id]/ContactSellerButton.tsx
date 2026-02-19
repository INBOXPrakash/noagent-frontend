'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ContactSellerButton({
  propertyId,
}: {
  propertyId: string
}) {
  const router = useRouter()

  const handleClick = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // ❌ Not logged in → force login
    if (!user) {
      router.push(`/login?redirect=/properties/${propertyId}`)
      return
    }

    // ✅ Logged in → go to contact page (next step)
    router.push(`/properties/${propertyId}/contact`)
  }

  return (
    <button
      onClick={handleClick}
      className="mt-6 px-5 py-2 bg-black text-white rounded"
    >
      Contact Seller
    </button>
  )
}
