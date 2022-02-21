import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Test Image processing', () => {
  it('Detect invalid width or height', async () => {
    const response = await request.get(
      '/api/imageResizer?filename=palmtunnel&width=-100&height=400'
    );
    expect(response.text).toBe('Invalid dimensions');
  });

  it('Detect entering invalid filename', async () => {
    const response = await request.get(
      '/api/imageResizer?filename=g&width=600&height=400'
    );
    expect(response.text).toBe("File doesn't exist");
  });
});
