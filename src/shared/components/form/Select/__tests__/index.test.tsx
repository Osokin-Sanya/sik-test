import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { z } from 'zod';

import { Select } from '../index';

const schema = z.object({
  test: z.string().min(1, 'Field is required'),
});

const options = [
  { value: 'apple', label: '🍎 Apple' },
  { value: 'banana', label: '🍌 Banana' },
  { value: 'cherry', label: '🍒 Cherry' },
];

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
    <>
      <Select
        options={options}
        control={control}
        name="test"
        Icon={Icon}
        onChange={(e) => {
          onChangeHandler?.(e.target.value);
        }}
        placeholder="test input"
      />
    </>
  );
};

describe('Select component with zod', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders select without icon', () => {
    render(<Wrapper />);
    expect(screen.getByText('test input')).toBeInTheDocument();
  });

  it('renders select with icon', () => {
    const TestIcon = <svg data-testid="test-icon" />;
    render(<Wrapper Icon={TestIcon} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('shows error message on blur if required value is not selected', async () => {
    render(<Wrapper />);
    const button = screen.getByRole('button');
    fireEvent.blur(button);

    // simulate form validation manually
    fireEvent.click(button); // open dropdown
    fireEvent.keyDown(button, { key: 'Escape' }); // close dropdown

    const error = await screen.findByText('Field is required');
    expect(error).toBeInTheDocument();
  });

  it('selects an option and updates value', () => {
    const handleChange = vi.fn();
    render(<Wrapper onChangeHandler={handleChange} />);

    const button = screen.getByRole('button');
    fireEvent.click(button); // open dropdown

    const option = screen.getByText('🍌 Banana');
    fireEvent.click(option); // select option

    expect(screen.getByText('🍌 Banana')).toBeInTheDocument();
  });
});
