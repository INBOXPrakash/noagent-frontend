'use client'

interface Props {
  data: any
  dispatch: React.Dispatch<any>
}

const OPTIONS = [
  { label: 'Everyday (Mon–Sun)', value: 'EVERYDAY' },
  { label: 'Weekdays (Mon–Fri)', value: 'WEEKDAYS' },
  { label: 'Weekends (Sat–Sun)', value: 'WEEKENDS' },
]

export default function Schedule({ data, dispatch }: Props) {
  const update = (value: string) =>
    dispatch({
      type: 'UPDATE_SCHEDULE',
      payload: { availability: value },
    })

  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold text-gray-900">
        Availability
      </h2>

      <p className="text-sm text-gray-600">
        Help buyers plan visits by sharing when your property is available.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`border rounded-lg p-4 cursor-pointer flex items-center gap-3
              ${
                data.availability === opt.value
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
          >
            <input
              type="radio"
              name="availability"
              value={opt.value}
              checked={data.availability === opt.value}
              onChange={() => update(opt.value)}
              className="accent-orange-600"
            />

            <span className="text-gray-800 font-medium">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
