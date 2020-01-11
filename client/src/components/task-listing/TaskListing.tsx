import { useQuery } from "@apollo/react-hooks";
import { get, keys } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { platformsConfig } from "src/config/common";
import { DATE_TYPE_CODE } from "src/types/common/date";
import { ORDER_STATUS_CODE, ORDER_TYPE_CODE } from "src/types/common/order";
import { TASK_STATUS_CODE } from "src/types/task/task";
import { Loading } from "../common/loading/Loading";
import { Filter } from "./components/filter/Filter";
import { Header } from "./components/header/Header";
import Listing from "./components/listing/Listing";
import { TASK_LISTING, USER_TASK_LISTING } from "./gql";
import { TaskListingWrapper } from "./TaskListing.style";

export const TaskListing: React.FC<any> = ({ location }) => {
  const [filters, setFilters] = useState({
    page: 1,
    status: TASK_STATUS_CODE.UNASSIGNED,
    platformCodes: keys(platformsConfig).map(item => Number(item)),
    amount: {
      min: 0,
      max: 0
    },
    date: {
      min: "",
      max: "",
      dateType: DATE_TYPE_CODE.END_DATE
    }
  });
  const [order, setOrder] = useState({
    orderStatus: ORDER_STATUS_CODE.DESC,
    orderType: ORDER_TYPE_CODE.DEFAULT
  });
  const { status, page, platformCodes, amount, date } = filters;

  const gql =
    status === TASK_STATUS_CODE.UNASSIGNED ? TASK_LISTING : USER_TASK_LISTING;

  const { data, loading, refetch } = useQuery(gql, {
    variables: {
      queryTaskListingInput: {
        page,
        status,
        platformCodes,
        amount,
        date,
        order
      },
      queryUserTaskListingInput: {
        page,
        status,
        platformCodes,
        amount,
        date,
        order
      }
    }
  });

  const taskListing = get(data, "taskListing.data", []);

  useEffect(() => {
    refetch();
  }, [location, filters, order]);

  return (
    <TaskListingWrapper>
      <Header
        platformCodes={platformCodes}
        amount={amount}
        date={date}
        order={order}
        setPlatformCodes={(curPlatformCodes: any) =>
          setFilters({ ...filters, platformCodes: curPlatformCodes })
        }
        setAmount={(curAmount: any) =>
          setFilters({ ...filters, amount: curAmount })
        }
        setDate={(curDate: any) => setFilters({ ...filters, date: curDate })}
        setOrder={(curOrder: any) => setOrder(curOrder)}
      />
      <Filter
        status={status}
        setStatus={(curStatus: any) =>
          setFilters({ ...filters, status: curStatus })
        }
      />
      <Loading
        loading={loading}
        content={<Listing taskListing={taskListing} />}
      />
    </TaskListingWrapper>
  );
};

export default withRouter(TaskListing);
