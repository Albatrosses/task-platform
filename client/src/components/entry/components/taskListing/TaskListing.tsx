import { useQuery } from "@apollo/react-hooks";
import { find, get, map } from "lodash";
import * as React from "react";
import { withRouter } from "react-router";
import { Loading } from "src/components/common/loading/Loading";
import { platformsConfig } from "src/config/common";
import { getNowString } from "src/helper";
import { parseCurrency } from "src/helper/common";
import { DATE_TYPE_CODE } from "src/types/common/date";
import { ORDER_STATUS_CODE } from "src/types/common/order";
import { PLATFORM_CODE } from "src/types/common/platform";
import { TASK_LISTING } from "./gql";
import { TaskListingWrapper } from "./TaskListing.style";

export const TaskListing: React.FC<any> = ({ history }) => {
  const { data, loading } = useQuery(TASK_LISTING, {
    variables: {
      queryTaskListingInput: {
        date: {
          min: getNowString(),
          max: "",
          dateType: DATE_TYPE_CODE.END_DATE
        },
        order: ORDER_STATUS_CODE.DESC
      }
    }
  });
  const taskListing = get(data, "taskListing.data", []);

  const renderHeader = () => {
    return (
      <div className="entry-task-listing-header">
        <div className="entry-task-listing-header-title">热门任务</div>
        {/* <div
          className="entry-task-listing-header-random"
          onClick={() => refetch()}
        >
          <Icon type="redo" />
          <span>换一批</span>
        </div> */}
      </div>
    );
  };

  const renderTaskListing = () => {
    const renderContent = () => {
      return (
        <div className="entry-task-listing">
          {map(
            taskListing,
            ({ id, name, simple, platform, total, amount, endDate }, key) => {
              return (
                <ul className="entry-task-listing-data">
                  <li
                    className="task-listing-item"
                    key={key}
                    onClick={() => history.push(`/task-listing/detail/${id}`)}
                  >
                    <div className="task-image-wrapper">
                      <img
                        src={get(
                          find(platformsConfig, [
                            "code",
                            get(platform, "code", PLATFORM_CODE.DEFAULT)
                          ]),
                          "code"
                        )}
                      />
                    </div>
                    <div className="task-content-wrapper">
                      <div className="task-name">
                        <span className="task-name-context">{name}</span>
                      </div>
                      <div className="task-simple">
                        <span className="task-simple-context">{simple}</span>
                      </div>
                      <div className="task-total">剩余数量：{total}</div>
                    </div>
                    <div className="task-amount-wrapper">
                      <div className="task-amount">{parseCurrency(amount)}</div>
                    </div>
                  </li>
                </ul>
              );
            }
          )}
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
