"use client"
import SidebarWrapper from "@/components/hospital/hospital_dashboard/SidebarWrapper"
import Loading from "@/components/Loading/Loading"
import GET_HOSPITAL_QUERY from "@/services/apollo/queries/getHospital"
import { MailBoxProvider } from "@/services/contexts/mailBoxContext"
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"

export default function DoctorLayout({ 
    children, 
    params 
}: { 
    children: React.ReactNode, 
    params: { rootid: string } 
}) {
    const [rootid, setRootid] = useState("")
    const { data, error, loading } = useQuery(GET_HOSPITAL_QUERY)

    useEffect(() => {
        async function getParams() {
            const root_id = (await params).rootid
            setRootid(root_id)
        }
        getParams()
    }, [params])

    if (loading) {
        return <Loading />
    }

    const dashboardType = data?.getHospital ? "root" : "nohospitalroot"

    return (
        <SidebarWrapper
            dashboardType={dashboardType}
            userId={rootid}
        >
            <MailBoxProvider>
                {children}
            </MailBoxProvider>
        </SidebarWrapper>
    )
}
