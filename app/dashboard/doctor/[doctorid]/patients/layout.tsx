"use client"

import GET_ROOMS_QUERY from "@/services/apollo/queries/getRooms"
import { useUserContext } from "@/services/contexts/userContext"
import { useApolloClient } from "@apollo/client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ChatLayout({ children, params }: { children: React.ReactNode, params: {doctorid: string}}) {
    const client = useApolloClient()
    const [rooms, setRooms] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const {user} = useUserContext()

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
            <aside className="w-64 text-black p-4 border-r border-zinc-700">
                <h2 className="text-xl font-bold mb-4">Rooms</h2>

                {loading && <p className="text-gray-400">Loading rooms...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <ul>
                    {rooms.map((room: any) => (
                        <Link key={room.id}  href={`/dashboard/doctor/${user?.id}/patients/${room.id}`}>
                            <li
                                className="p-3 mb-2 rounded-lg  bg-slate-400 hover:bg-zinc-700 transition cursor-pointer"
                            >
                                <p className="font-semibold">Room ID: {room.id}</p>
                                <p className="text-sm text-gray-400">
                                    {room.participants.length} Participants
                                </p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    )
}
