import { gql } from "apollo-boost";

export const TASK_LISTING = gql`
  {
    queryTaskListing {
      id
      name
      simple
      polatforms {
        code
        link
      }
      total
      reward
      status
      startDate
      endDate
    }
  }
`;
