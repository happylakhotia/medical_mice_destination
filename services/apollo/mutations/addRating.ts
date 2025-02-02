import { gql } from "@apollo/client";

const ADD_RATING_MUTATION = gql`
  mutation($rating: Int!, $hospitalId: String!) {
    addRating(rating: $rating, hospitalId: $hospitalId) {
      ratings
    }
  }
`;

export default ADD_RATING_MUTATION;