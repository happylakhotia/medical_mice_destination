'use client'
import { useRouter } from 'next/navigation'

import * as React from 'react'
import { useState } from 'react'

import NavBar from '@/components/NavBar'
import LandingPageContent from '@/components/LandingPageContent'

export default function Landing() {
  const router = useRouter()

  function checkAuth() {
    // a temp(imaginary function) to check auth
    console.log('checking auth ....')
  }

  function handleLogin() {
    window.location.href = 'http://localhost:3000/auth/google'
  }

  function handleMedicalTourism() {
    checkAuth()
    router.push('/medical/main')
  }

  function handleMICE() {
    checkAuth()
    router.push('/mice/main')
  }

  function handleDestinationWedding() {
    checkAuth()
    router.push('destination/main')
  }

  // this is a temp landing page
  // we need to check auth after pressing these buttons if the user is not authed we can't proceed

  return (
    <>
      <main className="flex min-h-screen flex-col justify-start">
        <NavBar isLoggedIn={false}/>
        <LandingPageContent />
      </main>

      {/* For Daksh: Moving buttons to bottom of page for experimentation*/}
      <div>
        <button onClick={handleMedicalTourism} className="primary-button m-3">
          Medical Tourism
        </button>
        <button onClick={handleMICE} className="primary-button m-3">
          MICE
        </button>
        <button
          onClick={handleDestinationWedding}
          className="primary-button m-3"
        >
          Destination Weddings
        </button>
        <button onClick={handleLogin} className="primary-button m-3">
          Log In With Google
        </button>
      </div>
    </>
  )
}
