export const getNowString = () => {
  const date = new Date();
  const year = date
    .getFullYear()
    .toString()
    .padStart(4, "0");
  const month = (date.getMonth() + (1 % 12)).toString().padStart(2, "0");
  const days = date
    .getDate()
    .toString()
    .padStart(2, "0");
  const hours = date
    .getHours()
    .toString()
    .padStart(2, "0");
  const minutes = date
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const seconds = date
    .getSeconds()
    .toString()
    .padStart(2, "0");

  return `${year}-${month}-${days} ${hours}:${minutes}:${seconds}`;
};

export const getNow = () => {
  return new Date();
};

export const parseDateTimeToString = (dateTime: Date) => {
  const year = dateTime
    .getFullYear()
    .toString()
    .padStart(4, "0");
  const month = (dateTime.getMonth() + (1 % 12)).toString().padStart(2, "0");
  const days = dateTime
    .getDate()
    .toString()
    .padStart(2, "0");
  const hours = dateTime
    .getHours()
    .toString()
    .padStart(2, "0");
  const minutes = dateTime
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const seconds = dateTime
    .getSeconds()
    .toString()
    .padStart(2, "0");

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
