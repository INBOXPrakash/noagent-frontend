import { supabase } from '@/lib/supabaseClient'

export async function fetchLatestDraft(sellerId: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('owner_id', sellerId)
    .eq('status', 'draft')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  // ✅ NORMAL CASE: no draft exists yet
  if (!data) {
    return null
  }

  // 🔴 REAL ERROR ONLY (after data check)
  if (error && Object.keys(error).length > 0) {
    console.error('[fetchLatestDraft] real error:', error)
    return null
  }

  return data
}
