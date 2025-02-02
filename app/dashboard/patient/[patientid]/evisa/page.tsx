"use client"
import EvisaProcess from "@/components/user/evisa/evisa_process/EvisaProcessPage";
import { useEffect, useState } from "react";

export default function Visa({params}: {params: {patientid: string}}) {

    const [patientId, setPatientid] = useState("") 

    useEffect(() => {
        async function getParams() {
            const patient_id = (await params).patientid
            setPatientid(patient_id)
        }
        getParams()
    } , [])

    if (patientId == "") return <div>Loading...</div>

    return <EvisaProcess patientid={patientId}/>
}
