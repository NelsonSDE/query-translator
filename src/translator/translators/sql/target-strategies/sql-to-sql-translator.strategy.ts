import { TranslationStrategy } from '../../translation-strategy.interface';

export class SQLToSQLTranslatorStrategy implements TranslationStrategy {
  translate(query: string): string {
    return query;
  }
}
