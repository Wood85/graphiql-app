import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { renderWithIntl } from '@/utils/testUtils';
import Header from '@/app/[locale]/components/Header/Header';

vi.mock('next/navigation');

const replaceMock = vi.fn();

(useRouter as Mock).mockReturnValue({ replace: replaceMock });

describe('Header', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with "en" locale', () => {
    renderWithIntl(<Header />);

    const homeLink = screen.getAllByRole('link', { name: 'Home' })[0];
    const enButton = screen.getAllByRole('button', { name: 'En' })[0];
    const ruButton = screen.getAllByRole('button', { name: 'Ru' })[0];
    const signInButton = screen.getAllByRole('link', { name: 'Sign In' })[0];
    const signUpButton = screen.getAllByRole('link', { name: 'Sign Up' })[0];

    expect(homeLink).toBeDefined();
    expect(homeLink.getAttribute('href')).toBe('/en');
    expect(enButton).toBeDefined();
    expect(ruButton).toBeDefined();
    expect(signInButton).toBeDefined();
    expect(signInButton.getAttribute('href')).toBe('/en/sign-in');
    expect(signUpButton).toBeDefined();
    expect(signUpButton.getAttribute('href')).toBe('/en/sign-up');
  });

  it('should render correctly with "ru" locale', () => {
    renderWithIntl(<Header />, 'ru');

    const homeLink = screen.getAllByRole('link', { name: 'Главная' })[0];
    const enButton = screen.getAllByRole('button', { name: 'Англ' })[0];
    const ruButton = screen.getAllByRole('button', { name: 'Рус' })[0];
    const signInButton = screen.getAllByRole('link', { name: 'Вход' })[0];
    const signUpButton = screen.getAllByRole('link', { name: 'Регистрация' })[0];

    expect(homeLink).toBeDefined();
    expect(homeLink.getAttribute('href')).toBe('/ru');
    expect(enButton).toBeDefined();
    expect(ruButton).toBeDefined();
    expect(signInButton).toBeDefined();
    expect(signInButton.getAttribute('href')).toBe('/ru/sign-in');
    expect(signUpButton).toBeDefined();
    expect(signUpButton.getAttribute('href')).toBe('/ru/sign-up');
  });

  it('should call router.replace when ru-locale button is clicked', () => {
    renderWithIntl(<Header />);

    const ruButton = screen.getAllByRole('button', { name: 'Ru' })[0];

    fireEvent.click(ruButton);

    expect(replaceMock).toHaveBeenCalled();
    expect(replaceMock).toHaveBeenCalledWith('/ru/');
  });

  it('should call router.replace when en-locale button is clicked', () => {
    renderWithIntl(<Header />, 'ru');

    const enButton = screen.getAllByRole('button', { name: 'Англ' })[0];

    fireEvent.click(enButton);

    expect(replaceMock).toHaveBeenCalled();
    expect(replaceMock).toHaveBeenCalledWith('/en/');
  });

  it('should call router.replace when ru-locale button is clicked in the mobile menu', () => {
    renderWithIntl(<Header />);

    const ruButton = screen.getAllByRole('button', { name: 'Ru' })[1];

    fireEvent.click(ruButton);

    expect(replaceMock).toHaveBeenCalled();
    expect(replaceMock).toHaveBeenCalledWith('/ru/');
  });

  it('should call router.replace when en-locale button is clicked in the mobile menu', () => {
    renderWithIntl(<Header />);

    const enButton = screen.getAllByRole('button', { name: 'En' })[1];

    fireEvent.click(enButton);

    expect(replaceMock).toHaveBeenCalled();
    expect(replaceMock).toHaveBeenCalledWith('/en/');
  });

  it('should correctly add and remove sticky class to the header when scrolled', async () => {
    renderWithIntl(<Header />);

    const header = screen.getByTestId('header');

    expect(header.className.includes('sticked')).toBe(false);

    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(header.className.includes('sticked')).toBe(true);

    fireEvent.scroll(window, { target: { scrollY: 0 } });

    expect(header.className.includes('sticked')).toBe(false);
  });

  it('should open and close the mobile menu', () => {
    renderWithIntl(<Header />);

    const mobileMenu = screen.getByTestId('mobileMenu');
    const burgerIcon = screen.getByTestId('burgerIcon');
    const closeIcon = screen.getByTestId('closeIcon');

    expect(burgerIcon.className.includes('active')).toBe(true);
    expect(closeIcon.className.includes('active')).toBe(false);

    fireEvent.click(mobileMenu);

    expect(burgerIcon.className.includes('active')).toBe(false);
    expect(closeIcon.className.includes('active')).toBe(true);

    fireEvent.click(mobileMenu);

    expect(burgerIcon.className.includes('active')).toBe(true);
    expect(closeIcon.className.includes('active')).toBe(false);
  });
});
