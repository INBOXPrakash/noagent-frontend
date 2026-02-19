'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Insight {
  title: string
  description: string
  highlight?: string[]
}

const insights: Insight[] = [
  {
    title: '🚀 Untapped Buyer Demand in Hyderabad',
    description:
      '1,84,000 monthly searches for 2BHK properties. Only 6,200 verified listings available.',
    highlight: ['Demand-Supply Gap: 70%'],
  },
  {
    title: '🔐 Buyers Prefer Trusted Sellers',
    description:
      '70% of high-intent buyers respond faster to sellers with verified trust badge.',
    highlight: ['3X Higher Response Rate'],
  },
  {
    title: '💰 Zero Commission Advantage',
    description:
      'Close 1 deal at ₹80L and retain ₹1.6L commission savings.',
    highlight: ['Your Profit. Not Broker’s.'],
  },
  {
    title: '🔥 Hot Buyer Zones',
    description:
      'Gachibowli, Kondapur & Miyapur showing 3X buyer activity this month.',
    highlight: ['High Intent Buyers Active'],
  },
  {
    title: '🏆 Become a Trusted Seller',
    description:
      'Upload documents, respond quickly & complete 1 sale to unlock Trusted Badge.',
    highlight: ['Premium Visibility Boost'],
  },
]

export default function SellerInsightCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % insights.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const current = insights[index]

  return (
    <div className="flex items-center gap-6 bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl shadow-sm border border-orange-200 transition-all duration-500">

      {/* LEFT IMAGE IDENTIFIER */}
      <div className="w-20 h-20 flex-shrink-0 relative">
        <Image
          src="/trusted-badge.png"   // 🔥 place image in public folder
          alt="Trusted Seller"
          fill
          className="object-contain"
        />
      </div>

      {/* RIGHT MESSAGE */}
      <div className="flex-1 transition-opacity duration-500">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {current.title}
        </h3>

        <p className="text-gray-700 text-sm mb-2">
          {current.description}
        </p>

        {current.highlight && (
          <div className="text-orange-600 font-semibold text-sm">
            {current.highlight.map((h, i) => (
              <div key={i}>{h}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
