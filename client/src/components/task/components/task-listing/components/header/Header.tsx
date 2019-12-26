import { Drawer, NavBar } from "antd-mobile";
import * as React from "react";
import { useState } from "react";
import { withRouter } from "react-router";
import { Icon } from "src/components/common/icon/Icon";
import { HeaderWrapper } from "./Header.style";

export const Header: React.FC<any> = ({ history }) => {
  const [open, setOpen] = useState(false);

  const renderAllFilter = () => {
    const renderContent = () => {
      return (
        <div className="all-filter-wrapper">
          <div className="all-filter-third-party">第三方平台筛选</div>
          <div className="all-filter-reward">报酬筛选</div>
          <div className="all-filter-date">日期筛选</div>
        </div>
      );
    };

    return (
      <Drawer
        className="all-filter-drawer"
        enableDragHandle
        sidebar={renderContent()}
        open={open}
        onOpenChange={() => setOpen(!open)}
      >
        pujunhao
      </Drawer>
    );
  };

  return (
    <HeaderWrapper>
      <NavBar
        className="header"
        mode="light"
        icon={<Icon key="left" type="left" />}
        rightContent={<Icon key="filter" type="filter" />}
        onLeftClick={() => history.goBack()}
      />
      {renderAllFilter()}
    </HeaderWrapper>
  );
};

export default withRouter(Header);
