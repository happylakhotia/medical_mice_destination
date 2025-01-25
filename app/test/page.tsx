import React from 'react'

import ProfileSection from '@/components/user/unique_hospital/ProfileSection'
import DoctorsSection from '@/components/user/unique_hospital/DoctorsSection'
import FacilitiesSection from '@/components/user/unique_hospital/FacilitiesSection'
import LocationSection from '@/components/user/unique_hospital/LocationSection'
import ReviewsSection from '@/components/user/unique_hospital/Reviews Section'

const UniqueHospitalPage = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="container">
        <ProfileSection />
        <DoctorsSection />
        <FacilitiesSection />
        <LocationSection />
        <ReviewsSection />
      </div>
    </main>
  )
}

export default UniqueHospitalPage
