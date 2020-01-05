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

export const generateHashCode = (
  randomFlag: boolean = false,
  min: number = 10,
  max: number = 10
) => {
  let str = "";
  let range = min;
  const arr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];

  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (let i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
};
