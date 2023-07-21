import { DataTable } from '@badeball/cypress-cucumber-preprocessor';

import { ClassType } from './_common';
import { CucumberStepArgumentsError } from './errors';
import { parseDataTable } from './parse-datatable.method';
import { StepArgumentBase } from './step-argument-base';

export function featureStepWithArg<TArgs extends StepArgumentBase>(
  argumentClass: ClassType<TArgs>,
  implementation: (args: TArgs, ...rest: never[]) => void,
): <TCucumberArgs>(...allInputs: TCucumberArgs[]) => void;

export function featureStepWithArg<TArgs extends StepArgumentBase>(
  argumentClass: ClassType<TArgs>,
  optionalDataTable: true,
  implementation: (args: TArgs | undefined, ...rest: never[]) => void,
): <TCucumberArgs>(...allInputs: TCucumberArgs[]) => void;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function featureStepWithArg<TArgs extends StepArgumentBase>(argumentClass: ClassType<TArgs>, ...args: unknown[]): unknown {
  const implementation = args.pop() as (args: TArgs | undefined, ...rest: never[]) => void;
  const isDataTableOptional: boolean = !!args.length;

  return <TCucumberArgs>(...allInputs: TCucumberArgs[]) => {
    const dataTable = allInputs.length && isDataTable(allInputs.slice(-1)[0]) ? (allInputs.pop() as unknown as DataTable) : undefined;

    if (!isDataTableOptional && !dataTable) {
      throw new CucumberStepArgumentsError("No DataTable given to the step, whereas it's mandatory");
    }

    implementation(dataTable ? parseDataTable<TArgs>(argumentClass, dataTable, true)[0] : undefined, ...(allInputs as never[]));
  };
}

export function featureStepWithArgs<TArgs extends StepArgumentBase>(
  argumentClass: ClassType<TArgs>,
  implementation: (args: TArgs[], ...rest: never[]) => void,
): <TCucumberArgs>(...allInputs: TCucumberArgs[]) => void;

export function featureStepWithArgs<TArgs extends StepArgumentBase>(
  argumentClass: ClassType<TArgs>,
  optionalDataTable: true,
  implementation: (args: TArgs[] | undefined, ...rest: never[]) => void,
): <TCucumberArgs>(...allInputs: TCucumberArgs[]) => void;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function featureStepWithArgs<TArgs extends StepArgumentBase>(argumentClass: ClassType<TArgs>, ...args: unknown[]): unknown {
  const implementation = args.pop() as (args: TArgs[] | undefined, ...rest: never[]) => void;
  const isDataTableOptional: boolean = !!args.length;

  return <TCucumberArgs>(...allInputs: TCucumberArgs[]) => {
    const dataTable = allInputs.length && isDataTable(allInputs.slice(-1)[0]) ? (allInputs.pop() as unknown as DataTable) : undefined;

    if (!isDataTableOptional && !dataTable) {
      throw new CucumberStepArgumentsError("No DataTable given to the step, whereas it's mandatory");
    }

    implementation(dataTable ? parseDataTable<TArgs>(argumentClass, dataTable) : undefined, ...(allInputs as never[]));
  };
}

const isDataTable = (dataTable: unknown): dataTable is DataTable => {
  // @ts-ignore
  return dataTable?.constructor?.name === 'DataTable';
};
