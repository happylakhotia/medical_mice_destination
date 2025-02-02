"use client"

import { useEffect, useState } from "react"
import { useApolloClient,  useSubscription } from "@apollo/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import GET_MAILBOX_QUERY from "@/services/apollo/queries/getMailBox"
import { Mail, useMailBox } from "@/services/contexts/mailBoxContext"
import MAILBOX_SUBSCRIPTION from "@/services/apollo/subscriptions/mailBoxSubscription"
import {  MailIcon } from "lucide-react"
import Link from "next/link"

function formatDate(dateString: string): string {
    let dates = dateString.split(" ")
    return dates[0]
}

export default function MailBox({params}: {params: {patientid: string}}) {
    const client = useApolloClient()
    const { data: subscriptionData } = useSubscription(MAILBOX_SUBSCRIPTION)
    const { mailBox, uploadMailBox, addMailToSent, addMailToReceived } = useMailBox()
    const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox")
    const [newInboxCount, setNewInboxCount] = useState(0)
    const [newSentCount, setNewSentCount] = useState(0)
    const [highlightedMails, setHighlightedMails] = useState<Set<string>>(new Set())
    const [patientid, setPatientid] = useState("")

    useEffect(() => {
        async function getMailBox() {

            const patient_id = (await params).patientid
            setPatientid(patient_id)

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
            </div>

            <Tabs defaultValue="inbox" className="w-full" onValueChange={(val) => {
                setActiveTab(val as "inbox" | "sent")
                if (val === "inbox") setNewInboxCount(0)
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
                </TabsList>
                <TabsContent value="inbox">
                    <MailList 
                        doctorId={patientid}
                        mails={mailBox.receivedEmails} 
                        type="Received" 
                        highlightedMails={highlightedMails}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}

function MailList({ mails, type, highlightedMails, doctorId }: {
    mails: Mail[];
    type: "Received" | "Sent";
    highlightedMails: Set<string>;
    doctorId: string;
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
              <Link href={`/dashboard/patient/${doctorId}/mailbox/${mail.id}`} key={mail.id}>
                <div
                  key={mail.id}
                  className={`border-b pb-4 mb-4 transition-all duration-300 ${highlightedMails.has(mail.id)
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
                      {/* Visual indicator for mail type */}
                      {mail.type && (
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full 
                                                ${mail.type === "APPLICATION" ? 'bg-red-500 text-white' :
                            mail.type === "NORMAL" ? 'bg-yellow-500 text-white' :
                              mail.type === "INVITATION" ? 'bg-green-500 text-white' :
                                'bg-gray-300 text-gray-800'}`}>
                          {mail.type}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatDate(mail.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }

