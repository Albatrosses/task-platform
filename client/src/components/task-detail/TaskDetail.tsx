import * as React from "react";
import { withRouter } from "react-router";
import { Concise } from "./components/concise/Concise";
import { Criterion } from "./components/criterion/Criterion";
import Header from "./components/header/Header";
import { Operating } from "./components/operating/Operating";
import { TaskDetailWrapper } from "./TaskDetail.style";

export const TaskDetail: React.FC<any> = () => {
  return (
    <TaskDetailWrapper>
      <Header />
      <Concise />
      <Criterion />
      <Operating />
    </TaskDetailWrapper>
  );
};

export default withRouter(TaskDetail);
