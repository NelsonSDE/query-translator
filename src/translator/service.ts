import { Injectable } from '@nestjs/common';
import { TranslateDto } from './dtos/translateDto';
import { ParsedResult } from './types/parsed-result.type';
import { Language } from './enums/language.enum';
import { MongoTranslationFactory } from './translators/mongo/mongo-translator.factory';
import { SQLTranslationFactory } from './translators/sql/sql-translation.factory';
import { TranslationFactory } from './translators/translation-factory.interface';

@Injectable()
export class TranslatorService {
  private readonly translationFactories: Record<Language, TranslationFactory>;

  constructor(
    private readonly mongoTranslationFactory: MongoTranslationFactory,
    private readonly sqlTranslationFactory: SQLTranslationFactory,
  ) {
    this.translationFactories = {
      [Language.MONGO_DB]: this.mongoTranslationFactory,
      [Language.SQL]: this.sqlTranslationFactory,
    };
  }

  translate(data: TranslateDto): ParsedResult {
    const { query, source, target } = data;
    const sourceFactory = this.translationFactories[source];
    const translator = sourceFactory.getTranslator(target);
    const result = translator.translate(query);
    return { source, target, originalQuery: query, translatedQuery: result };
  }
}
