"use client"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Script from 'next/script'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import ORDERID_QUERY from '@/services/apollo/queries/getOrderId'
import SEND_APPLICATION_MUTATION from '@/services/apollo/mutations/sendApplication'
import { useState } from 'react'
import { Loader2, Upload } from 'lucide-react'
import S3_URL_QUERY from '@/services/apollo/queries/getS3Url'

declare global {
  interface Window {
    Razorpay: any;
  }
}

const BookAppointmentPage = ({ Hospital_Id }: { Hospital_Id: string }) => {
  const [createApplication] = useMutation(SEND_APPLICATION_MUTATION)
  const client = useApolloClient()
  const { data, error } = useQuery(ORDERID_QUERY, {
    context: {
      requiresAuth: true
    }
  })
  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState<string>("")
  const [documents, setDocuments] = useState<File[]>([])
  const [passport, setPassport] = useState<File | null>(null)
  const [uploadedDocUrls, setUploadedDocUrls] = useState<string[]>([])
  const [uploadedPassportUrl, setUploadedPassportUrl] = useState<string>("")

  const handleFileUpload = async (file: File, type: 'document' | 'passport') => {
    // This is a placeholder for your actual file upload logic
    // You would typically:
    // 1. Get a presigned URL from your backend
    try {
      const { data } = await client.query({
        query: S3_URL_QUERY,
        context: {
          requiresAuth: true
        }
      })

      const uploadUri = data.getS3Url
      // 2. Upload the file to S3 or your storage
      const response = await fetch(uploadUri, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type }
      })
      // 3. Return the public URL
      // For now, we'll simulate it:
      return uploadUri.split("?")[0]
    } catch (err) {
      console.log(err)
    }
  }

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  async function handlePayment(formData: FormData, orderId: string) {
    const res = await initializeRazorpay()

    if (!res) {
      console.log("couldn't initialize razorpay")
      return
    }

    // Upload documents first
    try {
      const documentUrls = await Promise.all(
        documents.map(doc => handleFileUpload(doc, 'document'))
      )
      setUploadedDocUrls(documentUrls)

      if (passport) {
        const passportUrl = await handleFileUpload(passport, 'passport')
        setUploadedPassportUrl(passportUrl)
      }
    } catch (err) {
      console.error("Error uploading files:", err)
      return
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: 100 * 100,
      currency: "INR",
      name: "Hospital Name",
      description: "Appointment Booking Payment",
      order_id: orderId,
      handler: async function (response: any) {
        try {
          const userData = {
            hospitalId: Hospital_Id,
            content: formData.get("content"),
            patientName: formData.get("patientName"),
            patientAge: formData.get("patientAge") as string,
            patientGender: gender,
            phoneNumber: formData.get("phoneNumber"),
            passport: uploadedPassportUrl,
            allergies: formData.get("allergies") || "",
            documents: uploadedDocUrls,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          }

          const { data } = await createApplication({
            variables: userData,
            context: { requiresAuth: true }
          })
          console.log(data)
        } catch (err) {
          console.error(err)
        }
      },
      prefill: {
        name: formData.get("patientName"),
        contact: formData.get("phoneNumber"),
      },
      theme: {
        color: '#3399cc',
      },
      modal: {
        ondismiss: function () {
          setLoading(false)
        }
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const form = e.currentTarget
      const formData = new FormData(form)

      // Basic form validation
      const requiredFields = ['patientName', 'patientAge', 'phoneNumber', 'content']
      for (const field of requiredFields) {
        if (!formData.get(field)) {
          console.error(`Missing required field: ${field}`)
          setLoading(false)
          return
        }
      }

      if (!gender) {
        console.error("Gender is required")
        setLoading(false)
        return
      }

      if (!passport) {
        console.error("Passport is required")
        setLoading(false)
        return
      }

      if (!data?.getOrderId) {
        throw new Error('Failed to get order ID')
      }

      await handlePayment(formData, data.getOrderId)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <section className="flex min-h-screen flex-col items-center py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="container flex flex-col lg:w-2/3">
            <h2 className="mb-8 text-3xl font-bold">Book Your Appointment</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="space-y-4 rounded-xl bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label className="mb-1 block text-sm font-medium">Name</Label>
                    <Input
                      type="text"
                      name="patientName"
                      required
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label className="mb-1 block text-sm font-medium">Age</Label>
                    <Input
                      type="number"
                      required
                      placeholder="Enter your age"
                      name="patientAge"
                      className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-sm font-medium">Gender</Label>
                    <Select value={gender} onValueChange={setGender} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact & Documents */}
              <div className="space-y-4 rounded-xl bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-semibold">Contact & Documents</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label className="mb-1 block text-sm font-medium">Phone Number</Label>
                    <Input
                      name="phoneNumber"
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-sm font-medium">Passport Copy</Label>
                    <Input
                      type="file"
                      required
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) setPassport(file)
                      }}
                      className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium">
                    Additional Documents (Optional)
                  </Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || [])
                      setDocuments(files)
                    }}
                    className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                  />
                  {documents.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Selected files:</p>
                      <ul className="list-disc list-inside">
                        {documents.map((doc, index) => (
                          <li key={index} className="text-sm">{doc.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Medical Details */}
              <div className="space-y-4 rounded-xl bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-semibold">Medical Details</h3>
                <div>
                  <Label className="mb-1 block text-sm font-medium">Medical Condition</Label>
                  <Textarea
                    name="content"
                    required
                    placeholder="Describe your medical condition"
                    className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium">Allergies</Label>
                  <Input
                    type="text"
                    name="allergies"
                    placeholder="Enter any known allergies"
                    className="w-full rounded-lg border focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Appointment'
                )}
              </button>
            </form>
          </div>

          {/* Booking Information section remains the same */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 rounded-xl bg-gray-50 p-6">
              <h3 className="mb-6 text-xl font-semibold">
                Booking Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Consultation Fee</span>
                  <span className="font-medium">Rs100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Booking Fee</span>
                  <span className="font-medium">Rs10</span>
                </div>
                <hr />
                <div className="flex items-center justify-between font-medium">
                  <span>Total Amount</span>
                  <span className="text-blue-600">Rs110</span>
                </div>
              </div>
              <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <h4 className="mb-2 font-medium text-blue-900">
                  Important Information
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>
                    • Cancellation is free up to 24 hours before the appointment
                  </li>
                  <li>• Upload valid doctor's prescription</li>
                </ul>
              </div>
              {/* ... existing booking information ... */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookAppointmentPage