import { gql } from "apollo-boost";

export const TASK_DETAIL = gql`
  query task($queryTaskInput: QueryTaskInput!) {
    task(queryTaskInput: $queryTaskInput) {
      code
      message
      success
      data {
        id
        name
        simple
        platform {
          code
          link
        }
        total
        amount
        status
        criteria
        credentials
        description
        steps
        startDate
        endDate
        assignDate
        uploadDate
        reviewDate
      }
    }
  }
`;

export const ACCEPT_USER_TASK = gql`
  mutation acceptUserTask($acceptUserTaskInput: AcceptUserTaskInput!) {
    acceptUserTask(acceptUserTaskInput: $acceptUserTaskInput) {
      code
      message
      success
    }
  }
`;

export const SUBMIT_USER_TASK = gql`
  mutation submitUserTask($submitUserTaskInput: SubmitUserTaskInput!) {
    submitUserTask(submitUserTaskInput: $submitUserTaskInput) {
      code
      message
      success
    }
  }
`;

export const QUIT_USER_TASK = gql`
  mutation quitUserTask($quitUserTaskInput: QuitUserTaskInput!) {
    quitUserTask(quitUserTaskInput: $quitUserTaskInput) {
      code
      message
      success
    }
  }
`;
