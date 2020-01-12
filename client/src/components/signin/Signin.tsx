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
import { SigninWrapper } from "./Signin.style";

export const Signin: React.FC<any> = ({ history }) => {
  const [signinType, setSigninType] = useState(LOGIN_TYPE_CODE.VERIFY);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState();
  const [verify, setVerify] = useState();
  const [verifyDisable, setVerifyDisable] = useState(false);
  const [verifyTime, setVerifyTime] = useState(60);
  const [signin, { data: signinResult }] = useMutation(LOGIN_USER);
  const [doVerify, { data: verifyResult }] = useMutation(VERIFY_MESSAGE);

  useEffect(() => {
    const message =
      get(signinResult, "signinUser.message") ||
      get(verifyResult, "verifyMessage.message");
    const successSignin = get(signinResult, "signinUser.success");
    const successDoVerify = get(verifyResult, "verifyMessage.success");
    if (message) {
      Toast.info(message, 1);
    }
    if (successDoVerify) {
      setVerifyDisable(true);
    }
    if (successSignin) {
      history.push("/");
    }
  }, [signinResult, verifyResult]);

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
    <SigninWrapper>
      <HeaderCommon className="signin-header" />
      <div className="signin-bodyer">
        <div className="signin-bodyer-content">
          <div className="signin-bodyer-radio">
            <Radio.Group
              defaultValue={LOGIN_TYPE_CODE.VERIFY}
              buttonStyle="solid"
              onChange={e => setSigninType(e.target.value)}
            >
              <Radio.Button value={LOGIN_TYPE_CODE.VERIFY}>
                验证码注册
              </Radio.Button>
              <Radio.Button value={LOGIN_TYPE_CODE.PASSWORD} disabled>
                密码注册
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="signin-bodyer-phone">
            <h1>手机号</h1>
            <Input
              maxLength={11}
              placeholder="输入手机号"
              allowClear={true}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          {signinType === LOGIN_TYPE_CODE.VERIFY && (
            <div className="signin-bodyer-verify">
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
          <div className="signin-bodyer-button">
            <Button
              icon="copy"
              onClick={() =>
                signin({
                  variables: {
                    signinUserInput: {
                      phone,
                      verifyCode: verify
                    }
                  }
                })
              }
            >
              注册
            </Button>
            <Button icon="copy" onClick={() => history.push("/login")}>
              登录
            </Button>
          </div>
        </div>
      </div>
    </SigninWrapper>
  );
};

export default withRouter(Signin);
