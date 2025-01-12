import { Doctor } from "./doctor"

export type Hospital = {
	BasicInfo: BasicInfo
	Media: Media
	Amenities: Amenities
	LegalDocuments: LegalDocuments
	OnSiteVerification: OnSiteVerification
	Doctors: Doctor[]
}


export type Media = {
	FrontUrl: string 
	ReceptionUrl: string
	OperationUrl: string
}

export type Amenities = {
	BedCapacity: BedCapacity
	MedicalStaff: MedicalStaff
	Facilities: Facilities
	Specialization: Specialization
}

export type Facilities = {
	EmergencyCare: Boolean
	Laboratory: Boolean
	Pharmacy: Boolean
	Radiology: Boolean
	OperationTheatre: Boolean
	BloodBank: Boolean
}

export type Specialization = {
	Cardiology: Boolean	
	Neurology: Boolean
	OrthoPedics: Boolean
	Pediatrics: Boolean
	Gynecology: Boolean
	Oncology: Boolean
}

export type MedicalStaff = {
	PermenantDoctors: number
	VisitingConsultants: number
	Nurses: number
	SupportStaff: number
}


export type BedCapacity = {
	GeneralWardBeds: number
	PrivateRoomBeds: number
	EmergencyBeds: number
	IcuBeds: number
}

export type LegalDocuments = {
	HospitalRegistrationUrl:string
	MedicalLicense: string
	TaxRegistrationCertificate: string
}

export type OnSiteVerification = {
	PreferredDate: Date
	PreferredTime: string
	VerificationContact: VerificationContact
}

export type VerificationContact = {
	Name: string
	Position: string
	PhoneNumber: string
	AlternatePhone: string
}

export type BasicInfo = {
	HospitalName: string
	RegistrationNumber: string
	ContactInformation: ContactInformation
	AddressInformation: AddressInformation
	OperatingHours: OperatingHours
}


export type OperatingHours = {
	OpeningTime: string
	ClosingTime: string
}

export type AddressInformation = {
	StreetAddress: string
	City: string
	State: string
	PinCode: string
}

export type ContactInformation = {
	ContactPersonName: string
	ContactNumber: string
	ContactEmail: string
	Website?: string
} 
