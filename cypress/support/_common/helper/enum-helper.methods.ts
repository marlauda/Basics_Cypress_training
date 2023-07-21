import { ErrorTestExecution } from '../error-management';

export const valueIsInEnum = <TEnum extends {}>(enumeration: TEnum, value: string | number): boolean => {
  const values = new Set<string | number>(Object.values(enumeration));

  return values.has(value);
};

export const throwIfNotInEnumValue = <TEnum extends {}>(value: string | number, enumeration: TEnum): void => {
  if (!valueIsInEnum(enumeration, value)) {
    throw new ErrorTestExecution({
      cause: `The value ${value} is invalid.`,
      debugHint: `Allowed values : ${Object.values(enumeration)}`,
    });
  }
};
