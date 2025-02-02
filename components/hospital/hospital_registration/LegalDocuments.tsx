'use client'
import { Hospital } from '@/services/types/hospital'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useApolloClient } from '@apollo/client'
import S3_URL_QUERY from '@/services/apollo/queries/getS3Url'
import { useHospital } from '@/services/contexts/hopitalContext'
import { handleUpload } from '@/services/upload/s3'

export default function LegalDocuments({ handleStep }: { handleStep: () => void }) {
  const client = useApolloClient()
  const [uploading, setUploading] = useState(false)
  const { updateHospital, hospital } = useHospital()







  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const data: any = Object.fromEntries(formData.entries())
    try {

      setUploading(true)
      const [hospitalRegistrationUrl, hospitalMedicalUrl, hospitalTaxUrl] = await Promise.all([handleUpload(data.hospital_registration_file), handleUpload(data.medical_license_file), handleUpload(data.tax_registration_certificate_file)])
      setUploading(false)

      updateHospital({
        Amenities: {
          ...hospital?.Amenities,
          LegalDocuments: {
            HospitalRegistrationUrl: hospitalRegistrationUrl,
            MedicalLicense: hospitalMedicalUrl,
            TaxRegistrationCertificate: hospitalTaxUrl,
          },
        }
      })
      handleStep()

    } catch (err) {
      console.log(err)

    }
  }

  return (
    <section className="h-screen overflow-hidden px-4 py-4">
      <div className="flex h-full flex-col gap-4">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Legal Documents</h2>
          <p className="mt-1 text-sm text-gray-600">
            Please upload the necessary legal documents for your hospital.
          </p>
        </div>

        <div className="flex-grow overflow-auto">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-lg border bg-white p-4 shadow"
              >
                {/* Upload Document Fields */}
                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-800">
                    Upload Documents
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="hospital_registration_file"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Hospital Registration
                      </label>
                      <input
                        type="file"
                        name="hospital_registration_file"
                        id="hospital_registration_file"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="medical_license_file"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Medical License
                      </label>
                      <input
                        type="file"
                        name="medical_license_file"
                        id="medical_license_file"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="tax_registration_certificate_file"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tax Registration Certificate
                      </label>
                      <input
                        type="file"
                        name="tax_registration_certificate_file"
                        id="tax_registration_certificate_file"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <Button type="submit" className="w-1/3" disabled={uploading}>
                    {uploading ? "Uploading..." : "Save and Continue"}
                  </Button>
                </div>
              </form>

              {/* Error Message */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
