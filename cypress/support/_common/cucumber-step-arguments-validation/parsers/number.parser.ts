import { CucumberStepArgumentsError } from '../errors';
import { IStepArgumentPropertyMetadata } from '../registry/step-argument-property-metadata.interface';
import { IParserFunction } from './parser-function.interface';

export const numberParser: IParserFunction = (value: string, key: string, propertyMetadata: IStepArgumentPropertyMetadata): number => {
  const parsedNumber = parseFloat(value);

  if (isNaN(parsedNumber)) {
    throw new CucumberStepArgumentsError(`Property "${propertyMetadata.parentClass.name}#${key}": value is not a ${numberParser.type}.`);
  }

  return parsedNumber;
};

numberParser.type = 'Number';
