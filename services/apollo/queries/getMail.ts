import { gql } from "@apollo/client";

const GET_MAIL_QUERY=gql`
query ($id: String!){
getMailById(id: $id) {
    id,
    content,
    patientName,
    patientAge,
    ForwardedChain,
    documents,
    passport,
    createdAt,
    type,
    sender,
    receiver,
    patientGender,
}
}
`

export default GET_MAIL_QUERY