import { vi, type Mock } from 'vitest';
import { getAuth, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { sendPasswordReset, logout } from '@/firebase/firebase';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('@/firebase/firebase.ts', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...(original as object),
    app: {},
    auth: {
      onAuthStateChanged: vi.fn(() => () => {}),
    },
    db: {},
  };
});

const consoleErrorSpy = vi.spyOn(console, 'error');

describe('Firebase Service', () => {
  const email = 'test@example.com';
  const mockAuth = { currentUser: { email } };

  beforeEach(() => {
    vi.clearAllMocks();
    (getAuth as Mock).mockReturnValue(mockAuth);
  });

  it('should call sendPasswordResetEmail', async () => {
    await sendPasswordReset(email);

    expect(sendPasswordResetEmail).toHaveBeenCalled();
  });

  it('should handle errors if they occur', async () => {
    (sendPasswordResetEmail as Mock).mockRejectedValueOnce(new Error('Error'));

    await sendPasswordReset(email);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
  });

  it('should call signOut', async () => {
    (signOut as Mock).mockResolvedValueOnce(undefined);

    await logout();

    expect(signOut).toHaveBeenCalled();
  });
});
