import { ListingState } from './types'

export const listingInitialState: ListingState = {
  propertyDetails: {
    propertyType: '',
    bhk: '',
    ownership: '',
    age: '',
    builtUp: '',
    carpet: '',
    facing: '',
    floorType: '',
    floors: '',
  },

  localityDetails: {
    city: '',
    locality: '',
    landmark: '',
  },

  resaleDetails: {
  expectedPrice: '',
  negotiable: false,
  underLoan: false,
  availableFrom: '',
  furnishing: '',
  parking: '',
  description: '',
},


  amenities: {
    bathrooms: '',
    balcony: '',
    waterSupply: '',
    gym: '',
    powerBackup: '',
    gatedSecurity: '',
    condition: '',
    secondaryMobile: '',
    moreUnits: '',
    directions: '',
  },

  gallery: {
  images: {
    hall: null,
    masterBedroom: null,
    bedroom: null,
    kitchen: null,
    bathroom: null,
    balcony: null,
    outside: null,
  },
  video: null,
},

  additionalInfo: {
    saleDeed: '',
    propertyTax: '',
    occupancyCertificate: '',
  },

  schedule: {
    availability: '',
  },
}
