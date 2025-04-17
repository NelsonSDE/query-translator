import { Language } from '../enums/language.enum';
import { withContractTestHarness } from '../../__test_utils__/contract-test-harness';

const testHarness = withContractTestHarness();

describe('TranslateController (e2e)', () => {
  describe('POST /translate', () => {
    it('should translate MongoDB query to SQL', async () => {
      const mongoQuery = {
        query: 'db.users.find({age: {$gt: 18}});',
        source: Language.MONGO_DB,
        target: Language.SQL,
      };

      await testHarness.sendPostAndExpectSuccess('/translate', mongoQuery);
    });

    it('should thow a 422 when translating SQL query to MongoDB', async () => {
      const sqlQuery = {
        query: 'SELECT * FROM users WHERE age > 18;',
        source: Language.SQL,
        target: Language.MONGO_DB,
      };

      await testHarness.sendPostAndExpectError('/translate', sqlQuery, 422);
    });

    it('should return 400 for invalid source language', async () => {
      const invalidQuery = {
        query: 'SELECT * FROM users',
        source: 'invalid_language',
        target: Language.MONGO_DB,
      };

      await testHarness.sendPostAndExpectError('/translate', invalidQuery);
    });

    it('should return 400 for invalid target language', async () => {
      const invalidQuery = {
        query: 'SELECT * FROM users',
        source: Language.SQL,
        target: 'invalid_language',
      };

      await testHarness.sendPostAndExpectError('/translate', invalidQuery);
    });

    it('should return 400 for empty query', async () => {
      const invalidQuery = {
        query: '',
        source: Language.SQL,
        target: Language.MONGO_DB,
      };

      await testHarness.sendPostAndExpectError('/translate', invalidQuery);
    });
  });
});
