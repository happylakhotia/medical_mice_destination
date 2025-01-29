"use client"

import { Hospital } from "@/services/types/hospital"

export default function BasicInfoComponent({ registrationStepSetter, setHospital }: 
	{registrationStepSetter: (step: number) => void, setHospital: (something: (prevState:Hospital) => Hospital) => void}
) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const data: any = Object.fromEntries(formData.entries())

    setHospital(prevState => ({
      ...prevState,
			BasicInfo: {
				...prevState.BasicInfo,
				HospitalName: data.hospital_name,
				RegistrationNumber: data.registration_number,
				ContactInformation: {
					ContactPersonName: data.contact_person_name,
					ContactNumber: data.contact_person_number,
					ContactEmail: data.contact_person_email,
					Website: data.contact_person_website
				},
				AddressInformation: {
					StreetAddress: data.street_addresss,
					City: data.city,
					State: data.state,
					PinCode: data.pin_code
				},
				OperatingHours: {
					OpeningTime: data.opening_time,
					ClosingTime: data.closing_time
				},
			},
		}))

    registrationStepSetter(1)
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Hospital Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="hospital_name" className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
              <input
                type="text"
                name="hospital_name"
                id="hospital_name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="registration_number" className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
              <input
                type="text"
                name="registration_number"
                id="registration_number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact_person_name" className="block text-sm font-medium text-gray-700 mb-1">Contact Person Name</label>
              <input
                type="text"
                name="contact_person_name"
                id="contact_person_name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="contact_person_number" className="block text-sm font-medium text-gray-700 mb-1">Contact Person Number</label>
              <input
                type="text"
                name="contact_person_number"
                id="contact_person_number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="contact_person_email" className="block text-sm font-medium text-gray-700 mb-1">Contact Person Email</label>
              <input
                type="email"
                name="contact_person_email"
                id="contact_person_email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="contact_person_website" className="block text-sm font-medium text-gray-700 mb-1">Hospital Website</label>
              <input
                type="url"
                name="contact_person_website"
                id="contact_person_website"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="street_address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                name="street_address"
                id="street_address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                id="city"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                id="state"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                name="pincode"
                id="pincode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Operating Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="opening_time" className="block text-sm font-medium text-gray-700 mb-1">Opening Time</label>
              <input
                type="time"
                name="opening_time"
                id="opening_time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="closing_time" className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
              <input
                type="time"
                name="closing_time"
                id="closing_time"
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
