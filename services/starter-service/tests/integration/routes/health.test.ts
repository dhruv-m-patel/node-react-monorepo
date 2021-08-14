import app from '../../../src/app';
import request from 'supertest';
import { ENDPOINTS } from '../../../src/constants';

// noinspection DuplicatedCode
describe('Integration: starter-service /health', () => {
  it('should return response for GET /health', async () => {
    const expected = {
      uptime: expect.any(Number),
      status: 'OK',
      serviceName: 'Starter Service',
      timestamp: expect.any(String),
      pid: expect.any(Number),
      version: 'Version Not Available',
    };
    const result = await request(app).get(ENDPOINTS.HEALTH);
    expect([result.status, result.body]).toEqual([200, expected]);
  });
});
