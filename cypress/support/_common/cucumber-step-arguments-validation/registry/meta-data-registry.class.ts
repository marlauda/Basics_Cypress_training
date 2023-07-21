import { ClassType } from '../_common';
import { CucumberStepArgumentsError } from '../errors';
import { StepArgumentBase } from '../step-argument-base';
import { IStepArgumentClassConstructor } from './step-argument-class-constructor.interface';
import { IStepArgumentMetadata } from './step-argument-metadata.interface';
import { IStepArgumentPropertyMetadata } from './step-argument-property-metadata.interface';

class MetaDataRegistry {
  private _register = new Map<IStepArgumentClassConstructor, IStepArgumentMetadata>();

  /**
   * As @Property() are registered before the class decorator,
   * we need to temporarily store them in a map
   */
  private _toBeRegisteredProperties = new Map<ClassType<unknown>, Map<string, IStepArgumentPropertyMetadata>>();

  stepArgumentMetaData<TObject extends StepArgumentBase, TAllowNotFound extends boolean = false>(
    stepArgClass: IStepArgumentClassConstructor<TObject>,
    options: { allowNotFound: TAllowNotFound } = { allowNotFound: false as TAllowNotFound },
  ): TAllowNotFound extends true ? IStepArgumentMetadata<TObject> | undefined : IStepArgumentMetadata<TObject> {
    const stepArgMetaData = this._register.get(stepArgClass);

    if (!options.allowNotFound && !stepArgMetaData) {
      throw new CucumberStepArgumentsError(`ObjectRegistry: object not registered ${stepArgClass.name}`);
    }
    return stepArgMetaData as TAllowNotFound extends true ? IStepArgumentMetadata<TObject> | undefined : IStepArgumentMetadata<TObject>;
  }

  registerProperty(propertyMetadata: IStepArgumentPropertyMetadata): void {
    if (!this._toBeRegisteredProperties.has(propertyMetadata.parentClass)) {
      this._toBeRegisteredProperties.set(propertyMetadata.parentClass, new Map());
    }
    const tempRegister = this._toBeRegisteredProperties.get(propertyMetadata.parentClass)!;

    tempRegister.set(propertyMetadata.key, propertyMetadata);
  }

  registerStepArgument(objectMetaData: IStepArgumentMetadata): void {
    if (this._register.has(objectMetaData.targetClass)) {
      throw new CucumberStepArgumentsError(`ObjectRegistry: object already registered: ${objectMetaData.constructor.name}`);
    }

    this._register.set(objectMetaData.targetClass, objectMetaData);

    // Assign properties, handling inheritance
    const properties = this._toBeRegisteredProperties.get(objectMetaData.targetClass)?.entries() || [];
    this._toBeRegisteredProperties.delete(objectMetaData.targetClass);
    const parentClassProperties = objectMetaData.parent()?.properties.entries() || [];
    objectMetaData.registerProperties([...parentClassProperties, ...properties]);
  }
}

export const metaDataRegistry = new MetaDataRegistry();
