'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BRAND_NAME, BRAND_MARK } from '@/config/site'

export default function SellerHeader() {
  return (
    <header className="sticky top-0 left-0 w-full z-30 bg-red-500 shadow">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-white text-2xl font-bold"
        >
          <Image
            src="/images/noagent-mark.png"
            alt="NoAgent logo"
            width={44}
            height={44}
            priority
          />
          <span>
            {BRAND_NAME}
            <span className="text-yellow-300 align-super ml-0.5">
              {BRAND_MARK}
            </span>
          </span>
        </Link>

        {/* Seller-only actions */}
        <div className="flex items-center gap-4 text-white text-sm">
          <Link href="/seller/add-property" className="hover:underline">
           
          </Link>

          <Link href="/seller/analytics" className="hover:underline">
           
          </Link>

          <button className="ml-2">☰</button>
        </div>
      </div>
    </header>
  )
}
