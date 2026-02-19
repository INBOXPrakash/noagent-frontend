import { supabase } from '@/lib/supabaseClient'

export async function fetchLatestDraft(userId: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('owner_id', userId)
    .eq('status', 'DRAFT')
    .order('created_at', { ascending: false })
    .limit(1)

  // ✅ Real DB error only
  if (error) {
    console.error('[fetchLatestDraft] real error:', error)
    return null
  }

  // ✅ No draft exists (normal case)
  if (!data || data.length === 0) {
    return null
  }

  return data[0]
}
