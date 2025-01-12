"use client"

import BasicAminitiesComponent from "@/components/BasicAminitiesComponent";
import BasicInfoComponent from "@/components/BasicInfoComponent";
import { BasicMediaUploadComponent } from "@/components/BasicMediaComponent";
import { LegalDocumentsComponent } from "@/components/LegalDocumentsComponent";
import { LinearTimeline } from "@/components/LinearTimeLine";
import { OnsiteVerificationComponent } from "@/components/OnsiteVerficationComponent";
import { Hospital } from "@/services/types/hospital"
import React, { useState } from "react"


export default function HosptialRegistrationComponent() {
	const [registrationStep, setRegistrationStep] = useState(0)
	const [hospital, setHospital] = useState<Hospital>({
		Doctors: [],
    BasicInfo: {
      HospitalName: "",
      RegistrationNumber: "",
      ContactInformation: {
        ContactPersonName: "",
        ContactNumber: "",
        ContactEmail: "",
      },
      AddressInformation: {
        StreetAddress: "",
        City: "",
        State: "",
        PinCode: "",
      },
      OperatingHours: {
        OpeningTime: "",
        ClosingTime: "",
      },
    },
    Media: {
      FrontUrl: "",
      ReceptionUrl: "",
      OperationUrl: "",
    },
    Amenities: {
      BedCapacity: {
        GeneralWardBeds: 0,
        PrivateRoomBeds: 0,
        EmergencyBeds: 0,
        IcuBeds: 0,
      },
      MedicalStaff: {
        PermenantDoctors: 0,
        VisitingConsultants: 0,
        Nurses: 0,
        SupportStaff: 0,
      },
      Facilities: {
        EmergencyCare: false,
        Laboratory: false,
        Pharmacy: false,
        Radiology: false,
        OperationTheatre: false,
        BloodBank: false,
      },
      Specialization: {
        Cardiology: false,
        Neurology: false,
        OrthoPedics: false,
        Pediatrics: false,
        Gynecology: false,
        Oncology: false,
      },
    },
    LegalDocuments: {
      HospitalRegistrationUrl: "",
      MedicalLicense: "",
      TaxRegistrationCertificate: "",
    },
    OnSiteVerification: {
      PreferredDate: new Date(),
      PreferredTime: "",
      VerificationContact: {
        Name: "",
        Position: "",
        PhoneNumber: "",
        AlternatePhone: "",
      },
    },
  })


	function hospitalSetter(something : (prevState: Hospital) => Hospital) {
		setHospital(something)
	}

	function registrationStepSetter(step: number){
		setRegistrationStep(step)
	}

	function PrintState() {
		console.log(hospital)
	}
	
  const steps = [
    'Basic Info',
    'Media Upload',
    'Amenities',
    'Legal Documents',
    'Onsite Verification'
  ]

	const renderStep = () => {
		switch(registrationStep) {
			case 0:
			return (
				<BasicInfoComponent registrationStepSetter={registrationStepSetter} setHospital={hospitalSetter}></BasicInfoComponent>
			)
			case 1:
				return <BasicMediaUploadComponent registrationStepSetter={registrationStepSetter} hospitalSetter={hospitalSetter}></BasicMediaUploadComponent>
			case 2:
				return <BasicAminitiesComponent registrationStepSetter={registrationStepSetter} hospitalSetter={hospitalSetter}></BasicAminitiesComponent>
			case 3: 
				return <LegalDocumentsComponent registrationStepSetter={registrationStepSetter} hospitalSetter={hospitalSetter}></LegalDocumentsComponent>
			case 4: 
				return <OnsiteVerificationComponent registrationStepSetter={registrationStepSetter} hospitalSetter={hospitalSetter}/>
		}
	}


return (
    <div className="container mx-auto px-4 py-8">
      <LinearTimeline currentStep={registrationStep} steps={steps} />
      <div>{renderStep()}</div>
      <button
        onClick={PrintState}
        className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
      >
        Print State
      </button>
    </div>
  )
}
