import { gql } from "@apollo/client";

const MAILBOX_SUBSCRIPTION = gql`
subscription {
    MailBoxSubscription {
        sent {
            id,
            content,
            receiver,
            sender,
            createdAt,
            type,
        },
        received {
            id,
            content,
            createdAt,
            receiver,
            sender,
            type,
        }
    }
}
`

export default MAILBOX_SUBSCRIPTION