import { OperationTranslatorFactory } from '../factories/operation-translator.factory';
import { TranslationStrategy } from '../../translation-strategy.interface';
import { MongoDBQuery } from '../query-types/mongodb.query';

export class MongoToSQLTranslatorStrategy implements TranslationStrategy {
  constructor(
    private readonly operationTranslatorFactory: OperationTranslatorFactory,
  ) {}

  translate(query: string): string {
    const queryElements = new MongoDBQuery(query).parametrize();
    const operationTranslator = this.operationTranslatorFactory
      .createTranslators()
      .get(queryElements.operation);
    return operationTranslator.translate(queryElements);
  }
}
