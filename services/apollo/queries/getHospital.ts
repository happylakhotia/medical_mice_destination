import { gql } from "@apollo/client";


const GET_HOSPITAL_QUERY = gql`
query {
    getHospital {
        id,
        participants {
            roots,
            staff,
            doctors

        }
    }
}
`

export default GET_HOSPITAL_QUERY