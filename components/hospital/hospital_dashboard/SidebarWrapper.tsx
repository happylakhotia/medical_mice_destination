import { SidebarProvider } from '@/components/ui/sidebar'
import { sidebarConfig } from './sideBarConfig'
import { AppSidebar } from './AppSidebar'

interface SidebarWrapperProps {
  children: React.ReactNode
  dashboardType: keyof typeof sidebarConfig
  userId: string
}

const SidebarWrapper = ({ children, dashboardType, userId }: SidebarWrapperProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar dashboardType={dashboardType} userId={userId} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </SidebarProvider>
  )
}

export default SidebarWrapper