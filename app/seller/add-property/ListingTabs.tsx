'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LISTING_TABS, ListingTab } from './tabs'
import { validateTab } from './validators'
import { autoSaveDraft } from './autoSaveDraft'
import { updateListingStatus } from './listingStatus'
import { ListingState } from './types'
import { supabase } from '@/lib/supabaseClient'

// Step components
import PropertyDetails from './steps/PropertyDetails'
import LocalityDetails from './steps/LocalityDetails'
import ResaleDetails from './steps/ResaleDetails'
import Amenities from './steps/Amenities'
import Gallery from './steps/Gallery'
import AdditionalInfo from './steps/AdditionalInfo'
import Schedule from './steps/Schedule'

interface Props {
  listingState: ListingState
  dispatch: React.Dispatch<any>
  activeTab: ListingTab
  setActiveTab: (tab: ListingTab) => void
}

export default function ListingTabs({
  listingState,
  dispatch,
  activeTab,
  setActiveTab,
}: Props) {
  const router = useRouter()

  const [errors, setErrors] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  const draftIdRef = useRef<string | null>(null)
  const currentIndex = LISTING_TABS.indexOf(activeTab)

  // ▶ Save & Continue
  async function nextTab() {
    const validationErrors = validateTab(activeTab, listingState)
    if (validationErrors.length) {
      setErrors(validationErrors)
      return
    }

    setErrors([])

    if (draftIdRef.current) {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        await autoSaveDraft(
          draftIdRef.current,
          listingState,
          data.user.id
        )
      }
    }

    if (currentIndex + 1 < LISTING_TABS.length) {
      setActiveTab(LISTING_TABS[currentIndex + 1])
    }
  }

  // ◀ Back
  function prevTab() {
    setErrors([])
    if (currentIndex > 0) {
      setActiveTab(LISTING_TABS[currentIndex - 1])
    }
  }

  // 💾 Save Draft
  async function saveDraft() {
    setSaving(true)
    setErrors([])

    const { data } = await supabase.auth.getUser()
    if (!data?.user) {
      setErrors(['Session expired. Please login again.'])
      setSaving(false)
      return
    }

    try {
      const result = await autoSaveDraft(
        draftIdRef.current,
        listingState,
        data.user.id
      )

      if (!draftIdRef.current) {
        draftIdRef.current = result.id
      }

      alert('Property saved as draft.')
    } catch {
      setErrors(['Failed to save property.'])
    } finally {
      setSaving(false)
    }
  }

  // 🚀 Publish Property
  async function publishProperty() {
    const validationErrors = validateTab(activeTab, listingState)
    if (validationErrors.length) {
      setErrors(validationErrors)
      return
    }

    const { data } = await supabase.auth.getUser()
    if (!data?.user) {
      setErrors(['Session expired. Please login again.'])
      return
    }

    try {
      const result = await autoSaveDraft(
        draftIdRef.current,
        listingState,
        data.user.id
      )

      if (!draftIdRef.current) {
        draftIdRef.current = result.id
      }

      await updateListingStatus(
        draftIdRef.current!,
        'published'
      )

      alert('🚀 Property published successfully!')

      // Redirect seller after publish
      router.push('/seller/dashboard')

    } catch {
      setErrors(['Failed to publish property.'])
    }
  }

  return (
    <div className="space-y-6">

      {/* Errors */}
      {errors.length > 0 && (
        <div className="text-red-600 text-sm">
          {errors.map((e) => (
            <div key={e}>• {e}</div>
          ))}
        </div>
      )}

      {/* TAB CONTENT */}
      {activeTab === 'PROPERTY' && (
        <PropertyDetails
          data={listingState.propertyDetails}
          dispatch={dispatch}
        />
      )}

      {activeTab === 'LOCALITY' && (
        <LocalityDetails
          data={listingState.localityDetails}
          dispatch={dispatch}
        />
      )}

      {activeTab === 'RESALE' && (
        <ResaleDetails
          data={listingState.resaleDetails}
          dispatch={dispatch}
        />
      )}

      {activeTab === 'AMENITIES' && (
        <Amenities
          data={listingState.amenities}
          dispatch={dispatch}
        />
      )}

      {activeTab === 'GALLERY' && (
        <Gallery
          data={listingState.gallery}
          dispatch={dispatch}
        />
      )}

      {activeTab === 'ADDITIONAL' && (
        <AdditionalInfo
          data={listingState.additionalInfo}
          dispatch={dispatch}
        />
      )}

      {activeTab === 'SCHEDULE' && (
        <Schedule
          data={listingState.schedule}
          dispatch={dispatch}
        />
      )}

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-4 pt-8">

        {currentIndex > 0 && (
          <button
            onClick={prevTab}
            className="border px-6 py-2 rounded"
          >
            Back
          </button>
        )}

        {currentIndex < LISTING_TABS.length - 1 && (
          <button
            onClick={nextTab}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded font-semibold"
          >
            Save & Continue
          </button>
        )}

        {currentIndex === LISTING_TABS.length - 1 && (
          <div className="flex gap-4">

            <button
              onClick={saveDraft}
              disabled={saving}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded font-semibold disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save Draft'}
            </button>

            <button
              onClick={publishProperty}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded font-semibold"
            >
              Publish Property
            </button>

          </div>
        )}

      </div>
    </div>
  )
}
