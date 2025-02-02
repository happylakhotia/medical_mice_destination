import { gql } from "@apollo/client";
const INVITATION_MAIL_MUTATION=gql`
  mutation sendInvitationMail($receiver: String!, $content: String!, $documents: [String!]!) {
    sendInvitationMail(input: { receiver: $receiver, content: $content, documents: $documents }) {
      id,
      receiver,
      sender,
      documents,
      content,
      type,
    }
  }
`
export default INVITATION_MAIL_MUTATION