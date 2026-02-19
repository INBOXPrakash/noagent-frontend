'use client'

export default function LocalityDetails({ data, dispatch }: any) {
  const update = (f: string, v: any) =>
    dispatch({ type: 'UPDATE_LOCALITY_DETAILS', payload: { [f]: v } })

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="form-label">City *</label>
        <input className="form-input" value={data.city || ''} onChange={e => update('city', e.target.value)} />
      </div>

      <div>
        <label className="form-label">Locality *</label>
        <input className="form-input" value={data.locality || ''} onChange={e => update('locality', e.target.value)} />
      </div>

      <div className="col-span-2">
        <label className="form-label">Landmark / Street *</label>
        <input className="form-input" value={data.landmark || ''} onChange={e => update('landmark', e.target.value)} />
      </div>
    </div>
  )
}
