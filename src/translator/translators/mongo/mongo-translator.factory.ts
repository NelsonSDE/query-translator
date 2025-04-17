import { Injectable } from '@nestjs/common';
import { TranslationStrategy } from '../translation-strategy.interface';
import { Language } from '../../enums/language.enum';
import { MongoToSQLTranslatorStrategy } from './target-strategies/mongo-to-sql-translator.strategy';
import { MongoToMongoTranslatorStrategy } from './target-strategies/mongo-to-mongo-translator.strategy';
import { TranslationFactory } from '../translation-factory.interface';
import { OperationTranslatorFactory } from './factories/operation-translator.factory';

@Injectable()
export class MongoTranslationFactory implements TranslationFactory {
  private readonly translationTargetStrategies: Record<
    Language,
    TranslationStrategy
  >;

  constructor(
    private readonly operationTranslatorFactory: OperationTranslatorFactory,
  ) {
    this.translationTargetStrategies = {
      [Language.SQL]: new MongoToSQLTranslatorStrategy(
        this.operationTranslatorFactory,
      ),
      [Language.MONGO_DB]: new MongoToMongoTranslatorStrategy(),
    };
  }

  getTranslator(target: Language): TranslationStrategy {
    return this.translationTargetStrategies[target];
  }
}
