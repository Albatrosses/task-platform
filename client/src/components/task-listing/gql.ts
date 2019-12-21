import { gql } from "apollo-boost";

export const TASK_LISTING = gql`
  {
    taskListing {
      id
      key
      name
      image
      tag
      total
      reward
      status
      startDate
      endDate
    }
  }
`;
