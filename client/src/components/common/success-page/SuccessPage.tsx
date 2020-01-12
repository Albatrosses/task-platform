import { Button, Result } from "antd";
import * as React from "react";
import { withRouter } from "react-router";
import { SuccessPageWrapper } from "./SuccessPage.style";

type TSuccessPageProps = {
  title?: string;
  subTitle?: string;
} & any;

export const PageNotFound: React.FC<TSuccessPageProps> = ({
  history,
  title,
  subTitle
}) => {
  return (
    <SuccessPageWrapper>
      <Result
        status="success"
        title={title}
        subTitle={subTitle}
        extra={[
          <Button type="primary" key="console" onClick={() => history.goBack()}>
            点击返回
          </Button>
        ]}
      />
    </SuccessPageWrapper>
  );
};

export default withRouter(PageNotFound);
