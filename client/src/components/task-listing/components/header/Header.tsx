import { NavBar } from "antd-mobile";
import * as React from "react";
import { withRouter } from "react-router";
import { Icon } from "src/components/common/icon/Icon";
import { HeaderWrapper } from "./Header.style";

export const Header: React.FC<any> = ({ history }) => {
  return (
    <HeaderWrapper>
      <NavBar
        className="header"
        mode="light"
        icon={<Icon key="left" type="left" />}
        rightContent={<Icon key="filter" type="filter" />}
        onLeftClick={() => history.goBack()}
      />
    </HeaderWrapper>
  );
};

export default withRouter(Header);
