
"use client"

import BookAppointmentPage from "@/components/user/book_appointment/BookAppointmentPage"
import { useEffect, useState } from "react"



export default function Test({params}: {params: {hospitalid: string}}) {
    const [hospitalId, setHospitalId] = useState("")

    useEffect(() => {
        async function getParams() {
            try {
                const hospital_id = (await params).hospitalid
                setHospitalId(hospital_id)
                
            } catch(err) {
                console.log(err)
            }
        }
        getParams()
    })




    return <BookAppointmentPage Hospital_Id={"das"}></BookAppointmentPage>
}
