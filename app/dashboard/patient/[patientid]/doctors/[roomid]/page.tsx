"use client"

import CLOSE_ROOM_MUTATION from "@/services/apollo/mutations/closeRoom"
import OPEN_ROOM_MUTATION from "@/services/apollo/mutations/openRoom"
import SEND_MESSAGE_MUTATION from "@/services/apollo/mutations/sendMessage"
import GET_ROOM_QUERY from "@/services/apollo/queries/getRoom"
import MESSAGE_BOX_SUBSCRIPTION from "@/services/apollo/subscriptions/messageBoxSubscription"
import { useUserContext } from "@/services/contexts/userContext"
import { useApolloClient, useMutation, useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"

export default function Room({ params }: { params: { roomid: string } }) {
    const { data: subscriptionData } = useSubscription(MESSAGE_BOX_SUBSCRIPTION)
    const [room, setRoom] = useState<any>(null)
    const [roomid, setRoomid] = useState("")
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const client = useApolloClient()
    const { user } = useUserContext()
    const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION, {
        context: {
            requiresAuth: true
        },
    })
    const [closeRoom] = useMutation(CLOSE_ROOM_MUTATION, {
        context: {
            requiresAuth: true
        }
    })
    const [openRoom] = useMutation(OPEN_ROOM_MUTATION, {
        context: {
            requiresAuth: true
        }
    })

    useEffect(() => {
        async function fetchRoom() {
            try {
                const room_id = (await params).roomid
                setRoomid(room_id)
                const { data, errors } = await client.query({
                    query: GET_ROOM_QUERY,
                    variables: { id: room_id },
                    context: { requiresAuth: true }
                })
                if (errors) {
                    setRoom("closed")
                }

                setRoom(data.getRoom)
            } catch (err) {
                console.error("Error fetching room:", err)
                setRoom("closed")
            } finally {
                setIsLoading(false)
            }
        }

        fetchRoom()
    }, [])

    useEffect(() => {
        if (subscriptionData) {
            const newMessage = subscriptionData.MessageBoxSubscription.message;

            if (newMessage.author != user?.email) {
                setRoom((prevRoom: any) => ({
                    ...prevRoom,
                    messages: [...(prevRoom?.messages || []), newMessage]
                }));
            }
        }
    }, [subscriptionData]);

    async function handleSendMessage() {
        try {
            const { data } = await sendMessage({
                variables: { roomId: roomid, content: message }
            })
            setRoom(data.sendMessage)
            setMessage("") // Clear message input after sending
        } catch (err) {
            console.log(err)
        }
    }

    async function handleCloseRoom() {
        try {
            const { data } = await closeRoom({
                variables: { roomid: roomid }
            })
            setRoom("closed")
        } catch (err) {
            console.log(err)
        }
    }

    async function handleOpenRoom() {
        try {
            const { data, errors } = await openRoom({
                variables: { roomid: roomid }
            })
            if (errors) {
                console.log(errors)
                return
            }
            setRoom(data.openRoom)
        } catch (err) {
            console.log(err)
        }
    }

    // Show loading state only during initial load
    if (isLoading) return <p className="text-gray-400">Loading chat...</p>

    // Show closed room state
    if (room === "closed") {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold mb-4">Room is closed</h2>
                    <button 
                        onClick={handleOpenRoom}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Open Room
                    </button>
                </div>
            </div>
        )
    }

    if (!room) return null;

    return (
        <div className="flex flex-col h-screen">
            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
                {room.messages.map((msg: any, index: number) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg max-w-xs ${
                            msg.author === user?.email
                                ? "bg-blue-500 text-white self-end ml-auto"
                                : "bg-gray-300 text-black"
                        }`}
                    >
                        <p className="text-sm">{msg.content}</p>
                        <span className="text-xs opacity-70">{msg.author}</span>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 border p-2 rounded-lg"
                    placeholder="Type a message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Send
                </button>
                <button 
                    onClick={handleCloseRoom}
                    className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                    Close Room
                </button>
            </div>
        </div>
    )
}