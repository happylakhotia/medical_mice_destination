import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useApolloClient } from '@apollo/client'
import S3_URL_QUERY from '@/services/apollo/queries/getS3Url'
import { useState } from 'react'
import { useHospital } from '@/services/contexts/hopitalContext'
import { handleUpload } from '@/services/upload/s3'

type SelectedFilesType = {
  mainHospitalImage: File | null
  ReceptionImage: File | null
  WaitingAreaImage: File | null
  WardImage: File | null
  OperationTheatreImage: File | null
}

export default function MediaUpload({ handleStep }: { handleStep: () => void }) {
  const [uploading, setUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<SelectedFilesType>({
    mainHospitalImage: null,
    ReceptionImage: null,
    WaitingAreaImage: null,
    WardImage: null,
    OperationTheatreImage: null,
  })

  const client = useApolloClient()
  const { updateHospital } = useHospital()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    // Retrieve files from formData (fallback in case state is not used)
    const files = {
      mainHospitalImage:
        (formData.get("mainHospitalImage") as File) || selectedFiles.mainHospitalImage,
      ReceptionImage:
        (formData.get("ReceptionImage") as File) || selectedFiles.ReceptionImage,
      WaitingAreaImage:
        (formData.get("WaitingAreaImage") as File) || selectedFiles.WaitingAreaImage,
      WardImage:
        (formData.get("WardImage") as File) || selectedFiles.WardImage,
      OperationTheatreImage:
        (formData.get("OperationTheatreImage") as File) || selectedFiles.OperationTheatreImage,
    }
    console.log("Files to upload:", files)

    try {
      setUploading(true)
      // Upload only the files you need.
      // For example, here we upload mainHospitalImage, ReceptionImage and OperationTheatreImage.
      const [
        mainHospitalUrl,
        receptionImageUrl,
        operationTheatreImageUrl,
      ] = await Promise.all([
        files.mainHospitalImage ? handleUpload(files.mainHospitalImage) : Promise.resolve(null),
        files.ReceptionImage ? handleUpload(files.ReceptionImage) : Promise.resolve(null),
        files.OperationTheatreImage ? handleUpload(files.OperationTheatreImage) : Promise.resolve(null),
      ])
      setUploading(false)

      updateHospital({
        Media: {
          FrontUrl: mainHospitalUrl,
          ReceptionUrl: receptionImageUrl,
          OperationUrl: operationTheatreImageUrl,
        },
      })

      handleStep()
    } catch (err) {
      console.log(err)
      setUploading(false)
    }
  }

  // Handler for file changes
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, files } = e.target
    if (files && files.length > 0) {
      setSelectedFiles((prev) => ({
        ...prev,
        [name]: files[0],
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <section className="h-screen overflow-hidden px-4 py-4">
        <div className="flex h-full flex-col gap-4">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-800">Media Upload</h2>
            <p className="mt-1 text-sm text-gray-600">
              Upload high-quality images of your hospital facilities
            </p>
          </div>

          <div className="flex-grow overflow-auto">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {/* Upload Form */}
              <div className="space-y-4 lg:col-span-2">
                <div className="rounded-lg border bg-white p-4 shadow">
                  <div>
                    <h3 className="mb-4 text-lg font-medium text-gray-800">
                      Main Hospital Image
                    </h3>
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-6">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <Label className="mt-4 block cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload main image</span>
                          <Input
                            type="file"
                            name="mainHospitalImage"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </Label>
                        {selectedFiles.mainHospitalImage && (
                          <p className="mt-2 text-xs text-gray-500">
                            Selected: {selectedFiles.mainHospitalImage.name}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-gray-500">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Facility Images */}
                  <div className="mt-6">
                    <h3 className="mb-4 text-lg font-medium text-gray-800">
                      Facility Images
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        'Reception',
                        'OperationTheatre',
                        // If you want to add more areas like 'WaitingArea' or 'Ward'
                      ].map((area) => (
                        <div key={area} className="rounded-lg border p-4">
                          <h4 className="mb-2 text-sm font-medium text-gray-700">
                            {area}
                          </h4>
                          <div className="rounded-lg border-2 border-dashed border-gray-300 p-4">
                            <div className="text-center">
                              <svg
                                className="mx-auto h-8 w-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 4v16m8-8H4"
                                ></path>
                              </svg>
                              <Label className="mt-2 block cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-500">
                                <span>Upload</span>
                                <Input
                                  type="file"
                                  name={`${area}Image`}
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                              </Label>
                              {selectedFiles[`${area}Image` as keyof SelectedFilesType] && (
                                <p className="mt-2 text-xs text-gray-500">
                                  Selected: {(selectedFiles[`${area}Image` as keyof SelectedFilesType] as File).name}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Guidelines Section */}
              <div className="flex flex-col gap-4 space-y-4 lg:col-span-1">
                <div className="rounded-lg border bg-blue-50 p-4 shadow">
                  <h4 className="mb-2 text-sm font-medium text-blue-800">
                    Image Guidelines
                  </h4>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Images should be clear and well-lit</li>
                    <li>• Minimum resolution: 1920x1080 pixels</li>
                    <li>• Maximum file size: 5MB per image</li>
                    <li>• Accepted formats: JPG, PNG</li>
                  </ul>
                </div>

                {/* Save and Continue Button */}
                <div className="">
                  <Button className="w-full" disabled={uploading}>
                    {uploading ? "Uploading..." : "Save and Continue"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  )
}
