import { BaseOperator } from './base.operator';

export class GreaterThanEqualOperator extends BaseOperator {
  translate(field: string, value: any): string {
    return `${field} >= ${this.formatValue(value)}`;
  }
}
