"use client"

import { useEffect, useState } from "react"
import { useApolloClient, useMutation, useSubscription } from "@apollo/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow, parseISO } from "date-fns"
import GET_MAILBOX_QUERY from "@/services/apollo/queries/getMailBox"
import { Mail, useMailBox } from "@/services/contexts/mailBoxContext"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import MAILBOX_SUBSCRIPTION from "@/services/apollo/subscriptions/mailBoxSubscription"
import S3_URL_QUERY from "@/services/apollo/queries/getS3Url"
import SEND_NORMAL_MAIL_MUTATION from "@/services/apollo/mutations/sendMail"
import { Loader2, MailIcon } from "lucide-react"

function formatDate(dateString: string): string {
    let dates = dateString.split(" ")
    return dates[0]
}

export default function MailBox() {
    const client = useApolloClient()
    const { data: subscriptionData } = useSubscription(MAILBOX_SUBSCRIPTION)
    const { mailBox, uploadMailBox, addMailToSent, addMailToReceived } = useMailBox()
    const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox")
    const [newInboxCount, setNewInboxCount] = useState(0)
    const [newSentCount, setNewSentCount] = useState(0)
    const [highlightedMails, setHighlightedMails] = useState<Set<string>>(new Set())

    useEffect(() => {
        async function getMailBox() {
            const { data, error } = await client.query({
                query: GET_MAILBOX_QUERY,
                context: {
                    requiresAuth: true,
                },
            })

            if (error) {
                console.error("Error fetching mailbox:", error)
            } else {
                uploadMailBox(data.getMailBox)
            }
        }

        getMailBox()
    }, [])

    useEffect(() => {
        if (subscriptionData) {
            const { MailBoxSubscription } = subscriptionData
            
            if (MailBoxSubscription.sent) {
                addMailToSent(MailBoxSubscription.sent)
                setNewSentCount(prev => prev + 1)
                setHighlightedMails(prev => new Set(prev).add(MailBoxSubscription.sent.id))
            }
            
            if (MailBoxSubscription.received) {
                addMailToReceived(MailBoxSubscription.received)
                setNewInboxCount(prev => prev + 1)
                setHighlightedMails(prev => new Set(prev).add(MailBoxSubscription.received.id))
            }
        }
    }, [subscriptionData])

    // Clear highlight after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setHighlightedMails(new Set())
        }, 5000)
        return () => clearTimeout(timer)
    }, [highlightedMails])

    if (!mailBox) {
        return <div className="text-center p-4">Loading...</div>
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Mailbox</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Compose</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Compose New Email</DialogTitle>
                        </DialogHeader>
                        <Write />
                    </DialogContent>
                </Dialog>
            </div>

            <Tabs defaultValue="inbox" className="w-full" onValueChange={(val) => {
                setActiveTab(val as "inbox" | "sent")
                if (val === "inbox") setNewInboxCount(0)
                if (val === "sent") setNewSentCount(0)
            }}>
                <TabsList>
                    <TabsTrigger value="inbox" className="relative">
                        Inbox 
                        {newInboxCount > 0 && (
                            <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                                {newInboxCount}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="sent" className="relative">
                        Sent 
                        {newSentCount > 0 && (
                            <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                                {newSentCount}
                            </span>
                        )}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="inbox">
                    <MailList 
                        mails={mailBox.receivedEmails} 
                        type="Received" 
                        highlightedMails={highlightedMails}
                    />
                </TabsContent>
                <TabsContent value="sent">
                    <MailList 
                        mails={mailBox.sentmails} 
                        type="Sent"
                        highlightedMails={highlightedMails}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}

function MailList({ mails, type, highlightedMails }: { 
    mails: Mail[]; 
    type: "Received" | "Sent";
    highlightedMails: Set<string>;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{type} Emails</CardTitle>
                <CardDescription>
                    You have {mails.length} {type.toLowerCase()} emails.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[600px]">
                    {mails.map((mail) => (
                        <div 
                            key={mail.id} 
                            className={`border-b pb-4 mb-4 transition-all duration-300 ${
                                highlightedMails.has(mail.id) 
                                    ? 'bg-blue-50 shadow-md rounded-lg p-4' 
                                    : ''
                            }`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-sm font-semibold">
                                        {type === "Received" ? `From: ${mail.sender}` : `To: ${mail.receiver}`}
                                    </h3>
                                    <p className="text-sm text-gray-600">{mail.content}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {highlightedMails.has(mail.id) && (
                                        <MailIcon className="w-4 h-4 text-blue-500 animate-bounce" />
                                    )}
                                    <span className="text-xs text-gray-500">
                                        {formatDate(mail.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}


export function Write() {
  const client = useApolloClient()
  const [recipient, setRecipient] = useState("")
  const [content, setContent] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [sendMail, { loading: sending }] = useMutation(SEND_NORMAL_MAIL_MUTATION)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])
    }
  }

  const uploadFile = async (file: File) => {
    setUploading(true)
    try {
      const { data } = await client.query({
        query: S3_URL_QUERY,
        context: { requiresAuth: true }
      })
      const uploadUrl = data.getS3Url

      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type }
      })

      console.log(data)
      if (response.ok) {
        setUploadedFiles([...uploadedFiles, uploadUrl.split("?")[0]]) // Store the S3 file URL
      } else {
        console.error("File upload failed")
      }
    } catch (err) {
      console.error("Error uploading file:", err)
    }
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendMail({
      variables: {
        receiver: recipient,
        content,
        documents: uploadedFiles
      },
      context: {
        requiresAuth: true
      }
    })
    setRecipient("")
    setContent("")
    setFiles([])
    setUploadedFiles([])
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="recipient">To:</Label>
        <Input
          id="recipient"
          type="email"
          placeholder="recipient@example.com"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="content">Message:</Label>
        <Textarea
          id="content"
          placeholder="Write your message here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="min-h-[200px]"
        />
      </div>
      <div>
        <Label htmlFor="file-upload">Attachments:</Label>
        <Input id="file-upload" type="file" onChange={handleFileChange} multiple className="cursor-pointer" disabled={uploading} />
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
                    onClick={() => uploadFile(file)}
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
      <Button type="submit" disabled={sending}>
        {sending ? <Loader2 className="animate-spin" /> : "Send Email"}
      </Button>
    </form>
  )
}
