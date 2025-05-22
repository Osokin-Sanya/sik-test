import { ButtonHTMLAttributes, ReactNode } from 'react';

import { buildButtonStyles } from './styles';

type Props = {
  /**
   * Callback function to handle button click.
   */
  onClick?: () => void;

  /**
   * If true, the button will be disabled.
   */
  disabled?: boolean;

  /**
   * Content to be rendered inside the button.
   */
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * PrimaryButton — a reusable button component styled as a primary action button.
 *
 * Accepts all standard `<button>` attributes and applies custom styles via `buildButtonStyles`.
 * Supports `disabled` state and custom children.
 *
 * @param {ButtonProps} props - Component props
 * @returns {JSX.Element} The rendered button element
 */
export const PrimaryButton = ({
  onClick,
  disabled = false,
  children,
  className,
  ...rest
}: Props) => {
  const classes = buildButtonStyles(className);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
