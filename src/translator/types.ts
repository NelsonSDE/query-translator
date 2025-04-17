import { MongoOperator } from './types/mongo-operator.type';

export interface MongoQuery {
  collection: string;
  filter?: Record<string, any>;
  projection?: Record<string, number>;
}

export interface SQLQuery {
  select: string[];
  from: string;
  where?: string;
}

export interface OperatorTranslator {
  translate(operator: MongoOperator, field: string, value: any): string;
}

export interface QueryTranslator {
  translate(query: MongoQuery): SQLQuery;
}
