import { BaseOperator } from './base.operator';

export class NotEqualOperator extends BaseOperator {
  translate(field: string, value: any): string {
    return `${field} != ${this.formatValue(value)}`;
  }
}
