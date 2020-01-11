import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const TaskListingWrapper = styled.div`
  height: 300px;
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
`;
