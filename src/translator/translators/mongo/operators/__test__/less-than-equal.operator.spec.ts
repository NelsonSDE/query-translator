import { LessThanEqualOperator } from '../less-than-equal.operator';

describe(LessThanEqualOperator.name, () => {
  let operator: LessThanEqualOperator;

  beforeEach(() => {
    operator = new LessThanEqualOperator();
  });

  it('should translate numeric values', () => {
    const result = operator.translate('age', 25);
    expect(result).toBe('age <= 25');
  });

  it('should translate string values', () => {
    const result = operator.translate('name', 'John');
    expect(result).toBe("name <= 'John'");
  });

  it('should translate boolean values', () => {
    const result = operator.translate('active', true);
    expect(result).toBe('active <= true');
  });
});
