"use client"
import BookAppointmentPage from "@/components/user/book_appointment/BookAppointmentPage";
import { HospitalData } from "@/components/user/unique_hospital/UniqueHospitalPage";
import GET_HOSPITAL_BY_ID from "@/services/apollo/queries/getHospitalById";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

export default function Apply({params}: {params:{hospitalid: string}}) {

    const [hospital, setHospital] = useState<HospitalData | undefined>(undefined)
    const [hospitalId, setHospitalId] = useState("")

    useEffect(() => {
        async function getParams() {
            const hospital_id = (await params).hospitalid
            setHospitalId(hospital_id)
        }
        getParams()
    }, [])


    return <BookAppointmentPage Hospital_Id={hospitalId}></BookAppointmentPage>
}