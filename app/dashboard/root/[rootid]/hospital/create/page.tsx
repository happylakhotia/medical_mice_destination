"use client"
import HospitalSignUpPage from "@/components/hospital/hospital_registration/HospitalSignUpPage";
import { useEffect, useState } from "react";


export default function HospitalSignUpRoute({params}: {params: {rootid: string}}) {
    const [rootid, setRootid] = useState("")
    useEffect(() => {
        async function getParams() {
            const root_id = (await params).rootid
            setRootid(root_id)
        }
        getParams()
    }, [])

    return <HospitalSignUpPage rootid={rootid}></HospitalSignUpPage>
}