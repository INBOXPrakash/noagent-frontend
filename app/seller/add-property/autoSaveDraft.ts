import { supabase } from '@/lib/supabaseClient'
import { buildListingPayload } from './buildListingPayload'

export async function autoSaveDraft(
  draftId: string | null,
  state: any,
  sellerId: string
) {
  // Build payload from state
  const payload = {
    ...buildListingPayload(state),

    // 🔒 FORCE DRAFT STATUS (GO-LIVE SAFETY)
    status: 'draft',

    owner_id: sellerId,
  }

  // 🆕 CREATE draft if not exists
  if (!draftId) {
    const { data, error } = await supabase
      .from('properties')
      .insert(payload)
      .select()
      .single()

    if (error) {
      console.error('Draft create failed:', error)
      throw error
    }

    return data // must include id
  }

  // 🔁 UPDATE existing draft
  const { data, error } = await supabase
    .from('properties')
    .update(payload)
    .eq('id', draftId)
    .select()
    .single()

  if (error) {
    console.error('Draft update failed:', error)
    throw error
  }

  return data
}
