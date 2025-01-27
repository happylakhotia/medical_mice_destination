import React from 'react'

const LocationSection = () => {
  return (
    <section id="location" className="bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Location & Directions
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600">
            Find us in the heart of Jaipur with easy accessibility from all
            major locations
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Map Container */}
          <div className="h-[400px] overflow-hidden rounded-xl border border-neutral-200/20 bg-white">
            <div className="flex h-full w-full items-center justify-center bg-neutral-200">
              <span className="text-neutral-600">Map Loading...</span>
              {/* Map would be embedded here using Google Maps or similar service */}
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="rounded-xl border border-neutral-300 bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Address
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg
                    className="mr-3 mt-1 h-6 w-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-gray-600">Apollo Hospital</p>
                    <p className="text-gray-600">
                      Plot No. 3, Sector-7, Malviya Nagar
                    </p>
                    <p className="text-gray-600">Jaipur, Rajasthan 302017</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="rounded-xl border border-neutral-300 bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="mr-3 h-6 w-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <p className="text-gray-600">Emergency: 1800 3000 7000</p>
                    <p className="text-gray-600">Reception: +91 141 4677777</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg
                    className="mr-3 h-6 w-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-600">info@apollohospitaljaipur.com</p>
                </div>
              </div>
            </div>

            {/* Transportation */}
            <div className="rounded-xl border border-neutral-300 bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Getting Here
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg
                    className="mr-3 h-6 w-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <p className="text-gray-600">
                    10 mins from Jaipur International Airport
                  </p>
                </div>
                <div className="flex items-center">
                  <svg
                    className="mr-3 h-6 w-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  <p className="text-gray-600">
                    5 mins from Jaipur Railway Station
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationSection
