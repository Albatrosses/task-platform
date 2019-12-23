import { useQuery } from "@apollo/react-hooks";
import { get } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Loading } from "src/components/common/loading/Loading";
import { TASK_STATUS_CODE } from "../../enum";
import { Filter } from "./components/filter/Filter";
import Header from "./components/header/Header";
import { Hero } from "./components/hero/Hero";
import Listing from "./components/listing/Listing";
import { TASK_LISTING } from "./gql";
import { TaskListingWrapper } from "./TaskListing.style";

export const TaskListing: React.FC<any> = ({ location }) => {
  const [filterStatus, setFilterStatus] = useState(TASK_STATUS_CODE.ALL as any);
  const [page] = useState(0);
  const { data, loading, refetch } = useQuery(TASK_LISTING, {
    variables: { page }
  });
  const taskListing = get(data, "queryTaskListing", []);

  useEffect(() => {
    refetch();
  }, [location]);

  return (
    <TaskListingWrapper>
      <Header />
      <Hero />
      <Filter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
      <Loading
        loading={loading}
        content={
          <Listing taskListing={taskListing} filterStatus={filterStatus} />
        }
      />
    </TaskListingWrapper>
  );
};

export default withRouter(TaskListing);
