const errorMessageEndValue: string = ']';
const errorMessageSeparator: string = ', ';
const errorMessageStartValue: string = '[';

export const errorMessageSingleValueDisplay = (value: string): string => `${errorMessageStartValue}${value}${errorMessageEndValue}`;

export const errorMessageMultipleErrorsDisplay = (errors: Error[]): string =>
  errors.map(error => error.message).join(errorMessageSeparator);
