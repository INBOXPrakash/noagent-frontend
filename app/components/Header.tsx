'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BRAND_NAME, BRAND_MARK } from '@/config/site'

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-white text-2xl font-bold"
        >
          <Image
            src="/images/noagent-mark.png"
            alt="NoAgent logo"
            width={48}
            height={48}
            priority
          />
          <span>
            {BRAND_NAME}
            <span className="text-yellow-300 align-super ml-0.5">
              {BRAND_MARK}
            </span>
          </span>
        </Link>

        {/* RIGHT SIDE — ALWAYS SAME */}
        <div className="hidden md:flex items-center gap-4 text-white text-sm">
          <button className="flex items-center gap-1 border border-white/40 px-3 py-1.5 rounded">
            💳 Pay Rent
          </button>

          <Link
            href="/seller"
            className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition shadow"
          >
            For Property Owners
          </Link>

          <Link href="/signup" className="hover:underline">
            Sign up
          </Link>

          <Link href="/login" className="hover:underline">
            Log in
          </Link>

          <button className="ml-2">☰</button>
        </div>
      </div>
    </header>
  )
}
