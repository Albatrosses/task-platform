// import { useQuery } from "@apollo/react-hooks";
// import { get } from "lodash";
import * as React from "react";
import { useState } from "react";
import { withRouter } from "react-router";
import { Filter } from "./components/filter/Filter";
import Header from "./components/header/Header";
import { Hero } from "./components/hero/Hero";
import Listing from "./components/listing/Listing";
import { taskListing } from "./data/data";
// import { TASK_LISTING } from "./gql";
import { TaskListingWrapper } from "./TaskListing.style";

export const TaskListing: React.FC<any> = () => {
  const [filterStatus, setFilterStatus] = useState();
  // const [page, setPage] = useState(0);
  // const { data } = useQuery(TASK_LISTING, {
  //   variables: { page: 0 }
  // });
  // const taskListing = get(data, "getTaskListing", []);

  return (
    <TaskListingWrapper>
      <Header />
      <Hero />
      <Filter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        taskListing={taskListing}
      />
      <Listing taskListing={taskListing} filterStatus={filterStatus} />
    </TaskListingWrapper>
  );
};

export default withRouter(TaskListing);
