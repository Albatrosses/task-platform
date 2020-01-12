import { COLOR } from "src/enum/style";
import { TASK_STATUS_CODE } from "src/types/task/task";
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
    padding: 10px;
    box-sizing: border-box;
    .concise-simple-info {
      flex: 0 0 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      width: 100%;
      .concise-image-wrapper {
        height: 60px;
        width: 60px;
        .concise-image {
          height: 100%;
          width: 100%;
          border-radius: 50px;
        }
      }
      .concise-name-status {
        flex: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 10px;
        .concise-name-wrapper {
          font-size: 16px;
        }
        .concise-amount-wrapper {
          font-size: 16px;
        }
      }
      .concise-status-wrapper {
        flex: 0 0 50px;
        .task-status-${TASK_STATUS_CODE.ASSIGNED} > .am-badge-text {
          background-color: ${COLOR.ASSIGNED};
        }
        .task-status-${TASK_STATUS_CODE.REVIEWING} > .am-badge-text {
          background-color: ${COLOR.REVIEWING};
        }
        .task-status-${TASK_STATUS_CODE.FAIL} > .am-badge-text {
          background-color: ${COLOR.FAIL};
        }
        .task-status-${TASK_STATUS_CODE.COMPLETED} > .am-badge-text {
          background-color: ${COLOR.COMPLETED};
        }
      }
    }
    .concise-description-wrapper {
      margin-top: 20px;
    }
  }
`;
