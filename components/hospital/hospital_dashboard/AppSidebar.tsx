import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { sidebarConfig } from './sideBarConfig'

interface AppSidebarProps {
  dashboardType: keyof typeof sidebarConfig
  userId: string
}

export function AppSidebar({ dashboardType, userId }: AppSidebarProps) {
  const pathname = usePathname()
  const menuItems = sidebarConfig[dashboardType]

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h1 className="text-3xl font-bold text-blue-600">TBO</h1>
        <p className="text-sm text-muted-foreground capitalize">{dashboardType} Portal</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const url = typeof item.url === 'function' ? item.url(userId) : item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={url}
                        className={cn(
                          "flex items-center space-x-2 w-full",
                          pathname === url && "bg-accent text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href={`/dashboard/${dashboardType}/${userId}/settings`}
                    className="flex items-center space-x-2"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}