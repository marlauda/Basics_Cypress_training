import { valueIsInEnum } from '../../helper';
import { CucumberStepArgumentsError } from '../errors';
import { IParserFunction } from '../parsers';
import { IStepArgumentPropertyMetadata } from '../registry/step-argument-property-metadata.interface';

export const enumCombinationParserFactory = (
  enumerations: {}[],
  options?: {
    allowSpecificValues: string[];
  },
): IParserFunction => {
  const enumCombinationParser = (value: string, key: string, propertyMetadata: IStepArgumentPropertyMetadata): string => {
    if (options?.allowSpecificValues.includes(value)) {
      return value;
    }

    if (!enumerations.some(enumeration => valueIsInEnum(enumeration, value))) {
      throw new CucumberStepArgumentsError(
        `Property "${propertyMetadata.parentClass.name}#${key}": Value "${value}" is not included in: [${enumerations
          .map(enumeration => Object.values(enumeration))
          .flat()
          .map(itemInEnum => `"${itemInEnum}"`)
          .join(', ')}].`,
      );
    }

    return value;
  };
  enumCombinationParser.type = 'EnumCombination';

  return enumCombinationParser;
};
