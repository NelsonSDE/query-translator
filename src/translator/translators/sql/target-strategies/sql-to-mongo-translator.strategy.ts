import { NotSupportedOperationError } from '../../../errors/not-soported-operation.error';
import { TranslationStrategy } from '../../translation-strategy.interface';

export class SQLToMongoTranslatorStrategy implements TranslationStrategy {
  translate(): string {
    throw new NotSupportedOperationError('SQL to MongoDB');
  }
}
