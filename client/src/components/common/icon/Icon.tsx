import { Icon as IconTemp } from "antd";
import { IconProps } from "antd/lib/icon";
import classnames from "classnames";
import * as React from "react";
import { IconWrapper } from "./Icon.style";

type TIconProps = {
  className?: string;
} & IconProps;

export const Icon: React.FC<TIconProps> = ({ className = "", ...props }) => {
  return (
    <IconWrapper>
      <IconTemp className={classnames("icon", { className })} {...props} />
    </IconWrapper>
  );
};
