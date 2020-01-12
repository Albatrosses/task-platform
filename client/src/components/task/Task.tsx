import { useMutation, useQuery } from "@apollo/react-hooks";
import { Toast } from "antd-mobile";
import { get, toNumber } from "lodash";
import * as React from "react";
import { useEffect } from "react";
import { withRouter } from "react-router";
import { Loading } from "src/components/common/loading/Loading";
import ErrorPage from "../common/error-page/ErrorPage";
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

export const Task: React.FC<any> = ({ location, history }) => {
  const id = toNumber(location.pathname.replace("/task/", ""));
  const { data, loading, refetch } = useQuery(TASK_DETAIL, {
    variables: {
      queryTaskInput: {
        id
      }
    }
  });
  const task = get(data, "task.data", null);
  const success = get(data, "task.success", false);
  if (!loading && !success) {
    const message = get(data, "task.message");
    return <ErrorPage title={message} />;
  }

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
    if (acceptUserTaskOutput || submitUserTaskOutput || quitUserTaskOutput) {
      // tslint:disable-next-line: no-shadowed-variable
      const success =
        get(acceptUserTaskOutput, "acceptUserTask.success") ||
        get(submitUserTaskOutput, "submitUserTask.success") ||
        get(quitUserTaskOutput, "quitUserTask.success");
      const message =
        get(acceptUserTaskOutput, "acceptUserTask.message", "") ||
        get(submitUserTaskOutput, "submitUserTask.message", "") ||
        get(quitUserTaskOutput, "quitUserTask.message", "");
      if (!loading) {
        if (success) {
          refetch();
        } else {
          Toast.info(message, 1);
          history.push("/login");
        }
      }
    }
  }, [acceptUserTaskOutput, submitUserTaskOutput, quitUserTaskOutput]);

  return (
    <TaskWrapper>
      <Header />
      <Loading
        loading={loading}
        content={
          <div className="task-content">
            <Concise task={task} />
            <Criterion task={task} />
            <Operating
              task={task}
              acceptUserTask={acceptUserTask}
              submitUserTask={submitUserTask}
              quitUserTask={quitUserTask}
            />
          </div>
        }
      />
    </TaskWrapper>
  );
};

export default withRouter(Task);
