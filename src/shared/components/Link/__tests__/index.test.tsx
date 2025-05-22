import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Link } from '..';

describe('Link', () => {
  it('renders internal link', () => {
    render(<Link href="/about">About</Link>);
    const link = screen.getByText('About');
    expect(link).toHaveAttribute('href', '/about');
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('renders external link with target and rel', () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>,
    );
    const link = screen.getByText('External');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders with aria-label', () => {
    render(
      <Link href="/home" ariaLabel="Home link">
        Home
      </Link>,
    );
    expect(screen.getByLabelText('Home link')).toBeInTheDocument();
  });
});
