"use client"
import { Hospital } from "@/services/types/hospital";
import { UploadOnS3 } from "@/services/upload/s3";
import { useState } from "react";
interface BasicMediaUploadComponentProps {
  registrationStepSetter: (step: number) => void;
  hospitalSetter: (something: (prevState: Hospital) => Hospital) => void;
}

export function BasicMediaUploadComponent({ registrationStepSetter, hospitalSetter }: BasicMediaUploadComponentProps) {

  const [frontImageUrl , setFrontImageUrl] = useState("")
  const [receptionImageUrl, setReceptionImageUrl] = useState("")
  const [operationImageUrl, setOperationImageUrl] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)


  function frontImageSetter(url:string) {
		setFrontImageUrl(url)
	}

	function receptionImageSetter(url:string) {
		setReceptionImageUrl(url)
	}

	function operationImageSetter(url:string) {
		setOperationImageUrl(url)
	}

	function errorSetter(msg:string) {
		setError(msg)
	}


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		setError("")
    e.preventDefault()

  	try {
			
		 setLoading(true)
		 const [url1, url2, url3] = await Promise.all([UploadOnS3(e, frontImageSetter, errorSetter, "front_image"),
		 UploadOnS3(e, receptionImageSetter, errorSetter, "reception_image"),
		 UploadOnS3(e, operationImageSetter, errorSetter, "operation_image")])
			console.log(url1, url2, url3)

	setLoading(false)
    hospitalSetter(prevState => ({
      ...prevState,
      Media: {
        FrontUrl: url1!,
        ReceptionUrl: url2!,
        OperationUrl: url3!
      }
    }))

    registrationStepSetter(2)
			
		} catch (err) {
			setError("Something went wrong in uploading images")
			setLoading(false)
		}
   


  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Hospital Media Upload</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Upload Images</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="front_image" className="block text-sm font-medium text-gray-700 mb-1">Front Image</label>
              <input
                type="file"
                name="front_image"
                id="front_image"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="reception_image" className="block text-sm font-medium text-gray-700 mb-1">Reception Image</label>
              <input
                type="file"
                name="reception_image"
                id="reception_image"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="operation_image" className="block text-sm font-medium text-gray-700 mb-1">Operation Theatre Image</label>
              <input
                type="file"
                name="operation_image"
                id="operation_image"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        >
          Next
        </button>
      </form>
			<div>{error}</div>
			{loading && <div>Uploading files ...</div>}
    </div>
  )
}

