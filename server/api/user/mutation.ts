import { generateMessage } from "../../helper/log";

export const addUser = async (_, { addUserInput }): Promise<any> => {
  const { password, phone, role } = addUserInput[0];

  return generateMessage(true, "添加用户成功");
};

export const removeUser = async (_, { removeUserInput }): Promise<any> => {
  const { id } = removeUserInput[0];

  return generateMessage(true, "删除用户成功");
};

export const updateUser = async (_, { updateUserInput }): Promise<any> => {
  const {
    id,
    name,
    password,
    phone,
    avatar,
    balance,
    payWays,
    inviteCode,
    inviteId,
    status,
    role,
  } = updateUserInput[0];

  return generateMessage(true, "更新用户成功");
};

export const signInUser = async (_, { signInUserInput }): Promise<any> => {
  const { phone, password, verifyCode, inviteCode } = signInUserInput;

  return generateMessage(true, "注册成功");
};

export const signUpUser = async (_, { signUpUserInput }): Promise<any> => {
  const { phone, password, verifyCode } = signUpUserInput;

  return generateMessage(true, "登录成功");
};

export const logoutUser = async (_, { logoutUserInput }): Promise<any> => {
  const { password, phone, role } = logoutUserInput;

  return generateMessage(true, "登出成功");
};

export const updateUserSelf = async (
  _,
  { updateUserSelfInput }
): Promise<any> => {
  const {
    id,
    name,
    password,
    phone,
    avatar,
    payWays,
    inviteCode
  } = updateUserSelfInput;

  return generateMessage(true, "用户信息修改成功");
};

export const verifyMessage = async (
  _,
  { verifyMessageInput }
): Promise<any> => {
  const { phone } = verifyMessageInput;

  return generateMessage(true, "短信验证码已发送");
};
