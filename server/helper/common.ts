import { indexOf, some } from "lodash";

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

export const compareStatus = (status, statusInput) => {
  if (!statusInput) {
    return true;
  }
  return status === statusInput;
};

export const comparePlatform = (platforms, platformInput) => {
  return some(platforms, ({ code }) => indexOf(platformInput, code) > -1);
};

export const compareReward = (reward, rewardRange) => {
  if (!rewardRange[1]) {
    if (!rewardRange[0]) {
      return true;
    } else {
      return reward >= rewardRange[0];
    }
  } else {
    if (!rewardRange[0]) {
      return reward <= rewardRange[1];
    } else {
      return reward >= rewardRange[0] && reward <= rewardRange[1];
    }
  }
};

export const compareDate = (date, dateRange) => {
  const [startDate, endDate] = date.map(item => new Date(item).getTime());
  const [startDateRange, endStartRange] = dateRange.map(item =>
    new Date(item).getTime()
  );
  if (!startDateRange && !endStartRange) {
    return true;
  }
  return endDate >= startDateRange || startDate <= endStartRange;
};
