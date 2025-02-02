import { gql } from "@apollo/client";
const GET_UNIQUE_USER=gql`
query($userId: String!) {
    getUserByID(userId: $userId) {
        id,
        name,
        email,
        profilePic,
    }
}
`
export default GET_UNIQUE_USER