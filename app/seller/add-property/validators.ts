import { LISTING_TABS, ListingTab } from './tabs'
import { ListingState } from './types'

// ✅ Validate a single tab
export function validateTab(
  tab: ListingTab,
  state: ListingState
): string[] {
  const errors: string[] = []

  switch (tab) {
    case 'PROPERTY': {
  const details = state.propertyDetails

  const builtUp = Number(details?.builtUp)
  const carpet = Number(details?.carpet)

  if (!details?.propertyType)
    errors.push('Property Type is required')

  if (!details?.bhk)
    errors.push('BHK Type is required')

  if (!details?.ownership)
    errors.push('Ownership Type is required')

  if (!details?.age)
    errors.push('Property Age is required')

  if (!builtUp)
    errors.push('Built-up Area is required')

  if (!details?.facing)
    errors.push('Facing is required')

  if (!details?.floors)
    errors.push('Number of floors is required')

  if (carpet && builtUp && carpet > builtUp) {
    errors.push(
      'Carpet Area cannot be greater than Built-up Area'
    )
  }

  break
}
case 'PROPERTY': {
  const details = state.propertyDetails

  const builtUp = Number(details?.builtUp)
  const carpet = Number(details?.carpet)

  if (!details?.propertyType)
    errors.push('Property Type is required')

  if (!details?.bhk)
    errors.push('BHK Type is required')

  if (!details?.ownership)
    errors.push('Ownership Type is required')

  if (!details?.age)
    errors.push('Property Age is required')

  if (!builtUp)
    errors.push('Built-up Area is required')

  if (!details?.facing)
    errors.push('Facing is required')

  if (!details?.floors)
    errors.push('Number of floors is required')

  if (carpet && builtUp && carpet > builtUp) {
    errors.push(
      'Carpet Area cannot be greater than Built-up Area'
    )
  }

  break
}


    case 'LOCALITY': {
      const l = state.localityDetails

      if (!l?.city) errors.push('City is required')
      if (!l?.locality) errors.push('Locality is required')
      if (!l?.landmark) errors.push('Landmark / Street is required')

      break
    }

    case 'RESALE': {
      const r = state.resaleDetails

      if (!r?.expectedPrice) errors.push('Expected Price is required')

      break
    }

    case 'AMENITIES': {
      const a = state.amenities

      if (!a?.bathrooms) errors.push('Bathrooms count is required')
      if (!a?.condition) errors.push('Property condition is required')

      break
    }

    case 'GALLERY': {
      const imagesCount =
        Object.values(state.gallery?.images || {}).filter(Boolean).length +
        (state.gallery?.extraImages?.length || 0)

      if (imagesCount < 5) {
        errors.push('Please upload at least 5 photos')
      }

      break
    }

    case 'ADDITIONAL': {
      const info = state.additionalInfo

      if (!info?.saleDeed)
        errors.push('Sale Deed information is required')

      if (!info?.propertyTax)
        errors.push('Property Tax information is required')

      if (!info?.occupancyCertificate)
        errors.push('Occupancy Certificate information is required')

      break
    }

    case 'SCHEDULE': {
      const s = state.schedule

      if (!s?.availability)
        errors.push('Please select your availability')

      break
    }
  }

  return errors
}

// ✅ Validate all tabs (used only on final submit)
export function validateAllTabs(state: ListingState) {
  const errorsByTab: Record<string, string[]> = {}

  for (const tab of LISTING_TABS) {
    const errors = validateTab(tab, state)
    if (errors.length > 0) {
      errorsByTab[tab] = errors
    }
  }

  return errorsByTab
}
