import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const TaskListingWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.MAIN_BACKGROUND};
  overflow-y: auto;
  overflow-x: hidden;
`;

export const HeroWrapper = styled.div`
  flex: 0 0 190px;
  height: 190px;
  width: 100%;
`;

export const FilterWrapper = styled.div`
  flex: 0 0 30px;
  height: 30px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  .task-filter {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .task-filter-item {
      cursor: pointer;
      &.active {
        color: ${COLOR.FONT_ACTIVE_COLOR};
      }
    }
  }
`;

export const ListingWrapper = styled.div`
  flex: auto;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  .task-listing {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    .task-listing-item {
      cursor: pointer;
      width: 100%;
      height: 90px;
      margin: 20px 0;
      padding: 10px 6px;
      box-sizing: border-box;
      background-color: ${COLOR.ITEM_BACKGROUND};
      border-radius: 30px;
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
          font-size: 20px;
          font-weight: bolder;
        }
        .task-tag {
          & > div {
            background-color: #ffffff;
          }
        }
        .task-total {
          font-size: 10px;
        }
      }
      .task-result-wrapper {
        flex: 0 0 60px;
        .task-reward {
          font-size: 20px;
          font-weight: bolder;
        }
      }
    }
  }
`;
