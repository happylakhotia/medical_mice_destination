"use client"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { User, useUserContext } from '@/services/contexts/userContext'
import { useMutation } from '@apollo/client'
import LOGIN_MUTATION from '@/services/apollo/mutations/login'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading/Loading'

function LogInForm() {
  const [LoginUser, {data, error, loading}] = useMutation(LOGIN_MUTATION)
  const router = useRouter()
  const {uploadUser} = useUserContext()

  async function Login(e:React.FormEvent<HTMLFormElement>) {
    console.log("called")
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    try {
      const response = await LoginUser({variables: userData})
      console.log("user logged in successfully", response)
      localStorage.setItem("token", response.data.login.token)

      const user : User = {
        ID: response.data.login.user.id,
        Name: response.data.login.user.name,
        ProfilePic: response.data.login.user.profilePic, 
        Email: response.data.login.user.email,
        Role: response.data.login.user.role,
      }      
      uploadUser(user)



      // handle redirection based on roles

      if (user.Role == "DOCTOR") {
        router.push(`/dashboard/doctor/${user.ID}`)
      } else if (user.Role == "PATIENT") {
        router.push("/explain")
      } else if (user.Role == "ROOT") {
        router.push(`/dashboard/root/${user.ID}`)
      } else if (user.Role == "STAFF") {
        router.push(`/dashboard/staff/${user.ID}`)
      }


    } catch (err) {
      console.log(err)
    }


  }

  if (error) {
    <div>{error.message}</div>
  }

  if (loading) {
    return <Loading></Loading>
  }


  return (
    <div className="flex h-screen flex-1 items-center justify-center bg-slate-200">
      <Card className="flex h-5/6 w-3/12 flex-col">
        <form action="" onSubmit={Login} className="flex h-full w-full flex-col gap-4 py-8">
          <CardHeader className="flex items-center justify-center">
            <CardTitle className="text-5xl">Log in</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input id="email" name="email" placeholder="joemama@gmail.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-base">
                Password
              </Label>
              <Input id="password" name="password" placeholder="" type="password" />
              <div className="flex items-center gap-2">
                <Checkbox id="showPassword"/>
                <Label htmlFor="showPassword">Show Password</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full text-base">Sign in</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col justify-start">
      <LogInForm />
    </main>
  )
}
