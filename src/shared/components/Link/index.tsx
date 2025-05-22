import { JSX, ReactNode } from 'react';

import { getLinkStyles } from './styles';

interface LinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const Link = ({
  href,
  children,
  external = false,
  className,
  ariaLabel,
}: LinkProps): JSX.Element => {
  const classes = getLinkStyles(className);

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};
