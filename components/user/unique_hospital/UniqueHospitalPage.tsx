"use client"
import React, { useEffect, useState } from 'react'

import ProfileSection from '@/components/user/unique_hospital/ProfileSection'
import DoctorsSection from '@/components/user/unique_hospital/DoctorsSection'
import FacilitiesSection from '@/components/user/unique_hospital/FacilitiesSection'
import LocationSection from '@/components/user/unique_hospital/LocationSection'
import ReviewsSection from '@/components/user/unique_hospital/Reviews Section'
import { useApolloClient, useQuery } from '@apollo/client'
import GET_HOSPITAL_BY_ID from '@/services/apollo/queries/getHospitalById'
import { useSearchParams } from 'next/navigation'
export interface HospitalData {
  id: string;
  basicInfo: {
    hospitalName: string;
    registrationNumber: string;
    contactInformation: {
      contactPersonName: string;
      contactNumber: string;
      contactEmail: string;
      website: string;
    };
    addressInformation: {
      streetAddress: string;
      city: string;
      state: string;
      pinCode: string;
    };
    operatingHours: {
      openingTime: string;
      closingTime: string;
    };
  };
  media: {
    frontUrl: string;
    receptionUrl: string;
    operationUrl: string;
  };
  amenities: {
    bedCapacity: {
      generalWardBeds: number;
      privateRoomBeds: number;
      emergencyBeds: number;
      icuBeds: number;
    };
    medicalStaff: {
      permenantDoctors: number;
      visitingConsultants: number;
      nurses: number;
      supportStaff: number;
    };
    facilities: string[];
    specialization: string[];
  };
  participants: {
    doctors: string[]
  }
  onsiteRating: number | null;
  patientRating: number;
  reviews: any[];
  consultationFee: number;
}

const UniqueHospitalPage = ({ hospitalid }: { hospitalid: string }) => {
  const [hospital, setHospital] = useState<HospitalData | undefined>(undefined)

  const client = useApolloClient()
  useEffect(() => {
    async function getHospital() {
      console.log(hospitalid)
      const { data } = await client.query({
        query: GET_HOSPITAL_BY_ID,
        variables: {hospitalId: hospitalid},
        context: {
          requiresAuth: true
        }
      })
      console.log(data.getHospitalByID)
      setHospital(data.getHospitalByID)
    }
    getHospital()

  }, [])

  if (!hospital) return <h1>Loading ..</h1>

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="container flex flex-col gap-12">
        <ProfileSection data={hospital}/>
        <DoctorsSection doctors={hospital.participants.doctors}/>
        <ReviewsSection reviews={hospital.reviews} hospitalId={hospitalid}/>
      </div>
    </main>
  )
}

export default UniqueHospitalPage
