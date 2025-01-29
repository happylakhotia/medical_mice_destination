import { DoctorCard } from './DoctorCard'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SidebarWrapper from '../SidebarWrapper'

const mockDoctors = [
  {
    id: 1,
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    registrationNumber: 'MED2024-001',
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    specialization: 'Neurology',
    registrationNumber: 'MED2024-002',
  },
  {
    id: 3,
    name: 'Dr. Michael Chen',
    specialization: 'Pediatrics',
    registrationNumber: 'MED2024-003',
  },
]

const DoctorTeamPage = () => {
  return (
    <SidebarWrapper>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">Doctor List</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
            <Input placeholder="Search doctors..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Doctors</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              specialization={doctor.specialization}
              registrationNumber={doctor.registrationNumber}
            />
          ))}
        </div>
      </div>
    </SidebarWrapper>
  )
}

export default DoctorTeamPage
