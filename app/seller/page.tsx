'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type SellerRole = 'individual' | 'agent' | 'developer'

const testimonials = [
  {
    text: 'Saved brokerage and closed directly with the buyer.',
    name: 'Sunita',
    city: 'Pune',
  },
  {
    text: 'Got genuine enquiries without broker calls.',
    name: 'Anil',
    city: 'Mumbai',
  },
  {
    text: 'Very smooth process. Full control over my listing.',
    name: 'Ramesh',
    city: 'Bengaluru',
  },
]

export default function SellerLandingPage() {
  const router = useRouter()

  const [role, setRole] = useState<SellerRole | null>(null)
  const [showManualEntry, setShowManualEntry] = useState(false)

  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [testimonialIndex, setTestimonialIndex] = useState(0)

  // 🍎 Apple device detection (UI ordering only)
  const isAppleDevice =
    typeof window !== 'undefined' &&
    /iPhone|iPad|Macintosh/.test(navigator.userAgent)

  // 🔁 Rotate testimonial
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  // 🔒 Numeric-only mobile (max 10 digits)
  function handleMobileChange(value: string) {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 10) setMobile(digits)
  }

  // 🟢 GOOGLE LOGIN
  async function continueWithGoogle() {
    setError('')
    if (!role) {
      setError('Select your Seller Profile')
      return
    }

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/seller/auth/callback`,
      },
    })
  }

  // 🍎 APPLE LOGIN
  async function continueWithApple() {
    setError('')
    if (!role) {
      setError('Select your Seller Profile')
      return
    }

    await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/seller/auth/callback`,
      },
    })
  }

  // 🟡 MANUAL EMAIL MAGIC LINK
  async function continueManually() {
    setError('')

    if (!role) {
      setError('Select your Seller Profile')
      return
    }

    if (!email) {
      setError('Please enter your email address')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/seller/auth/callback`,
      },
    })

    setLoading(false)

    if (error) {
      setError('Failed to send verification link. Please try again.')
    }
  }

  const t = testimonials[testimonialIndex]

  return (
    <div className="min-h-screen bg-gray-50 px-11 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10">

        {/* HERO */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            List Your Property on NoAgent
          </h1>
          <p className="text-gray-600 text-lg">
            No brokerage • Direct buyers • Full control
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT — BENEFITS + TESTIMONIAL */}
          <div className="space-y-6 bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Why post through NoAgent?
            </h2>

            <ul className="space-y-3 text-gray-700">
              <li>✔ 100% Zero Brokerage</li>
              <li>✔ Genuine Buyer Enquiries</li>
              <li>✔ Full Control Over Your Listing</li>
              <li>✔ Faster Property Closure</li>
            </ul>

            {/* ROTATING TESTIMONIAL */}
            <div className="mt-6 border-l-4 border-orange-600 bg-white p-5 rounded shadow-sm transition-all">
              <p className="italic text-gray-800 text-lg">
                “{t.text}”
              </p>

              <p className="mt-3 text-sm font-semibold text-gray-900">
                {t.name}
                <span className="text-gray-500"> | {t.city}</span>
              </p>

              <p className="text-xs text-gray-500">
                Verified Home Owner
              </p>
            </div>
          </div>

          {/* RIGHT — ACTION */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Get started in under 1 minute
            </h2>

            {/* ROLE SELECTION */}
            <div className="space-y-4 mb-6">
              {(['individual', 'agent', 'developer'] as SellerRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`w-full rounded-xl p-4 text-left border transition-all
                    ${
                      role === r
                        ? 'border-orange-600 bg-orange-50 shadow-md'
                        : 'border-gray-300 bg-gray-50 hover:bg-white hover:shadow'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">
                      {r === 'individual' ? '🏠' : r === 'agent' ? '👔' : '🏗️'}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {r === 'individual'
                          ? 'Individual Owner'
                          : r === 'agent'
                          ? 'Agent / Broker'
                          : 'Builder / Developer'}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {r === 'individual'
                          ? 'List your own house, flat, or villa'
                          : r === 'agent'
                          ? 'Manage and list multiple properties'
                          : 'Promote projects and inventory'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-sm text-red-600 mb-4">{error}</p>
            )}

            {/* PRIMARY AUTH */}
            <div className="space-y-3">
              {isAppleDevice && (
                <button
                  onClick={continueWithApple}
                  className="w-full bg-black text-white py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition"
                >
                  <span className="text-xl"></span>
                  Continue with Apple
                </button>
              )}

              <button
                onClick={continueWithGoogle}
                className="w-full bg-orange-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition"
              >
                Continue with Google
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-2">
              Fastest way • No OTP required
            </p>

            {/* MANUAL ENTRY TOGGLE */}
            {!showManualEntry && (
              <button
                onClick={() => setShowManualEntry(true)}
                className="mt-4 w-full border py-3 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Enter Mobile & Email Manually
              </button>
            )}

            {/* MANUAL ENTRY */}
            {showManualEntry && (
              <div className="mt-6 space-y-4">
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter Mobile number"
                  value={mobile}
                  onChange={(e) => handleMobileChange(e.target.value)}
                  className="
  w-full rounded-lg p-3
  border border-gray-400
  bg-white
  text-gray-900
  placeholder:text-gray-500
  focus:outline-none
  focus:ring-2 focus:ring-orange-100
  focus:border-orange-500
"

                />

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
  w-full rounded-lg p-3
  border border-gray-400
  bg-white
  text-gray-900
  placeholder:text-gray-500
  focus:outline-none
  focus:ring-2 focus:ring-orange-100
  focus:border-orange-500
"

                />

                <button
                  onClick={continueManually}
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold"
                >
                  {loading ? 'Sending link…' : 'Continue'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We’ll send a secure verification link to your email
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-12">
          Trusted by home owners • NoAgent is a zero brokerage platform
        </p>
      </div>
    </div>
  )
}
