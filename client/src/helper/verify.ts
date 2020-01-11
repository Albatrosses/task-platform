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
