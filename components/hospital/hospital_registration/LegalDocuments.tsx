'use client'
import { Hospital } from '@/services/types/hospital'
import { UploadOnS3 } from '@/services/upload/s3'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function LegalDocuments({
  registrationStepSetter,
  hospitalSetter,
}: {
  registrationStepSetter: (step: number) => void
  hospitalSetter: (something: (prevState: Hospital) => Hospital) => void
}) {
  const [hospitalRegistrationFileUrl, setHospitalRegistrationFileUrl] =
    useState('')
  const [medicalLicenseUrl, setMedicalLiceseUrl] = useState('')
  const [taxRegistrationCertificateUrl, setTaxRegistrationCertificateUrl] =
    useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function hospitalRegistrationFileUrlSetter(url: string) {
    setHospitalRegistrationFileUrl(url)
  }

  function medicalLicenseUrlSetter(url: string) {
    setMedicalLiceseUrl(url)
  }

  function taxRegistrationCertificateUrlSetter(url: string) {
    setTaxRegistrationCertificateUrl(url)
  }

  function errorSetter(msg: string) {
    setError(msg)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setError('')
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const data: any = Object.fromEntries(formData.entries())

    try {
      setLoading(true)
      const [url1, url2, url3] = await Promise.all([
        UploadOnS3(
          e,
          hospitalRegistrationFileUrlSetter,
          errorSetter,
          'hospital_registration_file'
        ),
        UploadOnS3(
          e,
          medicalLicenseUrlSetter,
          errorSetter,
          'medical_license_file'
        ),
        UploadOnS3(
          e,
          taxRegistrationCertificateUrlSetter,
          errorSetter,
          'tax_registration_certificate_file'
        ),
      ])
      setLoading(false)

      hospitalSetter((prevState) => ({
        ...prevState,
        LegalDocuments: {
          HospitalRegistrationUrl: url1!,
          MedicalLicense: url2!,
          TaxRegistrationCertificate: url3!,
        },
      }))

      registrationStepSetter(4)
    } catch (err) {
      console.log(err)
      setError('Error in uploading files')
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
              </form>

              {/* Submit Button */}
              <div className="mt-6">
                <Button type="submit" className="w-1/3">
                  {loading ? 'Uploading...' : 'Save and Continue'}
                </Button>
              </div>

              {/* Error Message */}
              {error && (
                <p className="mt-4 text-center text-red-500">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
