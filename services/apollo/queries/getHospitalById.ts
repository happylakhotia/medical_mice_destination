import { gql } from "@apollo/client";
const GET_HOSPITAL_BY_ID=gql`
query ($hospitalId: String!) {
  getHospitalByID(hospitalId:$hospitalId) {
     id,
    basicInfo {
      hospitalName,
      registrationNumber,
      contactInformation {
        contactPersonName
        contactNumber
        contactEmail
        website
      },
      addressInformation {
        streetAddress
        city
        state
        pinCode
      },
      operatingHours {
        openingTime
        closingTime
      }
    },
    media {
      frontUrl
      receptionUrl
      operationUrl
    },
    amenities {
      bedCapacity {
        generalWardBeds
        privateRoomBeds
        emergencyBeds
        icuBeds
      }
      medicalStaff {
        permenantDoctors
        visitingConsultants
        nurses
        supportStaff
      }
      facilities
      specialization
    },
    onsiteRating,
    reviews {
    content,
    author
    }
    patientRating
    ratings,
    consultationFee
    participants {
      roots
      staff
      doctors
    }
  }
}
`
export default GET_HOSPITAL_BY_ID