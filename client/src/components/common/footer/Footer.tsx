import { TabBar } from "antd-mobile";
import { find, map } from "lodash";
import * as React from "react";
import { withRouter } from "react-router";
import { COLOR } from "src/enum/style";
import { Icon } from "../icon/Icon";
import { navBarConfig } from "./config";
import { FooterWrapper } from "./Footer.style";

type TFooterProps = {
  history: any;
};

export const Footer: React.FC<TFooterProps> = ({ history }) => {
  const {
    location: { pathname }
  } = history;

  if (!find(navBarConfig, ["path", pathname])) {
    return null;
  }
  return (
    <FooterWrapper>
      <TabBar tintColor={COLOR.FONT_COLOR}>
        {map(navBarConfig, ({ key, title, path, icon, selectedIcon }) => (
          <TabBar.Item
            title={title}
            key={key}
            icon={<Icon {...(icon as any)} />}
            selectedIcon={<Icon {...(selectedIcon as any)} />}
            selected={pathname === path}
            onPress={() => history.push(path)}
          />
        ))}
      </TabBar>
    </FooterWrapper>
  );
};

export default withRouter(Footer);
