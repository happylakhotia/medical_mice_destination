import { gql } from "@apollo/client";

const CREATE_PATIENT_MUTATION = gql`
  mutation CreatePatient($email: String!, $password: String!, $name: String!, $profilePic: String!) {
    createPatient(input: { email: $email, password: $password, name: $name, profilePic: $profilePic }) {
      id
      name
      role
      email
    }
  }
`;

export default CREATE_PATIENT_MUTATION;
