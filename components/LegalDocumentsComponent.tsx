"use client"
import { Hospital } from "@/services/types/hospital"
import { UploadOnS3 } from "@/services/upload/s3"
import { useState } from "react"

export function LegalDocumentsComponent({registrationStepSetter, hospitalSetter}: {registrationStepSetter: (step: number) => void, hospitalSetter : (something: (prevState: Hospital) => Hospital) => void}) {


	const [hospitalRegistrationFileUrl, setHospitalRegistrationFileUrl] = useState("")
	const [medicalLicenseUrl, setMedicalLiceseUrl] = useState("")
	const [taxRegistrationCertificateUrl, setTaxRegistrationCertificateUrl] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)



	function hospitalRegistrationFileUrlSetter(url:string) {
		setHospitalRegistrationFileUrl(url)
	}


	function medicalLicenseUrlSetter(url:string) {
		setMedicalLiceseUrl(url)
	}

	function taxRegistrationCertificateUrlSetter(url:string) {
		setTaxRegistrationCertificateUrl(url)
	}


	function errorSetter(msg:string) {
		setError(msg)
	}


	  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		setError("")
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const data: any = Object.fromEntries(formData.entries())


		try {
			setLoading(true)
			 const [url1, url2, url3] = await Promise.all([UploadOnS3(e, hospitalRegistrationFileUrlSetter, errorSetter, "hospital_registration_file"), UploadOnS3(e, medicalLicenseUrlSetter, errorSetter, "medical_license_file"), UploadOnS3(e, taxRegistrationCertificateUrlSetter, errorSetter, "tax_registration_certificate_file")])
			setLoading(false)


    hospitalSetter(prevState => ({
      ...prevState,
      LegalDocuments: {
        HospitalRegistrationUrl: url1!,
        MedicalLicense: url2!,
        TaxRegistrationCertificate: url3!,
      }
    }))

    registrationStepSetter(4)

		} catch (err) {
			console.log(err)
			setError("error in uploading files")
		}

  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Legal Documents</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Upload Documents</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="hospital_registration_file" className="block text-sm font-medium text-gray-700 mb-1">Hospital Registration</label>
              <input
                type="file"
                name="hospital_registration_file"
                id="hospital_registration_file"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="medical_license_file" className="block text-sm font-medium text-gray-700 mb-1">Medical License</label>
              <input
                type="file"
                name="medical_license_file"
                id="medical_license_file"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="tax_registration_certificate_file" className="block text-sm font-medium text-gray-700 mb-1">Tax Registration Certificate</label>
              <input
                type="file"
                name="tax_registration_certificate_file"
                id="tax_registration_certificate_file"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        >
          Next
        </button>
      </form>
    </div>
  )
}
