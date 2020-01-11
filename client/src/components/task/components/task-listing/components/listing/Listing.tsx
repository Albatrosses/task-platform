import { Badge, Tag } from "antd-mobile";
import { filter, get, map } from "lodash";
import * as React from "react";
import { withRouter } from "react-router";
import { platformsConfig, statusConfig } from "src/config/common";
import { parseCurrency } from "src/helper/common";
import { PLATFORM_CODE } from "../../../../../../../../server/types/common/platform";
import { TASK_STATUS_CODE } from "../../../../../../../../server/types/task/task";
import { ListingWrapper } from "./Listing.style";

type TListingProps = {
  taskListing: any[];
  filterStatus: any;
  sortType: any;
  sortOrder: any;
} & any;

export const Listing: React.FC<TListingProps> = ({
  history,
  taskListing,
  filterStatus,
  sortType,
  sortOrder
}) => {
  const renderStatus = (status: number, statusText: string) => {
    if (status === TASK_STATUS_CODE.UNASSIGNED) {
      return null;
    }
    return <Badge className={`task-status-${status}`} text={statusText} />;
  };

  const taskListingMirror = taskListing.sort((proTask: any, nextTask: any) => {
    switch (sortType) {
      case 0:
        return sortOrder ? proTask.id - nextTask.id : nextTask.id - proTask.id;
      case 1:
        return sortOrder
          ? proTask.amount - nextTask.amount
          : nextTask.amount - proTask.amount;
      case 2:
        return sortOrder
          ? new Date(proTask.startDate).getTime() -
              new Date(nextTask.startDate).getTime()
          : new Date(nextTask.startDate).getTime() -
              new Date(proTask.startDate).getTime();
      default:
        return sortOrder ? proTask.id - nextTask.id : nextTask.id - proTask.id;
    }
  });

  return (
    <ListingWrapper>
      <ul className="task-listing">
        {map(
          filter(
            taskListingMirror,
            ({ status }) => !filterStatus || status === filterStatus
          ),
          ({ id, name, simple, platforms, total, amount, status }, key) => {
            const tags = map(platforms, ({ code }) =>
              get(platformsConfig, `${code}.name`, "")
            );
            let image;
            if (platforms.length === 1) {
              image = get(platformsConfig, `${platforms[0].code}.image`, "");
            } else {
              image = get(
                platformsConfig,
                `${PLATFORM_CODE.DEFAULT}.image`,
                ""
              );
            }
            const statusText = get(statusConfig, `${status}.name`, "");
            return (
              <li
                className="task-listing-item"
                key={key}
                onClick={() => history.push(`/task-listing/detail/${id}`)}
              >
                <div className="task-image-wrapper">
                  <img src={image} />
                </div>
                <div className="task-content-wrapper">
                  <div className="task-name">
                    <span className="task-name-context">{name}</span>
                    {renderStatus(status, statusText)}
                  </div>
                  <div className="task-tags">
                    {map(tags, (word, tagKey) => (
                      <Tag key={tagKey} small selected>
                        {word}
                      </Tag>
                    ))}
                  </div>
                  <div className="task-total">剩余数量：{total}</div>
                </div>
                <div className="task-amount-wrapper">
                  <div className="task-amount">{parseCurrency(amount)}</div>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </ListingWrapper>
  );
};

export default withRouter(Listing);
