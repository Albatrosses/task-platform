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
        startDate
        endDate
      }
    }
  }
`;

export const USER_TASK_LISTING = gql`
  query userTaskListing($queryUserTaskListingInput: QueryUserTaskListingInput) {
    userTaskListing(queryUserTaskListingInput: $queryUserTaskListingInput) {
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
        startDate
        endDate
      }
    }
  }
`;
