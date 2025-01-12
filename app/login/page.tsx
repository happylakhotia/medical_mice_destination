import NavBar from "@/components/NavBar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function LogInForm() {
  return (
    <div className="bg-slate-200 flex h-screen flex-1 justify-center items-center">
      <Card className="flex flex-col h-5/6 w-3/12">
        <form action="" className="flex h-full w-full flex-col gap-4 py-8">
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="text-5xl">Log in</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="text-base">Username</Label>
              <Input id="username" placeholder="Sarthak_77" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-base">Password</Label>
              <Input id="password" placeholder="" type="password" />
              <div className="flex items-center gap-2">
                <Checkbox id="showPassword" />
                <Label htmlFor="showPassword">Show Password</Label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="accountType" className="text-base">Account Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Account Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="hospitalAdmin">Hospital Admin</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="venueAdmin">Venue Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full text-base">Sign in</Button>
            <Button variant='outline' className="w-full text-base border-slate-400">Continue with Google</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default function LogIn() {
  return (
    <main className="flex min-h-screen flex-col justify-start">
      <NavBar />
      <LogInForm />
    </main>
  )
}

{/* <Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card> */}