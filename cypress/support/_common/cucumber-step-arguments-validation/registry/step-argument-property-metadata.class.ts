import { ClassType, EEnumType } from '../_common';
import { IParserFunction, enumerationParser } from '../parsers';
import { IStepArgumentClassConstructor } from './step-argument-class-constructor.interface';
import { IStepArgumentPropertyEnumeration } from './step-argument-property-enumeration.interface';
import { IStepArgumentPropertyMetadata } from './step-argument-property-metadata.interface';

export class StepArgumentPropertyMetadata implements IStepArgumentPropertyMetadata {
  enumProperty?: IStepArgumentPropertyEnumeration;

  constructor(
    readonly key: string,
    readonly parentClass: IStepArgumentClassConstructor,
    readonly type: ClassType<unknown>,
    readonly parser: IParserFunction | undefined,
    readonly isOptional: boolean,
    readonly enumeration?: {},
  ) {
    if (enumeration) {
      // Note: the type of an enumeration can only be Number or String, if the enumeration is in the same file as the class.
      // If the enumeration is imported, it will be of type Object, hence we manually "detect" the type
      this.enumProperty = {
        enumType: Object.values(enumeration).some(value => typeof value === 'number') ? EEnumType.NUMBER : EEnumType.STRING,
        enumeration,
      };

      // Use Enumeration parser if there is no parser already defined
      if (!this.parser) {
        this.parser = enumerationParser;
      }
    }
  }
}
