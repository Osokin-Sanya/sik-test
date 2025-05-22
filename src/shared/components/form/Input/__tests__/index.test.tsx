import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { z } from 'zod';

import { Input } from '../index';

const schema = z.object({
  test: z.string().min(1, 'Field is required'),
});

const Wrapper = ({
  defaultValue = '',
  Icon,
  onChangeHandler,
}: {
  defaultValue?: string;
  Icon?: React.ReactNode;
  onChangeHandler?: (val: string) => void;
}) => {
  const { control } = useForm({
    defaultValues: { test: defaultValue },
    resolver: zodResolver(schema),
    mode: 'onBlur', // 👈 нужно для валидации на blur
  });

  return (
    <Input
      control={control}
      name="test"
      Icon={Icon}
      onChange={(e) => {
        onChangeHandler?.(e.target.value);
      }}
      placeholder="test input"
    />
  );
};

describe('Input component with zod', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders input without icon', () => {
    render(<Wrapper />);
    const input = screen.getByText('test input');
    expect(input).toBeInTheDocument();
  });

  it('renders input with icon', () => {
    const TestIcon = <svg data-testid="test-icon" />;
    render(<Wrapper Icon={TestIcon} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('shows error message on invalid input (empty)', async () => {
    render(<Wrapper defaultValue="" />);

    const input = screen.getByTestId('input-test');
    fireEvent.blur(input);

    const error = await screen.findByText('Field is required');
    expect(error).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-errormessage', expect.any(String));
  });

  it('calls onChange handler and updates value', () => {
    const handleChange = vi.fn();
    render(<Wrapper onChangeHandler={handleChange} />);

    const input = screen.getByTestId('input-test');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(input).toHaveValue('new value');
  });
});
