import { Badge } from "antd-mobile";
import { get } from "lodash";
import * as React from "react";
import { imagesConfig, statusConfig } from "src/components/task/config";
import { POLATFORM_CODE, TASK_STATUS_CODE } from "src/components/task/enum";
import { TTask } from "src/components/task/type";
import { parseCurrency } from "src/helper/common";
import { ConciseWrapper } from "./Concise.style";

type TConciseProps = {
  taskDetail: TTask;
};

export const Concise: React.FC<TConciseProps> = ({ taskDetail }) => {
  const { name, status, polatforms, description, reward, steps } = taskDetail;
  let image;
  if (polatforms.length === 1) {
    image = get(imagesConfig, `${polatforms[0].code}.image`, "");
  } else {
    image = get(imagesConfig, `${POLATFORM_CODE.DEFAULT}.image`, "");
  }
  const statusText = get(statusConfig, `${status}.name`, "");

  const renderStatus = () => {
    if (status === TASK_STATUS_CODE.UNASSIGNED) {
      return null;
    }
    return <Badge className={`task-status-${status}`} text={statusText} />;
  };

  return (
    <ConciseWrapper>
      <div className="concise-wrapper">
        <div className="concise-image-wrapper">
          <img className="concise-image" src={image} />
        </div>
        <div className="concise-status-wrapper">{renderStatus()}</div>
        <div className="concise-name-wrapper">{name}</div>
        <div className="concise-reward-wrapper">{parseCurrency(reward)}</div>
        <div className="concise-description-wrapper">{description}</div>
        <div className="concise-steps-wrapper">{steps}</div>
      </div>
    </ConciseWrapper>
  );
};
