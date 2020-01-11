import { Avatar } from "antd";
import { NoticeBar } from "antd-mobile";
import * as React from "react";
import { withRouter } from "react-router";
import { Header } from "../common/header/Header";
import { Icon } from "../common/icon/Icon";
import { Grids } from "./components/grids/Grids";
import HeroImages from "./components/heroImages/HeroImages";
import TaskListing from "./components/taskListing/TaskListing";
import { EntryWrapper } from "./Entry.style";

export const Entry: React.FC<any> = () => {
  const renderHeader = () => {
    const renderLeftContent = () => {
      return (
        <div className="entry-position">
          <Icon className="entry-position-icon" type="environment" />
          <span className="entry-position-span">西安市</span>
        </div>
      );
    };

    return (
      <Header
        className="entry-header"
        leftContent={renderLeftContent()}
        rightContent={<Avatar size="large" icon="user" />}
      />
    );
  };

  const renderBodyer = () => {
    const renderGreeting = () => {
      return (
        <div className="entry-greeting">
          <span className="entry-greeting-word">早安，</span>
          <span className="entry-greeting-name">13572474418</span>
        </div>
      );
    };

    const renderNoticeBar = () => {
      return (
        <NoticeBar marqueeProps={{ loop: true, style: { padding: "0 7.5px" } }}>
          蒲俊豪刚刚完成了抖音任务，获得奖励，200金币
        </NoticeBar>
      );
    };

    return (
      <div className="entry-bodyer">
        {renderGreeting()}
        <HeroImages />
        {renderNoticeBar()}
        <Grids />
        <TaskListing />
      </div>
    );
  };

  return (
    <EntryWrapper>
      {renderHeader()}
      {renderBodyer()}
    </EntryWrapper>
  );
};

export default withRouter(Entry);
