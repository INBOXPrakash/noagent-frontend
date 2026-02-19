import { supabase } from '@/lib/supabaseClient'
import { redirect } from 'next/navigation'

export default async function SellerAuthCallback() {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/seller')
  }

  // Ensure seller profile exists
  const { data: profile } = await supabase
    .from('seller_profiles')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!profile) {
    await supabase.from('seller_profiles').insert({
      id: user.id,
      email: user.email,
      role: 'seller',
      verified: true,
    })
  }

  redirect('/seller/add-property')
}
