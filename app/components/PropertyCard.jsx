export default function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 flex gap-4">

      {/* Image placeholder */}
      <div className="w-32 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500">
        Image
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {property.title}
        </h3>

        <p className="text-sm text-gray-600">
          {property.bhk} · {property.property_type}
        </p>

        <p className="text-sm text-gray-500">
          {property.locality}, {property.city}
        </p>

        <div className="mt-2 flex justify-between items-center">
          <span className="text-red-600 font-bold text-lg">
            ₹ {property.price?.toLocaleString()}
          </span>

          <button className="text-sm border px-4 py-1 rounded hover:bg-gray-100">
            View
          </button>
        </div>
      </div>
    </div>
  )
}
