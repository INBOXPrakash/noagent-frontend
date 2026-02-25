import { ListingState } from './types'

export function buildListingPayload(state: ListingState) {
  return {
    // ================= PROPERTY =================
    title: state.propertyDetails.title || null,
    property_type: state.propertyDetails.propertyType || null,
    bhk: state.propertyDetails.bhk || null,
    built_up_area: state.propertyDetails.builtUp || null,
    facing: state.propertyDetails.facing || null,

    // ================= LOCALITY =================
    city: state.localityDetails.city || null,
    locality: state.localityDetails.locality || null,
    landmark: state.localityDetails.landmark || null,

    // ================= RESALE =================
    price: state.resaleDetails.expectedPrice
      ? Number(state.resaleDetails.expectedPrice)
      : null,

    maintenance: state.resaleDetails.maintenance || null,

    // ================= ADDITIONAL =================
    description: state.additionalInfo.description || null,

    // ================= SCHEDULE =================
    available_from: state.schedule.availableFrom || null,

    // ================= AMENITIES =================
    amenities: state.amenities || null,

    // ================= GALLERY =================
    images: state.gallery.images || null,
  }
}
