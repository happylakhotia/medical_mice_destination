"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Recommendations() {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setRecommendations([
        {
          id: 1,
          title: "Luxury Villa in Bali",
          description: "A beautiful villa with a sea view",
          price: "$350/night",
        },
        {
          id: 2,
          title: "Cozy Apartment in New York",
          description: "A cozy 2-bedroom apartment in the heart of NYC",
          price: "$200/night",
        },
        {
          id: 3,
          title: "Mountain Retreat in Aspen",
          description: "Escape to the mountains in a modern retreat",
          price: "$500/night",
        },
      ]);
    }, 3000);
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/medical/${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Recommendations
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg animate-pulse"
                >
                  <div className="h-32 bg-gray-300 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))
          : // Recommendations
            recommendations.map((rec: any) => (
              <div
                key={rec.id}
                onClick={() => handleCardClick(rec.id)} // Handle click to navigate
                className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              >
                <div
                  className="h-48 bg-cover rounded-md"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                  }}
                ></div>
                <h3 className="text-xl font-semibold mt-4">{rec.title}</h3>
                <p className="text-gray-600 mt-2">{rec.description}</p>
                <p className="text-lg font-bold mt-4">{rec.price}</p>
              </div>
            ))}
      </div>
    </div>
  );
}

// this page will ask the backend for recommendations
// the parameters that we got from parsing the llm will be transferred to our backend and based on that we will recieve recommendations
// if user comes directly on the page server will provide default recommendations
