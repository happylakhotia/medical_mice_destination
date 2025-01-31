"use client"

import { useEffect, useState } from "react"

export default function Mail({params}: {params: {mailid: string}}) {
    const [mailid,setMailid] = useState("")

    useEffect(() => {
        async function getMail() {
            const mail_id = (await params).mailid
            setMailid(mail_id)
            
        }
    }, [])
}