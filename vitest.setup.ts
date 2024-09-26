import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { onAuthStateChanged } from 'firebase/auth';

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
