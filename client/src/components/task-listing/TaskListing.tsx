import { Tag } from "antd-mobile";
import classnames from "classnames";
import { filter, map } from "lodash";
import * as React from "react";
import { useState } from "react";
import { parseCurrency } from "src/helper/parse";
import { taskListing } from "./dataSource";
import { generateThirdPartyFilter } from "./helper";
import {
  FilterWrapper,
  ListingWrapper,
  TaskListingWrapper
} from "./TaskListing.style";

export const TaskListing: React.FC<any> = () => {
  const [currentFilterStatus, setCurrentFilterStatus] = useState();

  const renderFilter = () => {
    const thirdPartyFilter = generateThirdPartyFilter();
    return (
      <div className="task-filter">
        {map(thirdPartyFilter, ({ name, status }) => {
          return (
            <div
              className={classnames("task-filter-item", {
                active: status === currentFilterStatus
              })}
              onClick={() => setCurrentFilterStatus(status)}
            >
              {name}(
              {filter(taskListing, task => task.status === status).length})
            </div>
          );
        })}
      </div>
    );
  };

  const renderListing = () => {
    return (
      <ul className="task-listing">
        {map(taskListing, ({ id, name, image, tag, total, reward, status }) => {
          return (
            <li className="task-listing-item" key={id}>
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
                <div className="task-status">{status}</div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <TaskListingWrapper>
      <FilterWrapper>{renderFilter()}</FilterWrapper>
      <ListingWrapper>{renderListing()}</ListingWrapper>
    </TaskListingWrapper>
  );
};
