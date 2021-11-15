export const registerMaxLength = (value: number, displayValue?: number) => ({
  maxLength: {
    value,
    message: `Maximum length (${displayValue ?? value} characters) exceeded`,
  },
});
