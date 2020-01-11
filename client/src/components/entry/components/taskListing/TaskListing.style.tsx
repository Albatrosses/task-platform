import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const TaskListingWrapper = styled.div`
  padding: 0 20px;
  background-color: ${COLOR.ITEM_BACKGROUND};
  .entry-task-listing-header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .entry-task-listing-header-random {
      display: flex;
      & > div {
        font-size: 16px;
      }
    }
  }
  .entry-task-listing-data {
    max-height: 300px;
    .task-listing-item {
      height: 50px;
      display: flex;
      justify-content: space-between;
      .task-image-wrapper {
        flex: 0 0 50px;
        height: 50px;
        width: 50px;
        box-sizing: border-box;
        padding: 5px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .task-content-wrapper {
        flex: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5px 0;
        .task-total {
          font-size: 10px;
        }
      }
      .task-amount-wrapper {
        flex: 0 0 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
`;
