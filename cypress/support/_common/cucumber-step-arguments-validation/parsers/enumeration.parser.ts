import { valueIsInEnum } from '../../helper';
import { EEnumType } from '../_common';
import { CucumberStepArgumentsError } from '../errors';
import { IStepArgumentPropertyMetadata } from '../registry/step-argument-property-metadata.interface';
import { IParserFunction } from './parser-function.interface';

export const enumerationParser: IParserFunction = (
  value: string,
  key: string,
  propertyMetadata: IStepArgumentPropertyMetadata,
): unknown => {
  if (!propertyMetadata.enumProperty) {
    throw new CucumberStepArgumentsError(`Property "${propertyMetadata.parentClass.name}#${key}" parser error: not an Enumeration`);
  }

  const { enumeration, enumType } = propertyMetadata.enumProperty;

  switch (enumType) {
    case EEnumType.NUMBER:
      const parsedEnumValue = parseInt(value, 10);

      if (isNaN(parsedEnumValue)) {
        throw new CucumberStepArgumentsError(`Property "${propertyMetadata.parentClass.name}#${key}": value is not a number.`);
      }

      if (!valueIsInEnum(enumeration, value)) {
        throw new CucumberStepArgumentsError(
          `Property "${
            propertyMetadata.parentClass.name
          }#${key}": Value "${value}" is not included in the numeric Enumeration: [${Object.values(enumeration).join(', ')}]`,
        );
      }

      return parsedEnumValue;

    case EEnumType.STRING:
      if (!valueIsInEnum(enumeration, value)) {
        throw new CucumberStepArgumentsError(
          `Property "${propertyMetadata.parentClass.name}#${key}": Value "${value}" is not included in the Enumeration: [${Object.values(
            enumeration,
          )
            .map(itemInEnum => `"${itemInEnum}"`)
            .join(', ')}]`,
        );
      }

      return value;
  }
};

enumerationParser.type = 'Enumeration';
