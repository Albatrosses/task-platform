import md5 from "md5";
import {
  USER_ROLE_CODE,
  USER_ROLE_LEVEL_CODE,
  USER_STATUS_CODE
} from "../../../types/user/user";
import { queryDB } from "../../entity";
import { Messages } from "../../entity/messages";
import { Sessions } from "../../entity/sessions";
import { Tokens } from "../../entity/tokens";
import { Users } from "../../entity/users";
import { generateHashCode, getNow, getNowString } from "../../helper";
import { compareImgByteSize, deleteImage, storeImage } from "../../helper/file";
import { generateMessage } from "../../helper/log";
import { delayDo } from "../../helper/sql";
import { generateVerifyCode, verifyPhone } from "../../helper/verify";
import { expiresConfig, networkConfig } from "../config/common";

export const addUser = async (_, { addUserInput }): Promise<any> => {
  const { reviewer, password, phone, role } = addUserInput;

  if (!verifyPhone(phone)) {
    return generateMessage(false, "手机号不合规");
  }

  return await queryDB(async connection => {
    const userRepository = connection.getRepository(Users);

    const existUser = await userRepository.findOne({ phone });

    if (existUser) {
      return generateMessage(false, "该手机号已存在");
    }

    const user = new Users();
    user.password = md5(password);
    user.phone = phone;
    user.balance = 0;
    user.status = USER_STATUS_CODE.INACTIVE;
    user.role = role;
    if (role === USER_ROLE_CODE.CONSUMER_VIP) {
      user.roleLevel = USER_ROLE_LEVEL_CODE.VIP1;
    }
    user.signInDate = getNow();
    user.inviteCode = generateHashCode();
    user.reviewer = reviewer;

    await userRepository.save(user);

    return generateMessage(true, "添加用户成功");
  });
};

export const removeUser = async (_, { removeUserInput }): Promise<any> => {
  const { id } = removeUserInput;

  return await queryDB(async connection => {
    const userRepository = connection.getRepository(Users);

    const user = await userRepository.findOne({ id });

    if (!user) {
      return generateMessage(false, "用户不存在");
    }

    if (user.avatar) {
      await deleteImage(user.avatar);
    }

    await userRepository.remove(user);
    return generateMessage(true, "删除用户成功");
  });
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
    roleLevel,
    reviewer
  } = updateUserInput;

  if (phone && !verifyPhone(phone)) {
    return generateMessage(false, "手机号不合规");
  }

  return await queryDB(async connection => {
    const userRepository = connection.getRepository(Users);
    const user = await userRepository.findOne({ id });

    if (!user) {
      return generateMessage(false, "用户不存在");
    } else if (user.phone === phone) {
      return generateMessage(false, "该手机号已存在");
    }

    user.name = name;
    if (password) {
      user.password = md5(password);
    }
    if (avatar) {
      if (user.avatar) {
        await deleteImage(user.avatar);
      }
      const imagePath = `avatar/${id}/`;
      const imageName = `${id}`;
      const { imageFilePath, imageFileName } = await storeImage(
        avatar,
        imagePath,
        imageName
      );
      user.avatar = imageFilePath + imageFileName;
    }
    user.phone = phone;
    user.balance = balance;
    user.payWays = payWays;
    user.inviteCode = inviteCode;
    user.inviteId = inviteId;
    user.status = status;
    user.role = role;
    user.roleLevel = roleLevel;
    user.reviewer = reviewer;

    await userRepository.save(user);

    return generateMessage(true, "修改成功");
  });
};

export const signInUser = async (_, { signInUserInput }): Promise<any> => {
  const { phone, password, verifyCode, inviteCode } = signInUserInput;

  if (!verifyPhone(phone)) {
    return generateMessage(false, "手机号不合规");
  }

  return await queryDB(async connection => {
    const userRepository = connection.getRepository(Users);
    const existUser = await userRepository.findOne({ phone });
    if (existUser) {
      return generateMessage(false, "该手机号已存在");
    }

    const messagesRepository = connection.getRepository(Messages);
    const message = await messagesRepository.findOne({ phone });
    if (!verifyCode || !message || message.context !== verifyCode) {
      return generateMessage(false, "验证码有误");
    }

    const user = new Users();
    user.phone = phone;
    if (password) {
      user.password = md5(password);
    }
    user.inviteCode = inviteCode;
    user.status = USER_STATUS_CODE.INACTIVE;
    user.balance = 0;
    user.role = USER_ROLE_CODE.CONSUMER;
    user.inviteCode = generateHashCode();
    user.signInDate = getNow();

    await userRepository.save(user);

    return generateMessage(true, "注册成功");
  });
};

export const loginUser = async (
  _,
  { loginUserInput },
  context
): Promise<any> => {
  const { phone, password, verifyCode } = loginUserInput;

  if (!verifyPhone(phone)) {
    return generateMessage(false, "手机号不合规");
  }

  return await queryDB(async connection => {
    const userRepository = connection.getRepository(Users);
    const user = await userRepository.findOne({ phone });
    if (!user) {
      return generateMessage(false, "用户不存在");
    } else if (user.status === USER_STATUS_CODE.ACTIVE) {
      return generateMessage(false, "用户已登录");
    }

    if (verifyCode) {
      const messagesRepository = connection.getRepository(Messages);
      const message = await messagesRepository.findOne({ phone });
      if (!verifyCode || !message || message.context !== verifyCode) {
        return generateMessage(false, "验证码有误");
      }
    } else if (!password || user.password !== md5(password)) {
      return generateMessage(false, "密码错误");
    }

    const sessionsRepository = connection.getRepository(Sessions);
    const session = new Sessions();
    const sessionId = md5(user.id) + generateHashCode();
    session.sessionId = sessionId;
    session.userId = user.id;
    const tokensRepository = connection.getRepository(Tokens);
    const token = await tokensRepository.findOne({ role: user.role });
    session.data = token.authToken;

    await sessionsRepository.save(session);
    await delayDo(
      sessionsRepository,
      expiresConfig.session,
      `delete from sessions where session_id = '${sessionId}'`
    );
    await delayDo(
      sessionsRepository,
      expiresConfig.session,
      `update users set status = ${
        USER_STATUS_CODE.LOGOUT
      }, logoutDate = '${getNowString()}' where id = ${user.id}`
    );

    const { res } = context;
    res.cookie("auth", sessionId, {
      maxAge: expiresConfig.cookie,
      path: "/",
      domain: networkConfig.domain,
      httpOnly: true
    });

    user.status = USER_STATUS_CODE.ACTIVE;
    user.loginDate = getNow();
    await userRepository.save(user);
    return generateMessage(true, "登录成功");
  });
};

export const logoutUser = async (_, { logoutUserInput }): Promise<any> => {
  const { id } = logoutUserInput;

  return await queryDB(async connection => {
    const userRepository = connection.getRepository(Users);
    const user = await userRepository.findOne({ id });
    if (!user) {
      return generateMessage(false, "用户不存在");
    }

    const sessionsRepository = connection.getRepository(Sessions);
    const session = await sessionsRepository.findOne({ userId: user.id });
    if (session) {
      await sessionsRepository.remove(session);
    }

    user.status = USER_STATUS_CODE.LOGOUT;
    user.logoutDate = getNow();

    await userRepository.save(user);

    return generateMessage(true, "登出成功");
  });
};

export const updateUserSelf = async (
  _,
  { updateUserSelfInput }
): Promise<any> => {
  const {
    id,
    name,
    password,
    oldPassword,
    phone,
    avatar,
    payWays
  } = updateUserSelfInput;

  return await queryDB(async connection => {
    const userRepository = connection.getRepository(Users);
    const user = await userRepository.findOne({ id });
    if (!user) {
      return generateMessage(false, "用户不存在");
    } else if (user.status !== USER_STATUS_CODE.ACTIVE) {
      return generateMessage(false, "用户未登录");
    }

    user.name = name;
    if (password) {
      if (md5(oldPassword) !== user.password) {
        return generateMessage(false, "原密码不正确");
      }
      user.password = password;
    }
    if (phone && !verifyPhone(phone)) {
      return generateMessage(false, "手机号不合规");
    }
    user.phone = phone;
    if (avatar) {
      const isExceed = compareImgByteSize(avatar);
      if (isExceed) {
        return generateMessage(false, "头像大小不能超过200KB");
      }
      if (user.avatar) {
        await deleteImage(user.avatar);
      }
      const imagePath = `avatar/${id}/`;
      const imageName = `${id}`;
      const { imageFilePath, imageFileName } = await storeImage(
        avatar,
        imagePath,
        imageName
      );
      user.avatar = imageFilePath + imageFileName;
    }
    user.payWays = payWays;

    await userRepository.save(user);

    return generateMessage(true, "修改成功");
  });
};

export const verifyMessage = async (
  _,
  { verifyMessageInput }
): Promise<any> => {
  const { phone } = verifyMessageInput;

  if (!verifyPhone(phone)) {
    return generateMessage(false, "手机号不合规");
  }

  return await queryDB(async connection => {
    const messagesRepository = connection.getRepository(Messages);
    const message = await messagesRepository.findOne({ phone });
    const verifyCode = generateVerifyCode();
    if (!message) {
      const message = new Messages();
      message.phone = phone;
      message.context = verifyCode;

      await messagesRepository.save(message);
      await delayDo(
        messagesRepository,
        expiresConfig.message,
        `delete from messages where phone = '${phone}'`
      );
    }
    return generateMessage(
      true,
      `短信验证码已发送:${message ? message.context : verifyCode}`
    );
  });
};
