import { Button } from "antd-mobile";
import * as React from "react";
import { TASK_STATUS_CODE } from "src/components/task/enum";
import { TTask } from "src/components/task/type";
import { OperatingWrapper } from "./Operating.style";

type TConciseProps = {
  taskDetail: TTask;
  changeTaskDetail: any;
};

export const Operating: React.FC<TConciseProps> = ({
  taskDetail,
  changeTaskDetail
}) => {
  const { id, status } = taskDetail;

  const renderContent = () => {
    if (status === TASK_STATUS_CODE.UNASSIGNED) {
      return (
        <Button
          type="primary"
          onClick={() =>
            changeTaskDetail({
              variables: {
                input: { id, status: TASK_STATUS_CODE.ASSIGNED }
              }
            })
          }
        >
          接受任务
        </Button>
      );
    }
    return null;
  };

  return (
    <OperatingWrapper>
      <div className="operating-wrapper">{renderContent()}</div>
    </OperatingWrapper>
  );
};
