import classnames from "classnames";
import { map } from "lodash";
import * as React from "react";
import { statusConfig } from "src/components/task/config";
import { TASK_STATUS_CODE } from "src/components/task/enum";
import { FilterWrapper } from "./Filter.style";

type TFilterProps = {
  status: TASK_STATUS_CODE;
  setFilters: (status: TASK_STATUS_CODE) => void;
};

export const Filter: React.FC<TFilterProps> = ({ status, setFilters }) => {
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
              onClick={() => setFilters(Number(statusCode))}
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
