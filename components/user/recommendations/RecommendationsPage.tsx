'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRecommendationProvider } from '@/services/contexts/recommendations'
import Link from 'next/link'


function getAverageRating(ratings: any) {
  let sum = 0;
  if (ratings.length > 0) {
    for (let i = 0; i < ratings.length; i++) {
      sum += ratings[i]
    }
    return sum/ratings.length
  } else {
    return 0
  }

}


const HospitalCard = ({ recommendation }: { recommendation: any }) => (

  <Card className="overflow-hidden transition-all hover:scale-105 hover:shadow-lg">
    {recommendation.Media_FrontUrl && (
      <img
        src={recommendation.Media_FrontUrl}
        alt={recommendation.BasicInfo_HospitalName}
        className="w-full h-48 object-cover"
      />
    )}
    <CardContent className="p-6">
      <h3 className="mb-2 text-xl font-semibold">
        {recommendation.BasicInfo_HospitalName}
      </h3>
      <p className="mb-4 text-sm text-gray-600">
        {recommendation.BasicInfo_AddressInformation_City || 'Location not specified'}
      </p>
      <div className="mb-4 text-sm text-gray-600">
        Onsite Rating: {recommendation.OnsiteRating}/100
        <div>Consultation Fee: ₹{recommendation.ConsultationFee}</div>
      </div>
      <div className="mb-4 text-sm text-gray-600">
        Rating: {getAverageRating(recommendation.Ratings)}
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold mb-2">Facilities:</p>
        <div className="flex flex-wrap gap-2">
          {recommendation.Amenities_Facilities?.map((facility: any) => (
            <span
              key={facility}
              className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800"
            >
              {facility}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold mb-2">Specializations:</p>
        <div className="flex flex-wrap gap-2">
          {recommendation.Amenities_Specialization?.map((specialty: any) => (
            <span
              key={specialty}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full">
        View Details
      </Button>
    </CardContent>
  </Card>
);

const SearchBar = () => {
  const [searchType, setSearchType] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [treatmentDate, setTreatmentDate] = useState('')
  const [budget, setBudget] = useState('')

  const handleSearch = () => {
    console.log('Search parameters:', {
      searchType,
      searchInput,
      speciality,
      treatmentDate,
      budget,
    })
  }

  return (
    <Card className="mx-auto w-full max-w-4xl bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Search Medical Facilities
        </CardTitle>
        <CardDescription className="text-center">
          Find the perfect hospital or doctor for your medical needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Select onValueChange={(value) => setSearchType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Search by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hospital">Hospital Name</SelectItem>
                <SelectItem value="doctor">Doctor Name</SelectItem>
                <SelectItem value="city">City</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Enter your search term"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-grow"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select onValueChange={(value) => setSpeciality(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Speciality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="oncology">Oncology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={treatmentDate}
              onChange={(e) => setTreatmentDate(e.target.value)}
              className="w-[180px]"
            />

            <Select onValueChange={(value) => setBudget(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="mid-range">Mid Range</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleSearch} className="flex-grow">
              Search Facilities
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button variant="outline" size="sm">
            Popular Hospitals
          </Button>
          <Button variant="outline" size="sm">
            Top Rated Doctors
          </Button>
          <Button variant="outline" size="sm">
            Emergency Care
          </Button>
          <Button variant="outline" size="sm">
            Best Value
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const RecommendationsPage = () => {
  const { recommendations } = useRecommendationProvider()

  if (!recommendations) {
    return <div>Loading ...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Find Your Ideal Medical Care
          </h1>
          <p className="text-lg text-gray-500">
            Discover top-rated hospitals and specialists tailored to your needs
          </p>
        </div>

        <SearchBar />

        <section id="hospitalList">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Available Hospitals
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((hospital: any, index: any) => (
              <Link href={`/hospitals/${hospital._id}`}>
                <HospitalCard key={hospital._id} recommendation={hospital} />
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              View All Hospitals
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default RecommendationsPage