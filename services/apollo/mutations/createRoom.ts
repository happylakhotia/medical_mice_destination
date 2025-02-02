import { gql } from "@apollo/client";

const CREATE_ROOM_MUTATION = gql`
mutation ($particpantMail: String!) {
    startChat(particpantMail: $particpantMail) {
        id, 
        messages {
            content,
            author
        }
    }
}
`
export default CREATE_ROOM_MUTATION