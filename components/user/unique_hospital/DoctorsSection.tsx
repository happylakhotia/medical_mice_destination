"use client"
import GET_UNIQUE_DOCTOR from '@/services/apollo/queries/getUniqueDoctor'
import { useApolloClient } from '@apollo/client'
import React, { useEffect, useState } from 'react'

type Doctor = {
  user: {
    id: string
    name: string
    role: string
    email: string
    profilePic?: string
  }
  specialty: string
  documents: string[]
}

const DoctorsSection = ({ doctors }: { doctors: string[] }) => {
  const client = useApolloClient()
  const [doctorData, setDoctorData] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)

  async function getAllDoctors() {
    try {
      const results = await Promise.all(
        doctors.map(async (doctorId: string) => {
          const { data } = await client.query({
            query: GET_UNIQUE_DOCTOR,
            variables: { doctorId },
            context: {
              requiresAuth: true,
            },
          })
          return data.getDoctorByID
        })
      )
      setDoctorData(results)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllDoctors()
  }, [doctors])

  return (
    <section id="doctors" className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Our Medical Experts
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600">
            Meet our team of experienced specialists committed to providing
            exceptional healthcare.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading doctors...</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctorData.map((doctor: Doctor) => (
              <div
                key={doctor.user.id}
                className="overflow-hidden rounded-lg border border-neutral-200/20 bg-white transition duration-300 hover:shadow-lg"
              >
                {/* Doctor Image */}
                <div className="aspect-w-1 aspect-h-1 bg-neutral-200">
                  {doctor.user.profilePic ? (
                    <img
                      src={doctor.user.profilePic}
                      alt={doctor.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-neutral-600">
                      No Image
                    </span>
                  )}
                </div>
                {/* Doctor Details */}
                <div className="p-6">
                  <h3 className="mb-1 text-lg font-semibold">{doctor.user.name}</h3>
                  <p className="mb-2 text-sm text-indigo-600">{doctor.specialty}</p>
                  <p className="mb-2 text-sm text-gray-600">{doctor.user.email}</p>
                  <p className="mb-4 text-sm text-gray-600">{doctor.user.role}</p>
                  {/* Documents Section */}
                  {doctor.documents && doctor.documents.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-1">
                        Documents:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {doctor.documents.map((doc, index) => (
                          <a
                            key={index}
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Document {index + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  <button className="w-full rounded-lg border border-indigo-600 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 transition duration-300 hover:bg-indigo-50">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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
