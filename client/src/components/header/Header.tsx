import { Avatar } from "antd";
import { NavBar } from "antd-mobile";
import * as React from "react";
import { withRouter } from "react-router";
import { HeaderWrapper } from "./Header.style";

export const Header: React.FC<any> = ({ history }) => {
  return (
    <HeaderWrapper>
      <NavBar
        className="header"
        mode="dark"
        rightContent={<Avatar size="large" icon="user" />}
      >
        有赞吧
      </NavBar>
    </HeaderWrapper>
  );
};

export default withRouter(Header);
