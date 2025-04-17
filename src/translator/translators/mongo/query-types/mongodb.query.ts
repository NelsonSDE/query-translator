import { InvalidQueryFormatError } from '../../../errors/invalid-query-format.error';
import { MismatchedBracketsError } from '../../../errors/mismatched-brackets.error';
import { InvalidOperationError } from '../../../errors/invalid-operation.error';
import { QueryElements } from '../../../types/query-elements.interface';
import { InvalidFilterError } from '../../../errors/invalid-filter.error';
import { isAllowedQueryOperation } from '../../../utils/validators';

export class MongoDBQuery {
  constructor(private readonly query: string) {}

  public getQuery(): string {
    return this.query;
  }

  public parametrize(): QueryElements {
    this.validateFormat();
    this.validateBrackets();
    const filteredQuery = this.removeSpacesAfterColons();

    const filtered = filteredQuery.slice(3, filteredQuery.length - 2);
    const firstDotIndex = filtered.indexOf('.');
    const firstParentesisIndex = filtered.indexOf('(');

    const collection = filtered.slice(0, firstDotIndex);
    const operation = filtered.slice(firstDotIndex + 1, firstParentesisIndex);
    if (!isAllowedQueryOperation(operation)) {
      throw new InvalidOperationError(operation);
    }
    const [filter, projection] = eval(`[${filtered.slice(firstParentesisIndex + 1)}]`);
    if ((filter && typeof filter !== 'object') || (projection && typeof projection !== 'object')) {
      throw new InvalidFilterError(filter);
    }

    return { collection, operation, filter, projection };
  }

  private validateBrackets(): void {
    const stack: string[] = [];
    const bracketPairs: Record<string, string> = {
      '(': ')',
      '{': '}',
      '[': ']',
    };

    for (let i = 0; i < this.query.length; i++) {
      const char = this.query[i];

      if (bracketPairs[char]) {
        stack.push(char);
      } else if (Object.values(bracketPairs).includes(char)) {
        const lastOpen = stack.pop();
        if (!lastOpen || bracketPairs[lastOpen] !== char) {
          throw new MismatchedBracketsError();
        }
      }
    }

    if (stack.length > 0) throw new MismatchedBracketsError();
  }

  private validateFormat(): void {
    if (!this.query || !this.query.startsWith('db.') || !this.query.endsWith(';')) throw new InvalidQueryFormatError();
  }

  private removeSpacesAfterColons(): string {
    let result = '';
    let insideQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < this.query.length; i++) {
      const char = this.query[i];

      if ((char === '"' || char === "'") && this.query[i - 1] !== '\\') {
        if (!insideQuotes) {
          insideQuotes = true;
          quoteChar = char;
        } else if (char === quoteChar) {
          insideQuotes = false;
        }
      }

      if (char === ':' && !insideQuotes) {
        result += ':';
        while (this.query[i + 1] === ' ') {
          i++;
        }
      } else {
        result += char;
      }
    }

    return result;
  }
}
