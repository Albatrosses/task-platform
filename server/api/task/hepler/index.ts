import { indexOf, some } from "lodash";

export const compareStatus = (status, statusInput) => {
  if (!statusInput) {
    return true;
  }
  return status === statusInput;
};

export const comparePlatform = (platforms, platformInput) => {
  return some(platforms, ({ code }) => indexOf(platformInput, code) > -1);
};

export const compareAmount = (amount, amountRange) => {
  if (!amountRange[1]) {
    if (!amountRange[0]) {
      return true;
    } else {
      return amount >= amountRange[0];
    }
  } else {
    if (!amountRange[0]) {
      return amount <= amountRange[1];
    } else {
      return amount >= amountRange[0] && amount <= amountRange[1];
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
