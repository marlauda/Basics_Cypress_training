import { Property, StepArgument, StepArgumentBase } from '../../../_common';
import { ENavigationModules } from '../../../navigation';

@StepArgument()
export class NavigationParameters extends StepArgumentBase {
  @Property({ enum: ENavigationModules }) module: ENavigationModules;
}
