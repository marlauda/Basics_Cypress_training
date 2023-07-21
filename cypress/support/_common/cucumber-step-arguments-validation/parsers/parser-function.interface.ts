import { IStepArgumentPropertyMetadata } from '../registry/step-argument-property-metadata.interface';

export interface IParserFunction {
  (value: string, key: string, propertyMetadata: IStepArgumentPropertyMetadata): unknown;

  type: string;
}
