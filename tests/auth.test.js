const request = require('supertest');
const mongoose = require('mongoose');
const { app, connectDB } = require('../src/app');

beforeAll(async () => {
  jest.spyOn(mongoose, 'connect').mockResolvedValue();
  await connectDB();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('health check', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('ok');
  });
});
