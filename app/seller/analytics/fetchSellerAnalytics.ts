import { supabase } from '@/lib/supabaseClient'

export async function fetchSellerAnalytics(sellerId: string) {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      id,
      title,
      status,
      views,
      leads:leads(count)
    `)
    .eq('owner_id', sellerId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Analytics fetch error:', error)
    throw error
  }

  return data
}
