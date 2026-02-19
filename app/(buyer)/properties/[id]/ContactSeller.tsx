'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ContactSeller({
  propertyId,
}: {
  propertyId: number
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submitLead() {
    if (!name || !phone) {
      alert('Name and phone are required')
      return
    }

    setSubmitting(true)

    const { data: authData } = await supabase.auth.getUser()

    const { error } = await supabase.from('leads').insert({
      property_id: propertyId,        // ✅ bigint
      buyer_name: name,
      buyer_phone: phone,
      buyer_email: email || null,
      buyer_id: authData?.user?.id ?? null,
    })

    if (error) {
      console.error(error)
      alert('Failed to submit lead')
    } else {
      alert('Seller will contact you soon')
      setOpen(false)
      setName('')
      setPhone('')
      setEmail('')
    }

    setSubmitting(false)
  }

  return (
    <div className="mt-6">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 text-white px-6 py-2"
        >
          Contact Seller
        </button>
      ) : (
        <div className="border p-4 max-w-md">
          <h3 className="font-semibold mb-3">Contact Seller</h3>

          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-2"
          />

          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full mb-2"
          />

          <input
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <div className="flex gap-3">
            <button
              onClick={submitLead}
              disabled={submitting}
              className="bg-black text-white px-4 py-2 disabled:opacity-50"
            >
              {submitting ? 'Submitting…' : 'Submit'}
            </button>

            <button
              onClick={() => setOpen(false)}
              className="border px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
