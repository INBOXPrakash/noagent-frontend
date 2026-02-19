import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default async function MyPropertiesPage() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/my-properties')
  }

  const { data: properties } = await supabase
    .from('properties')
    .select('id, title, city, price, status')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        My Properties
      </h1>

      {properties?.length === 0 && <p>No properties yet</p>}

      {properties?.map(p => (
        <div
          key={p.id}
          style={{
            border: '1px solid #000',
            padding: 15,
            marginBottom: 12,
          }}
        >
          <strong>{p.title}</strong>
          <div>{p.city}</div>
          <div>₹ {p.price}</div>
          <div>Status: {p.status}</div>
        </div>
      ))}
    </div>
  )
}
