import { CucumberStepArgumentsError } from '../errors';
import { IStepArgumentPropertyMetadata } from '../registry/step-argument-property-metadata.interface';
import { IParserFunction } from './parser-function.interface';

export const dateParser: IParserFunction = (value: string, key: string, propertyMetadata: IStepArgumentPropertyMetadata): Date => {
  const parsedDate = new Date(value);

  if (isNaN(+parsedDate)) {
    throw new CucumberStepArgumentsError(`Property "${propertyMetadata.parentClass.name}#${key}": value is not a ${dateParser.type}.`);
  }

  return parsedDate;
};

dateParser.type = 'Date';
