import request from 'supertest';
import App from '../app'

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Artists', () => {
  describe('[GET] /', () => {
    it('response statusCode 200 / ', () => {
      
      const app = new App();

      return request(app.getServer()).get(``).expect(200, { data: {} });
    });
  });
});
