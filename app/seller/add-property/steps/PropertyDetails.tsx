'use client'
import { useState } from 'react'   // ✅ ADD THIS

interface Props {
  data: any
  dispatch: React.Dispatch<any>
}

interface Props {
  data: any
  dispatch: React.Dispatch<any>
}

const PROPERTY_TYPES = [
  'Independent House/Villa',
  'Gated Community Villa',
  'Standalone Building',
]

const BHK_TYPES = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK']
const OWNERSHIP_TYPES = ['Freehold', 'Lease']
const PROPERTY_AGES = ['<1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years']
const FACING = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West']
const FLOOR_TYPES = ['Tiles', 'Marble', 'Granite', 'Mosaic', 'Wooden', 'Cement']

export default function PropertyDetails({ data, dispatch }: Props) {
  const [areaError, setAreaError] = useState('') // ✅ MUST EXIST

  const update = (field: string, value: any) =>
    dispatch({ type: 'UPDATE_PROPERTY_DETAILS', payload: { [field]: value } })
 const validateArea = (builtUp?: number, carpet?: number) => {
    if (
      builtUp &&
      carpet &&
      Number(carpet) > Number(builtUp)
    ) {
      setAreaError(
        'Carpet Area cannot be greater than Built-up Area'
      )
    } else {
      setAreaError('')
    }
  }
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="form-label">Property Type *</label>
        <select className="form-select" value={data.propertyType || ''} onChange={e => update('propertyType', e.target.value)}>
          <option value="">Select</option>
          {PROPERTY_TYPES.map(v => <option key={v}>{v}</option>)}
        </select>
      </div>

      <div>
        <label className="form-label">BHK Type *</label>
        <select className="form-select" value={data.bhk || ''} onChange={e => update('bhk', e.target.value)}>
          <option value="">Select</option>
          {BHK_TYPES.map(v => <option key={v}>{v}</option>)}
        </select>
      </div>

      <div>
        <label className="form-label">Ownership Type *</label>
        <select className="form-select" value={data.ownership || ''} onChange={e => update('ownership', e.target.value)}>
          <option value="">Select</option>
          {OWNERSHIP_TYPES.map(v => <option key={v}>{v}</option>)}
        </select>
      </div>

      <div>
        <label className="form-label">Property Age *</label>
        <select className="form-select" value={data.age || ''} onChange={e => update('age', e.target.value)}>
          <option value="">Select</option>
          {PROPERTY_AGES.map(v => <option key={v}>{v}</option>)}
        </select>
      </div>

      <div>
        <label className="form-label">Built-up Area (sq.ft) *</label>
       <input
  className="form-input"
  type="number"
  value={data.builtUp || ''}
  onChange={e => {
    update('builtUp', e.target.value)
    validateArea(
      Number(e.target.value),
      Number(data.carpet)
    )
  }}
  onBlur={() =>
    validateArea(
      Number(data.builtUp),
      Number(data.carpet)
    )
  }
/>

      </div>

      <div>
        <label className="form-label">Carpet Area (sq.ft)</label>
        <input
  className="form-input"
  type="number"
  value={data.carpet || ''}
  onChange={e => {
    update('carpet', e.target.value)
    validateArea(
      Number(data.builtUp),
      Number(e.target.value)
    )
  }}
  onBlur={() =>
    validateArea(
      Number(data.builtUp),
      Number(data.carpet)
    )
  }
/>

      </div>

      <div>
        <label className="form-label">Facing *</label>
        <select className="form-select" value={data.facing || ''} onChange={e => update('facing', e.target.value)}>
          <option value="">Select</option>
          {FACING.map(v => <option key={v}>{v}</option>)}
        </select>
      </div>

      <div>
        <label className="form-label">Floor Type</label>
        <select className="form-select" value={data.floorType || ''} onChange={e => update('floorType', e.target.value)}>
          <option value="">Select</option>
          {FLOOR_TYPES.map(v => <option key={v}>{v}</option>)}
        </select>
      </div>

      <div>
        <label className="form-label">No. of Floors *</label>
        <input className="form-input" type="number" value={data.floors || ''} onChange={e => update('floors', e.target.value)} />
      </div>
    </div>
  )
}
