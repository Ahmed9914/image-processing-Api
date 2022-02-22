import app from '../index';
import supertest from 'supertest';
import sharpResize from '../utils/imageUtils'

const request = supertest(app);

describe('Test Image processing', () => {
  it('Make sure the sharpResize promise resolved', () => {
    sharpResize('images/full/palmtunnel.jpg', 400, 300, 'palmtunnel_thumb400*300.jpg')
    .then((done) => {
        expectAsync(done).toBeResolved();
      })
    });

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
