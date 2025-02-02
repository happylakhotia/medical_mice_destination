"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Hospital, useHospital } from '@/services/contexts/hopitalContext'

export default function BasicInfo({ handleStep, rootId }: { handleStep: () => void, rootId: string }) {
  const { updateHospital } = useHospital()

  function handleBasicInfo(e: React.FormEvent<HTMLFormElement>) {
    console.log("daksh")
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)


    const partialHospital: Partial<Hospital> = {
      BasicInfo: {
        HospitalName: formData.get("hospitalName") as string,
        RegistrationNumber: formData.get("registrationNumber") as string,
        ContactInformation: {
          ContactPersonName: formData.get("contactPersonName") as string,
          ContactNumber: formData.get("contactNumber") as string,
          ContactEmail: formData.get("emailAddress") as string,
          Website: formData.get("website") as string || "",
        },
        AddressInformation: {
          StreetAddress: formData.get("streetAddress") as string,
          City: formData.get("city") as string,
          State: formData.get("state") as string,
          PinCode: formData.get("pinCode") as string,
        },
        OperatingHours: {
          OpeningTime: formData.get("openingTime") as string,
          ClosingTime: formData.get("closingTime") as string,
        },
      },
      ConsultationFee: Number(formData.get("consultationFees") as string),
      FirstRootUser: rootId
    }
    updateHospital(partialHospital)
    handleStep()

  }


  return (
<form className="space-y-4 rounded-lg border bg-white p-4 shadow" onSubmit={handleBasicInfo}>
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
    {/* Left Section */}
    <div className="lg:col-span-2">
      {/* Hospital Details */}
      <div>
        <h3 className="mb-2 text-lg font-medium text-gray-800">
          Hospital Details
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Hospital Name
            </Label>
            <Input type="text" name="hospitalName" required className="mt-1" />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Registration Number
            </Label>
            <Input type="text" name="registrationNumber" required className="mt-1" />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="mb-2 text-lg font-medium text-gray-800">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Contact Person Name
            </Label>
            <Input type="text" name="contactPersonName" required className="mt-1" />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Contact Number
            </Label>
            <Input type="tel" name="contactNumber" required className="mt-1" />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <Input type="email" name="emailAddress" required className="mt-1" />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Website (optional)
            </Label>
            <Input type="url" name="website" className="mt-1" />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Consultation Fees
            </Label>
            <Input type="number" name="consultationFees" className="mt-1" />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div>
        <h3 className="mb-2 text-lg font-medium text-gray-800">
          Address Information
        </h3>
        <div className="space-y-3">
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Street Address
            </Label>
            <Input type="text" name="streetAddress" required className="mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                City
              </Label>
              <Input type="text" name="city" required className="mt-1" />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                State
              </Label>
              <Input type="text" name="state" required className="mt-1" />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                PIN Code
              </Label>
              <Input type="text" name="pinCode" required className="mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Right Section (Operating Hours & Button) */}
    <div className="flex flex-col gap-8 lg:col-span-1">
      <div className="rounded-lg border bg-white p-4 shadow">
        {/* Operating Hours */}
        <div>
          <h3 className="mb-2 text-lg font-medium text-gray-800">
            Operating Hours
          </h3>
          <div className="space-y-3">
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Opening Time
              </Label>
              <Input type="time" name="openingTime" required className="mt-1" />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Closing Time
              </Label>
              <Input type="time" name="closingTime" required className="mt-1" />
            </div>
          </div>
          <div className="mt-3">
            <Label className="inline-flex items-center space-x-2">
              <Checkbox id="24-7-operation" name="24/7" />
              <span className="text-sm text-gray-600">24/7 Operation</span>
            </Label>
          </div>
        </div>
      </div>

      {/* Submit Button Inside the Form */}
      <Button type="submit" className="w-full">Save and Continue</Button>
    </div>
  </div>
</form>
  )
}
