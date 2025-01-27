import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

export default function FacilityDetails({
  registrationStepSetter,
  hospitalSetter,
}: {
  registrationStepSetter: (step: number) => void
  hospitalSetter: (something: (prevState: Hospital) => Hospital) => void
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const data: any = Object.fromEntries(formData.entries())

    hospitalSetter((prevState) => ({
      ...prevState,
      Facilities: {
        BedCapacity: {
          GeneralWardBeds: parseInt(data.general_ward_beds),
          IcuBeds: parseInt(data.icu_ward_beds),
          PrivateRoomBeds: parseInt(data.private_room_beds),
          EmergencyBeds: parseInt(data.emergency_beds),
        },
        MedicalStaff: {
          PermenantDoctors: parseInt(data.permenant_doctors),
          VisitingConsultants: parseInt(data.visiting_consultants),
          Nurses: parseInt(data.nurses),
          SupportStaff: parseInt(data.support_staff),
        },
        Facilities: {
          EmergencyCare: data.emergency_care === 'on',
          Laboratory: data.laboratory === 'on',
          Pharmacy: data.pharmacy === 'on',
          Radiology: data.radiology === 'on',
          OperationTheatre: data.operation_theatre === 'on',
          BloodBank: data.blood_bank === 'on',
        },
        Specialization: {
          Cardiology: data.cardiology === 'on',
          Neurology: data.neurology === 'on',
          OrthoPedics: data.orthopedics === 'on',
          Pediatrics: data.pediatrics === 'on',
          Gynecology: data.gynecology === 'on',
          Oncology: data.oncology === 'on',
        },
      },
    }))

    registrationStepSetter(3)
  }

  return (
    <section className="h-screen overflow-hidden px-4 py-4">
      <div className="flex h-full flex-col gap-4">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Hospital Facilities
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Provide details about your hospital's facilities, including bed
            capacity, medical staff, and specialized facilities.
          </p>
        </div>

        <div className="flex-grow overflow-auto">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 lg:grid-cols-3"
          >
            <div className="space-y-4 lg:col-span-2">
              <div className="rounded-lg border bg-white p-4 shadow">
                <div>
                  <h3 className="mb-4 text-lg font-medium text-gray-800">
                    Bed Capacity
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <Label htmlFor="general_ward_beds">
                        General Ward Beds
                      </Label>
                      <Input
                        type="number"
                        name="general_ward_beds"
                        id="general_ward_beds"
                        placeholder="Enter number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="icu_ward_beds">ICU Beds</Label>
                      <Input
                        type="number"
                        name="icu_ward_beds"
                        id="icu_ward_beds"
                        placeholder="Enter number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="private_room_beds">
                        Private Room Beds
                      </Label>
                      <Input
                        type="number"
                        name="private_room_beds"
                        id="private_room_beds"
                        placeholder="Enter number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency_beds">Emergency Beds</Label>
                      <Input
                        type="number"
                        name="emergency_beds"
                        id="emergency_beds"
                        placeholder="Enter number"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">
                    Medical Staff
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <Label htmlFor="permenant_doctors">
                        Permanent Doctors
                      </Label>
                      <Input
                        type="number"
                        name="permenant_doctors"
                        id="permenant_doctors"
                        placeholder="Enter number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="visiting_consultants">
                        Visiting Consultants
                      </Label>
                      <Input
                        type="number"
                        name="visiting_consultants"
                        id="visiting_consultants"
                        placeholder="Enter number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nurses">Nurses</Label>
                      <Input
                        type="number"
                        name="nurses"
                        id="nurses"
                        placeholder="Enter number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="support_staff">Support Staff</Label>
                      <Input
                        type="number"
                        name="support_staff"
                        id="support_staff"
                        placeholder="Enter number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-1">
              <div className="rounded-lg border bg-white p-4 shadow">
                <h3 className="mb-4 text-lg font-medium text-gray-800">
                  Facilities
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    'Emergency Care',
                    'Laboratory',
                    'Pharmacy',
                    'Radiology',
                    'Operation Theatre',
                    'Blood Bank',
                  ].map((facility) => (
                    <div key={facility} className="flex items-center">
                      <Checkbox
                        id={facility.toLowerCase().replace(' ', '_')}
                        name={facility.toLowerCase().replace(' ', '_')}
                      />
                      <Label
                        htmlFor={facility.toLowerCase().replace(' ', '_')}
                        className="ml-2 text-sm text-gray-900"
                      >
                        {facility}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-lg border bg-white p-4 shadow">
                <h3 className="mb-4 text-lg font-medium text-gray-800">
                  Specializations
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    'Cardiology',
                    'Neurology',
                    'Orthopedics',
                    'Pediatrics',
                    'Gynecology',
                    'Oncology',
                  ].map((specialization) => (
                    <div key={specialization} className="flex items-center">
                      <Checkbox
                        id={specialization.toLowerCase()}
                        name={specialization.toLowerCase()}
                      />
                      <Label
                        htmlFor={specialization.toLowerCase()}
                        className="ml-2 text-sm text-gray-900"
                      >
                        {specialization}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <Button type="submit" className="w-full">
                  Save and Continue
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
