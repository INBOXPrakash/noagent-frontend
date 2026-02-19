'use client'
import Link from 'next/link'

export default function OwnerCTA() {
  return (
    <div className="mt-8 flex flex-col items-center text-white ui-lock">

      <div className="flex items-center gap-4 mb-4">
        <span className="w-20 h-px bg-white/40"></span>
        <span className="text-sm opacity-90">
          Are you a Property Owner?
        </span>
        <span className="w-20 h-px bg-white/40"></span>
      </div>

      <Link
        href="/add-property"
        className="bg-emerald-600 px-6 py-3 rounded font-semibold hover:bg-emerald-500 transition"
      >
        Post Free Property Ad
      </Link>
    </div>
  )
}
