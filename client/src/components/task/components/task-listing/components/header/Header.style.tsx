import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const HeaderWrapper = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .header {
    background-color: ${COLOR.MAIN_BACKGROUND};
    .header-right {
      width: 60px;
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
      }
      .platform-content > * {
        margin-bottom: 10px;
        border: 1px solid #1890ff;
      }
      .reward-content,
      .date-content {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .reward-button,
        .date-button {
          min-width: 88px;
          padding: 0 8px;
        }
      }
    }
  }
`;
