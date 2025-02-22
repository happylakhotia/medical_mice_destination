"use client"

import SidebarWrapper from "@/components/hospital/hospital_dashboard/SidebarWrapper"
import ME_QUERY from "@/services/apollo/queries/getUser"
import { MailBoxProvider } from "@/services/contexts/mailBoxContext"
import { useUserContext } from "@/services/contexts/userContext"
import { useApolloClient } from "@apollo/client"
import { useEffect, useState } from "react"

export default function DoctorLayout({ children, params }: { children: React.ReactNode, params: { patientid: string } }) {
    const [patientid, setDoctorid] = useState("")
    const client = useApolloClient()
    const {uploadUser} = useUserContext()

    useEffect(() => {
        async function getParams() {
            const patient_id = (await params).patientid
            setDoctorid(patient_id)
            try {
                const { data } = await client.query({
                    query: ME_QUERY,
                    context: {
                        requiresAuth: true
                    }
                })
                console.log(data)
                uploadUser(data.me)
            } catch (err) {
                console.log(err)
            }
        }
        getParams()
    }, [])

    return (
        <SidebarWrapper
            dashboardType="patient"
            userId={patientid}
        >
            <MailBoxProvider>
                {children}
            </MailBoxProvider>
        </SidebarWrapper>
    )


}