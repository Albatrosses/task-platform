import { useMutation } from "@apollo/react-hooks";
import { Button, Input, Radio } from "antd";
import { Toast } from "antd-mobile";
import { get } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Header as HeaderCommon } from "src/components/common/header/Header";
import { LOGIN_TYPE_CODE } from "src/types/user/user";
import { LOGIN_USER, VERIFY_MESSAGE } from "./gql";
import { LoginWrapper } from "./Login.style";

export const Login: React.FC<any> = ({ history }) => {
  const [loginType, setLoginType] = useState(LOGIN_TYPE_CODE.VERIFY);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState();
  const [verify, setVerify] = useState();
  const [verifyDisable, setVerifyDisable] = useState(false);
  const [verifyTime, setVerifyTime] = useState(60);
  const [login, { data: loginResult }] = useMutation(LOGIN_USER);
  const [doVerify, { data: verifyResult }] = useMutation(VERIFY_MESSAGE);

  useEffect(() => {
    const message =
      get(loginResult, "loginUser.message") ||
      get(verifyResult, "verifyMessage.message");
    const successLogin = get(loginResult, "loginUser.success");
    const successDoVerify = get(verifyResult, "verifyMessage.success");
    if (message) {
      Toast.info(message, 1);
    }
    if (successDoVerify) {
      setVerifyDisable(true);
    }
    if (successLogin) {
      history.push("/");
    }
  }, [loginResult, verifyResult]);

  useEffect(() => {
    const clearTime = setTimeout(() => {
      if (verifyTime === 0) {
        setVerifyDisable(false);
        setVerifyTime(60);
      }
      setVerifyTime(verifyTime - 1);
    }, 1000);
    return () => clearInterval(clearTime);
  }, [verifyDisable, verifyTime]);
  return (
    <LoginWrapper>
      <HeaderCommon className="login-header" />
      <div className="login-bodyer">
        <div className="login-bodyer-content">
          <div className="login-bodyer-radio">
            <Radio.Group
              defaultValue={LOGIN_TYPE_CODE.VERIFY}
              buttonStyle="solid"
              onChange={e => setLoginType(e.target.value)}
            >
              <Radio.Button value={LOGIN_TYPE_CODE.VERIFY}>
                验证码登录
              </Radio.Button>
              <Radio.Button value={LOGIN_TYPE_CODE.PASSWORD}>
                密码登录
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="login-bodyer-phone">
            <h1>手机号</h1>
            <Input
              placeholder="输入手机号"
              maxLength={11}
              allowClear={true}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          {loginType === LOGIN_TYPE_CODE.VERIFY && (
            <div className="login-bodyer-verify">
              <h1>验证码</h1>
              <Input
                placeholder="验证码登录"
                maxLength={4}
                onChange={e => setVerify(e.target.value)}
                addonAfter={
                  <Button
                    icon="copy"
                    onClick={() => {
                      doVerify({
                        variables: {
                          verifyMessageInput: {
                            phone,
                            verifyCode: verify
                          }
                        }
                      });
                    }}
                    disabled={verifyDisable}
                  >
                    {!verifyDisable ? "获取验证码" : `重新发送(${verifyTime}s)`}
                  </Button>
                }
              />
            </div>
          )}
          {loginType === LOGIN_TYPE_CODE.PASSWORD && (
            <div className="login-bodyer-password">
              <h1>密码</h1>
              <Input.Password
                placeholder="输入密码"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          )}
          <div className="login-bodyer-button">
            <Button
              icon="copy"
              onClick={() =>
                login({
                  variables: {
                    loginUserInput: {
                      phone,
                      password,
                      verifyCode: verify
                    }
                  }
                })
              }
            >
              登录
            </Button>
            <Button icon="copy" onClick={() => history.push("/signin")}>
              注册
            </Button>
          </div>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default withRouter(Login);
