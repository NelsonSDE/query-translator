import { OrOperator } from '../or.operator';
import { Operator } from '../operator.interface';
import { NotEqualOperator } from '../not-equal.operator';
import { AndOperator } from '../and.operator';
import { InOperator } from '../in.operator';
import { GreaterThanEqualOperator } from '../greater-than-equal.operator';
import { GreaterThanOperator } from '../greater-than.operator';
import { LessThanEqualOperator } from '../less-than-equal.operator';
import { LessThanOperator } from '../less-than.operator';
import { MongoOperator } from '../../../../types/mongo-operator.type';

describe(OrOperator.name, () => {
  let operator: OrOperator;
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
    operator = new OrOperator(operatorTranslators);
  });

  it('should translate simple OR conditions', () => {
    const result = operator.translate('field', [
      { name: 'John' },
      { name: 'Jane' },
    ]);
    expect(result).toBe("(name = 'John') OR (name = 'Jane')");
  });

  it('should translate OR conditions with comparison operators', () => {
    const result = operator.translate('field', [
      { age: { $gt: 25 } },
      { score: { $lt: 50 } },
    ]);
    expect(result).toBe('(age > 25) OR (score < 50)');
  });

  it('should handle multiple conditions with different operators', () => {
    const result = operator.translate('field', [
      { age: { $gte: 18 } },
      { status: 'inactive' },
      { score: { $lte: 30 } },
    ]);
    expect(result).toBe(
      "(age >= 18) OR (status = 'inactive') OR (score <= 30)",
    );
  });

  it('should handle nested OR conditions', () => {
    const result = operator.translate('field', [
      { age: { $gt: 25 } },
      { $or: [{ status: 'active' }, { score: { $lt: 100 } }] },
    ]);
    expect(result).toBe("(age > 25) OR ((status = 'active') OR (score < 100))");
  });

  it('should handle nested AND conditions', () => {
    const result = operator.translate('field', [
      { age: { $gt: 25 } },
      { $and: [{ status: 'active' }, { score: { $lt: 100 } }] },
    ]);
    expect(result).toBe(
      "(age > 25) OR ((status = 'active') AND (score < 100))",
    );
  });
});
