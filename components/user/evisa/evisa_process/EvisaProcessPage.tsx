import Link from 'next/link'
import React from 'react'

const EvisaProcess = ({patientid}: {patientid: string}) => {
  return (
    <div id="root">
      <section id="evisaProcess" className="bg-neutral-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate__animated animate__fadeIn mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              eVisa Application Process
            </h2>
            <p className="text-gray-600">
              Simple steps to obtain your medical travel visa
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="animate__animated animate__fadeInUp rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="mb-4 flex items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                  1
                </span>
                <h3 className="ml-3 text-xl font-semibold">
                  Check Eligibility
                </h3>
              </div>
              <p className="text-gray-600">
                Verify your eligibility for medical travel visa based on your
                nationality and purpose of visit.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="animate__animated animate__fadeInUp rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="mb-4 flex items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                  2
                </span>
                <h3 className="ml-3 text-xl font-semibold">
                  Document Preparation
                </h3>
              </div>
              <ul className="list-inside list-disc text-gray-600">
                <li>Valid passport</li>
                <li>Passport-sized photo</li>
                <li>Travel itinerary</li>
                <li>Hospital appointment proof</li>
                <li>Financial documents</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div
              className="animate__animated animate__fadeInUp rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="mb-4 flex items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                  3
                </span>
                <h3 className="ml-3 text-xl font-semibold">
                  Online Application
                </h3>
              </div>
              <p className="text-gray-600">
                Complete the online application form with accurate personal and
                travel information.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Process Timeline */}
            <div className="animate__animated animate__fadeInLeft rounded-xl bg-white p-6 shadow-lg">
              <h3 className="mb-6 text-xl font-semibold">
                Application Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      ✓
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Document Submission</p>
                    <p className="text-sm text-gray-500">1-2 days</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      ✓
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Application Processing</p>
                    <p className="text-sm text-gray-500">3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      ✓
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Visa Approval</p>
                    <p className="text-sm text-gray-500">1-2 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="animate__animated animate__fadeInRight rounded-xl bg-white p-6 shadow-lg">
              <h3 className="mb-6 text-xl font-semibold">Important Notes</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Keep digital copies of all documents
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Apply at least 2 weeks before travel
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Ensure all documents are in English
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href={`/dashboard/patient/${patientid}/checklist`} className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white transition duration-300 hover:bg-blue-700">
              Start eVisa Application
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EvisaProcess
