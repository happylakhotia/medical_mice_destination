"use client";

import { useState } from "react";
import { Doctor } from "@/services/types/doctor";
import { UploadOnS3 } from "@/services/upload/s3";

export default function DoctorRegistrationForm() {
  const [doctor, setDoctor] = useState<Doctor>({
    medical_registration_number: "",
    name: "",
    phone: 0,
    specialization: "",
    medical_registration_document: null,
    qualifications: [{ title: "", college: "", start_year: "", end_year: "" }],
    join_date: new Date(),
  });
  const [medicalRegistrationDocumentUrl, SetMedicalRegistrationDocumentUrl] =
    useState("");
  const [error, setError] = useState("");
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDoctor((prev) => ({
        ...prev,
        medical_registration_document: e.target.files![0],
      }));
    }
  };

  const handleQualificationChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const updatedQualifications = doctor.qualifications.map((qual, i) => {
      if (i === index) {
        return {
          ...qual,
          [name]: name.includes("year") ? value : value,
        };
      }
      return qual;
    });
    setDoctor((prev) => ({ ...prev, qualifications: updatedQualifications }));
  };

  const addQualification = () => {
    setDoctor((prev) => ({
      ...prev,
      qualifications: [
        ...prev.qualifications,
        { title: "", college: "", start_year: "", end_year: "" },
      ],
    }));
  };

  function urlSetter(url: string) {
    SetMedicalRegistrationDocumentUrl(url);
  }

  function errorSetter(msg: string) {
    setError(msg);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setError("");
    e.preventDefault();
    console.log(doctor);
    try {
      setUploadingFiles(true);
      await UploadOnS3(
        e,
        urlSetter,
        errorSetter,
        "medical_registration_document",
      );
      setUploadingFiles(false);
      console.log(medicalRegistrationDocumentUrl);
      setSubmitting(true);

      let doctor_data = {
        medical_registration_number: doctor.medical_registration_number,
        name: doctor.name,
        medical_registration_document_url: medicalRegistrationDocumentUrl,
        phone: doctor.phone,
        specialization: doctor.specialization,
        qualifications: doctor.qualifications,
        join_date: doctor.join_date,
      };
      console.log(doctor_data);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doctor`,
        {
          method: "POST",
          body: JSON.stringify(doctor_data),
        },
      );
      if (!response.ok) {
        setError("Error While Submitting");
        return;
      }
      const data = await response.json();
      console.log(data);
      console.log("doctor creation successfull ...");
      setSubmitting(false);
    } catch (err) {
      console.log(err);
      setError("Something Went Wrong");
      setUploadingFiles(false);
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                i
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Doctor Registration</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Enter the doctor's details below
                </p>
              </div>
            </div>
            <form className="divide-y divide-gray-200" onSubmit={handleSubmit}>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">
                    Medical Registration Number
                  </label>
                  <input
                    type="text"
                    name="medical_registration_number"
                    value={doctor.medical_registration_number}
                    onChange={handleChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="MRN12345"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={doctor.name}
                    onChange={handleChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Dr. John Doe"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Phone</label>
                  <input
                    type="number"
                    name="phone"
                    value={doctor.phone}
                    onChange={handleChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="1234567890"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={doctor.specialization}
                    onChange={handleChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Cardiology"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">
                    Medical Registration Document
                  </label>
                  <input
                    type="file"
                    name="medical_registration_document"
                    onChange={handleFileChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Join Date</label>
                  <input
                    type="date"
                    name="join_date"
                    value={
                      doctor.join_date
                        ? new Date(doctor.join_date).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Qualifications</label>
                  {doctor.qualifications.map((qual, index) => (
                    <div key={index} className="space-y-2 mb-4">
                      <input
                        type="text"
                        name="title"
                        value={qual.title}
                        onChange={(e) => handleQualificationChange(index, e)}
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Qualification Title"
                        required
                      />
                      <input
                        type="text"
                        name="college"
                        value={qual.college}
                        onChange={(e) => handleQualificationChange(index, e)}
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="College Name"
                        required
                      />
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          name="start_year"
                          value={qual.start_year}
                          onChange={(e) => handleQualificationChange(index, e)}
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="Start Year"
                          required
                        />
                        <input
                          type="text"
                          name="end_year"
                          value={qual.end_year}
                          onChange={(e) => handleQualificationChange(index, e)}
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="End Year"
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addQualification}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Add Qualification
                  </button>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                >
                  Register Doctor
                </button>
              </div>
            </form>
            {error && <div>{error}</div>}
            {uploadingFiles && <div>Uploading files ...</div>}
            {submitting && <div>Submitting ...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
