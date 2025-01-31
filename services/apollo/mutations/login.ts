import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password}) {
      token,
      user {
      id,
      name,
      role,
      email,
      profilePic,
    }
    }
  }
`;

export default LOGIN_MUTATION;
