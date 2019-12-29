import { TabBar } from "antd-mobile";
import * as React from "react";
import { FooterWrapper } from "./Footer.style";

export const Footer: React.FC<any> = () => {
  return (
    <FooterWrapper>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          title="Life"
          key="Life"
          icon={
            <div
              style={{
                width: "22px",
                height: "22px",
                background:
                  "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat"
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: "22px",
                height: "22px",
                background:
                  "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat"
              }}
            />
          }
          selected={true}
          badge={1}
          data-seed="logId"
        >
          Life
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                width: "22px",
                height: "22px",
                background:
                  "url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat"
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: "22px",
                height: "22px",
                background:
                  "url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat"
              }}
            />
          }
          title="Koubei"
          key="Koubei"
          badge={"new"}
          data-seed="logId1"
        >
          Koubei
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                width: "22px",
                height: "22px",
                background:
                  "url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat"
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: "22px",
                height: "22px",
                background:
                  "url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat"
              }}
            />
          }
          title="Friend"
          key="Friend"
          dot
        >
          Friend
        </TabBar.Item>
        <TabBar.Item
          icon={{
            uri:
              "https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg"
          }}
          selectedIcon={{
            uri:
              "https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg"
          }}
          title="My"
          key="my"
        >
          My
        </TabBar.Item>
      </TabBar>
    </FooterWrapper>
  );
};
