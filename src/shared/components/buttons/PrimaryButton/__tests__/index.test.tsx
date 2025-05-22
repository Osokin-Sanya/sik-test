import { cleanup, render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { PrimaryButton } from '../index';

describe('PrimaryButton', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children text', () => {
    const { getByText } = render(<PrimaryButton>Test</PrimaryButton>);
    expect(getByText('Test')).toBeTruthy();
  });

  it('handles click', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <PrimaryButton onClick={onClick}>Click</PrimaryButton>,
    );
    getByRole('button').click();
    expect(onClick).toHaveBeenCalled();
  });

  it('applies disabled state', () => {
    const { getByRole } = render(
      <PrimaryButton disabled>Disabled</PrimaryButton>,
    );
    expect(getByRole('button').hasAttribute('disabled')).toBe(true);
  });
});
