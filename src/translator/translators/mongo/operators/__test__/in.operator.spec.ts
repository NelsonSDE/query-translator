import { InOperator } from '../in.operator';

describe(InOperator.name, () => {
  let operator: InOperator;

  beforeEach(() => {
    operator = new InOperator();
  });

  it('should translate array of strings', () => {
    const result = operator.translate('name', ['John', 'Jane', 'Doe']);
    expect(result).toBe("name IN ('John', 'Jane', 'Doe')");
  });

  it('should translate array of numbers', () => {
    const result = operator.translate('age', [25, 30, 35]);
    expect(result).toBe('age IN (25, 30, 35)');
  });

  it('should translate array of mixed types', () => {
    const result = operator.translate('field', [1, 'two', true]);
    expect(result).toBe("field IN (1, 'two', true)");
  });

  it('should handle empty array', () => {
    const result = operator.translate('field', []);
    expect(result).toBe('field IN ()');
  });
});
