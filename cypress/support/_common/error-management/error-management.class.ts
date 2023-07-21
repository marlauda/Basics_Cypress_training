import { errorMessageMultipleErrorsDisplay } from './error-management.methods';

export class ErrorManagement extends Error {
  constructor(errorMessages: string | Error[]) {
    super(Array.isArray(errorMessages) ? errorMessageMultipleErrorsDisplay(errorMessages) : errorMessages);
  }
}
