'use client'

import { Button } from '../ui/button'
import { useState } from 'react'
import BasicInfoComponent from '../BasicInfoComponent'

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
      className="h-18 flex items-center gap-4 rounded-md border-2 border-transparent px-8 py-2 text-start text-lg focus:border-emerald-400"
    >
      <div className="flex aspect-square h-5/6 items-center justify-center rounded-full bg-green-400">
        <div>{stepNumber}</div>
      </div>
      <div className="flex-1">
        <div className="font-bold">{title}</div>
        <div className="text-base text-neutral-600">{description}</div>
      </div>
    </button>
  )
}

// Components for each step
function BasicInfo() {
  return <div>Basic Info Component</div>
}

function MediaUpload() {
  return <div>Media Upload Component</div>
}

function FacilityDetails() {
  return <div>Facility Details Component</div>
}

function LegalDocuments() {
  return <div>Legal Documents Component</div>
}

function Verification() {
  return <div>Verification Component</div>
}

// Main Component
export default function HospitalSignUpPage() {
  const [selectedStep, setSelectedStep] = useState(0)

  const renderForm = () => {
    switch (selectedStep) {
      case 0:
        return <BasicInfoComponent />
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
    <main className="flex min-h-screen">
      <div className="sticky top-0 flex h-screen w-1/3 flex-col items-center justify-center bg-white p-4">
        <section className="flex flex-1 flex-col items-center justify-center gap-8 rounded-md bg-zinc-100 px-20">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="text-4xl font-bold">
              Welcome to Hospital Registration Portal
            </div>
            <div className="text-lg text-neutral-700">
              Complete the steps below to register your hospital
            </div>
          </div>
          <div className="flex flex-col gap-4 self-stretch">
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
          <Button className="h-10 w-2/6 text-base">Submit</Button>
        </section>
      </div>

      <section className="m-4 flex-1 rounded-md border-2 border-red-200 bg-white">
        {renderForm()}
      </section>
    </main>
  )
}
