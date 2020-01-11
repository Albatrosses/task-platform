import { gql } from "apollo-boost";

export const TASK_LISTING = gql`
  query taskListing($queryTaskListingInput: QueryTaskListingInput) {
    taskListing(queryTaskListingInput: $queryTaskListingInput) {
      code
      message
      success
      data {
        id
        name
        simple
        platform {
          code
        }
        total
        amount
        endDate
      }
    }
  }
`;
