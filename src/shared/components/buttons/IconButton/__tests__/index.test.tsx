import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { IconButton } from '..';

const TestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="mock-icon" {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

describe('IconButton', () => {
  it('renders icon element and handles click', () => {
    const onClick = vi.fn();
    render(
      <IconButton ariaLabel="Close" onClick={onClick}>
        <TestIcon />
      </IconButton>,
    );
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClick).toHaveBeenCalled();
  });

  it('renders disabled button', () => {
    render(
      <IconButton ariaLabel="Disabled" disabled>
        <TestIcon />
      </IconButton>,
    );
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });
});
