import { MongoOperator } from '../../../../types/mongo-operator.type';
import { AndOperator } from '../and.operator';
import { Operator } from '../operator.interface';
import { LessThanOperator } from '../less-than.operator';
import { LessThanEqualOperator } from '../less-than-equal.operator';
import { GreaterThanOperator } from '../greater-than.operator';
import { GreaterThanEqualOperator } from '../greater-than-equal.operator';
import { InOperator } from '../in.operator';
import { NotEqualOperator } from '../not-equal.operator';
import { OrOperator } from '../or.operator';

describe(AndOperator.name, () => {
  let operator: AndOperator;
  let operatorTranslators: Record<MongoOperator, Operator>;

  beforeEach(() => {
    operatorTranslators = {
      $lt: new LessThanOperator(),
      $lte: new LessThanEqualOperator(),
      $gt: new GreaterThanOperator(),
      $gte: new GreaterThanEqualOperator(),
      $ne: new NotEqualOperator(),
      $in: new InOperator(),
      $or: new OrOperator(operatorTranslators),
      $and: new AndOperator(operatorTranslators),
    };
    operator = new AndOperator(operatorTranslators);
  });

  it('should translate simple AND conditions', () => {
    const result = operator.translate('field', [
      { name: 'John', age: 30 },
      { status: 'active' },
    ]);
    expect(result).toBe("(name = 'John' AND age = 30) AND (status = 'active')");
  });

  it('should translate AND conditions with comparison operators', () => {
    const result = operator.translate('field', [
      { age: { $gt: 25 } },
      { score: { $lt: 100 } },
    ]);
    expect(result).toBe('(age > 25) AND (score < 100)');
  });

  it('should handle multiple conditions with different operators', () => {
    const result = operator.translate('field', [
      { age: { $gte: 18 } },
      { status: 'active' },
      { score: { $lte: 100 } },
    ]);
    expect(result).toBe(
      "(age >= 18) AND (status = 'active') AND (score <= 100)",
    );
  });

  it('should handle nested AND conditions', () => {
    const result = operator.translate('field', [
      { age: { $gt: 25 } },
      { $and: [{ status: 'active' }, { score: { $lt: 100 } }] },
    ]);
    expect(result).toBe(
      "(age > 25) AND ((status = 'active') AND (score < 100))",
    );
  });

  it('should handle nested OR conditions', () => {
    const result = operator.translate('field', [
      { age: { $gt: 25 } },
      { $or: [{ status: 'active' }, { score: { $lt: 100 } }] },
    ]);
    expect(result).toBe(
      "(age > 25) AND ((status = 'active') OR (score < 100))",
    );
  });
});
