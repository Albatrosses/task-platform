import { gql } from "apollo-boost";

export const TASK_LISTING = gql`
  query queryTaskListing(
    $page: Int
    $status: Int
    $platform: [Int]
    $reward: [Int]
    $date: [String]
  ) {
    queryTaskListing(
      page: $page
      status: $status
      platform: $platform
      reward: $reward
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
      reward
      status
      startDate
      endDate
    }
  }
`;

export const HERO_IMAGE = gql`
  {
    queryHeroImage {
      taskId
      imageSrc
    }
  }
`;
