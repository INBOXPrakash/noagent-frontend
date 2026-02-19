import { supabase } from '@/lib/supabaseClient'
import ContactSeller from './ContactSeller'

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single()

  if (!property) {
    return <div className="p-6">Property not found</div>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{property.title}</h1>
      <p className="text-gray-600">{property.city}</p>
      <p className="mt-2 font-semibold">₹ {property.price}</p>
      <p className="mt-4">{property.description}</p>

      {/* ✅ Buyer → Contact Seller */}
      <ContactSeller propertyId={property.id} />
    </div>
  )
}
