import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from './ui/button'
import { Cardo } from 'next/font/google'
import Link from 'next/link'

function LandingText() {
  return (
    <div className="flex w-1/2 flex-col gap-6">
      <CardTitle className="text-7xl">
        This is the Tagline for this website
      </CardTitle>
      <CardDescription className="text-xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat iure
        magni laudantium nisi impedit hic iste aliquid debitis ducimus,
        dignissimos omnis! Similique saepe minus rerum magnam architecto
        doloribus, quos ad.
      </CardDescription>
      <div className="flex gap-4">
        <Button className="rounded-full px-12 py-6 text-base shadow-md">
          Task 1
        </Button>
        <Button
          variant="outline"
          className="rounded-full px-12 py-6 text-base shadow-md"
        >
          Task 2
        </Button>
      </div>
    </div>
  )
}

const serviceOption = [
  {
    title: 'Medical Tourism',
    link: '/',
    description:
      'Hubba dubba dubba da, healthcare ya hooo! Hubba dubba dubba da, healthcare ya hooo!',
  },
  {
    title: 'Destination Wedding',
    link: '/',
    description:
      'Hubba dubba dubba da, healthcare ya hooo! Hubba dubba dubba da, healthcare ya hooo!',
  },
  {
    title: 'MICE',
    link: '/',
    description:
      'Hubba dubba dubba da, healthcare ya hooo! Hubba dubba dubba da, healthcare ya hooo!',
  },
]

function Options() {
  return (
    <div className="flex flex-1 flex-wrap items-center justify-center gap-8">
      {serviceOption.map((service) => {
        return (
          <Card
            className="delay-400 flex h-40 w-5/12 flex-col justify-center shadow-lg ease-in-out hover:-translate-y-1 hover:translate-x-1 hover:transition-transform"
            key={service.title}
          >
            <Link
              href={service.link}
              className="flex flex-grow flex-col justify-center p-8"
            >
              <CardTitle className="text-2xl">{service.title}</CardTitle>
              <CardDescription className="">
                {service.description}
              </CardDescription>
            </Link>
          </Card>
        )
      })}
    </div>
  )
}

export default function LandingPageContent() {
  return (
    <div className="flex flex-grow items-center gap-12 bg-slate-200 p-16">
      <LandingText />
      <Options />
    </div>
  )
}
