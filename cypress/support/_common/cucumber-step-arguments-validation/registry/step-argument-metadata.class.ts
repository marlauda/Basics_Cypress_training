import { StepArgumentBase } from '../step-argument-base';
import { metaDataRegistry } from './meta-data-registry.class';
import { IStepArgumentClassConstructor } from './step-argument-class-constructor.interface';
import { IStepArgumentMetadata } from './step-argument-metadata.interface';
import { IStepArgumentPropertyMetadata } from './step-argument-property-metadata.interface';

export class StepArgumentMetadata<TStepArg extends StepArgumentBase = StepArgumentBase> implements IStepArgumentMetadata<TStepArg> {
  private _properties = new Map<string, IStepArgumentPropertyMetadata>();

  get properties(): Map<string, IStepArgumentPropertyMetadata> {
    return this._properties;
  }

  constructor(readonly targetClass: IStepArgumentClassConstructor<TStepArg>) {}

  parent(): IStepArgumentMetadata | undefined {
    const parentClass = Object.getPrototypeOf(this.targetClass.prototype).constructor;

    return metaDataRegistry.stepArgumentMetaData(parentClass, { allowNotFound: true });
  }

  registerProperties(properties: [propertyKey: string, propMetadata: IStepArgumentPropertyMetadata][]): void {
    this._properties = new Map(properties);
  }
}
