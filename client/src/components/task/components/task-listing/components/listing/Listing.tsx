import { Badge, Tag } from "antd-mobile";
import { filter, get, map } from "lodash";
import * as React from "react";
import { withRouter } from "react-router";
import { imagesConfig, statusConfig } from "src/components/task/config";
import { POLATFORM_CODE, TASK_STATUS_CODE } from "src/components/task/enum";
import { TTask } from "src/components/task/type";
import { parseCurrency } from "src/helper/common";
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
          filter(
            taskListing,
            ({ status }) => !filterStatus || status === filterStatus
          ),
          ({ id, name, simple, polatforms, total, reward, status }, key) => {
            const tags = map(polatforms, ({ code }) =>
              get(imagesConfig, `${code}.name`, "")
            );
            let image;
            if (polatforms.length === 1) {
              image = get(imagesConfig, `${polatforms[0].code}.image`, "");
            } else {
              image = get(imagesConfig, `${POLATFORM_CODE.DEFAULT}.image`, "");
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
                <div className="task-reward-wrapper">
                  <div className="task-reward">{parseCurrency(reward)}</div>
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
