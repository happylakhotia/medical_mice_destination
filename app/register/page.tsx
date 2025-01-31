"use client"
import {useMutation } from "@apollo/client"
import CREATE_PATIENT_MUTATION from "@/services/apollo/mutations/createPatient"
import Loading from "@/components/Loading/Loading"
import { useRouter } from "next/navigation"





export default function Register() {
    const [createPatient , {data, error, loading}] = useMutation(CREATE_PATIENT_MUTATION)
    const router = useRouter()


    async function RegisterUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const form = e.currentTarget as HTMLFormElement
        const formData = new FormData(form)
        const userData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            profilePic : "http://www.google.com" as string, 
        }
        console.log(userData)

        try {
            const response = await createPatient({variables: userData})
            router.push("/login")

        }
        catch (err) {
            console.log(err)
        }


    }

    if (loading) {
        return <Loading></Loading>
    }

    if (error) {
        return <div>{error.message}</div>
    }


    return (
        <form method="POST" onSubmit={RegisterUser}>
            <input type="text" name="name" id="name" placeholder="Enter Your Name" />
            <input type="email" name="email" id="email" placeholder="Enter Your Email" />
            <input type="password" name="password" id="password" placeholder="Enter Your Password" />
            <button type="submit">Submit</button>
        </form>
    )
}