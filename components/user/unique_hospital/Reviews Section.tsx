import React from 'react'

const ReviewsSection = () => {
  return (
    <section id="reviews" className="px-8 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Patient Reviews
          </h2>
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="flex items-center">
              <svg
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.03a1 1 0 00-.314 1.118l1.07 3.292c.3.92-.755 1.688-1.538 1.118l-2.802-2.03a1 1 0 00-1.18 0l-2.803 2.03c-.783.57-1.838-.198-1.538-1.118l1.071-3.292a1 1 0 00-.314-1.118L3.568 8.72C2.785 8.15 3.187 7.01 4.157 7.01h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-yellow-400">4.5</span>
            </div>
            <span className="text-sm text-gray-600">| 256 Reviews</span>
          </div>
          <p className="mx-auto max-w-3xl text-gray-600">
            Hear what our patients have to say about their experience with us!
          </p>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <p className="mb-4 text-gray-700">
              "Best experience! The doctors and staff were incredibly kind and
              professional. I felt well taken care of throughout my stay."
            </p>
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Reviewer"
                className="mr-3 h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">Patient</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-lg">
            <p className="mb-4 text-gray-700">
              "Amazing service and amazing doctors. The entire staff made me
              feel like family. I would highly recommend this hospital."
            </p>
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="Reviewer"
                className="mr-3 h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">Jane Smith</p>
                <p className="text-sm text-gray-500">Patient</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-lg">
            <p className="mb-4 text-gray-700">
              "A truly exceptional experience. The medical team is highly
              skilled and always keeps you informed throughout your treatment."
            </p>
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/men/2.jpg"
                alt="Reviewer"
                className="mr-3 h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">Sam Wilson</p>
                <p className="text-sm text-gray-500">Patient</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
