import classnames from "classnames";
import { map } from "lodash";
import * as React from "react";
import { statusConfig } from "src/components/task/config";
import { TASK_STATUS_CODE } from "src/components/task/enum";
import { FilterWrapper } from "./Filter.style";

type TFilterProps = {
  filterStatus: TASK_STATUS_CODE;
  setFilterStatus: (status?: TASK_STATUS_CODE) => void;
};

export const Filter: React.FC<TFilterProps> = ({
  filterStatus,
  setFilterStatus
}) => {
  return (
    <FilterWrapper>
      <div className="task-filter">
        {map(statusConfig, ({ name }, key) => {
          return (
            <div
              key={key}
              className={classnames("task-filter-item", {
                active: Number(key) === filterStatus
              })}
              onClick={() => setFilterStatus(Number(key))}
            >
              {name}
            </div>
          );
        })}
      </div>
    </FilterWrapper>
  );
};
