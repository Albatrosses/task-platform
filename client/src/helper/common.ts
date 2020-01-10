export const parseCurrency = (amount: number) => {
  return "￥" + amount.toLocaleString("en-US");
};
