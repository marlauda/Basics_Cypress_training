import { CucumberStepArgumentsError } from '../errors';
import { IParserFunction } from '../parsers';
import { metaDataRegistry } from '../registry';
import { IStepArgumentClassConstructor } from '../registry/step-argument-class-constructor.interface';
import { StepArgumentPropertyMetadata } from '../registry/step-argument-property-metadata.class';

interface IPropertyArg {
  enum?: {};
  optional?: boolean;

  /**
   * Custom parser function for complex cases: Union of Enum, Array of string, etc...
   *
   * Throw a CucumberStepArgumentsError if the value is not valid.
   * Take the exising parser functions as example
   */
  parser?: IParserFunction;
}

export const Property = (propertyArg: IPropertyArg = {}): PropertyDecorator => {
  return (targetPrototype, propertyKey): void => {
    if (typeof propertyKey === 'symbol') {
      throw new CucumberStepArgumentsError('Symbol properties are not supported');
    }

    const type = Reflect.getMetadata('design:type', targetPrototype, propertyKey);
    metaDataRegistry.registerProperty(
      new StepArgumentPropertyMetadata(
        propertyKey,
        targetPrototype.constructor as IStepArgumentClassConstructor,
        type,
        propertyArg?.parser,
        propertyArg?.optional === true,
        propertyArg?.enum,
      ),
    );
  };
};
