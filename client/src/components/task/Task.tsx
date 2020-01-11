import { useMutation, useQuery } from "@apollo/react-hooks";
import { get, toNumber } from "lodash";
import * as React from "react";
import { useEffect } from "react";
import { withRouter } from "react-router";
import { Loading } from "src/components/common/loading/Loading";
import { Concise } from "./components/concise/Concise";
import { Criterion } from "./components/criterion/Criterion";
import Header from "./components/header/Header";
import { Operating } from "./components/operating/Operating";
import {
  ACCEPT_USER_TASK,
  QUIT_USER_TASK,
  SUBMIT_USER_TASK,
  TASK_DETAIL
} from "./gql";
import { TaskWrapper } from "./Task.style";

export const Task: React.FC<any> = ({ location }) => {
  const id = toNumber(location.pathname.replace("/task/", ""));
  const { data, loading, refetch } = useQuery(TASK_DETAIL, {
    variables: {
      queryTaskInput: {
        id
      }
    }
  });
  const task = get(data, "task.data", null);

  const [acceptUserTask, { data: acceptUserTaskOutput }] = useMutation(
    ACCEPT_USER_TASK
  );
  const [submitUserTask, { data: submitUserTaskOutput }] = useMutation(
    SUBMIT_USER_TASK
  );
  const [quitUserTask, { data: quitUserTaskOutput }] = useMutation(
    QUIT_USER_TASK
  );

  useEffect(() => {
    refetch();
  }, [
    location,
    acceptUserTaskOutput,
    submitUserTaskOutput,
    quitUserTaskOutput
  ]);

  return (
    <TaskWrapper>
      <Header />
      <Loading
        loading={loading}
        content={
          <>
            <Concise task={task} />
            <Criterion />
            <Operating
              task={task}
              acceptUserTask={acceptUserTask}
              submitUserTask={submitUserTask}
              quitUserTask={quitUserTask}
            />
          </>
        }
      />
    </TaskWrapper>
  );
};

export default withRouter(Task);
