import { Popover } from "antd-mobile";
import Item from "antd-mobile/lib/popover/Item";
import * as React from "react";
import { withRouter } from "react-router";
import { Header as HeaderCommon } from "src/components/common/header/Header";
import { Icon } from "src/components/common/icon/Icon";
import { HeaderWrapper } from "./Header.style";

export const Headesr: React.FC<any> = ({ history }) => {
  return (
    <HeaderWrapper>
      <HeaderCommon
        leftContent={
          <Icon key="left" type="left" onClick={() => history.goBack()} />
        }
        rightContent={
          <Popover
            mask={true}
            overlay={
              <Item
                key="more"
                icon={
                  <Icon type="question-circle" style={{ display: "flex" }} />
                }
              >
                新手教程
              </Item>
            }
          >
            <Icon key="more" type="more" />
          </Popover>
        }
      />
    </HeaderWrapper>
  );
};

export default withRouter(Headesr);
