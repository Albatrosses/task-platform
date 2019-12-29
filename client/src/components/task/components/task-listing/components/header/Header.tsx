import { Button, Drawer, InputNumber, Tag } from "antd";
import { DatePicker, NavBar, Picker } from "antd-mobile";
import { indexOf, map } from "lodash";
import * as React from "react";
import { useState } from "react";
import { withRouter } from "react-router";
import { Icon } from "src/components/common/icon/Icon";
import { platformsConfig, rewardRangeConfig } from "src/components/task/config";
import { PLATFORM_CODE } from "src/components/task/enum";
import { HeaderWrapper } from "./Header.style";

const { CheckableTag } = Tag;

type THeaderProps = {
  platform: PLATFORM_CODE[];
  reward: number | null[];
  date: string | null[];
  setPlatform: (platform: any) => void;
  setReward: (reward: any) => void;
  setDate: (date: any) => void;
} & any;

export const Header: React.FC<THeaderProps> = ({
  history,
  platform,
  reward,
  date,
  setPlatform,
  setReward,
  setDate
}) => {
  const [visible, setVisible] = useState(false);

  const renderAllFilter = () => {
    const renderContent = () => {
      const renderPlatform = () => {
        const renderTag = (platformCode: any, name: any, checked: any) => {
          const [isChecked, setIsChecked] = useState(checked);
          if (Number(platformCode) === PLATFORM_CODE.DEFAULT) {
            return null;
          }

          const changePlatform = (proPlatformCode: any) => {
            const index = indexOf(platform, proPlatformCode);
            setIsChecked(!isChecked);
            const tempPlatform = platform.slice(0);
            if (index > -1) {
              tempPlatform.splice(index, 1);
            } else {
              tempPlatform.push(proPlatformCode);
              tempPlatform.sort();
            }
            setPlatform(tempPlatform);
          };

          return (
            <CheckableTag
              key={platformCode}
              checked={isChecked}
              onChange={() => changePlatform(Number(platformCode))}
            >
              {name}
            </CheckableTag>
          );
        };

        return (
          <div className="platform-wrapper">
            <label className="platform-label">第三方平台</label>
            <div className="platform-content">
              {map(platformsConfig, ({ name, checked }, platformCode) => {
                return renderTag(platformCode, name, checked);
              })}
            </div>
          </div>
        );
      };

      const renderReward = () => {
        const [minReward, maxReward] = reward;
        return (
          <div className="reward-wrapper">
            <label className="reward-label">报酬</label>
            <div className="reward-content">
              <InputNumber
                key={"min"}
                defaultValue={minReward}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
              />
              -
              <InputNumber
                key={"max"}
                defaultValue={maxReward}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </div>
            <Picker
              data={[rewardRangeConfig, rewardRangeConfig]}
              title="选择报酬区间"
              cascade={false}
              onOk={currentRewardRange => setReward(currentRewardRange.sort())}
            >
              <Button className="reward-button">选择报酬区间</Button>
            </Picker>
          </div>
        );
      };

      const renderDate = () => {
        return (
          <div className="date-wrapper">
            <DatePicker
              mode="date"
              title="Select Date"
              extra="Optional"
              value={new Date(Date.now())}
            >
              <Button className="date-button">选择日期区间</Button>
            </DatePicker>
          </div>
        );
      };

      return (
        <div className="all-filter-wrapper">
          {renderPlatform()}
          {renderReward()}
          {renderDate()}
        </div>
      );
    };

    return (
      <Drawer
        className="all-filter-drawer"
        title="筛选任务"
        placement="right"
        closable={true}
        onClose={() => setVisible(!visible)}
        visible={visible}
        getContainer={false}
      >
        {renderContent()}
      </Drawer>
    );
  };

  return (
    <HeaderWrapper>
      <NavBar
        className="header"
        mode="light"
        icon={<Icon key="left" type="left" />}
        rightContent={
          <Icon
            key="filter"
            type="filter"
            onClick={() => setVisible(!visible)}
          />
        }
        onLeftClick={() => history.goBack()}
      />
      {renderAllFilter()}
    </HeaderWrapper>
  );
};

export default withRouter(Header);
