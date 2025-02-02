"use client"

import GET_ROOMS_QUERY from "@/services/apollo/queries/getRooms"
import { useUserContext } from "@/services/contexts/userContext"
import { useApolloClient } from "@apollo/client"
import Link from "next/link"
import { useEffect, useState } from "react"

// Import shadcn UI components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatLayout({ children, params }: { children: React.ReactNode, params: { rootid: string } }) {
  const client = useApolloClient()
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useUserContext()

  useEffect(() => {
    getRooms()
  }, [])

  async function getRooms() {
    try {
      const { data } = await client.query({
        query: GET_ROOMS_QUERY,
        context: {
          requiresAuth: true
        }
      })
      console.log("user is ", user)
      setRooms(data.getRoomsById)
    } catch (err) {
      console.error("Error fetching rooms:", err)
      setError("Failed to load rooms.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 p-4 border-r border-zinc-200 bg-background">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Rooms</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            {loading && <Skeleton className="h-6 w-full mb-2" />}
            {error && <p className="text-destructive">{error}</p>}
            <ScrollArea className="h-[calc(100%-4rem)]">
              <ul className="space-y-2">
                {rooms.map((room: any) => (
                  <Link key={room.id} href={`/dashboard/patient/${user?.id}/doctors/${room.id}`}>
                    <li className="cursor-pointer hover:bg-muted p-3 rounded-md transition-colors">
                      <p className="font-semibold">Room ID: {room.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {room.participants.length} Participants
                      </p>
                    </li>
                  </Link>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}
