import { gql } from "@apollo/client";
const ME_QUERY=gql`
query {
    me {
        id,
        name,
        email,
        profilePic,
        role,

    }
}
`
export default ME_QUERY