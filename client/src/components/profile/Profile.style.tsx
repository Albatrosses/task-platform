import { COLOR } from "src/enum/style";
import styled from "styled-components";

export const ProfileWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  .profile-header {
    flex: 0 0 60px;
    background-color: ${COLOR.FONT_COLOR};
    width: 100%;
    .header {
      background-color: ${COLOR.FONT_COLOR};
      .am-navbar-title {
        color: ${COLOR.MAIN_BACKGROUND};
      }
    }
  }
  .profile-bodyer {
    flex: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    .profile-user-info {
      flex: 0 0 70px;
      height: 70px;
      color: ${COLOR.MAIN_BACKGROUND};
      background-color: ${COLOR.FONT_COLOR};
      display: flex;
      padding: 10px 20px;
      box-sizing: border-box;
      .profile-user-avatar {
        flex: 0 0 50px;
        height: 50px;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .profile-user-property {
        flex: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 10px;
      }
      .profile-user-edit {
        flex: 0 0 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .profile-user-balance {
      flex: 0 0 80px;
      height: 80px;
      color: ${COLOR.MAIN_BACKGROUND};
      background-color: ${COLOR.FONT_COLOR};
      display: flex;
      justify-content: space-between;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      padding: 10px 20px;
      box-sizing: border-box;
      .profile-user-balance-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .profile-user-balance-withdraw {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    .profile-user {
      flex: auto;
      display: flex;
      flex-direction: column;
      padding: 10px 20px;
      box-sizing: border-box;
      h4 {
        color: ${COLOR.FONT_COLOR};
      }
      .profile-user-transaction,
      .profile-user-invite {
        margin-top: 10px;
      }
    }
  }
`;
