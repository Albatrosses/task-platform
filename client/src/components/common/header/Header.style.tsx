import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const HeaderWrapper = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .header {
    height: 100%;
    background-color: ${COLOR.MAIN_BACKGROUND};
  }
`;
