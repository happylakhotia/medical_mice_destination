"use client"
import { useMutation } from "@apollo/client"
import CREATE_PATIENT_MUTATION from "@/services/apollo/mutations/createPatient"
import Loading from "@/components/Loading/Loading"
import { useRouter } from "next/navigation"

export default function Register() {
  const [createPatient, { data, error, loading }] = useMutation(CREATE_PATIENT_MUTATION)
  const router = useRouter()

  async function RegisterUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const userData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      profilePic: "http://www.google.com", 
    }
    console.log(userData)

    try {
      await createPatient({ variables: userData })
      router.push("/login")
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div className="text-red-500 text-center my-4">{error.message}</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        method="POST" 
        onSubmit={RegisterUser}
        className="w-full max-w-md bg-white p-8 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder="Enter Your Name" 
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder="Enter Your Email" 
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="Enter Your Password" 
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
