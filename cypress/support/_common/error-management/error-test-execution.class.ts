import { ErrorManagement } from './error-management.class';
import { errorMessageSingleValueDisplay } from './error-management.methods';

/** Generic error to handle issues during test that could be due to environment or test data. */
export class ErrorTestExecution extends ErrorManagement {
  constructor(options: { cause: string; debugHint: string }) {
    super(
      `An error occurred during execution. Please check the following : \n
      - Cause: ${errorMessageSingleValueDisplay(options.cause)}\n
      - Hint: ${errorMessageSingleValueDisplay(options.debugHint)}`,
    );
  }
}
