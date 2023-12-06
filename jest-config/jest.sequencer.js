const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const TestSequencer = require('@jest/test-sequencer').default;

class CustomTestSequencer extends TestSequencer {
  // eslint-disable-next-line class-methods-use-this
  sort(tests) {
    const unitTests = [];
    const integrationTests = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const test of tests) {
      const filePath = test.path;

      if (filePath.includes(path.join('unit'))) {
        unitTests.push(test);
      } else if (filePath.includes(path.join('integrations'))) {
        integrationTests.push(test);
      }
    }

    // Combine the tests in the desired order (unit tests first, integration tests next)
    const sortedTests = [...unitTests, ...integrationTests];

    return sortedTests;
  }
}

module.exports = CustomTestSequencer;
