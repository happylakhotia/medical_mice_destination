'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import BasicInfo from './BasicInfo'
import MediaUpload from './MediaUpload'
import FacilityDetails from './FacilityDetails'
import LegalDocuments from './LegalDocuments'
import Verification from './Verification'
import { useHospital } from '@/services/contexts/hopitalContext'

const steps = [
  { id: 0, title: 'Basic Info', description: 'Interesting description' },
  { id: 1, title: 'Media Upload', description: 'Interesting description' },
  { id: 2, title: 'Facility Details', description: 'Interesting description' },
  { id: 3, title: 'Legal Documents', description: 'Interesting description' },
  { id: 4, title: 'Verification', description: 'Interesting description' },
]

function StepButton({ title, description, handleClick, stepNumber }: {title: string, description: string, handleClick: () => void, stepNumber :number}) {
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

function HospitalSignUpPage({rootid}: {rootid: string}) {
  const [selectedStep, setSelectedStep] = useState(0)
  const {hospital, uploadHospital} = useHospital()
  const [uploading, setUploading] = useState(false)

  console.log(rootid)
  const renderForm = () => {
    switch (selectedStep) {
      case 0:
        return <BasicInfo  handleStep={() => setSelectedStep(1)} rootId={rootid}/>
      case 1:
        return <MediaUpload handleStep={() => setSelectedStep(2)}/>
      case 2:
        return <FacilityDetails handleStep={() => setSelectedStep(3)}></FacilityDetails>
      case 3:
        return <LegalDocuments handleStep={() => setSelectedStep(4)}></LegalDocuments>
      case 4:
        return <Verification handleStep={() => setSelectedStep(5)}></Verification>
      case 5:
        return <h1>You Have reached the application end click submit</h1>
      default:
        return <div>Select a step to continue</div>
    }
  }

  function PrintHospital() {
    console.log(hospital)
  }

  async function handleUpload() {
    console.log("clicked")
    
    setUploading(true)
    try {
    await uploadHospital()
    } catch (err) {
      console.log(err)
    }
    setUploading(false)
    alert("hospital registered")
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
        <Button onClick={PrintHospital} className="w-full py-3 text-lg">Print Hospital</Button>
        <Button onClick={handleUpload} className="w-full py-3 text-lg">{uploading ? "Uploading ..." : "Submit"}</Button>
      </aside>

      <section className="flex-1 rounded-md border bg-white p-8 shadow-lg">
        {renderForm()}
      </section>
    </main>
  )
}

export default HospitalSignUpPage
