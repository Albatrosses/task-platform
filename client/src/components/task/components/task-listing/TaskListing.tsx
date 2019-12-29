import { useQuery } from "@apollo/react-hooks";
import { get, keys } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Loading } from "src/components/common/loading/Loading";
import { platformsConfig } from "../../config";
import { TASK_STATUS_CODE } from "../../enum";
import { Filter } from "./components/filter/Filter";
import Header from "./components/header/Header";
import { Hero } from "./components/hero/Hero";
import Listing from "./components/listing/Listing";
import { TASK_LISTING } from "./gql";
import { TaskListingWrapper } from "./TaskListing.style";

export const TaskListing: React.FC<any> = ({ location }) => {
  const [filters, setFilters] = useState({
    page: 1,
    status: TASK_STATUS_CODE.ALL,
    platform: keys(platformsConfig).map(item => Number(item)),
    reward: [0, 0],
    date: ["", ""]
  });

  const { status, page, platform, reward, date } = filters;
  const { data, loading, refetch } = useQuery(TASK_LISTING, {
    variables: { page, status, platform, reward, date }
  });
  const taskListing = get(data, "queryTaskListing", []);

  useEffect(() => {
    refetch();
  }, [location, filters]);

  return (
    <TaskListingWrapper>
      <Header
        platform={platform}
        reward={reward}
        date={date}
        setPlatform={(platformInput: any) =>
          setFilters({ ...filters, platform: platformInput })
        }
        setReward={(rewardInput: any) =>
          setFilters({ ...filters, reward: rewardInput })
        }
        setDate={(dateInput: any) =>
          setFilters({ ...filters, date: dateInput })
        }
      />
      <Hero />
      <Filter
        status={status}
        setFilters={statusInput =>
          setFilters({ ...filters, status: statusInput })
        }
      />
      <Loading
        loading={loading}
        content={<Listing taskListing={taskListing} filterStatus={status} />}
      />
    </TaskListingWrapper>
  );
};

export default withRouter(TaskListing);
