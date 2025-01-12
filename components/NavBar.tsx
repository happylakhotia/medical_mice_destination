import LoginButton from './LoginButton'
import { Button } from './ui/button'
import Link from 'next/link'

const navigationOptions = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Testimonials',
    link: '/',
  },
  {
    title: 'Services',
    link: '/',
  },
  {
    title: 'Gallery',
    link: '/',
  },
  {
    title: 'Contact',
    link: '/',
  },
]

function Logo() {
  return (
    <div className="flex-1 justify-start text-4xl font-bold text-blue-500">
      TBO
    </div>
  )
}

// TODO: include drop downs
function Profile() {
  return (
    <div>Profile</div>
  )
}

function LogInSignUp() {
  return  (
    <>
    <Button className="h-full px-8 text-base">
      <Link href="/login/">Log In</Link>
    </Button>
    <Button className="h-full px-8 text-base">
      <Link href="/">Sign Up</Link>
    </Button>
  </>
  )
}

export default function NavBar({ isLoggedIn=false }) {
  return (
    <div className="flex h-20 items-center px-16 text-xl shadow-xl">
      <Logo />
      <div className="flex flex-1 justify-center">
        {navigationOptions.map((option) => {
          return (
            <Button variant="link" className="text-xl" key={option.title}>
              <Link href={option.link}>{option.title}</Link>
            </Button>
          )
        })}
      </div>
      <div className="flex flex-1 justify-end gap-4">
        {isLoggedIn ? (
          <Profile />
        ) : (
          <LogInSignUp />
        )}
      </div>
    </div>
  )
}
