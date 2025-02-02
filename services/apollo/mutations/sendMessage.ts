import { gql } from "@apollo/client";
const SEND_MESSAGE_MUTATION = gql`
mutation($roomId: String! , $content: String!) {
sendMessage(input:{roomId: $roomId, content: $content}) {
        id,
        messages {
            content,
            author
        },
        participants 
}
}
`
export default SEND_MESSAGE_MUTATION