import { ListingState } from './types'

export function mapDraftToState(draft: any): ListingState {
  return {
    propertyDetails: {
      title: draft.title ?? '',
      propertyType: draft.property_type ?? '',
      bhk: draft.bhk ?? '',
      builtUpArea: '',
      facing: '',
    },
    localityDetails: {
      city: draft.city ?? '',
      locality: '',
      landmark: '',
    },
    resaleDetails: {
      price: draft.price?.toString() ?? '',
      maintenance: '',
    },
    amenities: [],
    gallery: { images: [] },
    additionalInfo: {
      description: draft.description ?? '',
    },
    schedule: {
      availableFrom: '',
    },
  }
}
