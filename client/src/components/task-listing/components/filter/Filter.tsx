import classnames from "classnames";
import { map } from "lodash";
import * as React from "react";
import { statusConfig } from "src/config/common";
import { TASK_STATUS_CODE } from "src/types/task/task";
import { FilterWrapper } from "./Filter.style";

type TFilterProps = {
  status: TASK_STATUS_CODE;
  setStatus: (status: TASK_STATUS_CODE) => void;
};

export const Filter: React.FC<TFilterProps> = ({ status, setStatus }) => {
  const renderStatusFilter = () => {
    return (
      <div className="status-filter">
        {map(statusConfig, ({ name }, statusCode) => {
          return (
            <div
              key={statusCode}
              className={classnames("status-filter-item", {
                active: Number(statusCode) === status
              })}
              onClick={() => setStatus(Number(statusCode))}
            >
              {name}
            </div>
          );
        })}
      </div>
    );
  };

  return <FilterWrapper>{renderStatusFilter()}</FilterWrapper>;
};
