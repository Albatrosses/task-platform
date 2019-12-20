import { Carousel, Tag } from "antd-mobile";
import classnames from "classnames";
import { filter, map } from "lodash";
import * as React from "react";
import { useState } from "react";
import { parseCurrency } from "src/helper/parse";
import { taskListing } from "./dataSource";
import { generateThirdPartyFilter } from "./helper";
import {
  FilterWrapper,
  HeroWrapper,
  ListingWrapper,
  TaskListingWrapper
} from "./TaskListing.style";

export const TaskListing: React.FC<any> = () => {
  const [currentFilterStatus, setCurrentFilterStatus] = useState();

  const renderHero = () => {
    return (
      <Carousel autoplay={false} infinite>
        <a
          key={"asdsadasfasf"}
          href="http://www.alipay.com"
          style={{ display: "inline-block", width: "100%", height: "90px" }}
        >
          <img
            src="https://media.st.dl.bscstorage.net/steam/apps/1147560/header.jpg?t=1576578161"
            style={{ width: "100%", verticalAlign: "top" }}
          />
        </a>
      </Carousel>
    );
  };

  const renderFilter = () => {
    const thirdPartyFilter = generateThirdPartyFilter();
    return (
      <div className="task-filter">
        {map(thirdPartyFilter, ({ key, name, status }) => {
          return (
            <div
              key={key}
              className={classnames("task-filter-item", {
                active: status === currentFilterStatus
              })}
              onClick={() => setCurrentFilterStatus(status)}
            >
              {name}(
              {
                filter(taskListing, task => !status || task.status === status)
                  .length
              }
              )
            </div>
          );
        })}
      </div>
    );
  };

  const renderListing = () => {
    return (
      <ul className="task-listing">
        {map(
          filter(
            taskListing,
            ({ status }) =>
              !currentFilterStatus || status === currentFilterStatus
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
    );
  };

  return (
    <TaskListingWrapper>
      <HeroWrapper>{renderHero()}</HeroWrapper>
      <FilterWrapper>{renderFilter()}</FilterWrapper>
      <ListingWrapper>{renderListing()}</ListingWrapper>
    </TaskListingWrapper>
  );
};
