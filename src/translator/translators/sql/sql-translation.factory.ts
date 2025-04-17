import { Injectable } from '@nestjs/common';
import { TranslationFactory } from '../translation-factory.interface';
import { Language } from '../../enums/language.enum';
import { TranslationStrategy } from '../translation-strategy.interface';
import { SQLToMongoTranslatorStrategy } from './target-strategies/sql-to-mongo-translator.strategy';
import { SQLToSQLTranslatorStrategy } from './target-strategies/sql-to-sql-translator.strategy';

@Injectable()
export class SQLTranslationFactory implements TranslationFactory {
  private readonly translationTargetStrategies: Record<Language, TranslationStrategy>;

  constructor() {
    this.translationTargetStrategies = {
      [Language.MONGO_DB]: new SQLToMongoTranslatorStrategy(),
      [Language.SQL]: new SQLToSQLTranslatorStrategy(),
    };
  }

  getTranslator(target: Language): TranslationStrategy {
    const strategy = this.translationTargetStrategies[target];
    if (!strategy) {
      throw new Error(`Translation from SQL to ${target} is not supported`);
    }
    return strategy;
  }
}
