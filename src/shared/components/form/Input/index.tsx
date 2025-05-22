'use client';
import { InputHTMLAttributes, JSX, ReactNode } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { Typography } from '../../Typography';

import {
  buildIconStyles,
  buildInputStyles,
  buildPlaceholderStyles,
} from './styles';

type Props = {
  className?: string;
  Icon?: ReactNode;
} & UseControllerProps<any> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'defaultValue'>;

/**
 * Input component with optional icon, placeholder, and error display.
 *
 * This component uses `react-hook-form`'s `useController` for form integration
 * and supports dynamic styling based on icon presence and validation state.
 *
 * @component
 * @param {Object} props - The props for the input component.
 * @param {React.ReactNode} [props.Icon] - Optional icon to display inside the input field.
 * @param {string} [props.className] - Optional additional class names for input styling.
 * @param {string} [props.placeholder] - Placeholder text displayed over the input when empty.
 * @param {boolean} [props.required] - Whether the input is required (adds visual asterisk and accessibility attributes).
 * @param {import('react-hook-form').UseControllerProps<any>} props - Props from `react-hook-form` for field control (name, control, rules, etc).
 *
 * @returns {JSX.Element} A styled input component with optional icon, placeholder, and validation feedback.
 */
export const Input = (props: Props): JSX.Element => {
  const { Icon, className, placeholder, required, ...formProps } = props;

  const { field, fieldState } = useController(formProps);

  const [inputStyles, iconStyles, placeholderStyles] = [
    buildInputStyles(
      { hasIcon: Boolean(Icon), isInvalid: fieldState.invalid },
      className,
    ),
    buildIconStyles(),
    buildPlaceholderStyles(Boolean(Icon)),
  ];

  return (
    <div>
      <div className={'relative'}>
        {Icon ? <div className={iconStyles}>{Icon}</div> : null}
        {placeholder && !field.value && (
          <Typography
            aria-hidden
            variant={'body'}
            className={placeholderStyles}
            component={'span'}
          >
            {placeholder}
            {required && (
              <span aria-hidden className={'text-main'}>
                {' '}
                *
              </span>
            )}
          </Typography>
        )}
        <input
          aria-placeholder={placeholder}
          data-testid={`input-${field.name}`}
          aria-invalid={fieldState.invalid}
          aria-errormessage={fieldState.error?.message}
          aria-required={required}
          {...formProps}
          {...field}
          className={inputStyles}
        />
      </div>
      {fieldState.invalid && fieldState.error && (
        <Typography
          variant={'body'}
          className={'text-invalid mt-2 text-[16px]'}
        >
          {fieldState.error.message}
        </Typography>
      )}
    </div>
  );
};
