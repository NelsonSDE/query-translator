import { Injectable } from '@nestjs/common';
import { QueryOperation } from '../../../enums/query-operation.enum';
import { FindOperationStrategy } from '../strategies/find-operation.strategy';
import { BaseOperationStrategy } from '../strategies/base-operation.strategy';

@Injectable()
export class OperationTranslatorFactory {
  constructor(private readonly findOperationStrategy: FindOperationStrategy) {}

  createTranslators(): Map<QueryOperation, BaseOperationStrategy> {
    return new Map([[QueryOperation.FIND, this.findOperationStrategy]]);
  }
}
