import { Tag } from "antd-mobile";
import { filter, map } from "lodash";
import * as React from "react";
import { withRouter } from "react-router";
import { TASK_STATUS_CODE } from "src/enum/task";
import { parseCurrency } from "src/helper/common";
import { TTask } from "../../type/type";
import { ListingWrapper } from "./Listing.style";

type TListingProps = {
  taskListing: TTask[];
  filterStatus: TASK_STATUS_CODE;
} & any;

export const Listing: React.FC<TListingProps> = ({
  taskListing,
  filterStatus,
  history
}) => {
  return (
    <ListingWrapper>
      <ul className="task-listing">
        {map(
          filter(
            taskListing,
            ({ status }) => !filterStatus || status === filterStatus
          ),
          ({ id, key, name, image, tag, total, reward, status }) => {
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
                  <div className="task-name">{name}</div>
                  <div className="task-tag">
                    {map(tag, word => (
                      <Tag small selected>
                        {word}
                      </Tag>
                    ))}
                  </div>
                  <div className="task-total">剩余数量：{total}</div>
                </div>
                <div className="task-result-wrapper">
                  <div className="task-reward">{parseCurrency(reward)}</div>
                  {/* <div className="task-status">{status}</div> */}
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
