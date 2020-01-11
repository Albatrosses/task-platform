import { gql } from "apollo-boost";

export const HERO_IMAGE_LISTING = gql`
  query heroImageListing {
    heroImageListing {
      code
      message
      success
      data {
        id
        taskId
        imageSrc
      }
    }
  }
`;
