export const isStringNotEmpty = (value: string): boolean => value.trim() !== '';

export const isNumeric = (value: string): boolean =>
  value.trim() !== '' &&
  !Number.isNaN(Number(value)) &&
  Number.isFinite(parseFloat(value));
