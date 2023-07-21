import { IParserFunction } from './parser-function.interface';

export const stringParser: IParserFunction = (value: string): string => value;

stringParser.type = 'String';
