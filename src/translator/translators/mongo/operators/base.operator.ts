import { MongoOperator } from '../../../types/mongo-operator.type';

export abstract class BaseOperator {
  protected formatValue(value: any): string {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value?.toString();
  }

  getOperatorSymbol(operator: string): string {
    const operatorMap: Record<MongoOperator, string> = {
      $lt: '<',
      $lte: '<=',
      $gt: '>',
      $gte: '>=',
      $ne: '!=',
      $or: 'OR',
      $and: 'AND',
      $in: 'IN',
    };
    return operatorMap[operator] || '=';
  }

  abstract translate(field: string, value: any): string;
}
