import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DateTimePicker } from '@/components/ui/date_time_picker'
import { useHospital } from '@/services/contexts/hopitalContext'

export default function Verification({handleStep}: {handleStep: () => void}) {

  const {updateHospital} = useHospital()



  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const data: any = Object.fromEntries(formData.entries())

    updateHospital({
      OnSiteVerification: {
        VerificationContact: {
          Name: data.name,
          Position: data.position,
          PhoneNumber: data.phone_number,
          AlternatePhone: data.alternate_phone,
        },
      },
      OnsiteRating: Number(data.onsiterating)
    })

    handleStep()

  }


  return (
    <section className="h-screen overflow-hidden px-4 py-4">
      <div className="flex h-full flex-col gap-4">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Onsite Verification
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Please provide your preferred date, time, and contact information
            for verification.
          </p>
        </div>

        <div className="flex-grow overflow-auto">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-lg border bg-white p-4 shadow"
              >
                {/* Preferred Date and Time */}
                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-800">
                    Preferred Date and Time
                  </h3>
                  <div className="space-y-3">
                    <DateTimePicker
                    />
                  </div>
                </div>

                {/* Verification Contact Information */}
                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-800">
                    Verification Contact
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        Contact Name
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        required
                        aria-label="Contact Name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        Position
                      </Label>
                      <Input
                        type="text"
                        name="position"
                        required
                        aria-label="Position"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        type="tel"
                        name="phone_number"
                        required
                        aria-label="Phone Number"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        Alternate Phone
                      </Label>
                      <Input
                        type="tel"
                        name="alternate_phone"
                        required
                        aria-label="Alternate Phone"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                         On Site Rating
                      </Label>
                      <Input
                        type="number"
                        name="onsiterating"
                        required
                        aria-label="onsite Rating"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button className="w-full">Save and Continue</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
