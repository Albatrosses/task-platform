import { Tag } from "antd-mobile";
import { map } from "lodash";
import * as React from "react";
import { COLOR } from "src/enum/style";
import { parseCurrency } from "src/helper/parse";
import styled from "styled-components";

type TTask = {
  key: string;
  name: string;
  image: string;
  tag: string[];
  total: number;
  reward: number;
  status: number;
};

const dataSource: TTask[] = [
  {
    key: "douyin1",
    name: "抖音任务",
    image: "src/assets/img/douyin.jpg",
    tag: ["抖音"],
    total: 500,
    reward: 500,
    status: 1
  },
  {
    key: "kuaishou2",
    name: "快手任务",
    image: "",
    tag: ["快手"],
    total: 500,
    reward: 500,
    status: 1
  },
  {
    key: "douyin3",
    name: "多平台任务",
    image: "",
    tag: ["抖音", "快手"],
    total: 500,
    reward: 500,
    status: 1
  },
  {
    key: "douyin4",
    name: "抖音任务",
    image: "",
    tag: ["抖音"],
    total: 500,
    reward: 500,
    status: 1
  },
  {
    key: "douyin5",
    name: "抖音任务",
    image: "",
    tag: ["抖音"],
    total: 500,
    reward: 500,
    status: 1
  }
];

export const TaskListing: React.FC<any> = () => {
  const renderListing = () => {
    const imageSrc = require("src/assets/img/douyin.jpg");
    return (
      <ul className="task-listing">
        {map(dataSource, ({ key, name, image, tag, total, reward, status }) => {
          return (
            <li className="task-listing-item" key={key}>
              <div className="task-image-wrapper">
                <img src={imageSrc} />
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
                {/* <div className="task-reward">{reward}</div> */}
              </div>
            </li>
          );
        })}
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
  background-color: ${COLOR.MAIN_BACKGROUND};
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
  overflow-y: auto;
  overflow-x: hidden;
  .task-listing {
    height: 100%;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .task-listing-item {
      width: 100%;
      height: 90px;
      margin: 20px 0;
      padding: 10px 6px;
      box-sizing: border-box;
      background-color: ${COLOR.ITEM_BACKGROUND};
      border-radius: 30px;
      display: flex;
      align-items: center;
      box-shadow: 1px 1px ${COLOR.ITEM_SHADOW};
      .task-image-wrapper {
        flex: 0 0 100px;
        height: 100%;
        box-sizing: border-box;
        padding: 0 14px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .task-content-wrapper {
        flex: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .task-name {
          font-size: 20px;
          font-weight: bolder;
        }
        .task-tag {
          & > div {
            background-color: #ffffff;
          }
        }
        .task-total {
          font-size: 10px;
        }
      }
      .task-result-wrapper {
        flex: 0 0 60px;
        .task-reward {
          font-size: 20px;
          font-weight: bolder;
        }
      }
    }
  }
`;
