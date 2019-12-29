import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const OperatingWrapper = styled.div`
  width: 100%;
  padding: 10px 20px;
  min-height: 50px;
  box-sizing: border-box;
  position: relative;
  .fixed-button-wrapper {
    width: 100%;
    position: fixed;
    bottom: 0px;
    left: 0;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .credentials-wrapper {
    width: 100%;
    height: 100vw;
    margin-bottom: 40px;
    .credentials-uploader {
      height: 100%;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      .ant-upload {
        height: 100%;
        width: 100%;
        margin: 0;
      }
      .credentials-uploaded-image {
        width: auto;
        height: 100vw;
      }
    }
  }
  .fixed-button-wrapper,
  .static-button-wrapper {
    display: flex;
    justify-content: space-around;
    background-color: ${COLOR.MAIN_BACKGROUND};
    .am-button {
      flex: 0 0 40%;
      &:hover {
        color: ${COLOR.FONT_ACTIVE_COLOR};
      }
      span {
        font-size: 16px;
      }
    }
  }
`;
