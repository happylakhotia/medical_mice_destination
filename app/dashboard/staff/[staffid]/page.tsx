"use client"

import { useEffect, useState } from "react"

export default function StaffDashboard({params}: {params: {staffid: string}}) {
    const [staffId, setstaffid] = useState("")

    useEffect(() => {
        async function getParams() {
            const staff_id = (await params).staffid
            setstaffid(staff_id)
        }

        getParams()
    }, [])


    return (
        <>
            <h1>{staffId}</h1>
        </>
    )

}