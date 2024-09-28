import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { config } from '@/middleware';

expect(config.matcher).toEqual(['/', '/((?!_next|_vercel|.*\\..*).*)']);
describe('middleware', () => {
  it('should create middleware with routing', () => {
    const middlewareInstance = createMiddleware(routing);
    expect(middlewareInstance).toBeDefined();
  });

  it('should have correct matcher', () => {
    expect(config.matcher).toEqual(['/', '/((?!_next|_vercel|.*\\..*).*)']);
  });
});
