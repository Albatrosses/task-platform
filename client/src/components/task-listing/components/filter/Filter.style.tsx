import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const FilterWrapper = styled.div`
  height: 30px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 20px;
  .status-filter {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .status-filter-item {
      padding: 6px;
      border-radius: 6px;
      cursor: pointer;
      &.active {
        color: ${COLOR.FONT_ACTIVE_COLOR};
        background-color: ${COLOR.FONT_COLOR};
      }
    }
  }
`;
