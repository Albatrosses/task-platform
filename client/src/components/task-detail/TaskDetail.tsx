import * as React from "react";
import { withRouter } from "react-router";
import Header from "./components/header/Header";
import { TaskDetailWrapper } from "./TaskDetail.style";

export const TaskDetail: React.FC<any> = () => {
  return (
    <TaskDetailWrapper>
      <Header />
    </TaskDetailWrapper>
  );
};

export default withRouter(TaskDetail);
