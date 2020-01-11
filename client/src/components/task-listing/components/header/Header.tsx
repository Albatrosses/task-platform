import { Button, Drawer, Tag } from "antd";
import { DatePicker, Picker, Popover, Toast } from "antd-mobile";
import Item from "antd-mobile/lib/popover/Item";
import { indexOf, map } from "lodash";
import * as React from "react";
import { useState } from "react";
import { Header as HeaderCommon } from "src/components/common/header/Header";
import { Icon } from "src/components/common/icon/Icon";
import {
  amountRangeConfig,
  orderStatusConfig,
  platformsConfig
} from "src/config/common";
import { getNow, parseDateTimeToString } from "src/helper";
import { DATE_TYPE_CODE } from "src/types/common/date";
import { ORDER_STATUS_CODE, ORDER_TYPE_CODE } from "src/types/common/order";
import { PLATFORM_CODE } from "src/types/common/platform";
import { HeaderWrapper } from "./Header.style";

const { CheckableTag } = Tag;

type THeaderProps = {
  platformCodes: PLATFORM_CODE[];
  amount: any;
  date: any;
  order: any;
  setPlatformCodes: (platform: any) => void;
  setAmount: (amount: any) => void;
  setDate: (date: any) => void;
  setOrder: (order: any) => void;
};

export const Header: React.FC<THeaderProps> = ({
  platformCodes,
  amount,
  date,
  order,
  setPlatformCodes,
  setAmount,
  setDate,
  setOrder
}) => {
  const renderLeftContent = () => {
    const { orderStatus, orderType } = order;
    const orderTypes = {
      [ORDER_TYPE_CODE.DEFAULT]: {
        label: "默认排序",
        icon: "ordered-list"
      },
      [ORDER_TYPE_CODE.AMOUNT]: {
        label: "按报酬排序",
        icon: "money-collect"
      },
      [ORDER_TYPE_CODE.END_DATE]: {
        label: "按截止日期排序",
        icon: "calendar"
      }
    };
    return (
      <div className="header-left">
        <Popover
          placement="bottomLeft"
          mask={true}
          overlay={map(orderTypes, ({ label, icon }, key) => {
            return (
              <Item
                key={key}
                style={{
                  background: Number(key) === orderType ? "#BBBBBB" : "initial"
                }}
                icon={<Icon type={icon} style={{ display: "flex" }} />}
              >
                {label}
              </Item>
            );
          })}
          onSelect={(item: any) => {
            if (Number(item.key) === orderType) {
              setOrder({
                orderStatus:
                  orderStatus === ORDER_STATUS_CODE.ASC
                    ? ORDER_STATUS_CODE.DESC
                    : ORDER_STATUS_CODE.ASC,
                orderType
              });
              Toast.info(`切换为${orderStatusConfig[orderStatus]}`, 1);
              return false;
            }
            setOrder({
              orderStatus,
              orderType: Number(item.key)
            });
            return false;
          }}
        >
          {orderStatus === ORDER_STATUS_CODE.ASC ? (
            <Icon type="sort-ascending" />
          ) : (
            <Icon type="sort-descending" />
          )}
        </Popover>
      </div>
    );
  };

  const renderRightContent = () => {
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
              const index = indexOf(platformCodes, proPlatformCode);
              setIsChecked(!isChecked);
              const tempPlatform = platformCodes.slice(0);
              if (index > -1) {
                tempPlatform.splice(index, 1);
              } else {
                tempPlatform.push(proPlatformCode);
                tempPlatform.sort((a: any, b: any) => a - b);
              }
              setPlatformCodes(tempPlatform);
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
          const { min: minAmount, max: maxAmount } = amount;

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
                    const [min, max] = currentAmountRange.sort(
                      (a: any, b: any) => a - b
                    );
                    setAmount({
                      min,
                      max
                    });
                  } else {
                    const [min, max] = currentAmountRange;
                    setAmount({
                      min,
                      max
                    });
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
          const { min, max, dateType } = date;
          const [startDate, setStartDate] = useState(min);
          const [endDate, setEndDate] = useState(max);
          const [switchHandler, setSwitchHandler] = useState(
            DATE_TYPE_CODE.START_DATE
          );

          const parseDate = (pickDate: any) => {
            const dateTime = parseDateTimeToString(pickDate, false);
            switchHandler === DATE_TYPE_CODE.START_DATE
              ? setStartDate(dateTime)
              : setEndDate(dateTime);
            if (startDate && endDate) {
              setDate({
                min: startDate,
                max: endDate,
                dateType
              });
            } else {
              const [curMin, curMax] = [startDate, endDate].sort();
              setDate({
                min: curMin,
                max: curMax,
                dateType
              });
            }
            return false;
          };

          return (
            <div className="date-wrapper">
              <label className="date-label">截止日期</label>
              <DatePicker
                mode="date"
                title="选择日期"
                extra="Optional"
                value={getNow()}
                onOk={parseDate}
              >
                <div className="date-content">
                  <Button
                    key={"startDate"}
                    className="date-button"
                    onClick={() => setSwitchHandler(DATE_TYPE_CODE.START_DATE)}
                  >
                    {startDate || "起始日期"}
                  </Button>
                  -
                  <Button
                    key={"endDate"}
                    className="date-button"
                    onClick={() => setSwitchHandler(DATE_TYPE_CODE.END_DATE)}
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

    return (
      <div className="header-right">
        <Icon key="filter" type="filter" onClick={() => setVisible(!visible)} />
        {renderAllFilter()}
      </div>
    );
  };

  return (
    <HeaderWrapper>
      <HeaderCommon
        leftContent={renderLeftContent()}
        rightContent={renderRightContent()}
      />
    </HeaderWrapper>
  );
};
