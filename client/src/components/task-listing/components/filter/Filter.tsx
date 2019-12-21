import classnames from "classnames";
import { map } from "lodash";
import * as React from "react";
import { TASK_STATUS_CODE } from "src/enum/task";
import { generateThirdPartyFilter } from "../../hepler/helper";
import { TTask } from "../../type/type";
import { FilterWrapper } from "./Filter.style";

type TFilterProps = {
  taskListing?: TTask[];
  filterStatus: TASK_STATUS_CODE;
  setFilterStatus: (status?: TASK_STATUS_CODE) => void;
};

export const Filter: React.FC<TFilterProps> = ({
  filterStatus,
  setFilterStatus
}) => {
  const thirdPartyFilter = generateThirdPartyFilter();
  return (
    <FilterWrapper>
      <div className="task-filter">
        {map(thirdPartyFilter, ({ key, name, status }) => {
          return (
            <div
              key={key}
              className={classnames("task-filter-item", {
                active: status === filterStatus
              })}
              onClick={() => setFilterStatus(status)}
            >
              {name}
            </div>
          );
        })}
      </div>
    </FilterWrapper>
  );
};
