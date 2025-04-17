import { BaseOperator } from './base.operator';

export class InOperator extends BaseOperator {
  translate(field: string, value: any[]): string {
    const formattedValues = value.map((v) => this.formatValue(v)).join(', ');
    return `${field} IN (${formattedValues})`;
  }
}
