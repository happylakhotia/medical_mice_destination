"use client"
import { Hospital } from "@/services/types/hospital"

export default function BasicAminitiesComponent({registrationStepSetter, hospitalSetter}: {registrationStepSetter: (step: number) => void, hospitalSetter : (something: (prevState: Hospital) => Hospital) => void}) {
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const data: any = Object.fromEntries(formData.entries())

    hospitalSetter(prevState => ({
      ...prevState,
      Amenities: {
        BedCapacity: {
          GeneralWardBeds: parseInt(data.general_ward_beds),
          IcuBeds: parseInt(data.icu_ward_beds),
          PrivateRoomBeds: parseInt(data.private_room_beds),
          EmergencyBeds: parseInt(data.emergency_beds)
        },
        MedicalStaff: {
          PermenantDoctors: parseInt(data.permenant_doctors),
          VisitingConsultants: parseInt(data.visiting_consultants),
          Nurses: parseInt(data.nurses),
          SupportStaff: parseInt(data.support_staff)
        },
        Facilities: {
          EmergencyCare: data.emergency_care === 'on',
          Laboratory: data.laboratory === 'on',
          Pharmacy: data.pharmacy === 'on',
          Radiology: data.radiology === 'on',
          OperationTheatre: data.operation_theatre === 'on',
          BloodBank: data.blood_bank === 'on'
        },
        Specialization: {
          Cardiology: data.cardiology === 'on',
          Neurology: data.neurology === 'on',
          OrthoPedics: data.orthopedics === 'on',
          Pediatrics: data.pediatrics === 'on',
          Gynecology: data.gynecology === 'on',
          Oncology: data.oncology === 'on'
        }
      }
    }))

    registrationStepSetter(3)
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Hospital Amenities</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Bed Capacity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="general_ward_beds" className="block text-sm font-medium text-gray-700 mb-1">General Ward Beds</label>
              <input
                type="number"
                name="general_ward_beds"
                id="general_ward_beds"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="icu_ward_beds" className="block text-sm font-medium text-gray-700 mb-1">ICU Beds</label>
              <input
                type="number"
                name="icu_ward_beds"
                id="icu_ward_beds"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="private_room_beds" className="block text-sm font-medium text-gray-700 mb-1">Private Room Beds</label>
              <input
                type="number"
                name="private_room_beds"
                id="private_room_beds"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="emergency_beds" className="block text-sm font-medium text-gray-700 mb-1">Emergency Beds</label>
              <input
                type="number"
                name="emergency_beds"
                id="emergency_beds"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Medical Staff</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="permenant_doctors" className="block text-sm font-medium text-gray-700 mb-1">Permanent Doctors</label>
              <input
                type="number"
                name="permenant_doctors"
                id="permenant_doctors"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="visiting_consultants" className="block text-sm font-medium text-gray-700 mb-1">Visiting Consultants</label>
              <input
                type="number"
                name="visiting_consultants"
                id="visiting_consultants"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="nurses" className="block text-sm font-medium text-gray-700 mb-1">Nurses</label>
              <input
                type="number"
                name="nurses"
                id="nurses"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="support_staff" className="block text-sm font-medium text-gray-700 mb-1">Support Staff</label>
              <input
                type="number"
                name="support_staff"
                id="support_staff"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Facilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="emergency_care"
                id="emergency_care"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="emergency_care" className="ml-2 block text-sm text-gray-900">Emergency Care</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="laboratory"
                id="laboratory"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="laboratory" className="ml-2 block text-sm text-gray-900">Laboratory</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="pharmacy"
                id="pharmacy"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="pharmacy" className="ml-2 block text-sm text-gray-900">Pharmacy</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="radiology"
                id="radiology"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="radiology" className="ml-2 block text-sm text-gray-900">Radiology</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="operation_theatre"
                id="operation_theatre"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="operation_theatre" className="ml-2 block text-sm text-gray-900">Operation Theatre</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="blood_bank"
                id="blood_bank"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="blood_bank" className="ml-2 block text-sm text-gray-900">Blood Bank</label>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Specializations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="cardiology"
                id="cardiology"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="cardiology" className="ml-2 block text-sm text-gray-900">Cardiology</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="neurology"
                id="neurology"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="neurology" className="ml-2 block text-sm text-gray-900">Neurology</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="orthopedics"
                id="orthopedics"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="orthopedics" className="ml-2 block text-sm text-gray-900">Orthopedics</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="pediatrics"
                id="pediatrics"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="pediatrics" className="ml-2 block text-sm text-gray-900">Pediatrics</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="gynecology"
                id="gynecology"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="gynecology" className="ml-2 block text-sm text-gray-900">Gynecology</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="oncology"
                id="oncology"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="oncology" className="ml-2 block text-sm text-gray-900">Oncology</label>
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
