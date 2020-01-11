import { useQuery } from "@apollo/react-hooks";
import { get, map } from "lodash";
import * as React from "react";
import { useEffect } from "react";
import { withRouter } from "react-router";
import { Loading } from "src/components/common/loading/Loading";
import { platformsConfig } from "src/config/common";
import { getNowString } from "src/helper";
import { parseCurrency } from "src/helper/common";
import { DATE_TYPE_CODE } from "src/types/common/date";
import { ORDER_STATUS_CODE, ORDER_TYPE_CODE } from "src/types/common/order";
import { PLATFORM_CODE } from "src/types/common/platform";
import { TASK_LISTING } from "./gql";
import { TaskListingWrapper } from "./TaskListing.style";

export const TaskListing: React.FC<any> = ({ history, location }) => {
  const { data, loading, refetch } = useQuery(TASK_LISTING, {
    variables: {
      queryTaskListingInput: {
        date: {
          min: getNowString(),
          max: "",
          dateType: DATE_TYPE_CODE.END_DATE
        },
        order: {
          orderStatus: ORDER_STATUS_CODE.DESC,
          orderType: ORDER_TYPE_CODE.DEFAULT
        }
      }
    }
  });

  useEffect(() => {
    refetch();
  }, [location]);

  const taskListing = get(data, "taskListing.data", []).slice(0, 5);

  const renderHeader = () => {
    return (
      <div className="entry-task-listing-header">
        <div className="entry-task-listing-header-title">热门任务</div>
      </div>
    );
  };

  const renderTaskListing = () => {
    const renderContent = () => {
      return (
        <div className="entry-task-listing">
          {map(taskListing, ({ id, name, platform, total, amount }, key) => {
            const image = get(
              platformsConfig,
              `${get(platform, "code", PLATFORM_CODE.DEFAULT)}.image`,
              ""
            );
            return (
              <ul
                key={"entry-task-listing-data"}
                className="entry-task-listing-data"
              >
                <li
                  className="task-listing-item"
                  key={key}
                  onClick={() => history.push(`/task/${id}`)}
                >
                  <div className="task-image-wrapper">
                    <img src={image} />
                  </div>
                  <div className="task-content-wrapper">
                    <div className="task-name">
                      <span className="task-name-context">{name}</span>
                    </div>
                    <div className="task-total">剩余数量：{total}</div>
                  </div>
                  <div className="task-amount-wrapper">
                    <div className="task-amount">{parseCurrency(amount)}</div>
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
      );
    };
    return <Loading loading={loading} content={renderContent()} />;
  };

  return (
    <TaskListingWrapper>
      {renderHeader()}
      {renderTaskListing()}
    </TaskListingWrapper>
  );
};

export default withRouter(TaskListing);
