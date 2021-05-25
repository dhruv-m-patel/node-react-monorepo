import app from '../../src/app';
import request from 'supertest';

describe('Integration: App', () => {
  it('should return response for GET /api/message', () => {
    request(app)
      .get('/api/message')
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
        expect(res.body.message).toEqual('node-service is healthy!');
      });
  });
});
