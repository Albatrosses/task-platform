import md5 from "md5";
import {
  USER_ROLE_CODE,
  USER_ROLE_LEVEL_CODE,
  USER_STATUS_CODE
} from "../../../types/user/user";
import { queryDB } from "../../entity";
import { Messages } from "../../entity/messages";
import { Users } from "../../entity/users";
import { generateHashCode, getNowString } from "../../helper";
import { deleteImage, storeImage } from "../../helper/file";
import { generateMessage } from "../../helper/log";
import { generateVerifyCode, verifyPhone } from "../../helper/verify";

const DELETE_MESSAGE_TIME = 1000 * 60 * 10;

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
    user.signInDate = new Date(getNowString());
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

    return generateMessage(true, "更改用户成功");
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
    user.signInDate = new Date(getNowString());

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

    const { req, res } = context;
    req.session.user = md5(phone);
    res.cookie("user", md5(phone));

    user.status = USER_STATUS_CODE.ACTIVE;
    await userRepository.save(user);
    return generateMessage(true, "登录成功");
  });
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

  if (!verifyPhone(phone)) {
    return generateMessage(false, "手机号不合规");
  }

  return await queryDB(async connection => {
    const messagesRepository = connection.getRepository(Messages);
    const message = await messagesRepository.findOne({ phone });
    // tslint:disable-next-line: no-shadowed-variable
    const verifyCode = generateVerifyCode();
    if (!message) {
      // tslint:disable-next-line: no-shadowed-variable
      const message = new Messages();
      message.phone = phone;
      message.context = verifyCode;

      await messagesRepository.save(message);
      setTimeout(async () => {
        await queryDB(async connection => {
          const messagesRepository = connection.getRepository(Messages);
          const message = await messagesRepository.findOne({ phone });
          if (message) {
            await messagesRepository.remove(message);
          }
        });
      }, DELETE_MESSAGE_TIME);
      return generateMessage(true, `短信验证码已发送:${message.context}`);
    } else {
      setTimeout(async () => {
        await queryDB(async connection => {
          const messagesRepository = connection.getRepository(Messages);
          const message = await messagesRepository.findOne({ phone });
          if (message) {
            await messagesRepository.remove(message);
          }
        });
      }, DELETE_MESSAGE_TIME);
      return generateMessage(true, `短信验证码已发送:${message.context}`);
    }
  });
};
