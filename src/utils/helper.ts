export const formatMoney = (value: string | number) => {
  return `${parseInt(`${value}`).toLocaleString()}₫`;
};
