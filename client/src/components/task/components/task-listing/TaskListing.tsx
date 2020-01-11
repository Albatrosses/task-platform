import { useQuery } from "@apollo/react-hooks";
import { get, keys } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Loading } from "src/components/common/loading/Loading";
import { platformsConfig } from "src/config/common";
import { TASK_STATUS_CODE } from "../../../../../../server/types/task/task";
import { Filter } from "./components/filter/Filter";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Listing from "./components/listing/Listing";
import { TASK_LISTING } from "./gql";
import { TaskListingWrapper } from "./TaskListing.style";

export const TaskListing: React.FC<any> = ({ location }) => {
  const [filters, setFilters] = useState({
    page: 1,
    status: TASK_STATUS_CODE.ALL,
    platform: keys(platformsConfig).map(item => Number(item)),
    amount: [0, 0],
    date: ["", ""]
  });
  const [sortType, setSortType] = useState(0);
  const [sortOrder, setSortOrder] = useState(0);

  const { status, page, platform, amount, date } = filters;
  const { data, loading, refetch } = useQuery(TASK_LISTING, {
    variables: { page, status, platform, amount, date }
  });
  const taskListing = get(data, "taskListing", []);

  useEffect(() => {
    refetch();
  }, [location, filters]);

  return (
    <TaskListingWrapper>
      <Header
        platform={platform}
        amount={amount}
        date={date}
        sortType={sortType}
        sortOrder={sortOrder}
        setPlatform={(platformInput: any) =>
          setFilters({ ...filters, platform: platformInput })
        }
        setAmount={(amountInput: any) =>
          setFilters({ ...filters, amount: amountInput })
        }
        setDate={(dateInput: any) =>
          setFilters({ ...filters, date: dateInput })
        }
        setSortType={setSortType}
        setSortOrder={setSortOrder}
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
        content={
          <Listing
            taskListing={taskListing}
            filterStatus={status}
            sortType={sortType}
            sortOrder={sortOrder}
          />
        }
      />
    </TaskListingWrapper>
  );
};

export default withRouter(TaskListing);
