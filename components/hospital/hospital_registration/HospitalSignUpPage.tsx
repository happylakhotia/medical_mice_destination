'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import BasicInfo from './BasicInfo'
import MediaUpload from './MediaUpload'
import FacilityDetails from './FacilityDetails'
import LegalDocuments from './LegalDocuments'
import Verification from './Verification'

const steps = [
  { id: 0, title: 'Basic Info', description: 'Interesting description' },
  { id: 1, title: 'Media Upload', description: 'Interesting description' },
  { id: 2, title: 'Facility Details', description: 'Interesting description' },
  { id: 3, title: 'Legal Documents', description: 'Interesting description' },
  { id: 4, title: 'Verification', description: 'Interesting description' },
]

function StepButton({ title, description, handleClick, stepNumber }) {
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-4 rounded-md border-2 border-transparent px-8 py-3 text-start text-lg hover:bg-gray-100 focus:border-blue-600"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
        {stepNumber}
      </div>
      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        <div className="text-base text-neutral-600">{description}</div>
      </div>
    </button>
  )
}

// Components for each step
// function BasicInfo() {
//   return <div>Basic Info Component</div>
// }

// function MediaUpload() {
//   return <div>Media Upload Component</div>
// }

// function FacilityDetails() {
//   return <div>Facility Details Component</div>
// }

// function LegalDocuments() {
//   return <div>Legal Documents Component</div>
// }

// function Verification() {
//   return <div>Verification Component</div>
// }

// Main Component
function HospitalSignUpPage() {
  const [selectedStep, setSelectedStep] = useState(0)

  const renderForm = () => {
    switch (selectedStep) {
      case 0:
        return <BasicInfo />
      case 1:
        return <MediaUpload />
      case 2:
        return <FacilityDetails />
      case 3:
        return <LegalDocuments />
      case 4:
        return <Verification />
      default:
        return <div>Select a step to continue</div>
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] gap-8 p-6">
      {/* Sidebar */}
      <aside className="flex w-1/4 flex-col items-center gap-8 rounded-md bg-zinc-100 p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold">
            Welcome to Hospital Registration
          </h1>
          <p className="mt-2 text-lg text-neutral-700">
            Complete the steps below to register your hospital.
          </p>
        </div>
        <div className="flex w-full flex-col gap-4">
          {steps.map((step) => (
            <StepButton
              title={step.title}
              description={step.description}
              key={step.id}
              handleClick={() => setSelectedStep(step.id)}
              stepNumber={step.id + 1}
            />
          ))}
        </div>
        <Button className="w-full py-3 text-lg">Submit</Button>
      </aside>

      {/* Form Content */}
      <section className="flex-1 rounded-md border bg-white p-8 shadow-lg">
        {renderForm()}
      </section>
    </main>
  )
}

export default HospitalSignUpPage
