import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const ListingWrapper = styled.div`
  flex: auto;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  overflow-y: auto;
  .task-listing {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    .task-listing-item {
      cursor: pointer;
      position: relative;
      width: 100%;
      height: 90px;
      margin: 20px 0;
      padding: 10px 6px;
      box-sizing: border-box;
      background-color: ${COLOR.ITEM_BACKGROUND};
      border-radius: 10px;
      display: flex;
      align-items: center;
      box-shadow: 1px 1px ${COLOR.ITEM_SHADOW};
      .task-image-wrapper {
        flex: 0 0 100px;
        height: 100%;
        box-sizing: border-box;
        padding: 0 14px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .task-content-wrapper {
        flex: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .task-name {
          font-size: 16px;
          font-weight: bolder;
          display: flex;
          align-items: center;
          [class*="task-status"] {
            margin-left: 10px;
          }
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
        .task-tags {
          & > div {
            background-color: #ffffff;
          }
        }
        .task-total {
          font-size: 10px;
        }
      }
      .task-amount-wrapper {
        position: absolute;
        right: 10px;
        .task-amount {
          font-size: 20px;
          font-weight: bolder;
        }
      }
    }
  }
`;
