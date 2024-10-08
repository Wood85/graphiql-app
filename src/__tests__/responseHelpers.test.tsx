import { contentIsJSON, contentIsText, contentIsImage } from '@/utils/responseHelpers';

describe('responseHelpers', () => {
  describe('contentIsJSON', () => {
    it('should return true for a JSON response', () => {
      const response = new Response('{"key": "value"}', {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(contentIsJSON(response)).toBe(true);
    });

    it('should return false for a non-JSON response', () => {
      const response = new Response('Hello World', {
        headers: { 'Content-Type': 'text/plain' },
      });
      expect(contentIsJSON(response)).toBe(false);
    });
  });

  describe('contentIsText', () => {
    it('should return true for a text response', () => {
      const response = new Response('Hello World', {
        headers: { 'Content-Type': 'text/plain' },
      });
      expect(contentIsText(response)).toBe(true);
    });

    it('should return true for an HTML response', () => {
      const response = new Response('<html>Hello World</html>', {
        headers: { 'Content-Type': 'text/html' },
      });
      expect(contentIsText(response)).toBe(true);
    });

    it('should return false for a non-text response', () => {
      const response = new Response('{"key": "value"}', {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(contentIsText(response)).toBe(false);
    });
  });

  describe('contentIsImage', () => {
    it('should return true for a JPEG image response', () => {
      const response = new Response('image data', {
        headers: { 'Content-Type': 'image/jpeg' },
      });
      expect(contentIsImage(response)).toBe(true);
    });

    it('should return true for a PNG image response', () => {
      const response = new Response('image data', {
        headers: { 'Content-Type': 'image/png' },
      });
      expect(contentIsImage(response)).toBe(true);
    });

    it('should return false for a non-image response', () => {
      const response = new Response('Hello World', {
        headers: { 'Content-Type': 'text/plain' },
      });
      expect(contentIsImage(response)).toBe(false);
    });
  });
});
