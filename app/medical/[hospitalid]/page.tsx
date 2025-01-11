"use client";

import { useEffect, useState } from "react";

export default function HospitalPage({
  params,
}: {
  params: { hospitalid: string };
}) {
  const [hospitalData, setHospitalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate API request with setTimeout
  useEffect(() => {
    async function fetchHospitalDetails() {
      const hospitalId = (await params).hospitalid;

      setLoading(true);

      setTimeout(() => {
        try {
          const mockData = {
            name: "City Medical Center",
            description:
              "A leading hospital specializing in cardiology, neurology, and orthopedics.",
            location: "123 Health St, Cityville, CA",
            contact: "(555) 987-6543",
            specialties: ["Cardiology", "Neurology", "Orthopedics"],
            imageUrl: "https://via.placeholder.com/800x400",
          };

          setHospitalData(mockData);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch hospital data");
          setLoading(false);
        }
      }, 3000); // Simulate a 3-second delay for API request
    }

    fetchHospitalDetails();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen py-8 px-4">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Hospital Details
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
          <div className="h-48 bg-gray-300 rounded-md mb-4"></div>{" "}
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>{" "}
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>{" "}
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>{" "}
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>{" "}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8">
        {hospitalData?.name}
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg overflow-hidden">
        <div
          className="w-full h-80 bg-cover bg-center rounded-lg mb-6"
          style={{ backgroundImage: `url(${hospitalData?.imageUrl})` }}
        ></div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {hospitalData?.name}
        </h2>
        <p className="text-gray-600 mt-4">{hospitalData?.description}</p>

        <div className="mt-6">
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-semibold">Location:</span>
            <p className="ml-2">{hospitalData?.location}</p>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <span className="font-semibold">Contact:</span>
            <p className="ml-2">{hospitalData?.contact}</p>
          </div>

          <div className="mt-4">
            <strong className="text-lg text-gray-800">Specialties:</strong>
            <ul className="list-disc ml-6 text-gray-600">
              {hospitalData?.specialties?.map(
                (specialty: string, index: number) => (
                  <li key={index}>{specialty}</li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
