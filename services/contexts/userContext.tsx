"use client"
import { createContext, useContext, useState } from "react"

export type User = {
    ID: string,
    Name: string,
    Email: string,
    Role: string,
    ProfilePic: string,
}

interface userContextInterface {
    user: User | undefined
    uploadUser: (user: User) => void
}

const UserContext = createContext<userContextInterface | undefined>(undefined)

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | undefined>(undefined)

    function uploadUser(newUser: User) {
        setUser(newUser)
    }

    return (
        <UserContext.Provider value={{ user, uploadUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider")
    }
    return context
}
