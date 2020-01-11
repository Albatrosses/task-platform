import { Badge } from "antd-mobile";
import { get } from "lodash";
import * as React from "react";
import { platformsConfig, statusConfig } from "src/config/common";
import { parseCurrency } from "src/helper/common";
import { PLATFORM_CODE } from "../../../../../../../../server/types/common/platform";
import { TASK_STATUS_CODE } from "../../../../../../../../server/types/task/task";
import { ConciseWrapper } from "./Concise.style";

type TConciseProps = {
  taskDetail: any;
};

export const Concise: React.FC<TConciseProps> = ({ taskDetail }) => {
  const { name, status, platforms, description, amount, steps } = taskDetail;
  let image;
  if (platforms.length === 1) {
    image = get(platformsConfig, `${platforms[0].code}.image`, "");
  } else {
    image = get(platformsConfig, `${PLATFORM_CODE.DEFAULT}.image`, "");
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
        <div className="concise-amount-wrapper">{parseCurrency(amount)}</div>
        <div className="concise-description-wrapper">{description}</div>
        <div className="concise-steps-wrapper">{steps}</div>
      </div>
    </ConciseWrapper>
  );
};
