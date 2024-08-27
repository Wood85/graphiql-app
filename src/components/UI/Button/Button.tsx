import type { PropsWithChildren, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

import clsx from 'clsx';

import style from './Button.module.scss';

interface IButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  className?: string;
}

interface IAnchorProps extends PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> {
  className?: string;
}

type ButtonProps = (IButtonProps & { href: never }) | IAnchorProps;

function Button({ children, className, ...attributes }: ButtonProps): JSX.Element {
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
