export const verifyPhone = (phone: string) => {
  if (!phone) {
    return false;
  }
  if (phone.length !== 11) {
    return false;
  }
  return true;
};

export const generateVerifyCode = () => {
  // tslint:disable-next-line: radix
  return `${parseInt((Math.random() * 10).toString())}${parseInt(
    (Math.random() * 10).toString()
    // tslint:disable-next-line: radix
  )}${parseInt((Math.random() * 10).toString())}${parseInt(
    (Math.random() * 10).toString()
  )}`;
};
