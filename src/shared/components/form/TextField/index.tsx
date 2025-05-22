'use client';
import { JSX, TextareaHTMLAttributes } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { Typography } from '../../Typography';

import { buildInputStyles, buildPlaceholderStyles } from './styles';

type Props = {
  className?: string;
} & UseControllerProps<any> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'defaultValue'>;

/**
 * TextField component that renders a styled <textarea> element with optional placeholder and validation state.
 *
 * Integrates with `react-hook-form` via `useController`, and dynamically styles the textarea based on validation state.
 * Also displays a placeholder label when the field is empty, and shows validation error messages if present.
 *
 * @component
 * @param {Object} props - Props for the TextField component.
 * @param {string} [props.className] - Optional custom class name to apply additional styles.
 * @param {string} [props.placeholder] - Optional placeholder text displayed as floating label when the field is empty.
 * @param {boolean} [props.required] - Whether the field is required (adds an asterisk and accessibility attributes).
 * @param {import('react-hook-form').UseControllerProps<any>} props - Props from `react-hook-form` for field binding (e.g., name, control, rules).
 *
 * @returns {JSX.Element} A styled textarea component with placeholder and validation error display.
 */
export const TextField = (props: Props): JSX.Element => {
  const { className, placeholder, required, ...formProps } = props;

  const { field, fieldState } = useController(formProps);

  const [inputStyles, placeholderStyles] = [
    buildInputStyles(fieldState.invalid, className),
    buildPlaceholderStyles(),
  ];

  return (
    <div>
      <div className={'relative'}>
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
        <textarea
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
