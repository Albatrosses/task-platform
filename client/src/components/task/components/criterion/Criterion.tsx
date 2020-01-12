import { Button, Input } from "antd";
import { Toast } from "antd-mobile";
import copy from "copy-to-clipboard";
import { get, map } from "lodash";
import * as React from "react";
import { CriterionWrapper } from "./Criterion.style";

export const Criterion: React.FC<any> = ({ task }) => {
  const { steps, criteria, platform } = task;
  const link = get(platform, "link", "");
  return (
    <CriterionWrapper>
      <div className="criterion-wrapper">
        <div className="criterion-link">
          <Input
            addonAfter={
              <Button
                icon="copy"
                onClick={() => {
                  copy(link);
                  Toast.info("复制成功，请使用默认浏览器打开", 1);
                }}
              >
                点击复制
              </Button>
            }
            defaultValue={link}
            disabled
          />
        </div>
        <h3>任务流程：</h3>
        <div className="criterion-steps-wrapper">
          {map(steps, (item, key) => {
            return (
              <p key={key}>
                {key + 1}. {item}
              </p>
            );
          })}
        </div>
        <h3>任务审核标准：</h3>
        <div className="criterion-rriterion-wrapper">
          {map(criteria, (item, key) => {
            return (
              <p key={key}>
                {key + 1}. {item}
              </p>
            );
          })}
        </div>
      </div>
    </CriterionWrapper>
  );
};
