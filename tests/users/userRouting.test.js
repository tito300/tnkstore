const request = require('supertest');
const { app } = require('../../app');
const { productsServices } = require('../../products/services/index');
// const { ProductsServices }= require('../../products/services/index');

productsServices.addItemToCart = jest.fn().mockReturnValue(() => Promise.resolve({ items: 6 }));

let server;

describe('userRouting', () => {
  beforeEach(() => {
    server = app.listen(3003);
  });
  afterEach(() => {
    server.close();
  });
  it('/cart should return 200 status', async () => {
    await request(server).get('/cart').expect(301);
  });
  it('/cart/add/:id should return 500 on no valid userId', async () => request(server).get('/cart/add/1236').set('cookie', 'session=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWFiYTc1YTFmMmExMjIxZDc0Zjc5OGQyIn19; session.sig=Lke0KcJDhI-POE_zC9-ssHnNTuM').expect(500));
});
