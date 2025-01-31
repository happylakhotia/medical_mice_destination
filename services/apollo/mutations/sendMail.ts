
import { gql } from "@apollo/client";

const SEND_NORMAL_MAIL_MUTATION = gql`
  mutation SendNormalMail($receiver: String!, $content: String!, $documents: [String]) {
    sendNormalMail(input: { receiver: $receiver, content: $content, documents: $documents }) {
      id
      receiver
      sender
      documents
      content
    }
  }
`;

export default SEND_NORMAL_MAIL_MUTATION


