import { Button, Result } from "antd";
import * as React from "react";
import { withRouter } from "react-router";
import { PageNotFoundWrapper } from "./PageNotFound.style";

export const PageNotFound: React.FC<any> = ({ history }) => {
  return (
    <PageNotFoundWrapper>
      <Result
        status="404"
        title="404"
        subTitle="页面不存在"
        extra={
          <Button type="primary" onClick={() => history.goBack()}>
            点击返回
          </Button>
        }
      />
    </PageNotFoundWrapper>
  );
};

export default withRouter(PageNotFound);
