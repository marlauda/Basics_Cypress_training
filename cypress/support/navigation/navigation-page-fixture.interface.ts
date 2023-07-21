import { ENavigationPageIdentifiers } from './navigation-page-identifiers.enum';

export interface INavigationPageFixture {
  identifier: ENavigationPageIdentifiers;
  path: string;
  title: string;
}
