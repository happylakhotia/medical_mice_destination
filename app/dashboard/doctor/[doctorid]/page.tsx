"use client";

import { useUserContext } from "@/services/contexts/userContext";
import Image from "next/image";

export default function DoctorDashboard({ params }: { params: { doctorid: string } }) {
  const { user } = useUserContext();

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <Image
            src={user?.profilePic || "/default-profile.png"}
            alt={user?.name || "Doctor's Profile Picture"}
            width={150}
            height={150}
            className="rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {user?.name || "Doctor Name"}
          </h1>
          <p className="text-gray-600 mb-4">{user?.role || "Doctor Role"}</p>
          <p className="text-gray-600">{user?.email || "doctor@example.com"}</p>
        </div>
      </div>
    </div>
  );
}
