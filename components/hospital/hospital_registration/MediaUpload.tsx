import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function MediaUpload() {
  return (
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
                          className="hidden"
                          accept="image/*"
                        />
                      </Label>
                      <p className="mt-2 text-xs text-gray-500">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Facility Images */}
                <div>
                  <h3 className="mb-4 text-lg font-medium text-gray-800">
                    Facility Images
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Facility Image Sections */}
                    {[
                      'Reception',
                      'Waiting Area',
                      'Ward',
                      'Operation Theatre',
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
                                className="hidden"
                                accept="image/*"
                              />
                            </Label>
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
                <Button className="w-full">Save and Continue</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
