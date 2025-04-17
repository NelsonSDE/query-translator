import { Language } from '../enums/language.enum';

export type ParsedResult = {
  source: Language;
  target: Language;
  originalQuery: string;
  translatedQuery: string;
};
