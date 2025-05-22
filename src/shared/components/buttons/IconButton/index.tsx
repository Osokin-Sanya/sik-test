import { ButtonHTMLAttributes, JSX, ReactNode } from 'react';

import { buildIconButtonClasses } from './styles';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  shape?: 'round-xs' | 'round-md';
  children: ReactNode;
}

/**
 * IconButton – a button with an icon for interactive actions.
 *
 * Accepts:
 * - children (React ReactNode)
 * - Mandatory aria-label for accessibility
 * - All standard HTML button attributes
 *
 * Features:
 * - Automatically adds basic styles to the icon
 * - Supports disabled and hover/focus states
 * - provides accessibility (aria-hidden, focusable)
 *
 * @param {IconButtonProps} props - Component props
 * @returns {JSX.Element} Button with icon
 */

export const IconButton = ({
  ariaLabel,
  onClick,
  disabled = false,
  className,
  shape = 'round-xs',
  children,
  ...rest
}: IconButtonProps): JSX.Element => {
  const buttonClassesString = buildIconButtonClasses({
    shape,
    className,
  });

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={buttonClassesString}
      {...rest}
    >
      {children}
    </button>
  );
};
