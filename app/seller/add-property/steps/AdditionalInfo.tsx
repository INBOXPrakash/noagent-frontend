'use client'

export default function AdditionalInfo({ data, dispatch }: any) {
  const update = (field: string, value: string) =>
    dispatch({
      type: 'UPDATE_ADDITIONAL_INFO',
      payload: { [field]: value },
    })

  return (
    <div className="grid grid-cols-2 gap-6">

      <div>
        <label className="form-label">Sale Deed *</label>
        <select
          className="form-select"
          value={data.saleDeed || ''}
          onChange={(e) => update('saleDeed', e.target.value)}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="DontKnow">Don’t know</option>
        </select>
      </div>

      <div>
        <label className="form-label">Property Tax Paid *</label>
        <select
          className="form-select"
          value={data.propertyTax || ''}
          onChange={(e) => update('propertyTax', e.target.value)}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="DontKnow">Don’t know</option>
        </select>
      </div>

      <div>
        <label className="form-label">Occupancy Certificate *</label>
        <select
          className="form-select"
          value={data.occupancyCertificate || ''}
          onChange={(e) =>
            update('occupancyCertificate', e.target.value)
          }
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="DontKnow">Don’t know</option>
        </select>
      </div>

    </div>
  )
}
