import { NotEqualOperator } from '../not-equal.operator';

describe(NotEqualOperator.name, () => {
  let operator: NotEqualOperator;

  beforeEach(() => {
    operator = new NotEqualOperator();
  });

  it('should translate numeric values', () => {
    const result = operator.translate('age', 25);
    expect(result).toBe('age != 25');
  });

  it('should translate string values', () => {
    const result = operator.translate('name', 'John');
    expect(result).toBe("name != 'John'");
  });

  it('should translate boolean values', () => {
    const result = operator.translate('active', true);
    expect(result).toBe('active != true');
  });
});
