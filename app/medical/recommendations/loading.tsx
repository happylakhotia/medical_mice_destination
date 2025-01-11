"use client";
import React, { useState, useEffect } from "react";

export default function LoadingSkeleton() {
  const [loading, setLoading] = useState(true);

  // Simulate a timeout for data fetching
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds
    }, 3000);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Recommendations
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Loading Skeleton
          Array(3)
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
        ) : (
          // Recommendations content (Will show after 3 seconds)
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div
              className="h-48 bg-cover rounded-md"
              style={{
                backgroundImage: `url('https://via.placeholder.com/300')`,
              }}
            ></div>
            <h3 className="text-xl font-semibold mt-4">Luxury Villa in Bali</h3>
            <p className="text-gray-600 mt-2">
              A beautiful villa with a sea view
            </p>
            <p className="text-lg font-bold mt-4">$350/night</p>
          </div>
        )}
      </div>
    </div>
  );
}
