const request = require('supertest');
const { app } = require('../../app');

let server;

describe.skip('main-routes testing', async () => {
  beforeEach(() => {
    server = app.listen(3002);
  });
  afterEach(() => {
    server.close();
  });
  it('main page should return 200', async () => {
    request(server).get('/').expect(200);
  });
});
