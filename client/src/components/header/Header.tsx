import { Icon, NavBar } from "antd-mobile";
import * as React from "react";
import styled from "styled-components";

export const Header: React.FC<any> = () => {
  return (
    <HeaderWrapper>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        // tslint:disable-next-line: no-console
        onLeftClick={() => console.log("onLeftClick")}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: "16px" }} />,
          <Icon key="1" type="ellipsis" />
        ]}
      >
        有赞吧
      </NavBar>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  flex: 0 0 40px;
`;
