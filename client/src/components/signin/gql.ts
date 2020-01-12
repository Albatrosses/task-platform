import { gql } from "apollo-boost";

export const LOGIN_USER = gql`
  mutation signInUser($signInUserInput: SignInUserInput!) {
    signInUser(signInUserInput: $signInUserInput) {
      code
      message
      success
    }
  }
`;

export const VERIFY_MESSAGE = gql`
  mutation verifyMessage($verifyMessageInput: VerifyMessageInput!) {
    verifyMessage(verifyMessageInput: $verifyMessageInput) {
      code
      message
      success
    }
  }
`;
