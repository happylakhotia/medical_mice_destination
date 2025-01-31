"use client"

import SidebarWrapper from "@/components/hospital/hospital_dashboard/SidebarWrapper"
import { MailBoxProvider } from "@/services/contexts/mailBoxContext"
import { useEffect, useState } from "react"

export default function DoctorLayout({ children, params }: { children: React.ReactNode, params: { doctorid: string } }) {
    const [doctorId, setDoctorid] = useState("")

    useEffect(() => {
        async function getParams() {
            const doctor_id = (await params).doctorid
            setDoctorid(doctor_id)
        }
        getParams()
    }, [])

    return (
        <SidebarWrapper
            dashboardType="doctor"
            userId={doctorId}
        >
            <MailBoxProvider>
                {children}
            </MailBoxProvider>
        </SidebarWrapper>
    )


}