import { DataTable } from '@badeball/cypress-cucumber-preprocessor';

import { CucumberStepArgumentsError } from './errors';
import { parserMap } from './parsers';
import { metaDataRegistry } from './registry';
import { IStepArgumentClassConstructor } from './registry/step-argument-class-constructor.interface';
import { StepArgumentBase } from './step-argument-base';

export const parseDataTable = <TArg extends StepArgumentBase>(
  stepArgClass: IStepArgumentClassConstructor<TArg>,
  datatable: DataTable,
  enforceOneRow: boolean = false,
): TArg[] => {
  const argMetadata = metaDataRegistry.stepArgumentMetaData(stepArgClass);
  const length = datatable.rows().length;

  if (enforceOneRow && length !== 1) {
    throw new CucumberStepArgumentsError(`${argMetadata.targetClass.name}: Invalid argument table length of "${length}", expected 1`);
  }

  // Check for missing keys in the dataTable, compared to the declared argument class
  const firstLineHash = datatable.hashes()[0];
  const missingKeysInClass = Object.keys(firstLineHash).reduce((acc, key) => {
    if (!argMetadata.properties.has(key)) {
      acc.push(key);
    }

    return acc;
  }, [] as string[]);
  if (missingKeysInClass.length) {
    throw new CucumberStepArgumentsError(
      `Class ${stepArgClass.name} is missing the following declared columns: ${missingKeysInClass.join(', ')}`,
    );
  }

  const missingKeysInDatatable = Array.from(argMetadata.properties.entries()).reduce((acc, [key, propertyMeta]) => {
    if (!(key in firstLineHash) && !propertyMeta.isOptional) {
      acc.push(key);
    }

    return acc;
  }, [] as string[]);
  if (missingKeysInDatatable.length) {
    throw new CucumberStepArgumentsError(
      `Datatable for ${stepArgClass.name} class is missing the following columns: ${missingKeysInDatatable.join(', ')}`,
    );
  }

  // Deserialize
  return datatable.hashes().map(hash => {
    const props: { [key: string]: unknown } = {};
    const parsingErrors: CucumberStepArgumentsError[] = [];

    argMetadata.properties.forEach((propertyMetadata, key) => {
      if (propertyMetadata.isOptional && ((hash[key] ?? undefined) === undefined || hash[key] === '')) {
        return;
      }

      // NOTE: the enumerations are managed with the propertyMetadata.parser option.
      const parser = propertyMetadata.parser ?? parserMap.get(propertyMetadata.type);
      if (!parser) {
        parsingErrors.push(
          new CucumberStepArgumentsError(`Property type not implemented: ${propertyMetadata.type.name} for "${stepArgClass.name}#${key}"`),
        );

        return;
      }

      try {
        props[key] = parser(hash[key], key, propertyMetadata);
      } catch (error) {
        if (error instanceof CucumberStepArgumentsError) {
          parsingErrors.push(error as CucumberStepArgumentsError);
        } else {
          throw error;
        }
      }
    });

    if (parsingErrors.length) {
      throw new CucumberStepArgumentsError(parsingErrors);
    }

    return Object.assign(new stepArgClass(), props);
  });
};
