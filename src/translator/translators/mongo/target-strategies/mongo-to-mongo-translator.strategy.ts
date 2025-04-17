import { TranslationStrategy } from '../../translation-strategy.interface';

export class MongoToMongoTranslatorStrategy implements TranslationStrategy {
  translate(query: string): string {
    return query;
  }
}
