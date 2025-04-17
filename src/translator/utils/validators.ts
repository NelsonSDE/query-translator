import { QueryOperation } from '../enums/query-operation.enum';
import { MongoOperator } from '../types/mongo-operator.type';

export function isAllowedQueryOperation(
  operation: string,
): operation is QueryOperation {
  return Object.values(QueryOperation).includes(operation as QueryOperation);
}

export function isMongoOperator(operator: string): operator is MongoOperator {
  return Object.values(MongoOperator).includes(operator as MongoOperator);
}
