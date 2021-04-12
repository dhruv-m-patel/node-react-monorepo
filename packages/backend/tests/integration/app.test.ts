import app from '../../src/app';
import request from 'supertest';

describe('Integration: App', () => {
  it('should return response for GET /', () => {
    request(app)
      .get('/')
      .then((res: any) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Hello World!');
      });
  });

  it('should return response for GET /health', () => {
    request(app)
      .get('/health')
      .then((res: any) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Server is healthy!');
      });
  });
});
