import { map } from "lodash";
import * as React from "react";
import styled from "styled-components";

type TTask = {
  name: string;
  image: string;
  tag: string;
  total: number;
  reward: number;
  status: number;
};

const dataSource: TTask[] = [
  {
    name: "抖音任务",
    image: "src/assets/img/douyin.jpg",
    tag: "抖音",
    total: 5,
    reward: 500,
    status: 1
  },
  {
    name: "抖音任务",
    image: "",
    tag: "抖音",
    total: 5,
    reward: 500,
    status: 1
  },
  {
    name: "抖音任务",
    image: "",
    tag: "抖音",
    total: 5,
    reward: 500,
    status: 1
  },
  {
    name: "抖音任务",
    image: "",
    tag: "抖音",
    total: 5,
    reward: 500,
    status: 1
  },
  {
    name: "抖音任务",
    image: "",
    tag: "抖音",
    total: 5,
    reward: 500,
    status: 1
  }
];

export const TaskListing: React.FC<any> = () => {
  const renderListing = () => {
    return (
      <ul className="task-listing">
        {map(dataSource, ({ name, image, tag, total, reward, status }) => (
          <li className="task-listing-item" key={name}>
            <div className="task-image-wrapper">
              <img src={image} />
            </div>
            <div className="task-content-wrapper">
              <div className="task-name">{name}</div>
              <div className="task-tag-total">
                <div className="task-tag">{tag}</div>
                <div className="task-total">{total}</div>
              </div>
              <div className="task-reward-status">
                <div className="task-reward">{reward}</div>
                <div className="task-status">{status}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <TaskListingWrapper>
      <FilterWrapper>FilterWrapper</FilterWrapper>
      <ListingWrapper>{renderListing()}</ListingWrapper>
    </TaskListingWrapper>
  );
};

const TaskListingWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FilterWrapper = styled.div`
  flex: 0 0 50px;
  height: 50px;
  width: 100%;
`;

const ListingWrapper = styled.div`
  flex: auto;
  height: 100%;
  width: 100%;
  .task-listing {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .task-listing-item {
      height: 60px;
      width: 100%;
      padding: 10px 6px;
    }
  }
`;
