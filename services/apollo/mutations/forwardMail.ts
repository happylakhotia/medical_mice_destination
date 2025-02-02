import { gql } from "@apollo/client";
const FORWARD_MAIL_MUTATION = gql`
    mutation ($mailId: String!, $forwardTo: String!) {
        forwardMail(mailId: $mailId, forwardTo: $forwardTo) {
            id,
            content,
            ForwardedChain
        }
    }
`

export default FORWARD_MAIL_MUTATION;