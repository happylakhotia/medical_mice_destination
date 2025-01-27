import React from 'react'
import { ChevronDownIcon, DotFilledIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const steps = [
  {
    step: 'step1',
    title: 'Check Eligibility',
    description:
      "Confirm if you're eligible to apply for the eVisa based on your nationality and purpose of visit",
  },
  {
    step: 'step2',
    title: 'Gather Required Documents',
    description: (
      <ul className="space-y-1 text-sm">
        <li className="flex items-center">
          <DotFilledIcon className="mr-2 h-3 w-3" /> Valid passport (min. 6
          months validity)
        </li>
        <li className="flex items-center">
          <DotFilledIcon className="mr-2 h-3 w-3" /> Recent passport-sized photo
        </li>
        <li className="flex items-center">
          <DotFilledIcon className="mr-2 h-3 w-3" /> Travel itinerary details
        </li>
        <li className="flex items-center">
          <DotFilledIcon className="mr-2 h-3 w-3" /> Accommodation proof
        </li>
        <li className="flex items-center">
          <DotFilledIcon className="mr-2 h-3 w-3" /> Payment information
        </li>
      </ul>
    ),
  },
  {
    step: 'step3',
    title: 'Create an Account',
    description: 'Register on the official eVisa portal if required',
  },
  {
    step: 'step4',
    title: 'Complete Application Form',
    description:
      'Fill out the form with personal, passport, and travel details',
  },
  {
    step: 'step5',
    title: 'Upload Documents',
    description: 'Upload all required documents in the specified format',
  },
  {
    step: 'step6',
    title: 'Pay eVisa Fee',
    description: 'Make the payment for visa processing',
  },
  {
    step: 'step7',
    title: 'Submit Application',
    description: 'Review and submit your application',
  },
  {
    step: 'step8',
    title: 'Final Steps',
    description: (
      <ul className="space-y-1 text-sm">
        <li className="flex items-center">
          <DotFilledIcon className="mr-2 h-3 w-3" /> Wait for processing
          (processing time varies)
        </li>
        <li className="flex items-center">
          <DotFilledIcon className="mr-2 h-3 w-3" /> Receive eVisa approval
        </li>
        <li className="flex items-center">
          <DotFilledIcon className="mr-2 h-3 w-3" /> Print eVisa copy if
          required
        </li>
        <li className="flex items-center">
          <DotFilledIcon className="mr-2 h-3 w-3" /> Keep documents ready for
          travel
        </li>
      </ul>
    ),
  },
]

const EvisaChecklistPage = () => {
  return (
    <section id="evisaChecklist" className="min-h-screen bg-neutral-100 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 text-center">
          <h2 className="mb-2 text-4xl font-bold">
            eVisa Application Checklist
          </h2>
          <p className="text-lg text-gray-600">
            Follow these steps to ensure a smooth visa application process
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {steps.map(({ step, title, description }, index) => (
              <AccordionItem value={step} key={step}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex w-full items-center space-x-3">
                    <Checkbox id={step} />
                    <div className="flex flex-1 items-center justify-between">
                      <Label
                        htmlFor={step}
                        className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {index + 1}. {title}
                      </Label>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8 text-base text-gray-600">
                    {description}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-8 text-center">
          <Button className="h-12 w-48 bg-blue-600 text-base">
            Click to Apply
          </Button>
        </div>
      </div>
    </section>
  )
}

export default EvisaChecklistPage
