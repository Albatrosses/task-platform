import * as React from "react";
import { useState } from "react";
import { withRouter } from "react-router";
import { Filter } from "./components/filter/Filter";
import Header from "./components/header/Header";
import { Hero } from "./components/hero/Hero";
import { Listing } from "./components/listing/Listing";
import { taskListing } from "./data/data";
import { TaskListingWrapper } from "./TaskListing.style";

const TaskListing: React.FC<any> = () => {
  const [filterStatus, setFilterStatus] = useState();

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
