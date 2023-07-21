import { ErrorManagement } from '../../error-management';

export class CucumberStepArgumentsError extends ErrorManagement {
  constructor(messageOrErrors: string | Error[]) {
    super(messageOrErrors);
  }
}
