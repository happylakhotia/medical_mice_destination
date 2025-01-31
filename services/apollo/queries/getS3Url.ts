import { gql } from "@apollo/client";

const S3_URL_QUERY = gql`
query {
    getS3Url 
}
`
export default S3_URL_QUERY