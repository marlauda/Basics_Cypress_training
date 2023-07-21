import { CucumberStepArgumentsError } from '../errors';
import { IStepArgumentPropertyMetadata } from '../registry/step-argument-property-metadata.interface';
import { IParserFunction } from './parser-function.interface';

export const booleanParser: IParserFunction = (value: string, key: string, propertyMetadata: IStepArgumentPropertyMetadata): boolean => {
  switch (value) {
    case 'true':
    case 'false':
      return value === 'true';

    default:
      throw new CucumberStepArgumentsError(`Property "${propertyMetadata.parentClass.name}#${key}": Value is not a ${booleanParser.type}.`);
  }
};

booleanParser.type = 'Boolean';
