import { gql } from "@apollo/client";

const SEND_APPLICATION_MUTATION = gql`
mutation sendApplication(
  $hospitalId: String!, 
  $content: String!, 
  $patientName: String!, 
  $patientAge: String!, 
  $patientGender: String!, 
  $phoneNumber: String!, 
  $passport: String!, 
  $allergies: String!, 
  $documents: [String], 
  $razorpayPaymentId: String!, 
  $razorpayOrderId: String!, 
  $razorpaySignature: String!
) {
  sendApplication(
    input: {
      hospitalId: $hospitalId, 
      content: $content, 
      patientName: $patientName, 
      patientAge: $patientAge, 
      patientGender: $patientGender, 
      phoneNumber: $phoneNumber, 
    allergies: $allergies,
      passport: $passport, 
      documents: $documents, 
      razorpay_payment_id: $razorpayPaymentId, 
      razorpay_order_id: $razorpayOrderId, 
      razorpay_signature: $razorpaySignature
    }
  ) {
    id
    content
    patientName
    sender
    receiver
    patientAge
    documents
    patientGender
    passport
    phoneNumber
    allergies
    type
    createdAt
  }
}
`

export default SEND_APPLICATION_MUTATION