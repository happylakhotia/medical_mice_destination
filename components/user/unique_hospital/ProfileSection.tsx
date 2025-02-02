import React from 'react'
import { HospitalData } from './UniqueHospitalPage';
import Link from 'next/link';

const ProfileSection = ({ data }: { data: HospitalData}) => {
  const totalBeds = 
    data.amenities.bedCapacity.generalWardBeds +
    data.amenities.bedCapacity.privateRoomBeds +
    data.amenities.bedCapacity.emergencyBeds +
    data.amenities.bedCapacity.icuBeds;

  return (
    <section id="profile" className="px-8 py-8">
      {/* Header with Title and Appointment Button */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {data.basicInfo.hospitalName} in {data.basicInfo.addressInformation.city}
          </h1>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              <svg
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="ml-2 text-gray-600">
                {data.reviews.length} Reviews
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="mr-2 text-gray-600">Onsite Rating:</span>
            <div className="flex items-center">
              <span className="font-bold text-green-600">
                {data.onsiteRating || 'Not rated yet'}
              </span>
            </div>
          </div>
          <div className="mt-2 text-gray-600">
            Consultation Fee: ₹{data.consultationFee}
          </div>
        </div>
        <Link href={`/hospitals/${data.id}/apply`} className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition duration-200 hover:bg-indigo-700">
          Apply for Appointment
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        <div className="col-span-2 row-span-2">
          {data.media.frontUrl ? (
            <img
              src={data.media.frontUrl}
              alt="Hospital Front"
              className="h-[400px] w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-[400px] items-center justify-center rounded-lg bg-neutral-200">
              <span className="text-neutral-600">Hospital Front View</span>
            </div>
          )}
        </div>
        <div className="col-span-2">
          {data.media.receptionUrl ? (
            <img
              src={data.media.receptionUrl}
              alt="Reception Area"
              className="h-[195px] w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-[195px] items-center justify-center rounded-lg bg-neutral-200">
              <span className="text-neutral-600">Reception Area</span>
            </div>
          )}
        </div>
        <div className="col-span-2">
          {data.media.operationUrl ? (
            <img
              src={data.media.operationUrl}
              alt="Operation Theatre"
              className="h-[195px] w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-[195px] items-center justify-center rounded-lg bg-neutral-200">
              <span className="text-neutral-600">Operation Theatre</span>
            </div>
          )}
        </div>
      </div>

      {/* Hospital Description */}
      <div className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          About the Hospital
        </h2>
        <div className="space-y-4">
          <p className="leading-relaxed text-gray-600">
            {data.basicInfo.hospitalName} offers comprehensive healthcare services with a total capacity 
            of {totalBeds} beds, including {data.amenities.bedCapacity.generalWardBeds} general ward beds, 
            {data.amenities.bedCapacity.privateRoomBeds} private rooms, {data.amenities.bedCapacity.emergencyBeds} emergency beds, 
            and {data.amenities.bedCapacity.icuBeds} ICU beds.
          </p>
          
          <div className="mt-4">
            <h3 className="mb-2 text-lg font-semibold">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {data.amenities.specialization.map((specialty) => (
                <span
                  key={specialty}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-lg font-semibold">Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {data.amenities.facilities.map((facility) => (
                <span
                  key={facility}
                  className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
                >
                  {facility}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-lg font-semibold">Contact Information</h3>
            <p className="text-gray-600">
              Contact Person: {data.basicInfo.contactInformation.contactPersonName}<br />
              Phone: {data.basicInfo.contactInformation.contactNumber}<br />
              Email: {data.basicInfo.contactInformation.contactEmail}<br />
              Operating Hours: {data.basicInfo.operatingHours.openingTime} - {data.basicInfo.operatingHours.closingTime}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-lg font-semibold">Address</h3>
            <p className="text-gray-600">
              {data.basicInfo.addressInformation.streetAddress}<br />
              {data.basicInfo.addressInformation.city}<br />
              {data.basicInfo.addressInformation.state} - {data.basicInfo.addressInformation.pinCode}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileSection