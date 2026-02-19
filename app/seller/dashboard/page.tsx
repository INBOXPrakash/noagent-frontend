'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

interface Property {
  id: number
  city: string
  title: string
  created_at: string
  price: number
  status: string
  views?: number
  unread?: number
}

export default function SellerDashboard() {
  const router = useRouter()

  const [sellerName, setSellerName] = useState('Seller')
  const [sellerId, setSellerId] = useState<string | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [powerCoins, setPowerCoins] = useState(0)
  const [referrals, setReferrals] = useState(0)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [referralCode, setReferralCode] = useState<string>('')

  const [currentInsight, setCurrentInsight] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)

  /* ================= MARKETING IMAGES ================= */
  const marketingImages = [
    '/testimonial1.png',
    '/testimonial2.png',
    '/testimonial3.png',
    '/testimonial4.png',
  ]

  /* ================= INSIGHTS ================= */
  const insights = [
    <> <strong>184,000</strong> monthly searches for <strong>2BHK</strong>. Only <strong>6,200 listings</strong>. </>,
    <> <strong>70% Demand–Supply Gap</strong> in your city. </>,
    <> <strong>Premium buyers prefer Trusted Sellers</strong>. </>,
    <> <strong>Billion Dollar opportunity</strong>. Become <strong>Trusted Seller</strong>. </>,
    <> <strong>10,000 Views</strong> unlock <strong>Amazon Voucher</strong>. </>,
    <> <strong>4 Referrals</strong> unlock <strong>Growth Badge</strong>. </>,
  ]

  /* ================= AUTH LOAD ================= */
  useEffect(() => {
    async function loadDashboard() {
      const { data } = await supabase.auth.getUser()

      if (!data?.user) {
        router.replace('/seller')
        return
      }

      const user = data.user
      setSellerId(user.id)
      setSellerName(user.email?.split('@')[0] || 'Seller')

      const { data: profile } = await supabase
        .from('seller_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        setPowerCoins(profile.power_coins || 0)
        setReferrals(profile.referral_count || 0)
        setProfilePhoto(profile.profile_photo || null)
        setReferralCode(profile.referral_code || '')
      }

      const { data: props } = await supabase
        .from('properties')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false })

      if (props) setProperties(props)
    }

    loadDashboard()
  }, [router])

  /* ================= ROTATING TEXT ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  /* ================= ROTATING IMAGES ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % marketingImages.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  /* ================= UPLOAD PHOTO ================= */
  async function uploadPhoto(e: any) {
    const file = e.target.files[0]
    if (!file || !sellerId) return

    const filePath = `${sellerId}-${Date.now()}`

    await supabase.storage
      .from('seller-photos')
      .upload(filePath, file)

    const { data } = supabase.storage
      .from('seller-photos')
      .getPublicUrl(filePath)

    await supabase
      .from('seller_profiles')
      .update({ profile_photo: data.publicUrl })
      .eq('id', sellerId)

    setProfilePhoto(data.publicUrl)
  }

  const totalViews = properties.reduce(
    (acc, p) => acc + (p.views || 0),
    0
  )

  const progressPercent = Math.min(
    (totalViews / 10000) * 100,
    100
  )

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">

        <div className="flex items-center gap-6">

          <div className="relative w-24 h-24">
            <div className="w-24 h-24 rounded-full border-4 border-orange-500 overflow-hidden flex items-center justify-center text-3xl font-bold text-orange-600 bg-orange-50 shadow-lg">
              {profilePhoto ? (
                <img src={profilePhoto} className="w-full h-full object-cover" />
              ) : (
                sellerName.charAt(0).toUpperCase()
              )}
            </div>

            <img
              src="/trusted-badge.png"
              className="absolute -bottom-2 -right-2 w-12 h-12 drop-shadow-lg"
            />

            <label className="absolute bottom-0 left-0 bg-orange-600 text-white text-xs px-2 py-1 rounded cursor-pointer">
              Edit
              <input type="file" hidden onChange={uploadPhoto} />
            </label>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome {sellerName}!
            </h2>

            <div className="flex gap-4 mt-2 text-sm items-center">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
                Starter Seller
              </span>

              <span className="text-orange-600 font-semibold">
                🪙 {powerCoins}
              </span>

              <span className="text-gray-600">
                Referrals: {referrals}
              </span>
            </div>

            {referralCode && (
              <div className="mt-2 text-xs text-gray-500">
                Your Code: <span className="font-semibold text-orange-600">{referralCode}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push('/seller/add-property')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
          >
            + Add Property
          </button>

          <button
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/')
            }}
            className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* ================= PROGRESS + MARKETING ================= */}
      <div className="mt-6 grid grid-cols-3 gap-6">

        <div className="col-span-2 flex flex-col gap-6">

          {/* Growth */}
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              🎯 Your Growth Progress
            </h4>

            <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-orange-600 h-3 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />

              <div className="absolute top-0 left-0 h-3 w-12 bg-white/40 animate-pulse blur-sm" />
            </div>

            <p className="text-xs text-gray-600 mt-2">
              {totalViews} / 10,000 Views to unlock Amazon Voucher
            </p>
          </div>
      {/* ================= PROPERTY TABLE ================= */}
      <div className="mt-8 bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

        {properties.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No properties listed yet.
          </div>
        ) : (

          <table className="w-full text-sm">
            <thead className="bg-orange-50 text-gray-800 font-semibold">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">City</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Posted On</th>
                <th className="p-4 text-left">Value</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Views</th>
                <th className="p-4 text-left">Unread</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-gray-800">
              {properties.map((p, index) => (
                <tr
                  key={p.id}
                  className="hover:bg-orange-50 transition-all duration-200"
                >
                  <td className="p-4 font-medium">{index + 1}</td>

                  <td className="p-4 font-medium">
                    {p.city || '-'}
                  </td>

                  <td className="p-4 font-medium">
                    {p.title || '-'}
                  </td>

                  <td className="p-4">
                    {p.created_at
                      ? new Date(p.created_at).toLocaleDateString()
                      : '-'}
                  </td>

                  <td className="p-4 font-semibold text-green-600">
                    ₹ {p.price ? p.price.toLocaleString() : '-'}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-4 text-blue-600 font-semibold">
                    {p.views ?? 0}
                  </td>

                  <td className="p-4 text-red-600 font-semibold">
                    {p.unread ?? 0}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        router.push(`/seller/add-property?id=${p.id}`)
                      }
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        )}
      </div>

          {/* Insight */}
          <div className="bg-gradient-to-r from-orange-100 to-yellow-50 p-5 rounded-2xl shadow-md border border-white-200">
            <h3 className="text-lg font-bold text-orange-700 mb-2">
              🚀 Market Insight
            </h3>

            <p className="text-gray-800 text-sm font-medium transition-all duration-500">
              {insights[currentInsight]}
            </p>
          </div>
        </div>

        {/* Marketing Image Holder */}
        <div className="relative bg-white rounded-2xl shadow-md overflow-hidden">
          <img
            src={marketingImages[currentImage]}
            className="w-full h-full object-cover transition-all duration-700"
            alt="Marketing"
          />

          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/50 to-transparent p-4">
            <p className="text-white text-sm font-semibold">
              Become a Trusted Seller Today
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}
