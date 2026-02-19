import { supabase } from '@/lib/supabaseClient'

/**
 * Seller-only fetch
 * Used for editing DRAFT or LIVE listings
 */
export async function fetchListingById(listingId: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', listingId)
    .single()

  if (error) {
    console.error('Fetch listing by ID error:', error)
    throw error
  }

  return data
}
