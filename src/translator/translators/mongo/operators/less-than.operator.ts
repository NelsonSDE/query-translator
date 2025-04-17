import { BaseOperator } from './base.operator';

export class LessThanOperator extends BaseOperator {
  translate(field: string, value: any): string {
    return `${field} < ${this.formatValue(value)}`;
  }
}
