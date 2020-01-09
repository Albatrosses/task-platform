import { get, includes, isEmpty } from "lodash";
import { USER_ROLE_CODE, USER_ROLE_LEVEL_CODE } from "../../types/user/user";
import { Sessions } from "../entity/sessions";
import { Users } from "../entity/users";
import { roleConfig } from "../api/config/common";

export const verifyBase64Image = (image: string): boolean => {
  const reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
  return reg.test(image);
};

export const verifyUrl = (url: string): boolean => {
  const strRegex =
    "^((https|http|ftp|rtsp|mms)?://)" +
    "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" +
    "(([0-9]{1,3}.){3}[0-9]{1,3}" +
    "|" +
    "([0-9a-z_!~*'()-]+.)*" +
    "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." +
    "[a-z]{2,6})" +
    "(:[0-9]{1,4})?" +
    "((/?)|" +
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
  const reg = new RegExp(strRegex);
  return reg.test(url);
};

export const verifyPhone = (phone: string) => {
  if (!phone) {
    return false;
  }
  if (phone.length !== 11) {
    return false;
  }
  return true;
};

export const generateAuth = async (
  context: any,
  connection: any
): Promise<Users> => {
  if (!context || !context) {
    return null;
  }
  const auth = get(context, "req.cookies.auth", "");
  if (!auth) {
    return null;
  }

  const sessionsRepository = connection.getRepository(Sessions);
  const session = await sessionsRepository.findOne({ session_id: auth });
  if (!session) {
    return null;
  }

  const usersRepository = connection.getRepository(Users);
  const user = await usersRepository.findOne({ id: session.userId });
  if (!user) {
    return null;
  }
  return user;
};

export const verifyAuth = (user: Users, roleGroup?: string) => {
  if (!user) {
    return false;
  }
  if (!roleGroup) {
    return true;
  }
  return includes(get(roleConfig, roleGroup, []), user.role);
};
