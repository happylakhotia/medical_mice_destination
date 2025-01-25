import React from 'react'

const DoctorsSection = () => {
  return (
    <section id="doctors" className="bg-gray-50 px-8 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Our Medical Experts
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600">
            Meet our team of experienced specialists committed to providing
            exceptional healthcare
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Doctor 1 */}
          <div className="overflow-hidden rounded-lg border border-neutral-200/20 bg-white transition duration-300 hover:border-neutral-200/40">
            <div className="aspect-w-1 aspect-h-1 flex items-center justify-center bg-neutral-200">
              <span className="text-neutral-600">Doctor Image</span>
            </div>
            <div className="p-6">
              <h3 className="mb-1 text-lg font-semibold">Dr. Sarah Johnson</h3>
              <p className="mb-2 text-sm text-indigo-600">Cardiologist</p>
              <p className="mb-4 text-sm text-gray-600">
                MBBS, MD, DM Cardiology
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  15+ Years Experience
                </span>
              </div>
            </div>
          </div>

          {/* Doctor 2 */}
          <div className="overflow-hidden rounded-lg border border-neutral-200/20 bg-white transition duration-300 hover:border-neutral-200/40">
            <div className="aspect-w-1 aspect-h-1 flex items-center justify-center bg-neutral-200">
              <span className="text-neutral-600">Doctor Image</span>
            </div>
            <div className="p-6">
              <h3 className="mb-1 text-lg font-semibold">Dr. Michael Chen</h3>
              <p className="mb-2 text-sm text-indigo-600">Neurologist</p>
              <p className="mb-4 text-sm text-gray-600">
                MBBS, MD, DM Neurology
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  12+ Years Experience
                </span>
              </div>
            </div>
          </div>

          {/* Doctor 3 */}
          <div className="overflow-hidden rounded-lg border border-neutral-200/20 bg-white transition duration-300 hover:border-neutral-200/40">
            <div className="aspect-w-1 aspect-h-1 flex items-center justify-center bg-neutral-200">
              <span className="text-neutral-600">Doctor Image</span>
            </div>
            <div className="p-6">
              <h3 className="mb-1 text-lg font-semibold">Dr. Emily Patel</h3>
              <p className="mb-2 text-sm text-indigo-600">Oncologist</p>
              <p className="mb-4 text-sm text-gray-600">
                MBBS, MD, DM Oncology
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  10+ Years Experience
                </span>
              </div>
            </div>
          </div>

          {/* Doctor 4 */}
          <div className="overflow-hidden rounded-lg border border-neutral-200/20 bg-white transition duration-300 hover:border-neutral-200/40">
            <div className="aspect-w-1 aspect-h-1 flex items-center justify-center bg-neutral-200">
              <span className="text-neutral-600">Doctor Image</span>
            </div>
            <div className="p-6">
              <h3 className="mb-1 text-lg font-semibold">Dr. Robert Wilson</h3>
              <p className="mb-2 text-sm text-indigo-600">Orthopedic Surgeon</p>
              <p className="mb-4 text-sm text-gray-600">MBBS, MS Orthopedics</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  18+ Years Experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* View All Doctors Button */}
        <div className="mt-12 text-center">
          <button className="rounded-lg border border-indigo-600 bg-white px-8 py-3 font-semibold text-indigo-600 transition duration-300 hover:bg-indigo-50">
            View All Doctors
          </button>
        </div>
      </div>
    </section>
  )
}

export default DoctorsSection
