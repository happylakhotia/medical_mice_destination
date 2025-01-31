import { gql } from "@apollo/client";


const GET_HOSPITAL_QUERY = gql`
query {
getHospital {
    participants {
    roots,

    }
}
}
`

export default GET_HOSPITAL_QUERY