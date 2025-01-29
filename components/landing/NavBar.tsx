import { Button } from '../ui/button'
import Link from 'next/link'

const navigationOptions = [
  { title: 'Home', link: '/' },
  { title: 'Testimonials', link: '/' },
  { title: 'Services', link: '/' },
  { title: 'Gallery', link: '/' },
  { title: 'Contact', link: '/' },
]

// Profile Component
function Profile() {
  return <div>Profile</div>
}

// LogIn Button
function LogInSignUp() {
  return (
    <Link href="/register/">
      <Button className="px-4 py-2 text-base">Register Now</Button>
    </Link>
  )
}

// NavBar Component
export default function NavBar({ isLoggedIn = false }) {
  return (
    <nav className="shadow-md">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        {/* Logo Section */}
        <div className="flex-shrink-0 text-3xl font-bold text-blue-500">
          TBO
        </div>

        {/* Navigation Options */}
        <div className="flex flex-1 justify-center">
          <div className="hidden gap-6 md:flex">
            {navigationOptions.map((option) => (
              <Link href={option.link} key={option.title}>
                <Button variant="link" className="text-lg">
                  {option.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Profile or Log In */}
        <div className="flex flex-shrink-0 gap-4">
          {isLoggedIn ? <Profile /> : <LogInSignUp />}
        </div>

        {/* Mobile Navigation Menu (for smaller screens) */}
        <div className="ml-auto flex md:hidden">
          <Button variant="ghost" className="text-lg">
            ☰
          </Button>
        </div>
      </div>
    </nav>
  )
}
