import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { DateTimePicker } from '@/components/ui/date_time_picker'

const BookAppointmentPage = () => {
  return (
    <section
      id="appointmentBooking"
      className="flex min-h-screen flex-col items-center py-32"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Booking Form */}
          <div className="container flex flex-col lg:w-2/3">
            <h2 className="mb-8 text-3xl font-bold">Book Your Appointment</h2>
            <form className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4 rounded-xl bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label className="mb-1 block text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label className="mb-1 block text-sm font-medium">
                      Age
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-sm font-medium">
                      Gender
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 rounded-xl bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-semibold">Contact Details</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label className="mb-1 block text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium">
                    Address
                  </Label>
                  <Textarea
                    placeholder="Enter your full address"
                    className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Medical Details */}
              <div className="space-y-4 rounded-xl bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-semibold">Medical Details</h3>
                <div>
                  <Label className="mb-1 block text-sm font-medium">
                    Medical Condition
                  </Label>
                  <Textarea
                    placeholder="Describe your medical condition"
                    className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label className="mb-1 block text-sm font-medium">
                      Previous Medications
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter previous medications"
                      className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-sm font-medium">
                      Allergies
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter any known allergies"
                      className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-4 rounded-xl bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Appointment Details
                </h3>
                <div>
                  <Label className="mb-1 block text-sm font-medium">
                    Preferred Date & Time
                  </Label>
                  <DateTimePicker className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
              >
                Confirm Appointment
              </button>
            </form>
          </div>

          {/* Booking Information */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 rounded-xl bg-gray-50 p-6">
              <h3 className="mb-6 text-xl font-semibold">
                Booking Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Consultation Fee</span>
                  <span className="font-medium">$100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Booking Fee</span>
                  <span className="font-medium">$10</span>
                </div>
                <hr />
                <div className="flex items-center justify-between font-medium">
                  <span>Total Amount</span>
                  <span className="text-blue-600">$110</span>
                </div>
              </div>
              <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <h4 className="mb-2 font-medium text-blue-900">
                  Important Information
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>
                    • Cancellation is free up to 24 hours before the appointment
                  </li>
                  <li>• Upload valid doctor's prescription</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookAppointmentPage
