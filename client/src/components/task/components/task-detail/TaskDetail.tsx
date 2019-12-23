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
import { CHANGE_TASK_DETAIL, TASK_DETAIL } from "./gql";
import { TaskDetailWrapper } from "./TaskDetail.style";

export const TaskDetail: React.FC<any> = ({ location }) => {
  const id = toNumber(location.pathname.replace("/task-listing/detail/", ""));
  const { data, loading, refetch } = useQuery(TASK_DETAIL, {
    variables: { id }
  });
  const taskDetail = get(data, "queryTaskDetail", null);

  const [changeTaskDetail, { data: dataUpdate }] = useMutation(
    CHANGE_TASK_DETAIL
  );

  useEffect(() => {
    if (dataUpdate && dataUpdate.mutationTaskDetail) {
      refetch();
    }
  }, [dataUpdate]);

  return (
    <TaskDetailWrapper>
      <Header />
      <Loading
        loading={!taskDetail || loading}
        content={
          <>
            <Concise taskDetail={taskDetail} />
            <Criterion />
            <Operating
              taskDetail={taskDetail}
              changeTaskDetail={changeTaskDetail}
            />
          </>
        }
      />
    </TaskDetailWrapper>
  );
};

export default withRouter(TaskDetail);
