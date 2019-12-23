import * as React from "react";
import { Icon } from "src/components/common/icon/Icon";
import { LoadingWrapper } from "./Loading.style";

type TLoadingProps = {
  loading: boolean;
  content: any;
};

export const Loading: React.FC<TLoadingProps> = ({ loading, content }) => {
  if (!loading) {
    return content;
  }

  return (
    <LoadingWrapper>
      <Icon className="loading-icon" type="loading" spin={true} />
    </LoadingWrapper>
  );
};
