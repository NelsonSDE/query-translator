import { BaseOperator } from './base.operator';
import { Operator } from '../operators/operator.interface';
import { MongoOperator } from '../../../types/mongo-operator.type';
import { isMongoOperator } from '../../../utils/validators';

export class AndOperator extends BaseOperator {
  constructor(
    private readonly operatorTranslators: Record<MongoOperator, Operator>,
  ) {
    super();
  }

  translate(field: string, value: any[]): string {
    const conditions = value.map((condition) => {
      const entries = Object.entries(condition);
      return entries
        .map(([field, value]) => {
          if (isMongoOperator(field)) {
            return this.operatorTranslators[field].translate(field, value);
          }
          if (typeof value === 'object' && value !== null) {
            const [op, opValue] = Object.entries(value)[0];
            return `${field} ${this.getOperatorSymbol(op)} ${this.formatValue(opValue)}`;
          }
          return `${field} = ${this.formatValue(value)}`;
        })
        .join(' AND ');
    });
    return `(${conditions.join(') AND (')})`;
  }

  public getOperatorSymbol(operator: string): string {
    const operatorMap: Record<string, string> = {
      $lt: '<',
      $lte: '<=',
      $gt: '>',
      $gte: '>=',
      $ne: '!=',
    };
    return operatorMap[operator] || '=';
  }
}
