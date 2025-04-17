import { QueryElements } from '../../../types/query-elements.interface';
import { AndOperator } from '../operators/and.operator';
import { GreaterThanEqualOperator } from '../operators/greater-than-equal.operator';
import { GreaterThanOperator } from '../operators/greater-than.operator';
import { InOperator } from '../operators/in.operator';
import { LessThanEqualOperator } from '../operators/less-than-equal.operator';
import { LessThanOperator } from '../operators/less-than.operator';
import { NotEqualOperator } from '../operators/not-equal.operator';
import { OrOperator } from '../operators/or.operator';
import { Operator } from '../operators/operator.interface';
import { MongoOperator } from '../../../types/mongo-operator.type';

export abstract class BaseOperationStrategy {
  protected readonly operatorTranslators: Record<MongoOperator, Operator>;

  constructor() {
    this.operatorTranslators = {
      $lt: new LessThanOperator(),
      $lte: new LessThanEqualOperator(),
      $gt: new GreaterThanOperator(),
      $gte: new GreaterThanEqualOperator(),
      $ne: new NotEqualOperator(),
      $in: new InOperator(),
      $or: new OrOperator(this.operatorTranslators),
      $and: new AndOperator(this.operatorTranslators),
    };
  }

  protected buildWhereClause(filter: Record<string, any>): string {
    return Object.entries(filter)
      .map(([key, value]) => `${key} = ${this.formatValue(value)}`)
      .join(' AND ');
  }

  protected formatValue(value: any): string {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value.toString();
  }

  abstract translate(query: QueryElements): string;
}
