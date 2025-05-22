'use client';
import { InputHTMLAttributes, JSX, ReactNode, useMemo } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { useSelect } from '@/shared/components/form/Select/hooks';
import { useGetCssVariable } from '@/shared/hooks';
import { ArrowDownSmallIcon } from '@/shared/icons';

import { Typography } from '../../Typography';

import {
  buildArrowStyles,
  buildInputStyles,
  buildLiStyles,
  buildPlaceholderStyles,
  iconStyles,
  listStyles,
} from './styles';
import { Option } from './types';

type Props = {
  className?: string;
  Icon?: ReactNode;
  options: Option[];
} & UseControllerProps<any> &
  Omit<InputHTMLAttributes<HTMLSelectElement>, 'name' | 'defaultValue'>;

/**
 * Accessible and styled select component integrated with `react-hook-form`.
 *
 * Features:
 * - Custom styling with optional icon.
 * - Keyboard navigation (↑ ↓ Enter Esc).
 * - Dropdown toggling.
 * - Form validation with error display.
 * - Closes on outside click (via `useSelect` hook).
 *
 * @component
 * @param {Object} props - Props for the Select component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {ReactNode} [props.Icon] - Optional leading icon.
 * @param {string} [props.placeholder] - Placeholder text when no value is selected.
 * @param {boolean} [props.required] - Marks the field as required (asterisk in placeholder).
 * @param {Option[]} props.options - List of selectable options.
 * @param {UseControllerProps<any>} props - React Hook Form control props.
 * @returns {JSX.Element} The rendered select component.
 */
export const Select = (props: Props): JSX.Element => {
  const { Icon, className, placeholder, required, options, ...formProps } =
    props;

  const { field, fieldState } = useController(formProps);

  const {
    containerRef,
    buttonRef,
    listRef,
    handleToggle,
    handleKeyDown,
    handleSelect,
    setHighlightedIndex,

    highlightedIndex,
    isOpen,
  } = useSelect({
    options,
    onChange: field.onChange,
    onBlur: field.onBlur,
  });
  const iconColor = useGetCssVariable('--color-light-gray', 'white');

  const value: string | null = useMemo(() => {
    return (
      options.find((option) => option.value === field.value)?.label || null
    );
  }, [field.value, options]);

  const [inputStyles, placeholderStyles, arrowStyles] = [
    buildInputStyles(
      { hasIcon: Boolean(Icon), isInvalid: fieldState.invalid },
      className,
    ),
    buildPlaceholderStyles(Boolean(Icon)),
    buildArrowStyles(isOpen),
  ];

  return (
    <div ref={containerRef}>
      <div className={'relative'}>
        {Icon ? <div className={iconStyles}>{Icon}</div> : null}

        <button
          ref={buttonRef}
          type={'button'}
          className={inputStyles}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="select-label"
        >
          <Typography
            aria-hidden
            variant={'body'}
            className={placeholderStyles}
            component={'span'}
          >
            {placeholder && !field.value ? (
              <>
                {placeholder}
                {required && (
                  <span aria-hidden className={'text-main'}>
                    {' '}
                    *
                  </span>
                )}
              </>
            ) : (
              value
            )}
          </Typography>
        </button>

        <div className={arrowStyles}>
          <ArrowDownSmallIcon color={iconColor} size={16} />
        </div>

        {isOpen && (
          <ul
            ref={listRef}
            className={listStyles}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={`option-${highlightedIndex}`}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`option-${field.name}-${option.value}`}
                role="option"
                aria-selected={value === option.value}
                className={buildLiStyles(
                  index === highlightedIndex,
                  index + 1 === options.length,
                )}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {fieldState.invalid && fieldState.error && !isOpen && (
        <Typography
          variant={'body'}
          className={'text-invalid mt-2 text-[16px] relative z-5'}
        >
          {fieldState.error.message}
        </Typography>
      )}
    </div>
  );
};
