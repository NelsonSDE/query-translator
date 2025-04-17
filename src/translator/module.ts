import { Module } from '@nestjs/common';
import { TranslatorController } from './controller';
import { TranslatorService } from './service';
import { OperationTranslatorFactory } from './translators/mongo/factories/operation-translator.factory';
import { FindOperationStrategy } from './translators/mongo/strategies/find-operation.strategy';
import { MongoTranslationFactory } from './translators/mongo/mongo-translator.factory';
import { SQLTranslationFactory } from './translators/sql/sql-translation.factory';

@Module({
  controllers: [TranslatorController],
  providers: [
    TranslatorService,
    OperationTranslatorFactory,
    FindOperationStrategy,
    MongoTranslationFactory,
    SQLTranslationFactory,
  ],
})
export class TranslatorModule {}
