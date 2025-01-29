'use client'

import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, SlidersHorizontal } from 'lucide-react'
import SidebarWrapper from '../SidebarWrapper'

const applications = [
  {
    id: 'APP001',
    type: 'Diabetic',
    consultation: 'Consultation',
    status: 'pending',
  },
  {
    id: 'APP002',
    type: 'Cardiology',
    consultation: 'Check-up',
    status: 'approved',
  },
  {
    id: 'APP003',
    type: 'Orthopedic',
    consultation: 'Consultation',
    status: 'rejected',
  },
  {
    id: 'APP004',
    type: 'General',
    consultation: 'Check-up',
    status: 'pending',
  },
]

const ApplicationsPage = () => {
  return (
    <SidebarWrapper>
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Applications Overview</h1>
            <p className="text-sm text-muted-foreground">
              Patient applications management dashboard
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
            <Input placeholder="Search applications..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Applications Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Applications</h2>
          {applications.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between rounded-lg border bg-card p-4"
            >
              <div className="space-y-1">
                <p className="font-medium">Application #{app.id}</p>
                <p className="text-sm text-muted-foreground">
                  {app.type} {app.consultation}
                </p>
              </div>
              <Badge
                variant={
                  app.status === 'approved'
                    ? 'success'
                    : app.status === 'rejected'
                      ? 'destructive'
                      : 'warning'
                }
                className={
                  app.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : app.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                }
              >
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </SidebarWrapper>
  )
}

export default ApplicationsPage
