import { gql } from "@apollo/client";

const GET_MAILBOX_QUERY = gql`
query {
getMailBox{
  id,
  sent,
    received,
  sentmails {
    id,
    sender,
    receiver,
    content,
    type,
    createdAt
  }
  receivedEmails {
    id,
    sender,
    receiver,
    content,
    type,
    createdAt
  }
  
}
}
`;

export default GET_MAILBOX_QUERY;
