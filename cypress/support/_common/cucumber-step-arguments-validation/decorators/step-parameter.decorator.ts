import { CucumberStepArgumentsError } from '../errors';
import { metaDataRegistry } from '../registry';
import { IStepArgumentClassConstructor } from '../registry/step-argument-class-constructor.interface';
import { StepArgumentMetadata } from '../registry/step-argument-metadata.class';
import { StepArgumentBase } from '../step-argument-base';

export const StepArgument = (): ClassDecorator => {
  return (targetClass: Function): void => {
    if (targetClass !== StepArgumentBase && !(targetClass.prototype instanceof StepArgumentBase)) {
      throw new CucumberStepArgumentsError(`@StepArgument: ${targetClass.name} must inherit StepArgumentBase`);
    }

    metaDataRegistry.registerStepArgument(new StepArgumentMetadata(targetClass as IStepArgumentClassConstructor));
  };
};

// Register base class
StepArgument()(StepArgumentBase);
