import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${COLOR.MAIN_BACKGROUND};
  color: ${COLOR.FONT_COLOR};
`;
