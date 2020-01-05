export const parseCurrency = (amount: number) => {
  return "￥" + amount.toLocaleString("en-US");
};

export const getNowString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + (1 % 12);
  const days = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}-${month}-${days} ${hours}:${minutes}:${seconds}`;
};

export const getNow = () => {
  return new Date();
};

export const parseDateTimeToString = (dateTime: Date) => {
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + (1 % 12);
  const days = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();

  return `${year}-${month}-${days} ${hours}:${minutes}:${seconds}`;
};

export const parseStringToDateTime = (dateTime: string) => {
  return new Date(dateTime);
};
