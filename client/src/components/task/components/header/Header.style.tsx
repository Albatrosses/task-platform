import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const HeaderWrapper = styled.div`
  flex: 0 0 60px;
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .header {
    background-color: ${COLOR.MAIN_BACKGROUND};
  }
`;
