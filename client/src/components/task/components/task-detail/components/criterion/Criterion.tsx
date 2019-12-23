import * as React from "react";
import { CriterionWrapper } from "./Criterion.style";

export const Criterion: React.FC<any> = () => {
  return (
    <CriterionWrapper>
      <div className="criterion-wrapper">
        <h4>
          任务审核标准：<div className="criterion-guide-wrapper">新手教程</div>
        </h4>
        <p>1、图片必须清晰可见；</p>
        <p>2、不可重复上传；</p>
        <p>3、不可XXXX；</p>
        <p>4、必须XXXXXX。</p>
      </div>
    </CriterionWrapper>
  );
};
