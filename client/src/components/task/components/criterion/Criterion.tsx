import { Button } from "antd";
import * as React from "react";
import { CriterionWrapper } from "./Criterion.style";

export const Criterion: React.FC<any> = () => {
  return (
    <CriterionWrapper>
      <div className="criterion-wrapper">
        <h3>
          任务审核标准：
          <Button className="criterion-guide" type="link">
            新手教程
          </Button>
        </h3>
        <p>1、图片必须清晰可见；</p>
        <p>2、不可重复上传；</p>
        <p>3、仅支持JPG/PNG格式；</p>
        <p>4、图片不能超过2MB。</p>
      </div>
    </CriterionWrapper>
  );
};
