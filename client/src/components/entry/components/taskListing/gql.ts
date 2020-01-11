import { gql } from "apollo-boost";

export const TASK_LISTING = gql`
  query taskListing {
    taskListing {
      code
      message
      success
      data {
        id
        name
        platform {
          code
        }
        total
        amount
      }
    }
  }
`;
