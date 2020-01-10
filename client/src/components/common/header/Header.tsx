import { Avatar } from "antd";
import { NavBar } from "antd-mobile";
import * as React from "react";
import { withRouter } from "react-router-dom";
import { Icon } from "../icon/Icon";
import { HeaderWrapper } from "./Header.style";

type THeaderProps = {
  icon?: any;
  leftContent?: any;
  rightContent?: any;
  onLeftClick?: () => void;
} & any;

export const Header: React.FC<THeaderProps> = ({
  history,
  icon,
  leftContent,
  rightContent,
  onLeftClick
}) => {
  return (
    <HeaderWrapper>
      <NavBar
        className="header"
        mode="light"
        icon={
          icon || (
            <Icon key="left" type="left" onClick={() => history.goBack()} />
          )
        }
        leftContent={leftContent}
        onLeftClick={onLeftClick}
        rightContent={rightContent || <Avatar size="large" icon="user" />}
      >
        有赞吧
      </NavBar>
    </HeaderWrapper>
  );
};

export default withRouter(Header);
