import { NavBar } from "antd-mobile";
import * as React from "react";
import { HeaderWrapper } from "./Header.style";

type THeaderProps = {
  className?: string;
  icon?: any;
  leftContent?: any;
  rightContent?: any;
  onLeftClick?: () => void;
} & any;

export const Header: React.FC<THeaderProps> = ({
  className,
  icon,
  leftContent,
  rightContent,
  onLeftClick
}) => {
  return (
    <HeaderWrapper className={className}>
      <NavBar
        className="header"
        mode="light"
        icon={icon}
        leftContent={leftContent}
        onLeftClick={onLeftClick}
        rightContent={rightContent}
      >
        有赞吧
      </NavBar>
    </HeaderWrapper>
  );
};
