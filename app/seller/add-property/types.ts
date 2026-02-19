export type SellerType = 'individual' | 'agent' | 'developer'

export interface ListingState {
  propertyDetails: {
    propertyType: string
    bhk: string
    ownership: string
    age: string
    builtUp: string
    carpet: string
    facing: string
    floorType: string
    floors: string
  }

  localityDetails: {
    city: string
    locality: string
    landmark: string
  }

  resaleDetails: {
    expectedPrice: string | number
    negotiable: boolean
    underLoan: boolean
    availableFrom: string
    furnishing: string
    parking: string
    description: string
  }

  amenities: {
    bathrooms: string
    balcony: string
    waterSupply: string
    gym: string
    powerBackup: string
    gatedSecurity: string
    condition: string
    secondaryMobile: string
    moreUnits: string
    directions: string
  }

  gallery: {
    images: {
      hall: File | null
      masterBedroom: File | null
      bedroom: File | null
      kitchen: File | null
      bathroom: File | null
      balcony: File | null
      outside: File | null
    }
    video: File | null
  }

  additionalInfo: {
    saleDeed: string
    propertyTax: string
    occupancyCertificate: string
  }

  schedule: {
    availability: string
  }
}
