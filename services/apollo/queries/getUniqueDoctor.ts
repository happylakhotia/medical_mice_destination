import { gql } from "@apollo/client";
const GET_UNIQUE_DOCTOR=gql`
    query($doctorId: String!) {
        getDoctorByID(doctorId: $doctorId) {
            user {
                id,
                name,
                email,
                role,
                profilePic,
            },
            specialty,
            documents
        }
    }
`
export default GET_UNIQUE_DOCTOR