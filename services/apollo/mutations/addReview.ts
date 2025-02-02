import { gql } from "@apollo/client";
const ADD_REVIEW_MUTATION=gql`
mutation($content:String!, $hospitalId: String!) {
 addReview(content:$content, hospitalId:$hospitalId) {
  reviews {
    content,
    author
  }
}
}
`
export default ADD_REVIEW_MUTATION