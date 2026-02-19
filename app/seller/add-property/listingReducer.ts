import { ListingState } from './types'

type Action =
  | {
      type: 'UPDATE_PROPERTY_DETAILS'
      payload: Partial<ListingState['propertyDetails']>
    }
  | {
      type: 'UPDATE_LOCALITY_DETAILS'
      payload: Partial<ListingState['localityDetails']>
    }
  | {
      type: 'UPDATE_RESALE_DETAILS'
      payload: Partial<ListingState['resaleDetails']>
    }
  | {
      type: 'UPDATE_AMENITIES'
      payload: Partial<ListingState['amenities']>
    }
  | {
      type: 'UPDATE_GALLERY'
      payload: Partial<ListingState['gallery']>
    }
  | {
      type: 'UPDATE_ADDITIONAL_INFO'
      payload: Partial<ListingState['additionalInfo']>
    }
  | {
      type: 'UPDATE_SCHEDULE'
      payload: Partial<ListingState['schedule']>
    }
  | {
      type: 'HYDRATE_FROM_DRAFT'
      payload: ListingState
    }

export function listingReducer(
  state: ListingState,
  action: Action
): ListingState {
  switch (action.type) {

    case 'UPDATE_PROPERTY_DETAILS':
      return {
        ...state,
        propertyDetails: {
          ...state.propertyDetails,
          ...action.payload,
        },
      }

    case 'UPDATE_LOCALITY_DETAILS':
      return {
        ...state,
        localityDetails: {
          ...state.localityDetails,
          ...action.payload,
        },
      }

    case 'UPDATE_RESALE_DETAILS':
      return {
        ...state,
        resaleDetails: {
          ...state.resaleDetails,
          ...action.payload,
        },
      }

    case 'UPDATE_AMENITIES':
      return {
        ...state,
        amenities: {
          ...state.amenities,
          ...action.payload,
        },
      }

    case 'UPDATE_GALLERY':
      return {
        ...state,
        gallery: {
          ...state.gallery,
          ...action.payload,
          images: {
            ...state.gallery.images,
            ...(action.payload.images || {}),
          },
        },
      }

    case 'UPDATE_ADDITIONAL_INFO':
      return {
        ...state,
        additionalInfo: {
          ...state.additionalInfo,
          ...action.payload,
        },
      }

    case 'UPDATE_SCHEDULE':
      return {
        ...state,
        schedule: {
          ...state.schedule,
          ...action.payload,
        },
      }

    case 'HYDRATE_FROM_DRAFT':
      return action.payload

    default:
      return state
  }
}
