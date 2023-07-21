import { CucumberStepArgumentsError } from '../errors';
import { IStepArgumentPropertyMetadata } from '../registry/step-argument-property-metadata.interface';
import { IParserFunction } from './index';

export const arrayParserFactory = (arrayDelimiter: string, itemParser: IParserFunction): IParserFunction => {
  const arrayParser = (value: string, key: string, propertyMetadata: IStepArgumentPropertyMetadata): unknown[] => {
    const errorIndexes: number[] = [];
    const parsedItems = value.split(arrayDelimiter).map((item, index) => {
      try {
        return itemParser(item, key, propertyMetadata);
      } catch (error) {
        errorIndexes.push(index);
      }
    });

    if (errorIndexes.length) {
      throw new CucumberStepArgumentsError(
        `Property "${propertyMetadata.parentClass.name}#${key}": value is not a ${itemParser.type}[].
Items: ${errorIndexes.join(', ')} are invalid ${itemParser.type}`,
      );
    }

    return parsedItems;
  };
  arrayParser.type = `${itemParser.type}[]`;

  return arrayParser;
};
