import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const EntryWrapper = styled.div`
  height: 100%;
  width: 100%;
  flex: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .entry-header {
    flex: 0 0 60px;
    height: 60px;
    .entry-position {
      color: ${COLOR.FONT_COLOR};
      display: flex;
      align-items: center;
      & > div,
      .entry-position-icon,
      .entry-position-span {
        font-size: 16px;
      }
      .entry-position-span {
        margin-left: 6px;
      }
    }
  }
  .entry-bodyer {
    flex: auto;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    .entry-greeting {
      width: 100%;
      height: 40px;
    }
    .entry-total {
      width: 100%;
      height: 100px;
      background-color: ${COLOR.FONT_COLOR};
      border-radius: 10px;
    }
  }
`;
