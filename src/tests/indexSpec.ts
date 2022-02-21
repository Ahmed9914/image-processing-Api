import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test Api endpoint', () => {
  it('endpoint open in the browser with status 200', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });

  it('Queries are lacking mandatory fields', async () => {
    const response = await request.get('/api/imageResizer?filename=g&width=4');
    expect(response.text).toBe('Make sure you submitted all required fields!');
  });
});
