import { ClassType } from '../_common';
import { IParserFunction } from '../parsers';
import { IStepArgumentClassConstructor } from './step-argument-class-constructor.interface';
import { IStepArgumentPropertyEnumeration } from './step-argument-property-enumeration.interface';

export interface IStepArgumentPropertyMetadata {
  readonly key: string;

  /**
   * Property constructor
   */
  readonly type: ClassType<unknown>;

  readonly isOptional: boolean;
  readonly parser: IParserFunction | undefined;

  readonly enumProperty?: IStepArgumentPropertyEnumeration;

  readonly parentClass: IStepArgumentClassConstructor;
}
