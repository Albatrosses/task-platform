import { Tag } from "antd-mobile";
import { filter, map } from "lodash";
import * as React from "react";
import { TASK_STATUS_CODE } from "src/enum/task";
import { parseCurrency } from "src/helper/common";
import { TTask } from "../../type/type";
import { ListingWrapper } from "./Listing.style";

type TListingProps = {
  taskListing: TTask[];
  filterStatus: TASK_STATUS_CODE;
};

export const Listing: React.FC<TListingProps> = ({
  taskListing,
  filterStatus
}) => {
  return (
    <ListingWrapper>
      <ul className="task-listing">
        {map(
          filter(
            taskListing,
            ({ status }) => !filterStatus || status === filterStatus
          ),
          ({ key, name, image, tag, total, reward, status }) => {
            return (
              <li className="task-listing-item" key={key}>
                <div className="task-image-wrapper">
                  <img src={image} />
                </div>
                <div className="task-content-wrapper">
                  <div className="task-name">{name}</div>
                  <div className="task-tag">
                    <Tag small selected>
                      {tag}
                    </Tag>
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
