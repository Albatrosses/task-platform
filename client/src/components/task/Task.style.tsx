import styled from "styled-components";

export const TaskWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  .task-content {
    flex: auto;
    height: 100%;
    overflow-y: auto;
  }
`;
