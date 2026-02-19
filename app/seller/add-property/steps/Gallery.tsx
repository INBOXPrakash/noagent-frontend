'use client'

import { Camera, Video } from 'lucide-react'

export default function Gallery({ data, dispatch }: any) {
  function updateImage(key: string, file: File) {
    dispatch({
      type: 'UPDATE_GALLERY',
      payload: {
        images: {
          ...data.images,
          [key]: file,
        },
      },
    })
  }

  function updateVideo(file: File) {
    dispatch({
      type: 'UPDATE_GALLERY',
      payload: { video: file },
    })
  }

  const imageSlots = [
    { key: 'hall', label: 'Hall' },
    { key: 'masterBedroom', label: 'Master Bedroom' },
    { key: 'bedroom', label: 'Bedroom' },
    { key: 'kitchen', label: 'Kitchen' },
    { key: 'bathroom', label: 'Bathroom' },
    { key: 'balcony', label: 'Balcony' },
    { key: 'outside', label: 'Outside View' },
  ]

  return (
    <div className="space-y-8">

      {/* IMAGE GRID */}
      <div className="grid grid-cols-3 gap-6">
        {imageSlots.map(({ key, label }) => {
          const file = data.images?.[key]

          return (
            <label
              key={key}
              className="
                relative border-2 rounded-xl cursor-pointer
                bg-white overflow-hidden
                hover:border-orange-500 transition
                h-44
              "
            >
              {/* IMAGE PREVIEW */}
              {file ? (
                <>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={label}
                    className="w-full h-full object-cover"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      Change Photo
                    </span>
                  </div>

                  {/* CHECK BADGE */}
                  <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                    ✔ Uploaded
                  </span>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-700">
                  <Camera size={28} className="mb-2 text-gray-600" />
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  e.target.files &&
                  updateImage(key, e.target.files[0])
                }
              />
            </label>
          )
        })}
      </div>

      {/* VIDEO UPLOAD */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-white">
        <label className="flex items-center gap-3 cursor-pointer">
          <Video size={26} className="text-gray-700" />

          <span className="text-base font-semibold text-gray-900">
            Property Walkthrough Video
            <span className="text-sm font-normal text-gray-600">
              {' '} (Optional)
            </span>
          </span>

          <input
            type="file"
            accept="video/*"
            hidden
            onChange={(e) =>
              e.target.files &&
              updateVideo(e.target.files[0])
            }
          />
        </label>

        {data.video && (
          <p className="text-green-600 text-sm mt-3">
            ✔ Video uploaded successfully
          </p>
        )}
      </div>
    </div>
  )
}
