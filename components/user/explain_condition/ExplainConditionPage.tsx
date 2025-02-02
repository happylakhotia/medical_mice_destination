"use client"
import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useRecommendationProvider } from '@/services/contexts/recommendations'
import { useRouter } from 'next/navigation'

// Combined steps and descriptions into a single array
const steps = [
  {
    title: 'Get Hospitals suited to your condition',
    description:
      'Find hospitals that specialize in treating your condition, based on your location and budget.',
  },
  {
    title: 'Choose your desired hospital',
    description:
      'Pick the hospital that best suits your needs and preferences.',
  },
  {
    title: 'Book an appointment',
    description: 'Easily schedule your appointment at the chosen hospital.',
  },
  {
    title: 'Chat with our doctors and set a physical appointment date',
    description:
      'Discuss your condition with our doctors and finalize the appointment date.',
  },
  {
    title: 'Get an approval letter and e-medical visa',
    description:
      'Receive the necessary approval letter and apply for your e-medical visa seamlessly.',
  },
  {
    title: 'Book your itinerary: flights and hotels',
    description:
      'Plan and book your travel itinerary, including flights and hotel accommodations.',
  },
]

const HowItWorks = () => {
  return (
    <div className="flex-1 flex-grow rounded-2xl bg-white p-10 shadow-lg">
      <h2 className="mb-6 text-4xl font-bold">How It Works</h2>
      <p className="mb-8 text-xl text-gray-600">
        Take these steps to begin your journey
      </p>
      <div className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white">
              {index + 1}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700">
                {step.title}
              </h3>
              <p className="text-lg text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Explain = () => {
  const { uploadRecommendations } = useRecommendationProvider()
  const router = useRouter()


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const data = {
      user_prompt: formData.get("userCondition")
    }
    console.log(data)
    try {
      const response = await fetch(`https://voyagehack-recommend-1.onrender.com/api/v1/recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        console.log(response)
        throw new Error(`can't get the response`)
      }
      const textResponse = await response.text()
      const cleanedResponse = textResponse.replace(/NaN/g, "null")
      const responseData = JSON.parse(cleanedResponse)
      console.log(responseData)
      uploadRecommendations(responseData)
      router.push("/hospitals")

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex-1 flex-grow rounded-2xl bg-white p-10 shadow-lg">
      <h2 className="mb-6 text-4xl font-bold">
        Explain your medical condition
      </h2>
      <p className="mb-8 text-xl text-gray-600">
        We will determine the best suited hospitals for you based on your
        medical conditon
      </p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label
            className="mb-2 block text-lg font-medium text-gray-700"
            htmlFor="condition"
          >
            Explain Your Condition
          </Label>
          <Textarea
            id="condition"
            name="userCondition"
            rows={8}
            className="w-full rounded-lg p-4 text-lg"
            placeholder="Describe your condition"
          />
        </div>
        <div className="flex gap-6">
          <Button
            variant="default"
            className="flex-1 rounded-lg bg-blue-500 py-4 text-base font-semibold text-white hover:bg-blue-600"
          >
            Start Your Journey Now
          </Button>
          <Button
            variant="default"
            className="flex-1 rounded-lg bg-gray-500 py-4 text-base font-semibold text-white hover:bg-gray-600"
          >
            Book Itinerary Only
          </Button>
        </div>
      </form>
    </div>
  )
}

const ExplainConditionPage = () => {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-neutral-100">
      <div className="container flex h-full w-full flex-col gap-8 p-8 md:flex-row">
        <HowItWorks />
        <Explain />
      </div>
    </main>
  )
}

export default ExplainConditionPage
