import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function BasicInfo() {
  return (
    <section className="h-screen overflow-hidden px-4 py-4">
      <div className="flex h-full flex-col gap-4">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Basic Information
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Please provide the basic details about your hospital.
          </p>
        </div>

        <div className="flex-grow overflow-auto">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <form className="space-y-4 rounded-lg border bg-white p-4 shadow">
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
                      <Input
                        type="text"
                        required
                        aria-label="Hospital Name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        Registration Number
                      </Label>
                      <Input
                        type="text"
                        required
                        aria-label="Registration Number"
                        className="mt-1"
                      />
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
                      <Input
                        type="text"
                        required
                        aria-label="Contact Person Name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        Contact Number
                      </Label>
                      <Input
                        type="tel"
                        required
                        aria-label="Contact Number"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        required
                        aria-label="Email Address"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        Website (optional)
                      </Label>
                      <Input type="url" aria-label="Website" className="mt-1" />
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
                      <Input
                        type="text"
                        required
                        aria-label="Street Address"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <div>
                        <Label className="block text-sm font-medium text-gray-700">
                          City
                        </Label>
                        <Input
                          type="text"
                          required
                          aria-label="City"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-gray-700">
                          State
                        </Label>
                        <Input
                          type="text"
                          required
                          aria-label="State"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-gray-700">
                          PIN Code
                        </Label>
                        <Input
                          type="text"
                          required
                          aria-label="PIN Code"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

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
                      <Input
                        type="time"
                        required
                        aria-label="Opening Time"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        Closing Time
                      </Label>
                      <Input
                        type="time"
                        required
                        aria-label="Closing Time"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <Label className="inline-flex items-center space-x-2">
                      <Checkbox id="24-7-operation" />
                      <span className="text-sm text-gray-600">
                        24/7 Operation
                      </span>
                    </Label>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              {/* <div className="space-y-3 rounded-lg border bg-white p-4 shadow"> */}
              <Button className="w-full">Save and Continue</Button>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
