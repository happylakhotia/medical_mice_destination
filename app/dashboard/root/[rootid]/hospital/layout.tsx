"use client"
import { HospitalProvider } from "@/services/contexts/hopitalContext"

export default function DoctorLayout({ children }: { children: React.ReactNode} ) {

    return (
        <HospitalProvider>
        {children} 
        </HospitalProvider>
    )


}