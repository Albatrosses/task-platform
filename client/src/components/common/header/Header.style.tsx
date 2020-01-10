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
`;
