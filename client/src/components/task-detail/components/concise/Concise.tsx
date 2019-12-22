// import { useQuery } from "@apollo/react-hooks";
// import { get } from "lodash";
import * as React from "react";
import { taskListing } from "src/components/task-listing/data/data";
import { ConciseWrapper } from "./Concise.style";
// import { TASK_DETAIL } from "./gql";

export const Concise: React.FC<any> = () => {
  // const { data } = useQuery(TASK_DETAIL, {
  //   variables: { id: 1 }
  // });

  // const { image, name, reward, description, steps } = get(
  //   data,
  //   "getTaskDetail",
  //   {}
  // );

  const { image, name, reward } = taskListing[0];

  return (
    <ConciseWrapper>
      <div className="concise-wrapper">
        <div className="concise-image-wrapper">
          <img className="concise-image" src={image} />
        </div>
        <div className="concise-name-wrapper">{name}</div>
        <div className="concise-reward-wrapper">￥{reward}</div>
        <div className="concise-description-wrapper">
          {
            "任务描述，任务描述，任务描述，任务描述，任务描述，任务描述，任务描述，任务描述，任务描述，任务描述"
          }
        </div>
        <div className="concise-steps-wrapper">
          {"点击复制链接 -> 打开对应应用 -> 点赞 -> 上传凭据 -> 领取酬金"}
        </div>
        <div className="concise-guide-wrapper">新手教程</div>
      </div>
    </ConciseWrapper>
  );
};
