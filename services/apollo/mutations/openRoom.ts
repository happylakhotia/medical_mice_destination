import { gql } from "@apollo/client";
const OPEN_ROOM_MUTATION=gql`
mutation ($roomid: String!) {
    openRoom(roomid: $roomid) {
        id,
        messages {
            content,
            author
        },
        participants 
    }
}
`

export default OPEN_ROOM_MUTATION