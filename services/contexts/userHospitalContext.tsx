"use client"
import { createContext, useContext, useState } from "react"

type userHospital = {
    id: string,
    participants: {
        roots: string[],
        staff: string[],
        doctors: string[],
    }
}

interface UserHospitalContextInterface {
    userHospital: userHospital | undefined
    uploadUserHospital: (userHospital: userHospital) => void
}

const userHospitalContext = createContext<UserHospitalContextInterface| undefined>(undefined)

export function UserHospitalContextProvider({children}: {children: React.ReactNode}) {
    const [userHospital, setUserHospital] = useState<userHospital | undefined>(undefined)

    function uploadUserHospital(userHospital: userHospital) {
        setUserHospital(userHospital) 
    }

    return( <userHospitalContext.Provider value={{
        userHospital: userHospital,
        uploadUserHospital: uploadUserHospital
    }}>
        {children}
    </userHospitalContext.Provider>
    )

}

export function useUserHospitalContext() {
    const context = useContext(userHospitalContext)

    if (!context) {
        throw new Error("useContext should be called inside a provider")
    }

    return context
}