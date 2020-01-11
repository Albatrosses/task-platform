import * as React from "react";
import { withRouter } from "react-router";
import { Header as HeaderCommon } from "src/components/common/header/Header";
import { Icon } from "src/components/common/icon/Icon";
import { HeaderWrapper } from "./Header.style";

export const Headesr: React.FC<any> = ({ history }) => {
  return (
    <HeaderWrapper>
      <HeaderCommon
        icon={<Icon key="left" type="left" />}
        onLeftClick={() => history.goBack()}
      />
    </HeaderWrapper>
  );
};

export default withRouter(Headesr);
