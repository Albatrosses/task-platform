import { gql } from "apollo-boost";

export const TASK_LISTING = gql`
  query getTaskListing(
    $page: Int
    $status: Int
    $platform: [Int]
    $amount: [Int]
    $date: [String]
  ) {
    taskListing(
      page: $page
      status: $status
      platform: $platform
      amount: $amount
      date: $date
    ) {
      id
      name
      simple
      platforms {
        code
        link
      }
      total
      amount
      status
      startDate
      endDate
    }
  }
`;

export const HERO_IMAGE = gql`
  {
    heroImage {
      taskId
      imageSrc
    }
  }
`;
