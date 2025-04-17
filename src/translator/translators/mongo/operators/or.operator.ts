import { BaseOperator } from './base.operator';
import { Operator } from '../operators/operator.interface';
import { MongoOperator } from '../../../types/mongo-operator.type';
import { isMongoOperator } from '../../../utils/validators';

export class OrOperator extends BaseOperator {
  private operatorTranslators: Record<MongoOperator, Operator>;

  constructor(operatorTranslators: Record<MongoOperator, Operator>) {
    super();
    this.operatorTranslators = operatorTranslators;
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
        .join(' OR ');
    });
    return `(${conditions.join(') OR (')})`;
  }
}
