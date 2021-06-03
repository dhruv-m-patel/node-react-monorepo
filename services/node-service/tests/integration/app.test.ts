import app from '../../src/app';
import request from 'supertest';

describe('Integration: App', () => {
  it('should return response for GET /api/message', (done) => {
    request(app)
      .get('/api/message')
      .then((res: any) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Hello World!');
        done();
      });
  });

  it('should return response for GET /health', (done) => {
    request(app)
      .get('/health')
      .then((res: any) => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('node-service is healthy');
        done();
      });
  });
});
