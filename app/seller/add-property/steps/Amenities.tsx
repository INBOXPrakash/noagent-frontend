'use client'

interface Props {
  data: any
  dispatch: React.Dispatch<any>
}

export default function Amenities({ data, dispatch }: Props) {
  const update = (field: string, value: any) =>
    dispatch({
      type: 'UPDATE_AMENITIES',
      payload: { [field]: value },
    })

  return (
    <div className="grid grid-cols-2 gap-6">

      {/* Bathrooms */}
      <div>
        <label className="form-label">
          Bathrooms <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="form-input"
          value={data.bathrooms || ''}
          onChange={(e) => update('bathrooms', e.target.value)}
        />
      </div>

      {/* Balcony */}
      <div>
        <label className="form-label">Balcony</label>
        <input
          type="number"
          className="form-input"
          value={data.balcony || ''}
          onChange={(e) => update('balcony', e.target.value)}
        />
      </div>

      {/* Water Supply */}
      <div>
        <label className="form-label">Water Supply</label>
        <select
          className="form-select"
          value={data.waterSupply || ''}
          onChange={(e) => update('waterSupply', e.target.value)}
        >
          <option value="">Select</option>
          <option value="Corporation">Corporation</option>
          <option value="Borewell">Borewell</option>
          <option value="Both">Both</option>
        </select>
      </div>

      {/* Gym */}
      <div>
        <label className="form-label">Gym</label>
        <select
          className="form-select"
          value={data.gym || ''}
          onChange={(e) => update('gym', e.target.value)}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Power Backup */}
      <div>
        <label className="form-label">Power Backup</label>
        <select
          className="form-select"
          value={data.powerBackup || ''}
          onChange={(e) => update('powerBackup', e.target.value)}
        >
          <option value="">Select</option>
          <option value="Full">Full</option>
          <option value="Partial">Partial</option>
          <option value="None">None</option>
        </select>
      </div>

      {/* Gated Security */}
      <div>
        <label className="form-label">Gated Security</label>
        <select
          className="form-select"
          value={data.gatedSecurity || ''}
          onChange={(e) => update('gatedSecurity', e.target.value)}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Property Condition */}
      <div>
        <label className="form-label">
          Property Condition <span className="text-red-500">*</span>
        </label>
        <select
          className="form-select"
          value={data.condition || ''}
          onChange={(e) => update('condition', e.target.value)}
        >
          <option value="">Select</option>
          <option value="Vacant">Vacant</option>
          <option value="Tenant Staying">Tenant Staying</option>
          <option value="Self Occupied">Self Occupied</option>
          <option value="Urgent Sale">For Urgent Sale</option>
        </select>
      </div>

      {/* Secondary Mobile */}
      <div>
        <label className="form-label">Secondary Mobile</label>
        <input
          type="tel"
          maxLength={10}
          className="form-input"
          value={data.secondaryMobile || ''}
          onChange={(e) => update('secondaryMobile', e.target.value)}
        />
      </div>

      {/* More Units */}
      <div>
        <label className="form-label">
          More similar units available?
        </label>
        <select
          className="form-select"
          value={data.moreUnits || ''}
          onChange={(e) => update('moreUnits', e.target.value)}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Directions Tip */}
      <div className="col-span-2">
        <label className="form-label">
          Directions Tip for Buyers
        </label>
        <textarea
          rows={3}
          className="form-input"
          placeholder="Eg: Near metro station, opposite XYZ mall…"
          value={data.directions || ''}
          onChange={(e) => update('directions', e.target.value)}
        />
      </div>

    </div>
  )
}
