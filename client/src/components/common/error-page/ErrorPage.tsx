import { Button, Result } from "antd";
import * as React from "react";
import { withRouter } from "react-router";
import { ErrorPageWrapper } from "./ErrorPage.style";

type TErrorPageProps = {
  title?: string;
  subTitle?: string;
} & any;

export const ErrorPage: React.FC<TErrorPageProps> = ({
  history,
  title,
  subTitle
}) => {
  return (
    <ErrorPageWrapper>
      <Result
        status="error"
        title={title}
        subTitle={subTitle}
        extra={[
          <Button type="primary" key="console" onClick={() => history.goBack()}>
            点击返回
          </Button>
        ]}
      />
    </ErrorPageWrapper>
  );
};

export default withRouter(ErrorPage);
