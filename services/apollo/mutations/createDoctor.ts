import { gql } from "@apollo/client";
const CREATE_DOCTOR_MUTATION = gql`
  mutation ($password: String!, $email: String!, $profilePic: String!, $name: String!, $documents: [String!]!, $specialty: String!, $hospitalId: String!) {
    createDoctor(input: { specialty: $specialty, documents: $documents, hospitalId: $hospitalId ,name: $name, password: $password, email: $email, profilePic: $profilePic }) {
      user {
        id
        role
        name
        email
      }
      specialty
      documents
    }
  }
`;
export default CREATE_DOCTOR_MUTATION