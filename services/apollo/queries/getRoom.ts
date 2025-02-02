import { gql } from "@apollo/client";


const GET_ROOM_QUERY = gql`
query ($id: String!) {
    getRoom(roomId: $id) {
        id,
        messages {
            content,
            author
        },
        participants 

    }
}
`


export default GET_ROOM_QUERY