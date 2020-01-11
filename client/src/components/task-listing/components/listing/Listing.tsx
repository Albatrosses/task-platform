import { Badge, Tag } from "antd-mobile";
import { get, map } from "lodash";
import * as React from "react";
import { withRouter } from "react-router";
import { platformsConfig, statusConfig } from "src/config/common";
import { parseCurrency } from "src/helper/common";
import { PLATFORM_CODE } from "src/types/common/platform";
import { TASK_STATUS_CODE } from "src/types/task/task";
import { ListingWrapper } from "./Listing.style";

type TListingProps = {
  taskListing: any[];
} & any;

export const Listing: React.FC<TListingProps> = ({ history, taskListing }) => {
  const renderStatus = (status: number, statusText: string) => {
    if (status === TASK_STATUS_CODE.UNASSIGNED) {
      return null;
    }
    return <Badge className={`task-status-${status}`} text={statusText} />;
  };

  return (
    <ListingWrapper>
      <ul className="task-listing">
        {map(
          taskListing,
          ({ id, name, simple, platform, total, amount, status }, key) => {
            const tag = get(
              platformsConfig,
              `${get(platform, "code", PLATFORM_CODE.DEFAULT)}.name`,
              ""
            );
            const image = get(
              platformsConfig,
              `${get(platform, "code", PLATFORM_CODE.DEFAULT)}.image`,
              ""
            );
            const statusText = get(statusConfig, `${status}.name`, "");
            return (
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
                    {renderStatus(status, statusText)}
                  </div>
                  <div className="task-tags">
                    <Tag small selected>
                      {tag}
                    </Tag>
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
