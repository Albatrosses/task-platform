import { gql } from "apollo-boost";

export const TASK_DETAIL = gql`
  query getTaskDetail($id: String) {
    taskDetail(id: $id) {
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
      criteria
      description
      steps
    }
  }
`;

export const CHANGE_TASK_DETAIL = gql`
  mutation updateTaskDetail($input: TaskDetailInput!) {
    updateTaskDetail(input: $input)
  }
`;
