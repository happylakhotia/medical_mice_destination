"use client"

import GET_MAIL_QUERY from "@/services/apollo/queries/getMail"
import { useApolloClient } from "@apollo/client"
import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function MailBox({ params }: { params: { mailid: string } }) {
    const [mailid, setMailid] = useState("")
    const [mail, setMail] = useState<any>()
    const client = useApolloClient()

    useEffect(() => {
        async function getParams() {
            const mail_id = (await params).mailid
            setMailid(mail_id)
            try {
                const { data } = await client.query({
                    query: GET_MAIL_QUERY,
                    variables: { id: mail_id },
                    context: {
                        requiresAuth: true
                    }
                })
                setMail(data.getMailById)
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }
        getParams()
    }, [])

    if (!mail) {
        return <div className="flex justify-center items-center min-h-screen">
            <p className="text-gray-500">Loading mail...</p>
        </div>
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const downloadDocument = (url: string) => {
        window.open(url, '_blank')
    }

    const renderDocuments = () => {
        if (!mail.documents || mail.documents.length === 0) return null

        return (
            <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Attachments:</h3>
                <div className="space-y-2">
                    {mail.documents.map((doc: string, index: number) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                            <span className="text-sm text-gray-600 truncate">
                                {doc.split('/').pop()}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => downloadDocument(doc)}
                            >
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (mail.type === "NORMAL") {
        return (
            <div className="max-w-2xl mx-auto p-4">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm text-gray-600">From: <span className="font-medium">{mail.sender}</span></p>
                                <p className="text-sm text-gray-600">To: <span className="font-medium">{mail.receiver}</span></p>
                            </div>
                            <p className="text-sm text-gray-500">{formatDate(mail.createdAt)}</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none">
                            <p className="text-gray-800">{mail.content}</p>
                        </div>
                        {renderDocuments()}
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (mail.type === "INVITATION") {
        return (
            <div className="max-w-2xl mx-auto p-4">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-blue-800 mb-2">
                            Letter Head
                        </CardTitle>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-600">From: <span className="font-medium">{mail.sender}</span></p>
                            <p className="text-sm text-gray-600">To: <span className="font-medium">{mail.receiver}</span></p>
                            <p className="text-sm text-gray-500">{formatDate(mail.createdAt)}</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-4 text-center">
                            <p className="text-lg text-gray-800 mb-6">{mail.content}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            {renderDocuments()}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return null
}