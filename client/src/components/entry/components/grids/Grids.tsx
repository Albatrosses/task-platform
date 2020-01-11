import { Grid } from "antd-mobile";
import * as React from "react";
import { gridsConfig } from "./config";
import { GridWrapper } from "./Grids.style";

export const Grids: React.FC<any> = () => {
  return (
    <GridWrapper>
      <Grid data={gridsConfig} hasLine={false} />
    </GridWrapper>
  );
};
