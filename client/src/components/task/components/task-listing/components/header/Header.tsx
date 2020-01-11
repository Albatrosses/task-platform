import { Button, Drawer, Tag } from "antd";
import { DatePicker, NavBar, Picker, Popover } from "antd-mobile";
import Item from "antd-mobile/lib/popover/Item";
import { indexOf, map } from "lodash";
import * as React from "react";
import { useState } from "react";
import { withRouter } from "react-router";
import { Icon } from "src/components/common/icon/Icon";
import {
  amountRangeConfig,
  platformsConfig,
  sortTypeConfig
} from "src/config/common";
import { PLATFORM_CODE } from "../../../../../../../../server/types/common/platform";
import { HeaderWrapper } from "./Header.style";

const { CheckableTag } = Tag;

type THeaderProps = {
  platform: PLATFORM_CODE[];
  amount: number | null[];
  date: string | null[];
  sortType: any;
  sortOrder: any;
  setPlatform: (platform: any) => void;
  setAmount: (amount: any) => void;
  setDate: (date: any) => void;
  setSortType: (date: any) => void;
  setSortOrder: (date: any) => void;
} & any;

export const Header: React.FC<THeaderProps> = ({
  history,
  platform,
  amount,
  date,
  sortType,
  sortOrder,
  setPlatform,
  setAmount,
  setDate,
  setSortType,
  setSortOrder
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
              tempPlatform.sort((a: any, b: any) => a - b);
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

      const renderAmount = () => {
        const [minAmount, maxAmount] = amount;

        return (
          <div className="amount-wrapper">
            <label className="amount-label">报酬</label>
            <Picker
              data={[amountRangeConfig, amountRangeConfig]}
              value={[minAmount, maxAmount]}
              title="选择报酬区间"
              cascade={false}
              onOk={currentAmountRange => {
                const [
                  minCurrentAmountRange,
                  maxCurrentAmountRange
                ] = currentAmountRange;
                if (minCurrentAmountRange && maxCurrentAmountRange) {
                  setAmount(currentAmountRange.sort((a: any, b: any) => a - b));
                } else {
                  setAmount(currentAmountRange);
                }
              }}
            >
              <div className="amount-content">
                <Button key={"minAmount"} className="amount-button">
                  {minAmount || "最小报酬"}
                </Button>
                -
                <Button key={"maxAmount"} className="amount-button">
                  {maxAmount || "最大报酬"}
                </Button>
              </div>
            </Picker>
          </div>
        );
      };

      const renderDate = () => {
        const [startDate, endDate] = date;
        const [switchHandler, setSwitchHandler] = useState(0);

        const parseDate = (pickDate: any) => {
          const resultDate = `${pickDate.getFullYear()}/${pickDate.getMonth() +
            (1 % 12)}/${pickDate.getDate()}`;
          const resultDateArray = date.slice(0);
          resultDateArray[switchHandler] = resultDate;
          if (resultDateArray[0] && resultDateArray[1]) {
            setDate(resultDateArray.sort());
          } else {
            setDate(resultDateArray);
          }
          return false;
        };

        return (
          <div className="date-wrapper">
            <label className="date-label">日期</label>
            <DatePicker
              mode="date"
              title="选择日期"
              extra="Optional"
              value={new Date(Date.now())}
              onOk={parseDate}
            >
              <div className="date-content">
                <Button
                  key={"startDate"}
                  className="date-button"
                  onClick={() => setSwitchHandler(0)}
                >
                  {startDate || "起始日期"}
                </Button>
                -
                <Button
                  key={"endDate"}
                  className="date-button"
                  onClick={() => setSwitchHandler(1)}
                >
                  {endDate || "截止日期"}
                </Button>
              </div>
            </DatePicker>
          </div>
        );
      };

      return (
        <div className="all-filter-wrapper">
          {renderPlatform()}
          {renderAmount()}
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

  const renderSort = () => {
    return (
      <Popover
        overlay={map(sortTypeConfig, ({ label, icon }, key) => {
          return (
            <Item
              key={key}
              style={{
                background: Number(key) === sortType ? "#BBBBBB" : "initial"
              }}
              icon={<Icon type={icon} style={{ display: "flex" }} />}
            >
              {label}
            </Item>
          );
        })}
        onSelect={(item: any) => {
          if (Number(item.key) === sortType) {
            setSortOrder(sortOrder === 0 ? 1 : 0);
          }
          setSortType(Number(item.key));
        }}
      >
        {sortOrder ? (
          <Icon type="sort-ascending" />
        ) : (
          <Icon type="sort-descending" />
        )}
      </Popover>
    );
  };

  return (
    <HeaderWrapper>
      <NavBar
        className="header"
        mode="light"
        icon={<Icon key="left" type="left" />}
        rightContent={
          <div className="header-right">
            {renderSort()}
            <Icon
              key="filter"
              type="filter"
              onClick={() => setVisible(!visible)}
            />
          </div>
        }
        onLeftClick={() => history.goBack()}
      >
        有赞吧
      </NavBar>
      {renderAllFilter()}
    </HeaderWrapper>
  );
};

export default withRouter(Header);
