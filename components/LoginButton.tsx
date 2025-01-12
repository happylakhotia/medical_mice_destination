import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LoginButton({ title = 'Log In', link = '/' }) {
  return (
    <Link href={link}>
      <Button className="rounded-full px-6 py-4 text-lg text-white">
        {title}
      </Button>
    </Link>
  )
}
