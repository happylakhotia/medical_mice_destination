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

const hospitals = [
  {
    name: 'Mayo Clinic',
    location: 'Rochester, Minnesota, USA',
    rating: 4.9,
    osniteReview: 95,
    specialties: ['Cardiology', 'Oncology', 'Neurology'],
  },
  {
    name: 'Johns Hopkins Hospital',
    location: 'Baltimore, Maryland, USA',
    rating: 4.8,
    osniteReview: 92,
    specialties: ['Surgery', 'Research', 'Pediatrics'],
  },
  {
    name: 'Cleveland Clinic',
    location: 'Cleveland, Ohio, USA',
    rating: 4.7,
    osniteReview: 90,
    specialties: ['Cardiology', 'Orthopedics', 'Urology'],
  },
  {
    name: 'Cleveland Clinic',
    location: 'Cleveland, Ohio, USA',
    rating: 4.7,
    osniteReview: 90,
    specialties: ['Cardiology', 'Orthopedics', 'Urology'],
  },
  {
    name: 'Cleveland Clinic',
    location: 'Cleveland, Ohio, USA',
    rating: 4.7,
    osniteReview: 90,
    specialties: ['Cardiology', 'Orthopedics', 'Urology'],
  },
  {
    name: 'Cleveland Clinic',
    location: 'Cleveland, Ohio, USA',
    rating: 4.7,
    osniteReview: 90,
    specialties: ['Cardiology', 'Orthopedics', 'Urology'],
  },
]

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

const HospitalCard = ({
  name,
  location,
  rating,
  osniteReview,
  specialties,
}) => (
  <Card className="overflow-hidden transition-all hover:scale-105 hover:shadow-lg">
    <CardContent className="p-6">
      <h3 className="mb-2 text-xl font-semibold">{name}</h3>
      <p className="mb-4 text-sm text-gray-600">{location}</p>
      <div className="mb-4 flex items-center">
        <div className="flex text-yellow-400">
          {'★'.repeat(Math.round(rating))}
        </div>
        <span className="ml-2 text-sm text-gray-600">
          ({rating} Customer Review)
        </span>
      </div>
      <div className="mb-4 text-sm text-gray-600">
        Osnite Review: {osniteReview}/100
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {specialties.map((specialty) => (
          <span
            key={specialty}
            className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800"
          >
            {specialty}
          </span>
        ))}
      </div>
      <Button variant="outline" className="w-full">
        View Details
      </Button>
    </CardContent>
  </Card>
)

const RecommendationsPage = () => {
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
            Search Results for "Cardiology"
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hospitals.map((hospital, index) => (
              <HospitalCard key={index} {...hospital} />
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
