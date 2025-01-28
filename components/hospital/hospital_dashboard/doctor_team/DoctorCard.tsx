import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { User } from 'lucide-react'

interface DoctorCardProps {
  name: string
  specialization: string
  registrationNumber: string
  // onViewProfile: () => void
}

export function DoctorCard({
  name,
  specialization,
  registrationNumber,
  // onViewProfile,
}: DoctorCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <User className="h-6 w-6 text-gray-500" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{specialization}</p>
            <p className="text-xs text-gray-400">
              Reg. No: {registrationNumber}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full bg-blue-600 text-white">
          View Profile
        </Button>
      </CardFooter>
    </Card>
  )
}
