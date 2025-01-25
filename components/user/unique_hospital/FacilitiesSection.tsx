import React from 'react'

const FacilitiesSection = () => {
  return (
    <section id="facilities" className="px-8 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Our Facilities
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600">
            State-of-the-art medical facilities equipped with the latest
            technology and staffed by expert healthcare professionals
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Operation Theaters */}
          <div className="overflow-hidden rounded-lg border border-neutral-200/20 bg-white p-6 transition duration-300 hover:border-neutral-200/40">
            <h3 className="mb-3 text-xl font-semibold">
              Modern Operation Theaters
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Advanced surgical equipment
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Robotic surgery capabilities
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Real-time imaging systems
              </li>
            </ul>
          </div>

          {/* ICU Facilities */}
          <div className="overflow-hidden rounded-lg border border-neutral-200/20 bg-white p-6 transition duration-300 hover:border-neutral-200/40">
            <h3 className="mb-3 text-xl font-semibold">Intensive Care Units</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                24/7 patient monitoring
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Advanced life support systems
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Specialized critical care teams
              </li>
            </ul>
          </div>

          {/* Diagnostic Center */}
          <div className="overflow-hidden rounded-lg border border-neutral-200/20 bg-white p-6 transition duration-300 hover:border-neutral-200/40">
            <h3 className="mb-3 text-xl font-semibold">Advanced Diagnostics</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                MRI and CT scan facilities
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Digital X-ray systems
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Laboratory services
              </li>
            </ul>
          </div>

          {/* Rehabilitation Center */}
          <div className="overflow-hidden rounded-lg border border-neutral-200/20 bg-white p-6 transition duration-300 hover:border-neutral-200/40">
            <h3 className="mb-3 text-xl font-semibold">
              Rehabilitation Center
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Physical therapy equipment
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Occupational therapy
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Speech therapy services
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FacilitiesSection
