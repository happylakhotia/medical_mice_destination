"use client";
import GET_UNIQUE_DOCTOR from "@/services/apollo/queries/getUniqueDoctor";
import { useUserHospitalContext } from "@/services/contexts/userHospitalContext";
import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

type Doctor = {
  user: {
    id: string;
    name: string;
    role: string;
    email: string;
    profilePic?: string;
  };
  specialty: string;
  documents: string[];
};

export default function Users() {
  const client = useApolloClient();
  const { userHospital } = useUserHospitalContext();
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  async function getAllDoctors(doctors: string[]) {
    try {
      if (!doctors) return;

      const results = await Promise.all(
        doctors.map(async (doctorId: string) => {
          const { data } = await client.query({
            query: GET_UNIQUE_DOCTOR,
            variables: { doctorId },
            context: {
              requiresAuth: true,
            },
          });
          return data.getDoctorByID;
        })
      );
      console.log()
      setDoctorData(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userHospital && userHospital.participants && userHospital.participants.doctors) {
      getAllDoctors(userHospital.participants.doctors);
    }
  }, [userHospital]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="my-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Doctors</h2>
          <p className="mt-2 text-gray-600">
            Meet our team of specialized professionals.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {doctorData.map((doctor) => (
            <div
              key={doctor.user.id}
              className="overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src={
                  doctor.user.profilePic ||
                  "https://via.placeholder.com/150?text=No+Image"
                }
                alt={doctor.user.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {doctor.user.name}
                </h3>
                <p className="mt-2 text-gray-600">{doctor.specialty}</p>
                <p className="mt-2 text-gray-600">{doctor.user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
