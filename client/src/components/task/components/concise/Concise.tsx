import { Badge } from "antd-mobile";
import { get } from "lodash";
import * as React from "react";
import { platformsConfig, statusConfig } from "src/config/common";
import { parseCurrency } from "src/helper/common";
import { PLATFORM_CODE } from "src/types/common/platform";
import { TASK_STATUS_CODE } from "src/types/task/task";
import { ConciseWrapper } from "./Concise.style";

type TConciseProps = {
  task: any;
};

export const Concise: React.FC<TConciseProps> = ({ task }) => {
  const { name, status, platform, description, amount, steps } = task;
  const image = get(
    platformsConfig,
    `${get(platform, "code", PLATFORM_CODE.DEFAULT)}.image`,
    ""
  );
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
        <div className="concise-amount-wrapper">{parseCurrency(amount)}</div>
        <div className="concise-description-wrapper">{description}</div>
        <div className="concise-steps-wrapper">{steps}</div>
      </div>
    </ConciseWrapper>
  );
};
