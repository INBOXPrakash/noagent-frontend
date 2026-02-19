'use client'

export default function ResaleDetails({ data, dispatch }: any) {
  const update = (f: string, v: any) =>
    dispatch({ type: 'UPDATE_RESALE_DETAILS', payload: { [f]: v } })

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="form-label">Expected Price *</label>
        <input
  className="form-input"
  type="number"
  value={data.expectedPrice || ''}
  onChange={e =>
    update('expectedPrice', Number(e.target.value))
  }
/>

      </div>

      <div className="flex items-center gap-4 mt-6">
        <label><input type="checkbox" onChange={e => update('negotiable', e.target.checked)} /> Price Negotiable</label>
        <label><input type="checkbox" onChange={e => update('underLoan', e.target.checked)} /> Under Loan</label>
      </div>

      <div>
        <label className="form-label">Available From</label>
        <input type="date" className="form-input" onChange={e => update('availableFrom', e.target.value)} />
      </div>

      <div>
        <label className="form-label">Furnishing</label>
        <select className="form-select" onChange={e => update('furnishing', e.target.value)}>
          <option value="">Select</option>
          <option>Fully Furnished</option>
          <option>Semi Furnished</option>
          <option>Unfurnished</option>
        </select>
      </div>

      <div>
        <label className="form-label">Parking</label>
        <select className="form-select" onChange={e => update('parking', e.target.value)}>
          <option value="">Select</option>
          <option>Bike</option>
          <option>Car</option>
          <option>Both</option>
          <option>None</option>
        </select>
      </div>

      <div className="col-span-2">
        <label className="form-label">Description</label>
        <textarea className="form-input" rows={4} placeholder="Write few lines about your property…" onChange={e => update('description', e.target.value)} />
      </div>
    </div>
  )
}
