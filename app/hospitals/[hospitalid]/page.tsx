"use client"
import UniqueHospitalPage from "@/components/user/unique_hospital/UniqueHospitalPage";
import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

export default function HospitalPage({params}: {params: {hospitalid: string}}) {
    const [hospitalId, setHospitalId] = useState("")    
    const client = useApolloClient()

    useEffect(() => {
        async function getParams() {
            const hospital_id = (await params).hospitalid
            setHospitalId(hospital_id)
        }
        getParams()
    }, [])


    if (hospitalId == "") {return <div>Loading ...</div>}

   return (
    <UniqueHospitalPage hospitalid={hospitalId}></UniqueHospitalPage> 
   ) 


    
}