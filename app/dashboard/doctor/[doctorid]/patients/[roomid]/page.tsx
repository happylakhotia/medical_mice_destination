"use client"

import CLOSE_ROOM_MUTATION from "@/services/apollo/mutations/closeRoom"
import OPEN_ROOM_MUTATION from "@/services/apollo/mutations/openRoom"
import INVITATION_MAIL_MUTATION from "@/services/apollo/mutations/sendInvitation"
import SEND_MESSAGE_MUTATION from "@/services/apollo/mutations/sendMessage"
import GET_ROOM_QUERY from "@/services/apollo/queries/getRoom"
import MESSAGE_BOX_SUBSCRIPTION from "@/services/apollo/subscriptions/messageBoxSubscription"
import { useUserContext } from "@/services/contexts/userContext"
import { handleUpload } from "@/services/upload/s3"
import { useApolloClient, useMutation, useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"



function InvitationDialog({ room, roomSetter, doctorid }: { room: any, roomSetter: (room: any) => void, doctorid: string }) {
    const [content, setContent] = useState("")
    const { data: subscriptionData } = useSubscription(MESSAGE_BOX_SUBSCRIPTION)
    const [files, setFiles] = useState<File[]>([])
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
    const [uploading, setUploading] = useState(false)
    const {user} = useUserContext()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (subscriptionData) {
            const newMessage = subscriptionData.MessageBoxSubscription.message;

            if (newMessage.author != user?.email) {
                roomSetter((prevRoom: any) => ({
                    ...prevRoom,
                    messages: [...(prevRoom?.messages || []), newMessage]
                }));
            }
        }
    }, [subscriptionData]);
    const [sendInvitation] = useMutation(INVITATION_MAIL_MUTATION, {
        context: {
            requiresAuth: true
        }
    })
    const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION, {
        context: {
            requiresAuth: true
        },
    })

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setFiles([...files, ...newFiles])
        }
    }

    async function handleFileUpload(file: File) {
        setUploading(true)
        try {
            const url = await handleUpload(file)
            setUploadedFiles([...uploadedFiles, url])
        } catch (err) {
            console.log(err)
        }
        setUploading(false)
    }

    function getReceiver(arr: any, doctorId: string) {
        for(let i =0; i < arr.length; i++) {
            if (arr != doctorId) {
                return arr[i]
            }
        }
    }


    async function handleSendInvitation() {
        let receiver = getReceiver(room.participants, doctorid)       
        console.log(receiver)
        console.log(uploadedFiles)
        try {

            const response = await sendInvitation({
                variables: {
                    receiver: receiver,
                    content: "Invitation letter mail", 
                    documents: uploadedFiles
                },
                context: {
                    requiresAuth: true
                }
            })

            console.log(response.data)
            const { data } = await sendMessage({
                variables: { roomId: room.id, content: "(system generated) You sent an invitation to the user" }
            })
            roomSetter(data.sendMessage)
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="ml-2 bg-green-500 hover:bg-green-600 text-white">
                    Send Invitation
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Send Hospital Invitation</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="file-upload">Attachments:</Label>
                        <Input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            multiple
                            className="cursor-pointer"
                            disabled={uploading}
                        />
                        {files.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm font-medium">Selected files:</p>
                                <ul className="list-disc list-inside">
                                    {files.map((file, index) => (
                                        <li key={index} className="text-sm flex justify-between">
                                            {file.name}{" "}
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={() => handleFileUpload(file)}
                                                disabled={uploading}
                                                className="ml-2"
                                            >
                                                {uploading ? <Loader2 className="animate-spin" /> : "Upload"}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {uploading && <p className="text-sm text-gray-500">Uploading file...</p>}
                        {uploadedFiles.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm font-medium">Uploaded files:</p>
                                <ul className="list-disc list-inside">
                                    {uploadedFiles.map((fileUrl, index) => (
                                        <li key={index} className="text-sm text-green-600">
                                            {fileUrl.split("/").pop()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <Button onClick={handleSendInvitation} className="w-full" disabled={uploading}>
                        Send Invitation
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}





export default function Room({ params }: { params: { roomid: string } }) {
    const { data: subscriptionData } = useSubscription(MESSAGE_BOX_SUBSCRIPTION)
    const [room, setRoom] = useState<any>(null)
    const [roomid, setRoomid] = useState("")
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const client = useApolloClient()
    const { user } = useUserContext()
    const [sendInvitation] = useMutation(INVITATION_MAIL_MUTATION, {
        context: {
            requiresAuth: true
        }
    })
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
                        className={`p-3 rounded-lg max-w-xs ${msg.author === user?.email
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
                <InvitationDialog  room={room} roomSetter={(room) => setRoom(room)} doctorid={user?.id!} />
            </div>
        </div>
    )
}