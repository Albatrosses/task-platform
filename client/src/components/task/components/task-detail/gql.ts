import { gql } from "apollo-boost";

export const TASK_DETAIL = gql`
  query queryTaskDetail($id: Int) {
    queryTaskDetail(id: $id) {
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
      criteria
      description
      steps
    }
  }
`;

export const CHANGE_TASK_DETAIL = gql`
  mutation mutationTaskDetail($input: TaskDetailInput!) {
    mutationTaskDetail(input: $input)
  }
`;
