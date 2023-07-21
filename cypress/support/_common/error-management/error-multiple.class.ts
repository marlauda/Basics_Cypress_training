import { ErrorManagement } from './error-management.class';

/** Usage: Multiple errors must be raised. */
export class ErrorMultiple extends ErrorManagement {
  constructor(errors: Error[]) {
    super(errors);
  }
}
