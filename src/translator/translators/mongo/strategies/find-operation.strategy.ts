import { Injectable } from '@nestjs/common';
import { QueryElements } from '../../../types/query-elements.interface';
import { BaseOperationStrategy } from './base-operation.strategy';

@Injectable()
export class FindOperationStrategy extends BaseOperationStrategy {
  translate(query: QueryElements): string {
    const sqlQuery = this.translateQuery(query);

    let sql = `SELECT ${sqlQuery.select.join(', ')} FROM ${sqlQuery.from}`;
    if (sqlQuery.where) {
      sql += ` WHERE ${sqlQuery.where}`;
    }
    return `${sql};`;
  }

  private translateQuery(query: QueryElements) {
    return {
      select: this.getSelectFields(query.projection),
      from: query.collection,
      where: this.buildWhereClause(query.filter),
    };
  }

  private getSelectFields(projection?: Record<string, number>): string[] {
    if (!projection) {
      return ['*'];
    }

    return Object.entries(projection)
      .filter(([, value]) => value === 1)
      .map(([field]) => field);
  }

  buildWhereClause(filter?: Record<string, any>): string | undefined {
    if (!filter) {
      return undefined;
    }

    const conditions: string[] = [];

    for (const [field, value] of Object.entries(filter)) {
      if (typeof value === 'object' && value !== null) {
        for (const [operator, opValue] of Object.entries(value)) {
          const translator = this.operatorTranslators[operator];
          if (translator) {
            conditions.push(translator.translate(operator, field, opValue));
          }
        }
      } else {
        conditions.push(`${field} = ${this.formatValue(value)}`);
      }
    }

    return conditions.length > 0 ? conditions.join(' AND ') : undefined;
  }

  formatValue(value: any): string {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value.toString();
  }
}
