import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const HeaderWrapper = styled.div`
  flex: 0 0 60px;
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .header {
    background-color: ${COLOR.MAIN_BACKGROUND};
    .header-right {
      display: flex;
      justify-content: space-between;
    }
  }
  .all-filter-wrapper {
    & > div {
      margin-bottom: 20px;
      & > label {
        margin-bottom: 16px;
        display: block;
        color: ${COLOR.FONT_COLOR};
      }
      .platform-content {
        .ant-tag {
          margin-bottom: 10px;
          &.ant-tag-checkable {
            border: 1px solid ${COLOR.FONT_COLOR};
            background-color: ${COLOR.ITEM_BACKGROUND};
            color: ${COLOR.FONT_CONTEXT_COLOR};
          }
          &.ant-tag-checkable-checked {
            border: 1px solid ${COLOR.FONT_COLOR};
            background-color: ${COLOR.FONT_COLOR};
            color: ${COLOR.FONT_ACTIVE_COLOR};
          }
        }
      }
      .amount-content,
      .date-content {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .amount-button,
        .date-button {
          min-width: 88px;
          padding: 0 8px;
        }
      }
    }
  }
`;
