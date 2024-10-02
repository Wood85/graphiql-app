import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { server } from '@/tests/setup/msw/server';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

vi.mock('@/firebase/firebase.ts', () => ({
  app: {},
  auth: {
    onAuthStateChanged: vi.fn(() => () => {}),
  },
  db: {},
}));

vi.mock('next/navigation', () => ({
  useRouter: (): { push: () => void } => ({ push: vi.fn() }),
  usePathname: vi.fn(),
}));
