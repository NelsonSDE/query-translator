import { Language } from '../enums/language.enum';
import { TranslationStrategy } from './translation-strategy.interface';

export interface TranslationFactory {
  getTranslator(target: Language): TranslationStrategy;
}
