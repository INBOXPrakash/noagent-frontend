import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AddPropertyForm from './AddPropertyForm'

export default async function AddPropertyPage() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user || error) {
    redirect('/login?redirect=/add-property')
  }

  return <AddPropertyForm />
}
