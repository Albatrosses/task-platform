import { Avatar } from "antd";
import Grid from "antd-mobile/lib/grid";
import * as React from "react";
import { withRouter } from "react-router";
import { Header } from "../common/header/Header";
import { ProfileWrapper } from "./Profile.style";

const taskConfig = [
  {
    icon: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
    text: "进行中"
  },
  {
    icon: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
    text: "审核中"
  },
  {
    icon: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
    text: "已通过"
  },
  {
    icon: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
    text: "未通过"
  }
];

export const Profile: React.FC<any> = ({ history }) => {
  const renderBodyer = () => {
    return (
      <div className="profile-bodyer">
        <div className="profile-user-info">
          <div className="profile-user-avatar">
            <Avatar size="large" icon="user" />
          </div>
          <div className="profile-user-property">
            <div className="profile-user-name">13572474418</div>
            <div className="profile-user-role">vip1</div>
          </div>
          <div className="profile-user-edit">
            <Avatar size="large" icon="user" />
          </div>
        </div>
        <div className="profile-user-balance">
          <div className="profile-user-balance-content">9999.9元</div>
          <div className="profile-user-balance-withdraw">提现</div>
        </div>
        <div className="profile-user">
          <div className="profile-user-task">
            <h4>我的任务</h4>
            <Grid data={taskConfig} />
          </div>
          <div className="profile-user-transaction">
            <h4>我的交易</h4>
            <Grid data={taskConfig} />
          </div>
          <div className="profile-user-invite">
            <h4>我的邀请</h4>
            <Grid data={taskConfig} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <ProfileWrapper>
      <Header className="profile-header" title="我的" />
      {renderBodyer()}
    </ProfileWrapper>
  );
};

export default withRouter(Profile);
