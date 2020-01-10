import { includes } from "lodash";
import md5 from "md5";
import { MESSAGE_WORD } from "../../../types/common/message";
import { USER_ROLE_CODE, USER_STATUS_CODE } from "../../../types/user/user";
import { queryDB } from "../../entity";
import { Messages } from "../../entity/messages";
import { Sessions } from "../../entity/sessions";
import { Tokens } from "../../entity/tokens";
import { Users } from "../../entity/users";
import { generateHashCode, getNow, getNowString, wait } from "../../helper";
import { compareImgByteSize, deleteImage, storeImage } from "../../helper/file";
import { generateLog, generateResolver } from "../../helper/log";
import { delayDo } from "../../helper/sql";
import { generateAuth, verifyAuth, verifyPhone } from "../../helper/verify";
import { expiresConfig, networkConfig } from "../config/common";

const generateVerifyCode = () => {
  // tslint:disable-next-line: radix
  return `${parseInt((Math.random() * 10).toString())}${parseInt(
    (Math.random() * 10).toString()
    // tslint:disable-next-line: radix
  )}${parseInt((Math.random() * 10).toString())}${parseInt(
    (Math.random() * 10).toString()
  )}`;
};

export const addUser = async (_, { addUserInput }, context): Promise<any> => {
  const { password, phone, role, roleLevel, balance } = addUserInput;

  if (!verifyPhone(phone)) {
    return generateResolver(false, MESSAGE_WORD.PHONE_NO_RULE);
  }

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser, "customer") || currentUser.role <= role) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const userRepository = connection.getRepository(Users);
    const existUser = await userRepository.findOne({ phone });
    if (existUser) {
      return generateResolver(false, MESSAGE_WORD.PHONE_EXIST);
    }

    const user = new Users();
    user.password = md5(password);
    user.phone = phone;
    user.balance = balance || 0;
    user.status = USER_STATUS_CODE.LOGOUT;
    user.role = role;
    if (role === USER_ROLE_CODE.CONSUMER_VIP) {
      user.roleLevel = roleLevel;
    }
    user.signInDate = getNow();
    user.inviteCode = generateHashCode();
    user.reviewer = currentUser;

    await userRepository.save(user);

    return generateResolver(true, MESSAGE_WORD.ADD_SUCCESS);
  });
};

export const removeUser = async (
  _,
  { removeUserInput },
  context
): Promise<any> => {
  const { id } = removeUserInput;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser, "customer")) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const userRepository = connection.getRepository(Users);
    const user = await userRepository.findOne(id);

    if (!user) {
      return generateResolver(false, MESSAGE_WORD.USER_NOT_FOUND);
    }

    if (currentUser.role <= user.role) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }

    if (user.avatar) {
      await deleteImage(user.avatar);
    }

    await userRepository.remove(user);
    return generateResolver(true, MESSAGE_WORD.DELETE_SUCCESS);
  });
};

export const updateUser = async (
  _,
  { updateUserInput },
  context
): Promise<any> => {
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
    roleLevel
  } = updateUserInput;

  if (phone && !verifyPhone(phone)) {
    return generateResolver(false, MESSAGE_WORD.PHONE_NO_RULE);
  }

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser, "customer") || currentUser.role <= role) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const userRepository = connection.getRepository(Users);
    const user = await userRepository.findOne(id);

    if (!user) {
      return generateResolver(false, MESSAGE_WORD.USER_NOT_FOUND);
    } else if (user.phone === phone) {
      return generateResolver(false, MESSAGE_WORD.PHONE_EXIST);
    }

    user.name = name;
    if (password) {
      user.password = md5(password);
    }
    if (avatar) {
      if (user.avatar) {
        await deleteImage(user.avatar);
        await wait(1000);
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
    user.reviewer = currentUser;

    await userRepository.save(user);

    return generateResolver(true, MESSAGE_WORD.UPDATE_SUCCESS);
  });
};

export const signInUser = async (_, { signInUserInput }): Promise<any> => {
  const { phone, password, verifyCode, inviteCode, role } = signInUserInput;

  if (!includes([USER_ROLE_CODE.CONSUMER, USER_ROLE_CODE.CUSTOMER], role)) {
    return generateResolver(false, MESSAGE_WORD.UNAUTH);
  }

  if (!verifyPhone(phone)) {
    return generateResolver(false, MESSAGE_WORD.PHONE_NO_RULE);
  }

  return await queryDB(async connection => {
    const userRepository = connection.getRepository(Users);
    const existUser = await userRepository.findOne({ phone });
    if (existUser) {
      return generateResolver(false, MESSAGE_WORD.PHONE_EXIST);
    }

    const messagesRepository = connection.getRepository(Messages);
    const message = await messagesRepository.findOne({ phone });
    if (!verifyCode || !message || message.context !== verifyCode) {
      return generateResolver(false, MESSAGE_WORD.VERIFY_CODE_ERROR);
    }

    const user = new Users();
    user.name = phone;
    user.phone = phone;
    if (password) {
      user.password = md5(password);
    }
    user.inviteCode = inviteCode;
    user.status = USER_STATUS_CODE.LOGOUT;
    user.balance = 0;
    user.role = role;
    user.inviteCode = generateHashCode();
    user.signInDate = getNow();

    await userRepository.save(user);

    return generateResolver(true, MESSAGE_WORD.SIGN_IN_SUCCESS);
  });
};

export const loginUser = async (
  _,
  { loginUserInput },
  context
): Promise<any> => {
  const { phone, password, verifyCode } = loginUserInput;

  if (!verifyPhone(phone)) {
    return generateResolver(false, MESSAGE_WORD.PHONE_NO_RULE);
  }

  return await queryDB(async connection => {
    const userRepository = connection.getRepository(Users);
    const currentUser = await generateAuth(context, connection);
    const user = await userRepository.findOne({ phone });
    if (!user) {
      return generateResolver(false, MESSAGE_WORD.USER_NOT_FOUND);
    } else if (user.status === USER_STATUS_CODE.INACTIVE) {
      return generateResolver(false, MESSAGE_WORD.USER_INACTIVE);
    }

    if (verifyCode) {
      const messagesRepository = connection.getRepository(Messages);
      const message = await messagesRepository.findOne({ phone });
      if (!verifyCode || !message || message.context !== verifyCode) {
        return generateResolver(false, MESSAGE_WORD.VERIFY_CODE_ERROR);
      }
    } else if (!password || user.password !== md5(password)) {
      return generateResolver(false, MESSAGE_WORD.PASSWORD_ERROR);
    }

    const sessionsRepository = connection.getRepository(Sessions);
    const sessionExist = await sessionsRepository.findOne({ user });
    if (sessionExist) {
      await sessionsRepository.remove(sessionExist);
    }

    if (currentUser) {
      currentUser.status = USER_STATUS_CODE.LOGOUT;
      currentUser.logoutDate = getNow();
      await userRepository.save(currentUser);
      const sessionExist = await sessionsRepository.findOne({
        user: currentUser
      });
      await sessionsRepository.remove(sessionExist);
    }
    const session = new Sessions();
    const sessionId = md5(user.id) + generateHashCode();
    session.sessionId = sessionId;
    session.user = user;
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
    return generateResolver(true, MESSAGE_WORD.LOGIN_SUCCESS);
  });
};

export const logoutUser = async (_, { logoutUserInput }): Promise<any> => {
  const { phone } = logoutUserInput;

  return await queryDB(async connection => {
    const userRepository = connection.getRepository(Users);
    const user = await userRepository.findOne({ phone });
    if (!user) {
      return generateResolver(false, MESSAGE_WORD.USER_NOT_FOUND);
    }

    const sessionsRepository = connection.getRepository(Sessions);
    const session = await sessionsRepository.findOne({ userId: user.id });
    if (session) {
      await sessionsRepository.remove(session);
    }

    user.status = USER_STATUS_CODE.LOGOUT;
    user.logoutDate = getNow();

    await userRepository.save(user);

    return generateResolver(true, MESSAGE_WORD.LOGOUT_SUCCESS);
  });
};

export const updateUserSelf = async (
  _,
  { updateUserSelfInput },
  context
): Promise<any> => {
  const {
    name,
    password,
    oldPassword,
    phone,
    avatar,
    payWays
  } = updateUserSelfInput;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!currentUser) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const userRepository = connection.getRepository(Users);

    currentUser.name = name;
    if (password) {
      if (md5(oldPassword) !== currentUser.password) {
        return generateResolver(false, MESSAGE_WORD.PASSWORD_OLD_ERROR);
      }
      currentUser.password = password;
    }
    if (phone && !verifyPhone(phone)) {
      return generateResolver(false, MESSAGE_WORD.PHONE_NO_RULE);
    }
    currentUser.phone = phone;
    if (avatar) {
      const isExceed = compareImgByteSize(avatar);
      if (isExceed) {
        return generateResolver(false, MESSAGE_WORD.AVATAR_SIZE_EXCEED);
      }
      if (currentUser.avatar) {
        await deleteImage(currentUser.avatar);
        await wait(1000);
      }
      const imagePath = `avatar/${currentUser.id}/`;
      const imageName = `${currentUser.id}`;
      const { imageFilePath, imageFileName } = await storeImage(
        avatar,
        imagePath,
        imageName
      );
      currentUser.avatar = imageFilePath + imageFileName;
    }
    currentUser.payWays = payWays;

    await userRepository.save(currentUser);

    return generateResolver(true, MESSAGE_WORD.UPDATE_SUCCESS);
  });
};

export const verifyMessage = async (
  _,
  { verifyMessageInput }
): Promise<any> => {
  const { phone } = verifyMessageInput;

  if (!verifyPhone(phone)) {
    return generateResolver(false, MESSAGE_WORD.PHONE_NO_RULE);
  }

  return await queryDB(async connection => {
    const messagesRepository = connection.getRepository(Messages);
    const messageExist = await messagesRepository.findOne({ phone });
    const verifyCode = generateVerifyCode();
    if (!messageExist) {
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
    generateLog(messageExist ? messageExist.context : verifyCode);
    return generateResolver(true, MESSAGE_WORD.VERIFY_CODE_SENDED);
  });
};
