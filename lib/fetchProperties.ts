import { supabase } from './supabaseClient'

export async function fetchProperties({
  city,
  locality,
  bhk,
  propertyType,
  minPrice,
  maxPrice,
}: {
  city?: string
  locality?: string
  bhk?: string[]
  propertyType?: string[]
  minPrice?: number
  maxPrice?: number
}) {
  let query = supabase
    .from('properties')
    .select('*')
    .eq('status', 'LIVE') // 🔒 BUYER LOCKDOWN
     .order('created_at', { ascending: false })

  if (city) query = query.eq('city', city)
  if (locality) query = query.ilike('locality', `%${locality}%`)
  if (bhk?.length) query = query.in('bhk', bhk)
  if (propertyType?.length) query = query.in('property_type', propertyType)
  if (minPrice) query = query.gte('price', minPrice)
  if (maxPrice) query = query.lte('price', maxPrice)

  const { data, error } = await query

  if (error) {
    console.error('Fetch properties error:', error)
    return []
  }

  return data || []
}
