'use client'

import { useSearchParams } from 'next/navigation'
import { useReducer, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

import ListingTabs from './ListingTabs'
import { listingReducer } from './listingReducer'
import { listingInitialState } from './listingInitialState'
import { fetchLatestDraft } from './fetchDraft'
import { mapDraftToState } from './mapDraftToState'
import { ListingTab } from './tabs'

// Icons
import {
  Home,
  MapPin,
  IndianRupee,
  Wrench,
  Image as ImageIcon,
  FileText,
  Calendar,
} from 'lucide-react'

const STEPS: { key: ListingTab; label: string; icon: any }[] = [
  { key: 'PROPERTY', label: 'Property Details', icon: Home },
  { key: 'LOCALITY', label: 'Locality Details', icon: MapPin },
  { key: 'RESALE', label: 'Resale Details', icon: IndianRupee },
  { key: 'AMENITIES', label: 'Amenities', icon: Wrench },
  { key: 'GALLERY', label: 'Gallery', icon: ImageIcon },
  { key: 'ADDITIONAL', label: 'Additional Information', icon: FileText },
  { key: 'SCHEDULE', label: 'Schedule', icon: Calendar },
]

export default function AddPropertyPage() {
  const router = useRouter()

  const [state, dispatch] = useReducer(
    listingReducer,
    listingInitialState
  )

  // ✅ SINGLE SOURCE OF TRUTH
  const [activeTab, setActiveTab] = useState<ListingTab>('PROPERTY')

  // 🔐 Seller auth + resume draft
  useEffect(() => {
    async function init() {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        router.replace('/seller')
        return
      }

      const draft = await fetchLatestDraft(data.user.id)
      if (draft) {
        dispatch({
          type: 'HYDRATE_FROM_DRAFT',
          payload: mapDraftToState(draft),
        })
      }
    }
	
    init()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-100 pt-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded shadow flex min-h-[700px]">

          {/* LEFT SIDEBAR */}
          <aside className="w-64 border-r bg-gray-50">
            <ul className="py-6 space-y-1 text-sm">
              {STEPS.map(({ key, label, icon: Icon }) => (
                <li
                  key={key}
                  className={`flex items-center gap-3 px-6 py-3 cursor-default
                    ${
                      activeTab === key
                        ? 'bg-white text-orange-600 font-semibold border-l-4 border-orange-500'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 p-8">
            <h1 className="text-2xl font-semibold mb-6 text-gray-900">
              {STEPS.find(s => s.key === activeTab)?.label}
            </h1>

            <ListingTabs
              listingState={state}
              dispatch={dispatch}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </main>
        </div>
      </div>
    </div>
  )
}
