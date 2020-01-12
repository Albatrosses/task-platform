import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const LoginWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .login-header {
    flex: 0 0 60px;
    height: 60px;
  }
  .login-bodyer {
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .login-bodyer-content {
      height: auto;
      padding: 20px;
      background-color: ${COLOR.FONT_COLOR};
      border-radius: 20px;
      .ant-input-group-addon {
        padding: 0;
      }
    }
  }
`;
