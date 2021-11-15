export const numberFormatter = (amount: string | number): string => {
  if (typeof amount === 'number') {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  } else if (amount) {
    return Number.parseFloat(amount)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  } else {
    return '0';
  }
};
