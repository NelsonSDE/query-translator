import { QueryOperation } from '../enums/query-operation.enum';

export interface QueryElements {
  collection: string;
  filter: Record<string, any>;
  projection: Record<string, number>;
  operation: QueryOperation;
}
