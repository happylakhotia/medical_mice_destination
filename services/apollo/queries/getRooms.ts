import { gql } from "@apollo/client";

const GET_ROOMS_QUERY = gql`
query {
getRoomsById {
id,
participants
}
}
`
export default GET_ROOMS_QUERY