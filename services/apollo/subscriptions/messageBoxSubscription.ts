import { gql } from "@apollo/client";

const MESSAGE_BOX_SUBSCRIPTION=gql`
    subscription {
        MessageBoxSubscription {
            roomId, 
            message {
            content,
            author,
            }
        }
    }
`

export default MESSAGE_BOX_SUBSCRIPTION;