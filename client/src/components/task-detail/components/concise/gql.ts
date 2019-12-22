import { gql } from "apollo-boost";

export const TASK_DETAIL = gql`
  query queryTaskDetail($id: Int) {
    getTaskDetail(id: $id) {
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
      link
      criteria
      description
    }
  }
`;
