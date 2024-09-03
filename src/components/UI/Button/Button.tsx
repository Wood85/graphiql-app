import { Link } from '@/i18n/routing';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react';

import clsx from 'clsx';

import style from './Button.module.scss';

interface IButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  className?: string;
}

interface IAnchorProps extends PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> {
  className?: string;
}

type TButtonProps = (IButtonProps & { href: never }) | IAnchorProps;

function Button({ children, className, ...attributes }: TButtonProps): JSX.Element {
  const buttonStyle = clsx(style.button, className);

  if (typeof attributes.href === 'string') {
    return (
      <Link href={attributes.href} className={buttonStyle} {...(attributes as IAnchorProps)}>
        {children}
      </Link>
    );
  }

  return (
    <button type='button' className={buttonStyle} {...(attributes as IButtonProps)}>
      {children}
    </button>
  );
}

export default Button;
