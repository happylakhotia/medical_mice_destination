import { Icon, LucideIcon, Mail } from 'lucide-react'

export interface MenuItem {
  title: string
  icon: LucideIcon
  url: string | ((id: string) => string)  // Updated to support dynamic URLs
  role?: 'doctor' | 'patient' | 'staff' | 'admin'
  children?: Omit<MenuItem, 'children'>[]
}

// config/sidebarConfig.ts
import { 
  Users, 
  LayoutDashboard, 
  Settings as SettingsIcon, 
  Plus, 
  Calendar, 
  FileText, 
  Activity, 
  Heart, 
  Stethoscope, 
  UserCog 
} from 'lucide-react'

export const sidebarConfig: Record<string, MenuItem[]> = {
    doctor: [
      {
        title: 'Dashboard',
        icon: LayoutDashboard,
        url: (id: string) => `/dashboard/doctor/${id}`,
      },
      {
        title: 'MailBox',
        icon: Mail,
        url: (id: string) => `/dashboard/doctor/${id}/mailbox`,
      },
      {
        title: 'Patients',
        icon: Users,
        url: (id: string) => `/dashboard/doctor/${id}/patients`,
      },
      {
        title: 'Medical Records',
        icon: FileText,
        url: (id: string) => `/dashboard/doctor/${id}/records`,
      },
    ],
    patient: [
      {
        title: 'My Health',
        icon: Heart,
        url: (id: string) => `/dashboard/patient/${id}/health`,
      },
      {
        title: 'Appointments',
        icon: Calendar,
        url: (id: string) => `/dashboard/patient/${id}/appointments`,
      },
      {
        title: 'My Doctors',
        icon: Stethoscope,
        url: (id: string) => `/dashboard/patient/${id}/doctors`,
      },
      {
        title: 'Medical History',
        icon: Activity,
        url: (id: string) => `/dashboard/patient/${id}/history`,
      },
    ],
    staff: [
      {
        title: 'Dashboard',
        icon: LayoutDashboard,
        url: (id: string) => `/dashboard/staff/${id}`,
      },
      {
        title: 'Appointments',
        icon: Calendar,
        url: (id: string) => `/dashboard/staff/${id}/appointments`,
      },
      {
        title: 'Patients',
        icon: Users,
        url: (id: string) => `/dashboard/staff/${id}/patients`,
      },
      {
        title: 'Doctors',
        icon: Stethoscope,
        url: (id: string) => `/dashboard/staff/${id}/doctors`,
      },
    ],
    root: [
      {
        title: 'Overview',
        icon: LayoutDashboard,
        url: (id: string) => `/dashboard/root/${id}`,
      },
      {
        title: 'MailBox',
        icon: Mail,
        url: (id: string) => `/dashboard/root/${id}/mailbox`,
      },
      {
        title: 'User Management',
        icon: UserCog,
        url: (id: string) => `/dashboard/root/${id}/users`,
      },
      {
        title: 'Create Doctor',
        icon: Plus,
        url: (id: string) => `/dashboard/root/${id}/doctors/create`,
      },
    ],
    nohospitalroot: [
      {
        title: 'Overview',
        icon: LayoutDashboard,
        url: (id: string) => `/dashboard/root/${id}`,
      },
      {
        title: 'MailBox',
        icon: Mail,
        url: (id: string) => `/dashboard/root/${id}/mailbox`,
      },
      {
        title: 'User Management',
        icon: UserCog,
        url: (id: string) => `/dashboard/root/${id}/users`,
      },
      {
        title: 'Create Doctor',
        icon: Plus,
        url: (id: string) => `/dashboard/root/${id}/doctors/create`,
      },
      {
        title: 'Register Hospital',
        icon: Plus,
        url: (id: string) => `/dashboard/root/${id}/hospital/create`
      }
    ],



  }