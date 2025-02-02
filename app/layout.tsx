"use client"
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import createApolloClient from '@/services/apollo/client'
import { ApolloProvider } from '@apollo/client'
import { UserContextProvider } from '@/services/contexts/userContext'
import { RecommendationContextProvider } from '@/services/contexts/recommendations'
import { UserHospitalContextProvider } from "@/services/contexts/userHospitalContext"
import { useEffect } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const client = createApolloClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {




  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProvider client={client}>
          <UserContextProvider>
            <RecommendationContextProvider>
              <UserHospitalContextProvider>
                <NavBar />
                {children}
                <Footer />
              </UserHospitalContextProvider>
            </RecommendationContextProvider>
          </UserContextProvider>
        </ApolloProvider>
      </body>
    </html >
  )
}
