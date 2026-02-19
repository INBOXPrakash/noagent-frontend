import { supabase } from '@/lib/supabaseClient'

export async function updateListingStatus(
  listingId: string,
  status: 'published' | 'archived'
) {
  const { error } = await supabase
    .from('properties')
    .update({ status })
    .eq('id', listingId)

  if (error) {
    console.error('Status update failed:', error)
    throw error
  }
}
