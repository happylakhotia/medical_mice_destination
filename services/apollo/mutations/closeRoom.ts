import { gql } from "@apollo/client";
const CLOSE_ROOM_MUTATION=gql`
mutation ($roomid: String!){
    closeRoom (roomid: $roomid) {
        id,
    }
}
`
export default CLOSE_ROOM_MUTATION