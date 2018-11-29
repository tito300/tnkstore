const { app } = require('../app');

describe.skip('app.js', () => {
  it('app.js should export app property', () => {
    expect(app).toBeDefined();
  });
});
