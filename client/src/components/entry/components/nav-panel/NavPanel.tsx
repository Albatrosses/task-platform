import * as React from 'react';
import { Menu } from 'antd';

export const NavPanel: React.FC<any> = (props) => {
  const { style } = props;
  return (
    <Menu
      style={style}
      theme="dark"
      mode="inline">
      <Menu.Item>汇总</Menu.Item>
      <Menu.SubMenu title="新闻类">
        <Menu.Item>西安本地宝</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};
