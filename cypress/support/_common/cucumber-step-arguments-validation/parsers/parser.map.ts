import { booleanParser } from './boolean.parser';
import { dateParser } from './date.parser';
import { numberParser } from './number.parser';
import { IParserFunction } from './parser-function.interface';
import { stringParser } from './string.parser';

export const parserMap = new Map<Function, IParserFunction>([
  [String, stringParser],
  [Number, numberParser],
  [Boolean, booleanParser],
  [Date, dateParser],
]);
