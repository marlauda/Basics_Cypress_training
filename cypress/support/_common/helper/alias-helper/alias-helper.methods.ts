import { IAlias } from './alias.interface';

let aliasNumber: number = 1;

const getNextAliasNumber = (): number => {
  aliasNumber++;
  return aliasNumber;
};

export const getNewAlias = (aliasName: string): IAlias => {
  const formattedAliasName: string = `(${getNextAliasNumber()}) ${aliasName}`;
  return { name: formattedAliasName, key: `@${formattedAliasName}` };
};
