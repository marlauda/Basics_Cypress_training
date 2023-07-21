import { StepArgumentBase } from '../step-argument-base';
import { IStepArgumentClassConstructor } from './step-argument-class-constructor.interface';
import { IStepArgumentPropertyMetadata } from './step-argument-property-metadata.interface';

export interface IStepArgumentMetadata<TStepArg extends StepArgumentBase = StepArgumentBase> {
  readonly properties: Map<string, IStepArgumentPropertyMetadata>;
  readonly targetClass: IStepArgumentClassConstructor<TStepArg>;

  parent(): IStepArgumentMetadata | undefined;

  registerProperties(properties: [propertyKey: string, propMetadata: IStepArgumentPropertyMetadata][]): void;
}
