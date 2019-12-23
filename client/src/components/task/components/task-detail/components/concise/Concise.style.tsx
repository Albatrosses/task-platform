import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const ConciseWrapper = styled.div`
  width: 100%;
  padding: 4px 20px;
  box-sizing: border-box;
  .concise-wrapper {
    border-radius: 10px;
    background-color: ${COLOR.FONT_COLOR};
    color: ${COLOR.FONT_ACTIVE_COLOR};
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 10px;
    box-sizing: border-box;
    & > div {
      margin: 10px 0;
    }
    .concise-image-wrapper {
      height: 80px;
      width: 80px;
      .concise-image {
        height: 100%;
        width: 100%;
        border-radius: 50px;
      }
    }
    .concise-status-wrapper {
      .task-status-2 > .am-badge-text {
        background-color: ${COLOR.ASSIGNED};
      }
      .task-status-3 > .am-badge-text {
        background-color: ${COLOR.REVIEWING};
      }
      .task-status-4 > .am-badge-text {
        background-color: ${COLOR.COMPLETED};
      }
    }
    .concise-name-wrapper {
      font-size: 24px;
      font-weight: 700;
    }
    .concise-reward-wrapper {
      font-size: 30px;
      font-weight: 700;
    }
  }
`;
