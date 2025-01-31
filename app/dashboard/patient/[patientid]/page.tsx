"use client"

import { useEffect, useState } from "react"

export default function PatientDashboard({params}: {params: {patientid: string}}) {
    const [patientId, setpatientid] = useState("")

    useEffect(() => {
        async function getParams() {
            const patient_id = (await params).patientid
            setpatientid(patient_id)
        }

        getParams()
    }, [])


    return (
        <>
            <h1>{patientId}</h1>
        </>
    )

}