"use client"
import SidebarWrapper from "@/components/hospital/hospital_dashboard/SidebarWrapper"
import Loading from "@/components/Loading/Loading"
import GET_HOSPITAL_QUERY from "@/services/apollo/queries/getHospital"
import ME_QUERY from "@/services/apollo/queries/getUser"
import { MailBoxProvider } from "@/services/contexts/mailBoxContext"
import { useUserContext } from "@/services/contexts/userContext"
import { useUserHospitalContext } from "@/services/contexts/userHospitalContext"
import { useApolloClient, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"

export default function DoctorLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { rootid: string }
}) {
    const [rootid, setRootid] = useState("")
    const [dashboardType, setDashboardType] = useState("")
    const { uploadUserHospital } = useUserHospitalContext()
    const {uploadUser} = useUserContext()
    const client = useApolloClient()
    const { data, error, loading } = useQuery(GET_HOSPITAL_QUERY, {
        context: {
            requiresAuth: true
        }
    })


    useEffect(() => {
        setDashboardType(data?.getHospital ? "root" : "nohospitalroot")
        uploadUserHospital(data?.getHospital)
    }, [data])

    useEffect(() => {
        async function getParams() {
            const root_id = (await params).rootid
            setRootid(root_id)
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
    }, [params])

    if (loading) {
        return <Loading />
    }


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
