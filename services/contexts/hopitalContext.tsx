import { createContext, useContext, useState } from "react";

export type Hospital = {
    BasicInfo: {
      HospitalName: string;
      RegistrationNumber: string;
      ContactInformation: {
        ContactPersonName: string;
        ContactNumber: string;
        ContactEmail: string;
        Website?: string;
      };
      AddressInformation: {
        StreetAddress: string;
        City: string;
        State: string;
        PinCode: string;
      };
      OperatingHours: {
        OpeningTime: string;
        ClosingTime: string;
      };
    };
    Media: {
      FrontUrl: string;
      ReceptionUrl: string;
      OperationUrl: string;
    };
    Amenities: {
      BedCapacity?: {
        GeneralWardBeds: number;
        PrivateRoomBeds: number;
        EmergencyBeds: number;
        IcuBeds: number;
      };
      MedicalStaff?: {
        PermenantDoctors: number;
        VisitingConsultants: number;
        Nurses: number;
        SupportStaff: number;
      };
      Facilities?: string[];
      Specialization?: string[];
      LegalDocuments?: {
        HospitalRegistrationUrl: string;
        MedicalLicense: string;
        TaxRegistrationCertificate: string;
      };
    };
    OnSiteVerification: {
      PreferredDate?: string;
      PreferredTime?: string;
      VerificationContact: {
        Name: string;
        Position: string;
        PhoneNumber: string;
        AlternatePhone?: string;
      };
    };
    OnsiteRating?: number;
    Reviews?: string[];
    PatientRating?: number;
    ConsultationFee: number;
    Ratings?: number[];
    FirstRootUser: string;
    Participants?: {
      RootUsers: string[];
      Staff: string[];
      Doctors: string[];
    };
  };
  


interface HospitalContext {
    hospital: Hospital | null
    updateHospital: (updateHospital: Partial<Hospital>) => void
    uploadHospital: () => void
}


const hospitalContext = createContext<HospitalContext | undefined>(undefined)


export function HospitalProvider({children}: {children: React.ReactNode}) {
    const [hospital, setHospital] = useState<Hospital | null>(null)
    
    const updateHospital = (updatedHospital: Partial<Hospital>) => {
        setHospital((prev) => ({ ...prev, ...updatedHospital } as Hospital));
    };


    const uploadHospital = async () => {
        try {
            console.log("uploading ...")
            const response = await fetch(`https://voyagehack-recommend.onrender.com/api/v1/add-hospital`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(hospital)
            })
            if (!response.ok) {
                console.log(response)
                throw new Error("Error While uploading hospital")
            }
            console.log("uploaded...")
            const data = await response.json()
            console.log(data)
        } catch (err) {
            console.log(err)
        } 
    }

    return (
        <hospitalContext.Provider value={{hospital, updateHospital, uploadHospital}} >
            {children}
        </hospitalContext.Provider>
    )

}

export function useHospital() {
    const hospital = useContext(hospitalContext) 

    if (!hospital) {
        throw Error(`useHospital should be used under a provider`)
    }

    return hospital
}



