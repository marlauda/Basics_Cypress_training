import { ClassType } from '../_common';
import { StepArgumentBase } from '../step-argument-base';

export type IStepArgumentClassConstructor<T extends StepArgumentBase = StepArgumentBase> = ClassType<T>;
