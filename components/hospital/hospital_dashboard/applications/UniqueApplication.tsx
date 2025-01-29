import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import SidebarWrapper from '../SidebarWrapper'

export default function UniqueApplication() {
  return (
    <SidebarWrapper>
      <div className="container max-w-6xl py-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Application #APP001</h1>
            <p className="text-muted-foreground">Diabetic Consultation</p>
          </div>
          <div className="flex gap-3">
            <Button variant="destructive">Reject Application</Button>
            <Button className="bg-blue-600">Appoint Doctor</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column - Patient Information */}
          <div className="space-y-6">
            <section>
              <h2 className="mb-4 text-lg font-semibold">
                Patient Information
              </h2>
              <div className="mb-4 flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-muted-foreground">
                    Patient ID: PT123456
                  </p>
                  <p className="text-sm text-muted-foreground">Age: 45 years</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="mb-4 text-lg font-semibold">Contact Details</h2>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">Email: </span>
                  john.doe@example.com
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Phone: </span>
                  +1 234 567 8900
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Address: </span>
                  123 Medical Street, Healthcare City
                </p>
              </div>
            </section>
            <section>
              <h2 className="mb-4 text-lg font-semibold">Medical History</h2>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">
                    Previous Conditions:{' '}
                  </span>
                  Type 2 Diabetes
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Medications: </span>
                  Metformin
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Allergies: </span>
                  None
                </p>
              </div>
            </section>
          </div>
          {/* Right Column - Assignment & Notes */}
          <div className="space-y-6">
            <section>
              <h2 className="mb-4 text-lg font-semibold">
                Department Assignment
              </h2>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="endocrinology">Endocrinology</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="general">General Medicine</SelectItem>
                </SelectContent>
              </Select>
            </section>
            <section>
              <h2 className="mb-4 text-lg font-semibold">Doctor Assignment</h2>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                  <SelectItem value="dr-jones">Dr. Jones</SelectItem>
                  <SelectItem value="dr-wilson">Dr. Wilson</SelectItem>
                </SelectContent>
              </Select>
            </section>
            <section>
              <h2 className="mb-4 text-lg font-semibold">Application Notes</h2>
              <Textarea
                placeholder="Add notes about the application..."
                className="min-h-[150px]"
              />
            </section>
          </div>
        </div>
      </div>
    </SidebarWrapper>
  )
}
